type GoogleMapEmbedProps = {
  title?: string;
  className?: string;
};

export function GoogleMapEmbed({
  title = "Orange City Batteries location on Google Maps",
  className = "w-full",
}: GoogleMapEmbedProps) {
  return (
    <iframe
      src="https://maps.google.com/maps?q=21.151254,79.147626&z=16&hl=en&output=embed"
      width="100%"
      height="350"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title={title}
      className={className}
    />
  );
}
