import { useEffect } from "react";
import { createPortal } from "react-dom";

export type GalleryLightboxImage = {
  src: string;
  alt: string;
  caption?: string;
};

type Props = {
  image: GalleryLightboxImage | null;
  onClose: () => void;
};

export default function GalleryLightbox({ image, onClose }: Props) {
  useEffect(() => {
    if (!image) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  if (!image) return null;

  return createPortal(
    <div
      className="gallery-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
    >
      <div
        className="gallery-lightbox__dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="gallery-lightbox__close"
          aria-label="Close image"
          onClick={onClose}
        >
          X
        </button>

        <figure className="gallery-lightbox__figure">
          <div className="gallery-lightbox__frame">
            <img
              src={image.src}
              alt={image.alt}
              className="gallery-lightbox__image"
            />
          </div>
          {image.caption ? (
            <figcaption className="gallery-lightbox__caption">
              {image.caption}
            </figcaption>
          ) : null}
        </figure>
      </div>
    </div>,
    document.body
  );
}
