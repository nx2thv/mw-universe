// src/pages/MyCurrentIdeasPage.tsx
import { useEffect, useMemo, useState } from "react";
import {
  type CommissionIdea,
  normalizeCharacter,
  type CharacterType,
  type StatusType,
  type NsfwType,
} from "../data/commissionIdeas";
import { useLanguage } from "../LanguageContext";
import { openBriefDocument } from "../lib/briefLinks";
import { supabase } from "../lib/supabaseClients";
import Lottie from "lottie-react";
import elephantLoading from "../../assets/lottie/elephant-loading.json";

const translations = {
  en: {
    tagline: "Two husbands. Zero peace.",
    intro:
      "A curated archive of scenes featuring William & Marcus.\n" +
      "Each card includes a full brief for artists.\n" +
      "To claim a brief, message me with the ID (e.g., WM-01).\n Once confirmed, your name will appear beside the entry.",
    noResults: "No ideas match these filters yet. Try changing them.",
    openBrief: "Open full brief →",
    filters: {
      character: "Character",
      status: "Status",
      statusNotStarted: "Not started",
      statusBeingWorkedOn: "Being worked on",
      content: "Content",
      all: "All",
      na: "All",
      william: "William",
      marcus: "Marcus",
      couple: "Couple",
      sfw: "SFW",
      nsfwLabel: "NSFW",
    },
    status: {
      notStarted: "Not started",
      inProgress: "... working on this brief",
      completed: "Completed"
    },
  },
  vi: {
    tagline: "Two husbands. Zero peace.",
    intro:
      "Kho lưu trữ ý tưởng ấp ủ cho William & Marcus\n" +
      "Mỗi card được đính kèm với brief.\n" +
      "Claim brief bằng cách nhắn tin cho mình kèm ID (vd: MW-01).\n Tên artist sẽ được update ở brief tương ứng sau khi xác nhận làm việc.",
    noResults:
      "Chưa có ý tưởng nào khớp với bộ lọc này. Thử chọn lại cái khác nha.",
    openBrief: "Mở file mô tả →",
    filters: {
      character: "Nhân vật",
      status: "status",
      statusNotStarted: "Chưa bắt đầu",
      statusBeingWorkedOn: "Đang được thực hiện",
      content: "Nội dung",
      all: "Tất cả",
      na: "All",
      william: "William",
      marcus: "Marcus",
      couple: "Couple",
      sfw: "SFW",
      nsfwLabel: "NSFW",
    },
    status: {
      notStarted: "Chưa bắt đầu",
      inProgress: "Artist đang vẽ",
      completed: "Đã hoàn thành"
    },
  },
} as const;

type SupportedLang = keyof typeof translations;

function useT() {
  const { language } = useLanguage();
  const lang = (language || "en") as SupportedLang;
  return translations[lang] || translations.en;
}

/* Page */

export default function MyCurrentIdeasPage() {
  const t = useT();

  const [characterFilter, setCharacterFilter] = useState<CharacterType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StatusType>("not-started");
  const [nsfwFilter, setNsfwFilter] = useState<NsfwType>("sfw");
  const [ideas, setIdeas] = useState<CommissionIdea[]>([]);
  const [loading, setLoading] = useState(true);

  const filteredIdeas = useMemo(
    () =>
      ideas.filter((idea) => {
        if (characterFilter !== "all" && idea.character !== characterFilter) return false;
        if (idea.status !== statusFilter) return false;
        if (idea.nsfw !== nsfwFilter) return false;
        return true;
      }),
    [ideas, characterFilter, statusFilter, nsfwFilter]
  );

  useEffect(() => {
    async function fetchIdeas() {
      const { data, error } = await supabase
        .from("commission_ideas")
        .select("id, title, character, status, preview, brief_path, assigned_to, nsfw");

      if (error) {
        console.error("Supabase fetch error:", error.message);

      } else if (data) {
        // Map DB columns to the public brief card model.
        const mapped: CommissionIdea[] = data.map((row: any) => ({
          id: row.id,
          title: row.title,
          character: normalizeCharacter(row.character),
          status: row.status,
          preview: row.preview,
          briefPath: row.brief_path,
          assignedTo: row.assigned_to ?? null,
          nsfw: (row.nsfw as NsfwType) ?? "sfw",
        }));

        setIdeas(mapped);
      }

      setLoading(false);
    }

    fetchIdeas();
  }, []);

  return (
    <main
      className="min-h-screen text-slate-100"
      style={{
        background:
          "linear-gradient(to bottom, #0B0F14 0%, #0B0F14 40%, #10161F 100%)",
      }}
    >
      <header className="ideas-page-header relative w-full bg-transparent border-b text-slate-100 shadow-md px-6 pt-20 md:pt-16 pb-10 flex flex-col items-center text-center gap-4">
        <div className="ideas-page-heading text-center">
          <h1 className="ideas-page-title mt-10 md:mt-0 drop-shadow">
            Mr. Hayes &
            <br />
            Mr. Cartier-Hayes
          </h1>

          <h2 className="ideas-page-subtitle">
            {t.tagline}
          </h2>
        </div>
      </header>

      {/* INTRO PARAGRAPH */}
      <section className="ideas-intro w-full px-6 md:px-10 lg:px-16 mt-10 mb-10">
        <p className="ideas-intro-text whitespace-pre-line text-center text-base md:text-lg mx-auto">
          {t.intro}
        </p>
      </section>

      {/* CONTENT AREA */}
      <div className="w-full px-4 py-10 md:px-10 lg:px-16">
        <FiltersRow
          characterFilter={characterFilter}
          setCharacterFilter={setCharacterFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          nsfwFilter={nsfwFilter}
          setNsfwFilter={setNsfwFilter}
        />

        <section className="mt-6 grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {loading && (
            <div className="col-span-full flex flex-col items-center justify-center py-10 opacity-90">
              <div className="w-[181px] md:w-[220px] mx-auto flex justify-center">
                <Lottie animationData={elephantLoading} loop />
              </div>
            </div>
          )}

          {!loading && filteredIdeas.length === 0 && (
            <p className="no-result text-sm opacity-60 col-span-full">
              {t.noResults}
            </p>
          )}

          {!loading &&
            filteredIdeas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
        </section>
      </div>
    </main>
  );
}

