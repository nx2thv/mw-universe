import { useParams } from "react-router-dom";
import MarcusBriefPage from "./MarcusBriefPage";
import WilliamBriefPage from "./WilliamBriefPage";

const LABELS: Record<string, string> = {
  marcus: "Marcus Hayes",
  william: "William Cartier",
};

export default function BriefPage() {
  const { id } = useParams<{ id: string }>();
  const label = (id && LABELS[id]) || "Character";
  const isMarcus = id === "marcus";

  if (isMarcus) {
    return <MarcusBriefPage />;
  }

  return <WilliamBriefPage label={label} />;
}
