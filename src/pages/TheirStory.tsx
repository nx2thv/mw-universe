import "./about-them.css";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext";
import timelineImg1 from "../../assets/timelineImg1.jpeg";
import timelineImg2 from "../../assets/timelineImg2.jpeg";
import timelineImg3 from "../../assets/timelineImg3.jpeeg.png";
import timelineImg4 from "../../assets/timelineImg4.jpeg";

import littleMomentImage1 from "../../assets/littleMomentImage1.jpeg";
import littleMomentImage2 from "../../assets/littleMomentImage2.jpeg";
import littleMomentImage3 from "../../assets/littleMomentImage3.jpeg";
import littleMomentImage4 from "../../assets/littleMomentImage4.jpeg";
import littleMomentImage5 from "../../assets/littleMomentImage5.jpeg";
import littleMomentImage6 from "../../assets/littleMomentImage6.jpeg";
import littleMomentImage7 from "../../assets/littleMomentImage7.jpeg";

const timelineImages = [timelineImg1, timelineImg2, timelineImg3, timelineImg4];
const littleMomentImages = [littleMomentImage1, littleMomentImage2, littleMomentImage3, littleMomentImage4, littleMomentImage5, littleMomentImage6, littleMomentImage7];

type FragmentCategory = "domestic" | "milestones" | "bits-pieces";
type LoreFragment = {
  id: string;
  title: string;
  excerpt: string;
  phaseIndex: number;
  category: FragmentCategory;
  image: string;
  artist: string;
};

type StoryBeat = {
  phase: string;
  body: string;
};

type MemoryNote = {
  title: string;
  body: string;
  tone: string;
};

type LetterRecord = {
  label: string;
  title: string;
  body: string;
  note: string;
  to: string;
  from: string;
  fromAddress: string[];
  toAddress: string[];
  stamp: string;
  postmark: string;
};

type CommissionRecord = {
  title: string;
  context: string;
  note: string;
};

const letterDraftText = {
  deployment:
    "Dear Goldie,\n\n" +
    "I hope you're all good at home. I miss you, and Leo too. I can't believe I'm saying this but I also miss the two fat kings. Don't get smug now.\n\n" +
    "The deployment is going fine. I'm in one piece, because the last thing I'd like to happen is you nagging at me for another scratch. Got your picture in my pocket, can't risk looking at it with a fresh scar. Jayce just, again, called me a simp for writing to you \n\n" +
    "Can't care less. He doesn't have a beautiful husband waiting for him at home, does he?\n\n" +
    "Anyway, I missed you. Just two more weeks and I'll be right home with you, baby.",
  reply:
    "Write William's full letter here.",
} as const;

const storyLetters = [
  {
    label: "Deployment",
    title: "Marcus to William",
    to: "William Cartier-Hayes",
    from: "MSG Marcus Hayes",
    fromAddress: [
      "C TROOP, TASK FORCE 88",
      "PSC 468 BOX 1452",
      "APO AP 96346",
      "UNITED STATES",
    ],
    toAddress: [
      "32 Perry Street",
      "New York, NY 10014",
      "UNITED STATES",
    ],
    stamp: "PRIORITY MAIL",
    postmark: "U.S. ARMED POST",
    body: letterDraftText.deployment,
    note: "Tap to fold it closed again.",
  },
  {
    label: "Reply",
    title: "William back home",
    to: "MSG Marcus Hayes",
    from: "William Cartier-Hayes",
    fromAddress: [
      "32 Perry Street",
      "New York, NY 10014",
      "UNITED STATES",
    ],
    toAddress: [
      "C TROOP, TASK FORCE 88",
      "PSC 468 BOX 1452",
      "APO AP 96346",
      "UNITED STATES",
    ],
    stamp: "AIR MAIL",
    postmark: "NYC G.P.O.",
    body: letterDraftText.reply,
    note: "Designed to pair with the first letter as a mirrored exchange.",
  },
] satisfies LetterRecord[];

