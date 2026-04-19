type PageCreditProps = {
  className?: string;
  tone?: "on-dark" | "on-light";
};

const CREDIT_TEXT = "Marcus Hayes & William Cartier © Vivian Nguyeenx.";

export default function PageCredit({
  className,
  tone = "on-dark",
}: PageCreditProps) {
  const toneClass = tone === "on-light" ? "page-credit--on-light" : "page-credit--on-dark";
  const classes = ["page-credit", toneClass, className].filter(Boolean).join(" ");

  return <p className={classes}>{CREDIT_TEXT}</p>;
}
