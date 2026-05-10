import { useParams } from "react-router-dom";
import MarcusBriefPage from "./MarcusBriefPage";
import WilliamBriefPage from "./WilliamBriefPage";

export default function BriefPage() {
  const { id } = useParams<{ id: string }>();
  const isMarcus = id === "marcus";

  if (isMarcus) {
    return <MarcusBriefPage />;
  }

  return <WilliamBriefPage />;
}
