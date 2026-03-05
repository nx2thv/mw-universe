export type CharacterType = "william" | "marcus" | "couple";
export type StatusType = "not-started" | "in-progress";
export type NsfwType = "sfw" | "nsfw";

export type CommissionIdea = {
    id: string;        // "LC-01"
    title: string;     // "Lake Como Vows – Boat Scene"
    character?: CharacterType | null;
    status: StatusType;
    preview: string;   // short teaser (shown on card)
    docUrl: string;    // link to Google Doc / PDF with full brief
    assignedTo?: string | null;
    nsfw: NsfwType;
};

export function normalizeCharacter(
    character?: string | null,
    legacyPair?: string | null
): CharacterType | null {
    const normalizedCharacter = character?.trim().toLowerCase();

    if (
        normalizedCharacter === "william" ||
        normalizedCharacter === "marcus" ||
        normalizedCharacter === "couple"
    ) {
        return normalizedCharacter;
    }

    if (normalizedCharacter === "both") {
        return "couple";
    }

    const normalizedPair = legacyPair?.trim().toLowerCase();
    if (normalizedPair === "couple") return "couple";

    return null;
}
