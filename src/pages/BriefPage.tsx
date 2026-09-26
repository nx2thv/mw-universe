import { useParams } from "react-router-dom";
import { lazy } from "react";

const MarcusBriefPage = lazy(() => import("./MarcusBriefPage"));
const WilliamBriefPage = lazy(() => import("./WilliamBriefPage"));

export default function BriefPage() {
  const { id } = useParams<{ id: string }>();
  const isMarcus = id === "marcus";

  if (isMarcus) {
    return <MarcusBriefPage />;
  }

  return <WilliamBriefPage />;
}