/* Filters row */

type FiltersRowProps = {
  characterFilter: CharacterType | "all";
  setCharacterFilter: (v: CharacterType | "all") => void;
  statusFilter: StatusType;
  setStatusFilter: (v: StatusType) => void;
  nsfwFilter: NsfwType;
  setNsfwFilter: (v: NsfwType) => void;
};

function FiltersRow(props: FiltersRowProps) {
  const {
    characterFilter,
    setCharacterFilter,
    statusFilter,
    setStatusFilter,
    nsfwFilter,
    setNsfwFilter,
  } = props;

  const t = useT();
  const f = t.filters;

  return (
    <section className="filters-row border-b border-white/10">
      <div className="filters-dropdown-row">
        <FilterDropdown
          label={f.character}
          value={characterFilter}
          onChange={(value) => setCharacterFilter(value as CharacterType | "all")}
          options={[
            { value: "all", label: f.na },
            { value: "william", label: f.william },
            { value: "marcus", label: f.marcus },
            { value: "couple", label: f.couple },
          ]}
        />

        <FilterDropdown
          label={f.status}
          value={statusFilter}
          onChange={(value) => setStatusFilter(value as StatusType)}
          options={[
            { value: "not-started", label: f.statusNotStarted },
            { value: "in-progress", label: f.statusBeingWorkedOn },
          ]}
        />

        <FilterDropdown
          label={f.content}
          value={nsfwFilter}
          onChange={(value) => setNsfwFilter(value as NsfwType)}
          options={[
            { value: "sfw", label: f.sfw },
            { value: "nsfw", label: f.nsfwLabel },
          ]}
        />
      </div>
    </section>
  );
}

function FilterDropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="filter-dropdown">
      <select
        aria-label={label}
        className="filter-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* Idea card */

function IdeaCard({ idea }: { idea: CommissionIdea }) {
  const t = useT();
  const f = t.filters;

  const characterLabel =
    idea.character === "william"
      ? f.william
      : idea.character === "marcus"
        ? f.marcus
        : idea.character === "couple"
          ? f.couple
          : f.na;
  const nsfwLabel = idea.nsfw === "nsfw" ? f.nsfwLabel : f.sfw;
  const handleOpenBrief = async () => {
    try {
      await openBriefDocument(idea.briefPath);
    } catch (error) {
      console.error("Could not open brief:", error);
      window.alert("Could not open this brief right now.");
    }
  };

  return (
    <article className="group card flex idea-card flex-col text-center">
      <div className="mb-3">
        {/* ID */}
        <p className="idea-id text-[10px] uppercase tracking-[0.28em]">
          {idea.id}
        </p>

        {/* Type / Content */}
        <p className="idea-meta mt-1">
          {characterLabel} • {nsfwLabel}
        </p>

        {/* TITLE */}
        <h2 className="mt-2 text-lg md:text-xl font-medium leading-tight">
          {idea.title}
        </h2>
      </div>

      {/* currently preview is just a string.
         If later make preview bilingual (e.g. { en: "...", vi: "..." }),
         it can be switch to idea.preview[language]. */}
      <p className="idea-card-preview line-clamp-3 mb-4">
        {idea.preview}
      </p>

      <div className="mt-auto flex items-center justify-between text-[11px] uppercase tracking-[0.12em]">
        <StatusPill status={idea.status} assignedTo={idea.assignedTo} />
        <button
          type="button"
          onClick={handleOpenBrief}
          className="idea-link bg-transparent border-0 p-0 cursor-pointer font-inherit text-slate-300 underline underline-offset-4 transition-colors hover:text-white focus:outline-none opacity-80 group-hover:opacity-100 uppercase"
        >
          {t.openBrief}
        </button>
      </div>
    </article>
  );
}

function StatusPill({
  status,
  assignedTo,
}: {
  status: StatusType;
  assignedTo?: string | null;
}) {
  const t = useT();

  let label: string;
  if (status === "not-started") {
    label = t.status.notStarted;
  } else {
    // in-progress
    if (assignedTo) {
      // EN + VI handled by language toggle
      const isVi = (useLanguage().language === "vi");
      label = isVi
        ? `${assignedTo} đang vẽ cồm nì òi`
        : `${assignedTo} is working on this brief`;
    } else {
      label = t.status.inProgress;
    }
  }

  const dotClass =
    status === "not-started" ? "bg-emerald-400" : "bg-amber-300";
  const isWorking = status !== "not-started";
  const isNotStarted = status === "not-started";

  return (
    <span
      className={`idea-status flex items-center gap-1 opacity-80 ${isWorking ? "idea-status--working" : ""} ${isNotStarted ? "idea-status--not-started" : ""
        }`}
    >
      <span className={`idea-status-dot inline-block h-2 w-2 rounded-full ${dotClass}`} />
      {label}
    </span>
  );
}
