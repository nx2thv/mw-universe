type Props = {
  title: string;
  embedUrl: string;
};

export default function FloatingSoundtrackBar({ title, embedUrl }: Props) {
  const hasEmbed = /^https?:\/\//.test(embedUrl);

  if (!hasEmbed) {
    return null;
  }

  return (
    <div className="soundtrack-bar">
      <div className="soundtrack-bar__shell">
        <iframe
          className="soundtrack-bar__embed"
          src={embedUrl}
          title={`${title} playlist`}
          loading="lazy"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        />
      </div>
    </div>
  );
}
