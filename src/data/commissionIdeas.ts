export type PairType = "solo" | "couple";
export type StatusType = "not-started" | "in-progress";
export type NsfwType = "sfw" | "nsfw";

export type CommissionIdea = {
    id: string;        // "LC-01"
    title: string;     // "Lake Como Vows – Boat Scene"
    pair: PairType;    // "solo" | "couple"
    status: StatusType;
    preview: string;   // short teaser (shown on card)
    docUrl: string;    // link to Google Doc / PDF with full brief
    assignedTo?: string | null;
    nsfw: NsfwType;
};
