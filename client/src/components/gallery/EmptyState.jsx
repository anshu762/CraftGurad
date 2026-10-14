export default function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="text-center py-24 px-5">
      <p className="eyebrow mb-4">Nothing here yet</p>
      <p className="text-lg text-mute mb-8 max-w-md mx-auto">{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="text-sm uppercase tracking-wide border-b border-charcoal pb-1 hover:text-terracotta hover:border-terracotta transition-colors">
          {actionLabel}
        </button>
      )}
    </div>
  );
}