const loreFragments: LoreFragment[] = [
  {
    id: "frag-01",
    title: "#obsessed",
    excerpt: "Bedtime moment. William wearing Marcus' patrolling shirt, while Marcus is... being a dog.",
    phaseIndex: 1,
    category: "domestic",
    image: littleMomentImages[0],
    artist: "Ha Vee",
  },
  {
    id: "frag-02",
    title: "Victoria's Secret",
    excerpt: "William made his debut in VS. After the show, Marcus had somewhere to be with his Angel.",
    phaseIndex: 1,
    category: "milestones",
    image: littleMomentImages[1],
    artist: "Peen Nut",
  },
  {
    id: "frag-03",
    title: "#nha_trang",
    excerpt: "First time in Vietnam",
    phaseIndex: 2,
    category: "bits-pieces",
    image: littleMomentImages[2],
    artist: "Tinh Tú",
  },
  {
    id: "frag-04",
    title: "New Year!",
    excerpt: "They have some leftover Christmas wrappings, so...",
    phaseIndex: 3,
    category: "bits-pieces",
    image: littleMomentImages[3],
    artist: "Tinh Tú",
  },
  {
    id: "frag-05",
    title: "Doorway Reunion",
    excerpt: "No big speech, just the stunned half-second before they collide back into each other.",
    phaseIndex: 2,
    category: "milestones",
    image: littleMomentImages[1],
    artist: "Artist Placeholder B",
  },
  {
    id: "frag-06",
    title: "Dog Tags on the Nightstand",
    excerpt: "Small metal sounds in the dark; proof that the worst nights eventually ended.",
    phaseIndex: 2,
    category: "bits-pieces",
    image: littleMomentImages[2],
    artist: "Artist Placeholder C",
  },
  {
    id: "frag-07",
    title: "Laundry Day Treaty",
    excerpt: "An ordinary argument about nothing, resolved by laughter and a stolen kiss.",
    phaseIndex: 3,
    category: "domestic",
    image: littleMomentImages[0],
    artist: "Artist Placeholder A",
  },
  {
    id: "frag-08",
    title: "Anniversary Ledger",
    excerpt: "Not the date itself, but the ritual after: documenting what they kept this year.",
    phaseIndex: 3,
    category: "milestones",
    image: littleMomentImages[1],
    artist: "Artist Placeholder B",
  },
];

