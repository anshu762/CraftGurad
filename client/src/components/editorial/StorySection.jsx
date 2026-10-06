import EditorialSection from './EditorialSection.jsx';

/** Adds the numbered "01 — ORIGIN" editorial labeling style from the spec. */
export default function StorySection({ number, label, heading, body, image, variant = 'image-right', caption }) {
  return (
    <EditorialSection
      eyebrow={`${number} — ${label}`}
      heading={heading}
      body={body}
      image={image}
      variant={variant}
      caption={caption}
    />
  );
}