import { useId } from 'react';

export default function TextField({ label, type = 'text', value, onChange, error, required, autoComplete, name }) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="mb-5">
      <label htmlFor={id} className="block text-sm font-medium text-charcoal mb-2">
        {label} {required && <span className="text-terracotta" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`w-full border px-4 py-3 bg-paper focus:outline-none focus:ring-2 focus:ring-terracotta rounded-xl ${
          error ? 'border-terracotta' : 'border-line'
        }`}
      />
      {error && <p id={errorId} className="text-sm text-terracotta mt-2" role="alert">{error}</p>}
    </div>
  );
}