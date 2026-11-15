import { useId, type RefObject } from "react";
import { useLanguage } from "../LanguageContext";

const copy = {
  en: {
    focusMode: "Focus Mode",
    sharedByVivian: "the brief Vivian shared with you.",
    exitFocusMode: "exit Focus Mode",
    stay: "Stay on this brief",
    ideas: {
      title: "Show all ideas?",
      viewing: "You're viewing",
      beforeExit: "Showing all ideas will",
      afterExit: ".",
      extra: "Other briefs are not part of this commission.",
      confirm: "Show all ideas",
    },
    archive: {
      title: "Explore MW Universe?",
      viewing: "You're currently viewing",
      beforeExit: "Exploring the full archive will",
      afterExit: " and make the rest of MW Universe available.",
      extra: "",
      confirm: "Explore archive",
    },
  },
  vi: {
    focusMode: "Chế độ tập trung",
    sharedByVivian: "brief Vivian đã chia sẻ với bạn.",
    exitFocusMode: "thoát chế độ tập trung",
    stay: "Ở lại brief này",
    ideas: {
      title: "Xem tất cả ý tưởng?",
      viewing: "Bạn đang xem",
      beforeExit: "Chọn xem tất cả ý tưởng sẽ",
      afterExit: ".",
      extra: "Các brief khác không thuộc commission này.",
      confirm: "Xem tất cả ý tưởng",
    },
    archive: {
      title: "Khám phá MW Universe?",
      viewing: "Bạn hiện đang xem",
      beforeExit: "Khám phá toàn bộ kho lưu trữ sẽ",
      afterExit: " và mở các phần còn lại của MW Universe.",
      extra: "",
      confirm: "Khám phá kho lưu trữ",
    },
  },
};

type Props = {
  dialogRef: RefObject<HTMLDialogElement | null>;
  ideaId: string;
  ideaTitle?: string | null;
  destination?: "ideas" | "archive";
  onConfirm: () => void;
};

export default function FocusExitNotice({ dialogRef, ideaId, ideaTitle, destination = "ideas", onConfirm }: Props) {
  const { language } = useLanguage();
  const t = copy[language];
  const notice = t[destination];
  const id = useId();

  return (
    <dialog
      ref={dialogRef}
      className="home-journey-focus-dialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-brief ${id}-description`}
    >
      <p className="home-journey-focus-dialog-meta">{t.focusMode} · {ideaId}</p>
      <h2 id={`${id}-title`}>{notice.title}</h2>
      <p id={`${id}-brief`}>
        {notice.viewing}{" "}
        <strong>{ideaTitle ? `${ideaId} · ${ideaTitle}` : ideaId}</strong>,
        <br />
        {t.sharedByVivian}
      </p>
      <p id={`${id}-description`}>
        {notice.beforeExit} <strong>{t.exitFocusMode}</strong>{notice.afterExit}
        {notice.extra && <><br />{notice.extra}</>}
      </p>
      <div className="home-journey-focus-dialog-actions">
        <button type="button" onClick={() => dialogRef.current?.close()}>{t.stay}</button>
        <button
          type="button"
          className="home-journey-focus-dialog-confirm"
          onClick={() => {
            dialogRef.current?.close();
            onConfirm();
          }}
        >
          {notice.confirm} <span aria-hidden="true">→</span>
        </button>
      </div>
    </dialog>
  );
}