function stableHash(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

const translations = {
  en: {
    masthead: "always want more time ...",
    eyebrow: "Main Universe Archive",
    back: "← Return to archive",
    timelineTitle: "Timeline",
    memoryTitle: "Little Moments",
    memoryIntro:
      "The things that would be easy to miss in a summary are usually the things that matter most.",
    lettersTitle: "Correspondence",
    lettersIntro:
      "This section is built for the letters: the ones sent, the ones answered, and the ones that carried more than either of them said out loud.",
    commissionsTitle: "Canon Commissions",
    commissionsIntro:
      "A first pass for the main-universe gallery. Each slot is meant to carry context, not just the image itself.",
    rail: [
      { id: "story-timeline", numeral: "I", label: "Timeline" },
      { id: "story-moments", numeral: "II", label: "Moments" },
      { id: "story-letters", numeral: "III", label: "Letters" },
      { id: "story-gallery", numeral: "IV", label: "Gallery" },
    ],
    timeline: [
      {
        phase: "Growing Up (8-15)",
        body:
          "They met in a quiet neighborhood in Westchester when Marcus' family moved in next door. Marcus was 15, William was 8.\n\n" +
          "William called Marcus 'tree' and declared them best friends almost immediately. Marcus, understandably, had questions. He went with it anyway.\n\n" +
          "At this stage, their dynamic was pure brotherhood. Marcus would never have said it out loud, but William quickly became one of his favourite people in the world. And William was just delighted to have a friend who was bigger than him, taller than him, and could reach the top shelf without needing a chair.\n\n" +
          "William was a glittery ball of sunshine. Marcus was… Marcus. Brooding, tall for his age, quiet, and permanently caught somewhere between confusion and reluctant fondness whenever William came chirping into his space. But for all his awkwardness, Marcus was always gentle with him. Always protective.",
      },
      {
        phase: "Dating (17-24)",
        body:
          "Marcus left for the military after high school at 18, leaving William behind to miss him fiercely. When he returned home at 20, William was there waiting for him with a bright smile and too many tears.\n\n" +
          "After that, Marcus went to NYC for college and only came home during breaks, while William steadily grew up in the spaces between those visits. Everything changed one summer when Marcus came home and suddenly saw William differently. He tried to bury it. William, on the other hand, knew exactly what he wanted.\n\n" +
          "What followed was a year of chasing, yearning, and restraint before they finally began dating when William was 17.\n\n" +
          "After graduation, they moved to Brooklyn to build a life on their own, choosing struggle over comfort despite the safety net behind them. William pursued modeling and design at Parsons, while Marcus entered the NYPD academy.\n\n" +
          "This phase was defined by ambition, doubt, late-night talks, and learning how to grow without growing apart. They were young and messy, but they never stopped choosing each other."
      },
      {
        phase: "Settling In (25-32)",
        body:
          "Marcus proposed to William at home on their eighth anniversary. A year later, they were married, with William at 26 and Marcus at 33.\n\n" +
          "Between the proposal and the wedding, they bought their brownstone: a three-story home in the West Village, Manhattan. It felt like the first real proof that all the dreams they had chased for years were finally becoming something they could hold.\n\n" +
          "After the wedding, they honeymooned in Bali and Vietnam. The photo was taken in Vietnam, inside a photobooth, somewhere in the middle of laughter, heat, and happiness.\n\n" +
          "At 27, William retired from modeling and turned toward something more lasting. The fashion world’s golden boy was soon offered a place at Chanel. Marcus, meanwhile, remained in the force while weighing two very different futures: a quieter promotion within the NYPD, or a transfer to Delta. He chose Delta, and left the NYPD at 34.\n\n" +
          "During this phase, they also adopted Banana, a big fluffy grey British Shorthair who quickly made himself at home."
      },
      {
        phase: "Living The Life (28-36 and counting)",
        body:
          "They settled into the brownstone as if they had always belonged there. In time, their life grew bigger and louder with the adoption of Leo, a light-skinned five-year-old boy who would later take their surname and become Leo Cartier-Hayes.\n\n" +
          "More recently, the household gained another member: Cloud, a fat Samoyed whom Marcus insists is stupid and William insists is simply misunderstood, special, and gifted in his own way.\n\n" +
          "The kids (yes, they call Banana and Cloud their children with complete seriousness) also have to suffer through their dads’ constant displays of affection. There are endless date nights, giggles over inside jokes nobody else understands, and far too many kisses exchanged between the two men while the kids sit in the corner, doomed to third-wheel.\n\n" +
          "Alternatively, they get shipped off to their grandparents’ houses, which, to be fair, nobody really complains about.\n\n" +
          "Even so, this phase of life has never been entirely easy. Marcus’ deployments remain the hardest part. Because of the work he does, every goodbye carries the quiet possibility of being the last. William has learned to live with that fear without letting it hollow him out. He stays strong for Leo, for Banana, for Cloud, and for Marcus when he returns home.\n\n" +
          "And beyond that, they are doing well. Not normal, certainly. A little ridiculous, definitely. But happy, deeply so, in the loud and messy way that belongs only to them."
      },
    ] satisfies StoryBeat[],
    memories: [
      {
        title: "Departure ritual",
        body:
          "A small gesture before one of them leaves the room, the house, or the country. The kind of thing that becomes instinct before it becomes tradition.",
        tone: "habit",
      },
      {
        title: "The things left behind",
        body:
          "A jacket over a chair, a letter folded twice, dog tags on the nightstand, the ordinary evidence that the other person still occupies the space.",
        tone: "evidence",
      },
      {
        title: "Mundane tenderness",
        body:
          "Checking meals, fixing a collar, stealing five minutes together in the kitchen, saying something dry when the real meaning is stay a little longer.",
        tone: "domestic",
      },
      {
        title: "The joke that survives everything",
        body:
          "A dumb line or repeated bit that follows them through every rough season because some kinds of affection are best disguised as annoyance.",
        tone: "private bit",
      },
      {
        title: "After the hard days",
        body:
          "The quietest version of care belongs here: no speech, no dramatic scene, just the practiced knowledge of how to stay nearby without pressing too hard.",
        tone: "gentleness",
      },
      {
        title: "Proof of home",
        body:
          "Not the official milestones. The real ones. The cup on the counter. The familiar weight in bed. The way one presence changes the whole room.",
        tone: "home",
      },
    ] satisfies MemoryNote[],
    letters: storyLetters,
    commissions: [
      {
        title: "Winter leave",
        context: "Canon commission slot",
        note:
          "Use this card for a reunion or leave-period piece, with a short note about where it sits in the timeline.",
      },
      {
        title: "Domestic morning",
        context: "Canon commission slot",
        note:
          "Best used for the quieter art: shared routine, half-dressed conversation, coffee, soft light, or the ordinary life they fought to keep.",
      },
      {
        title: "After the return",
        context: "Canon commission slot",
        note:
          "This slot works for art that belongs to the adjustment period after separation, where closeness is present but still being relearned.",
      },
    ] satisfies CommissionRecord[],
  },
  vi: {
    masthead: "Always want more time",
    eyebrow: "Main Universe Archive",
    title: "Their Story",
    intro:
      "The central record: the way Marcus and William move through distance, return to each other, and keep building a life out of fragments that should have been enough to break them.",
    dek:
      "A long-form archive for the main universe only: chronology, domestic notes, correspondence, and the commissions that belong to the life they actually share.",
    back: "Return to archive",
    summaryLabel: "Archive Notes",
    summaryItems: [
      "relationship record",
      "deployment letters",
      "quiet domestic moments",
    ],
    timelineTitle: "Timeline",
    timelineIntro:
      "The larger beats stay here. Not every event, only the ones that changed the shape of them.",
    memoryTitle: "Little Moments",
    memoryIntro:
      "The things that would be easy to miss in a summary are usually the things that matter most.",
    lettersTitle: "Correspondence",
    lettersIntro:
      "This section is built for the letters: the ones sent, the ones answered, and the ones that carried more than either of them said out loud.",
    commissionsTitle: "Canon Commissions",
    commissionsIntro:
      "A first pass for the main-universe gallery. Each slot is meant to carry context, not just the image itself.",
    rail: [
      { id: "story-timeline", numeral: "I", label: "Timeline" },
      { id: "story-moments", numeral: "II", label: "Moments" },
      { id: "story-letters", numeral: "III", label: "Letters" },
      { id: "story-gallery", numeral: "IV", label: "Gallery" },
    ],
    timeline: [
      {
        phase: "Record I",
        body:
          "The early shape of them belongs here: the rhythm before deployment, the private routines, and the version of home that only starts to matter once it is gone.",
      },
      {
        phase: "Record II",
        body:
          "The separation section is where the page starts breathing differently. Letters, delayed calls, waiting, and all the ways affection gets translated into ritual.",
      },
      {
        phase: "Record III",
        body:
          "Not just the reunion itself, but the adjustment after it: what comes back easily, what does not, and what they have to learn again with each other in the same room.",
      },
      {
        phase: "Record IV",
        body:
          "The later record belongs to the life they continue choosing on purpose: the softened edges, the private jokes, the habits that become proof they stayed.",
      },
    ] satisfies StoryBeat[],
    memories: [
      {
        title: "Departure ritual",
        body:
          "A small gesture before one of them leaves the room, the house, or the country. The kind of thing that becomes instinct before it becomes tradition.",
        tone: "habit",
      },
      {
        title: "The things left behind",
        body:
          "A jacket over a chair, a letter folded twice, dog tags on the nightstand, the ordinary evidence that the other person still occupies the space.",
        tone: "evidence",
      },
      {
        title: "Mundane tenderness",
        body:
          "Checking meals, fixing a collar, stealing five minutes together in the kitchen, saying something dry when the real meaning is stay a little longer.",
        tone: "domestic",
      },
      {
        title: "The joke that survives everything",
        body:
          "A dumb line or repeated bit that follows them through every rough season because some kinds of affection are best disguised as annoyance.",
        tone: "private bit",
      },
      {
        title: "After the hard days",
        body:
          "The quietest version of care belongs here: no speech, no dramatic scene, just the practiced knowledge of how to stay nearby without pressing too hard.",
        tone: "gentleness",
      },
      {
        title: "Proof of home",
        body:
          "Not the official milestones. The real ones. The cup on the counter. The familiar weight in bed. The way one presence changes the whole room.",
        tone: "home",
      },
    ] satisfies MemoryNote[],
    letters: storyLetters,
    commissions: [
      {
        title: "Winter leave",
        context: "Canon commission slot",
        note:
          "Use this card for a reunion or leave-period piece, with a short note about where it sits in the timeline.",
      },
      {
        title: "Domestic morning",
        context: "Canon commission slot",
        note:
          "Best used for the quieter art: shared routine, half-dressed conversation, coffee, soft light, or the ordinary life they fought to keep.",
      },
      {
        title: "After the return",
        context: "Canon commission slot",
        note:
          "This slot works for art that belongs to the adjustment period after separation, where closeness is present but still being relearned.",
      },
    ] satisfies CommissionRecord[],
  },
} as const;

export default function TheirStory() {
  const { language } = useLanguage();
  const [indexDrawerOpen, setIndexDrawerOpen] = useState(false);
  const [openLetterIndex, setOpenLetterIndex] = useState<number | null>(null);
  const [lifePhaseFilter, setLifePhaseFilter] = useState<number | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<FragmentCategory | "all">("all");
  const [shownFragment, setShownFragment] = useState<LoreFragment | null>(null);
  const t = translations[language] || translations.en;

  const categoryLabel = {
    domestic: "Domestic",
    milestones: "Milestones",
    "bits-pieces": "Bits & Pieces",
  } as const;

  const filteredFragments = useMemo(
    () =>
      loreFragments.filter((fragment) => {
        if (lifePhaseFilter !== "all" && fragment.phaseIndex !== lifePhaseFilter) return false;
        if (categoryFilter !== "all" && fragment.category !== categoryFilter) return false;
        return true;
      }),
    [lifePhaseFilter, categoryFilter]
  );

  const pickRandomFragment = () => {
    if (filteredFragments.length === 0) {
      setShownFragment(null);
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredFragments.length);
    setShownFragment(filteredFragments[randomIndex]);
  };

  return (
    <main className="about-story relative min-h-screen overflow-hidden bg-[#f5f0e7] text-[#14110f]">
      <div className="about-story__masthead-note">{t.masthead}</div>

      <div className="about-story__layout">
        <aside className={`about-story__index-drawer ${indexDrawerOpen ? "is-open" : ""}`}>
          <button
            type="button"
            className="about-story__index-tab"
            aria-controls="about-story-index"
            aria-expanded={indexDrawerOpen}
            aria-label={indexDrawerOpen ? "Collapse section index" : "Expand section index"}
            onClick={() => setIndexDrawerOpen((open) => !open)}
          >
            <span className={`about-story__index-arrow ${indexDrawerOpen ? "is-open" : ""}`} aria-hidden="true">
              ›
            </span>
          </button>

          <nav id="about-story-index" className="about-story__rail" aria-label="Their Story sections">
            <ol className="about-story__rail-list">
              {t.rail.map((entry) => (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    className="about-story__rail-link"
                    onClick={() => setIndexDrawerOpen(false)}
                  >
                    <span className="about-story__rail-numeral">{entry.numeral}</span>
                    <span className="about-story__rail-label">{entry.label}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <section className="about-story__paper">
          <section className="about-story__editorial about-story__editorial--timeline" id="story-timeline">
            <div className="about-story__section-heading">
              <p className="about-story__section-kicker"></p>
              <h2 className="about-story__section-title">{t.timelineTitle}</h2>
            </div>

            <div className="about-story__timeline-list">
              {t.timeline.map((entry, index) => (
                <article
                  key={`${entry.phase}-${index}`}
                  className={`about-story__timeline-row ${index % 2 === 1 ? "is-flipped" : ""}`}
                >
                  <div className="about-story__timeline-content">
                    <p className="about-story__timeline-phase">{entry.phase}</p>
                    <p className="about-story__card-body">{entry.body}</p>
                  </div>
                  <figure className="about-story__timeline-figure">
                    <img
                      src={timelineImages[index]}
                      alt={`${entry.phase} placeholder visual`}
                    />
                  </figure>
                </article>
              ))}
            </div>
          </section>

          <section className="about-story__editorial about-story__editorial--memories" id="story-moments">
            <div className="about-story__section-heading">
              <h2 className="about-story__section-title">{t.memoryTitle}</h2>
            </div>

            <div className="about-story__moments-layout">
              <div className="about-story__moments-panel">
                <div className="about-story__moments-filter-group">
                  <label className="about-story__memory-tone" htmlFor="moments-life-phase">
                    life phase
                  </label>
                  <select
                    id="moments-life-phase"
                    className="about-story__moments-select"
                    value={lifePhaseFilter === "all" ? "all" : String(lifePhaseFilter)}
                    onChange={(event) => {
                      const value = event.target.value;
                      setLifePhaseFilter(value === "all" ? "all" : Number(value));
                      setShownFragment(null);
                    }}
                  >
                    <option value="all">All</option>
                    {t.timeline.map((entry, index) => (
                      <option key={`phase-opt-${entry.phase}`} value={String(index)}>
                        {entry.phase}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="about-story__moments-filter-group">
                  <label className="about-story__memory-tone" htmlFor="moments-category">
                    category
                  </label>
                  <select
                    id="moments-category"
                    className="about-story__moments-select"
                    value={categoryFilter}
                    onChange={(event) => {
                      const value = event.target.value as FragmentCategory | "all";
                      setCategoryFilter(value);
                      setShownFragment(null);
                    }}
                  >
                    <option value="all">All</option>
                    {(Object.keys(categoryLabel) as FragmentCategory[]).map((category) => (
                      <option key={`cat-opt-${category}`} value={category}>
                        {categoryLabel[category]}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="about-story__moments-trigger"
                  onClick={pickRandomFragment}
                >
                  Show me!
                </button>

                <p className="about-story__moments-count">
                  {filteredFragments.length} match{filteredFragments.length === 1 ? "" : "es"}
                </p>
              </div>

              <div className="about-story__moments-result">
                {shownFragment ? (
                  <article
                    key={shownFragment.id}
                    className="about-story__moment-card"
                    style={{ transform: `rotate(${((stableHash(shownFragment.id) % 9) - 4) * 0.45}deg)` }}
                  >
                    <span
                      className="about-story__moment-pin"
                      style={{ transform: `translateX(${(stableHash(shownFragment.id) % 17) - 8}px)` }}
                      aria-hidden="true"
                    />
                  <figure className="about-story__moment-photo">
                    <img src={shownFragment.image} alt={`${shownFragment.title} placeholder`} />
                  </figure>
                  <div className="about-story__moment-caption">
                    <p className="about-story__memory-tone">(A): {shownFragment.artist}</p>
                    <h3 className="about-story__moment-title">{shownFragment.title}</h3>
                    <p className="about-story__card-body">{shownFragment.excerpt}</p>
                  </div>
                </article>
                ) : (
                  <p className="about-story__moments-empty">
                    {filteredFragments.length === 0
                      ? "No fragments match this filter combo yet."
                      : "Choose filters, then press Show me! to reveal a random fragment."}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="about-story__editorial about-story__editorial--letters" id="story-letters">
            <div className="about-story__section-heading">
              <p className="about-story__section-kicker">Letters</p>
              <h2 className="about-story__section-title">{t.lettersTitle}</h2>
              <p className="about-story__section-intro">{t.lettersIntro}</p>
            </div>

            <div className="about-story__letters-layout">
              {t.letters.map((entry, index) => (
                <article
                  key={entry.title}
                  className={`about-story__letter-sheet ${index === 0 ? "is-primary" : "is-secondary"} ${openLetterIndex === index ? "is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="about-story__letter-envelope"
                    aria-expanded={openLetterIndex === index}
                    aria-controls={`story-letter-panel-${index}`}
                    onClick={() => setOpenLetterIndex((current) => (current === index ? null : index))}
                  >
                    <span className="about-story__envelope-back" aria-hidden="true" />
                    <span className="about-story__letter-stamp" aria-hidden="true">{entry.stamp}</span>
                    <span className="about-story__letter-postmark" aria-hidden="true">{entry.postmark}</span>

                    <div className="about-story__envelope-front">
                      <div className="about-story__envelope-sender">
                        <p className="about-story__envelope-name">{entry.from}</p>
                        {entry.fromAddress.map((line) => (
                          <p key={`${entry.title}-${line}`} className="about-story__envelope-line">
                            {line}
                          </p>
                        ))}
                      </div>

                      <div className="about-story__envelope-recipient">
                        <p className="about-story__envelope-name is-recipient">{entry.to}</p>
                        {entry.toAddress.map((line) => (
                          <p key={`${entry.label}-${line}`} className="about-story__envelope-line is-recipient">
                            {line}
                          </p>
                        ))}
                      </div>

                      <div className="about-story__letter-header">
                        <span>{entry.label}</span>
                        <span className={`about-story__letter-toggle ${openLetterIndex === index ? "is-open" : ""}`}>
                          {openLetterIndex === index ? "Fold" : "Unseal"}
                        </span>
                      </div>
                    </div>
                  </button>

                  <div
                    id={`story-letter-panel-${index}`}
                    className={`about-story__letter-content ${openLetterIndex === index ? "is-open" : ""}`}
                  >
                    <article className="about-story__letter-paper">
                      <p className="about-story__card-body">{entry.body}</p>
                      <p className="about-story__letter-signoff">
                        Take care,
                        <br />
                        {entry.from}
                      </p>
                      <p className="about-story__letter-note">{entry.note}</p>
                    </article>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="about-story__editorial about-story__editorial--commissions" id="story-gallery">
            <div className="about-story__section-heading">
              <p className="about-story__section-kicker">Gallery</p>
              <h2 className="about-story__section-title">{t.commissionsTitle}</h2>
              <p className="about-story__section-intro">{t.commissionsIntro}</p>
            </div>

            <div className="about-story__commission-layout">
              <figure className="about-story__commission-feature">
                <img src={timelineImg1} alt="Featured canon commission placeholder" />
                <figcaption>
                  <span>featured placement</span>
                  <p>Use this position for the strongest canon piece on the page.</p>
                </figcaption>
              </figure>

              <div className="about-story__commission-notes">
                {t.commissions.map((entry) => (
                  <article key={entry.title} className="about-story__commission-entry">
                    <p className="about-story__memory-tone">{entry.context}</p>
                    <h3 className="about-story__card-title">{entry.title}</h3>
                    <p className="about-story__card-body">{entry.note}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <div className="about-story__return-footer">
            <Link to="/them" className="about-story__back-link">
              {t.back}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
