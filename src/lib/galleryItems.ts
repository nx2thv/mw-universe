import { supabase } from "./supabaseClients";

export const GALLERY_MEDIA_BUCKET = "gallery-media";

export type GallerySection =
  | "story_moments"
  | "marcus_gallery"
  | "william_gallery";

type GalleryItemRow = {
  id: string;
  section: GallerySection;
  image_path: string;
  artist_credit: string;
  age_range: string | null;
  excerpt: string | null;
  excerpt_vi: string | null;
  polaroid_orientation: "portrait" | "landscape" | "square" | null;
  tag_direction: "left" | "right" | null;
  is_nsfw: boolean;
};

export type SupabaseGalleryItem = {
  id: string;
  section: GallerySection;
  imagePath: string;
  src: string;
  artistCredit: string;
  ageRange: string | null;
  excerpt: string | null;
  excerptVi: string | null;
  polaroidOrientation: "portrait" | "landscape" | "square" | null;
  tagDirection: "left" | "right" | null;
  isNsfw: boolean;
};

function isAbsoluteUrl(value: string) {
  return /^https?:\/\//.test(value);
}

function toStoragePath(imagePath: string) {
  const trimmed = imagePath.trim();
  const bucketPublicPrefix = `/storage/v1/object/public/${GALLERY_MEDIA_BUCKET}/`;

  if (trimmed.startsWith(`${GALLERY_MEDIA_BUCKET}/`)) {
    return trimmed.slice(`${GALLERY_MEDIA_BUCKET}/`.length);
  }

  if (trimmed.startsWith(bucketPublicPrefix)) {
    return trimmed.slice(bucketPublicPrefix.length);
  }

  if (trimmed.startsWith(bucketPublicPrefix.slice(1))) {
    return trimmed.slice(bucketPublicPrefix.length - 1);
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const { pathname } = new URL(trimmed);
      if (pathname.includes(bucketPublicPrefix)) {
        const index = pathname.indexOf(bucketPublicPrefix);
        return pathname.slice(index + bucketPublicPrefix.length);
      }
    } catch {
      return trimmed;
    }
  }

  return trimmed;
}

function getPublicImageUrl(imagePath: string) {
  if (isAbsoluteUrl(imagePath)) {
    return imagePath;
  }

  const { data } = supabase.storage
    .from(GALLERY_MEDIA_BUCKET)
    .getPublicUrl(toStoragePath(imagePath));

  return data.publicUrl;
}

export async function getGalleryItems(
  section: GallerySection,
): Promise<SupabaseGalleryItem[]> {
  const { data, error } = await supabase
    .from("gallery_items")
    .select(
      "id, section, image_path, artist_credit, age_range, excerpt, excerpt_vi, polaroid_orientation, tag_direction, is_nsfw",
    )
    .eq("section", section)
    .eq("is_published", true)
    .order("id", { ascending: true });

  if (error) {
    throw new Error(error.message || "Failed to fetch gallery items.");
  }

  const rows = (data ?? []) as GalleryItemRow[];

  return rows.map((row) => ({
    id: row.id,
    section: row.section,
    imagePath: row.image_path,
    src: getPublicImageUrl(row.image_path),
    artistCredit: row.artist_credit,
    ageRange: row.age_range,
    excerpt: row.excerpt,
    excerptVi: row.excerpt_vi,
    polaroidOrientation: row.polaroid_orientation,
    tagDirection: row.tag_direction,
    isNsfw: row.is_nsfw,
  }));
}
