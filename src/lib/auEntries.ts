import { supabase } from "./supabaseClients";
import { getPublicImageUrl } from "./galleryItems";

type OrderedRow = {
  id: string;
  sort_order: number;
  created_at: string;
};

type ContextRow = OrderedRow & {
  label: string;
  label_vi: string | null;
  body: string;
  body_vi: string | null;
};

type CommissionRow = OrderedRow & {
  title: string;
  title_vi: string | null;
  caption: string | null;
  caption_vi: string | null;
  artist_credit: string;
  image_path: string;
  alt_text: string | null;
  alt_text_vi: string | null;
};

export type AuRow = {
  id: string;
  legacy_id: string | null;
  slug: string;
  title: string;
  title_vi: string | null;
  subtitle: string | null;
  subtitle_vi: string | null;
  nav_label: string;
  nav_label_vi: string | null;
  nav_image_path: string | null;
  tags: string[];
  tags_vi: string[] | null;
  au_context_sections: ContextRow[];
  au_commissions: CommissionRow[];
};

export type AuEntry = ReturnType<typeof localizeAuEntry>;

function compareDisplayOrder(a: OrderedRow, b: OrderedRow) {
  return a.sort_order - b.sort_order
    || a.created_at.localeCompare(b.created_at)
    || a.id.localeCompare(b.id);
}

function translated(english: string | null, vietnamese: string | null, language: "en" | "vi") {
  return (language === "vi" ? vietnamese?.trim() : null) || english || "";
}

export function localizeAuEntry(row: AuRow, language: "en" | "vi") {
  return {
    id: row.id,
    legacyId: row.legacy_id,
    slug: row.slug,
    code: row.id,
    title: translated(row.title, row.title_vi, language),
    shortTitle: translated(row.nav_label, row.nav_label_vi, language),
    indexImage: row.nav_image_path ? getPublicImageUrl(row.nav_image_path) : undefined,
    premise: translated(row.subtitle, row.subtitle_vi, language),
    motifs: language === "vi" ? row.tags_vi ?? row.tags : row.tags,
    contextSections: [...row.au_context_sections].sort(compareDisplayOrder).map((section) => ({
      id: section.id,
      label: translated(section.label, section.label_vi, language),
      paragraphs: translated(section.body, section.body_vi, language)
        .split(/\r?\n\s*\r?\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean),
    })),
    commissions: [...row.au_commissions].sort(compareDisplayOrder).map((commission) => ({
      id: commission.id,
      title: translated(commission.title, commission.title_vi, language),
      artist: commission.artist_credit,
      image: getPublicImageUrl(commission.image_path),
      note: translated(commission.caption, commission.caption_vi, language),
      alt: translated(commission.alt_text, commission.alt_text_vi, language)
        || `${row.title}: ${commission.title}`,
    })),
  };
}

export function matchesAu(entry: AuEntry, value: string) {
  const normalized = value.trim().toLowerCase();
  return [entry.id, entry.legacyId, entry.slug].some((alias) => alias?.toLowerCase() === normalized);
}

export async function getAuEntries() {
  const { data, error } = await supabase
    .from("aus")
    .select(`
      id, legacy_id, slug, title, title_vi, subtitle, subtitle_vi,
      nav_label, nav_label_vi, nav_image_path, tags, tags_vi,
      au_context_sections (id, label, label_vi, body, body_vi, sort_order, created_at),
      au_commissions (id, title, title_vi, caption, caption_vi, artist_credit,
        image_path, alt_text, alt_text_vi, sort_order, created_at)
    `)
    .eq("is_published", true)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true })
    .order("id", { ascending: true })
    .returns<AuRow[]>();

  if (error) throw new Error(error.message);
  return data ?? [];
}
