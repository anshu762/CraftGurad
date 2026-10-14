export default function FormAlert({ message, type = 'error' }) {
  if (!message) return null;
  const styles = type === 'error'
    ? 'bg-terracotta/10 text-terracotta border-terracotta/30'
    : 'bg-indigo/10 text-indigo border-indigo/30';
  return <div role="alert" className={`border rounded-sm px-4 py-3 text-sm mb-6 ${styles}`}>{message}</div>;
}