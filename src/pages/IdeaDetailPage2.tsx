import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { openBriefDocument } from "../lib/briefLinks";
import { supabase } from "../lib/supabaseClients";
import { normalizeCharacter, type CommissionIdea } from "../data/commissionIdeas";

type DbIdeaRow = {
    id: string;
    title: string;
    character?: string | null;
    status: string;
    preview: string;
    brief_path: string;
    nsfw: string | null;
    assigned_to?: string | null;   
};

export default function IdeaDetailPage() {
    const { id } = useParams<{ id: string }>();

    const [idea, setIdea] = useState<CommissionIdea | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        async function fetchIdea() {
            const { data, error } = await supabase
                .from("commission_ideas")
                .select("id, title, character, status, preview, brief_path, nsfw")
                .eq("id", id)
                .maybeSingle<DbIdeaRow>();

            if (error) {
                console.error("Supabase detail error:", error.message);
            } else if (data) {
                const mapped: CommissionIdea = {
                    id: data.id,
                    title: data.title,
                    character: normalizeCharacter(data.character),
                    status: data.status as CommissionIdea["status"],
                    nsfw: data.nsfw as CommissionIdea["nsfw"],
                    preview: data.preview,
                    briefPath: data.brief_path,
                };
                setIdea(mapped);
            }

            setLoading(false);
        }

        fetchIdea();
    }, [id]);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#111827] text-slate-100 flex items-center justify-center">
                <p className="text-sm opacity-80">Loading brief…</p>
            </main>
        );
    }

    if (!idea) {
        return (
            <main className="min-h-screen bg-[#111827] text-slate-100 flex flex-col items-center justify-center">
                <p className="mb-4 text-sm opacity-80">
                    Couldn&apos;t find this brief.
                </p>
                <Link
                    to="/ideas"
                    className="text-xs uppercase tracking-[0.16em] underline underline-offset-4"
                >
                    ← Back to ideas
                </Link>
            </main>
        );
    }

    const handleOpenBrief = async () => {
        try {
            await openBriefDocument(idea.briefPath, {
                ideaId: idea.id,
                ideaTitle: idea.title,
                character: idea.character ?? null,
            });
        } catch (error) {
            console.error("Could not open brief:", error);
            window.alert("Could not open this brief right now.");
        }
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-[#111827] via-[#111827] to-[#e5e7eb] text-slate-100 px-4 py-10 md:px-10 lg:px-16">
            {/* HEADER */}
            <header className="max-w-5xl mx-auto mb-6">
                <Link
                    to="/ideas"
                    className="text-[11px] uppercase tracking-[0.18em] text-slate-300 hover:text-white underline underline-offset-4"
                >
                </Link>

                <h1 className="mt-4 text-2xl md:text-3xl font-semibold tracking-wide">
                    {idea.title}
                </h1>
            </header>

            {/* LINK TO PDF IN NEW TAB */}
            <section className="max-w-5xl mx-auto mt-6">
                <button
                    type="button"
                    onClick={handleOpenBrief}
                    className="idea-link bg-transparent border-0 p-0 cursor-pointer font-inherit text-xs uppercase tracking-[0.18em] text-slate-300 underline underline-offset-4 transition-colors hover:text-white focus:outline-none"
                >
                    OPEN FULL BRIEF (PDF) →
                </button>
            </section>
        </main>
    );
}
