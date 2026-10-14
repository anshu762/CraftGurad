export default function ProductMetadata({ product }) {
  const rows = [
    ['Material', product.material], ['Technique', product.technique], ['Motif', product.motif],
    ['Dimensions', product.dimensions], ['Colour', product.colour],
    ['Approx. making time', product.makingTimeApprox], ['Origin', product.origin],
  ].filter(([, value]) => value);

  if (rows.length === 0) return null;

  return (
    <dl className="border-t border-line mt-8 pt-8 space-y-4">
      {rows.map(([label, value]) => (
        <div key={label} className="flex justify-between gap-4 text-sm">
          <dt className="text-mute">{label}</dt>
          <dd className="text-right font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  );
}