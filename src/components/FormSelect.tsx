import type { SelectFieldConfig } from "../types";

interface FormSelectProps {
  config: SelectFieldConfig;
  value?: string;
}

const fieldClass =
  "mls-input mls-input-select w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 bg-white";

export function FormSelect({ config, value }: FormSelectProps) {
  const id = config.id ?? `field-${config.name}`;
  return (
    <div className="mls-field mls-field-select" data-field-name={config.name}>
      <label htmlFor={id} className="mls-label block text-sm font-medium text-gray-700">
        {config.label}
        {config.required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <select
        id={id}
        name={config.name}
        className={fieldClass}
        defaultValue={
          value ?? (config.allowEmpty ? "" : config.options[0]?.value)
        }
        required={config.required}
        aria-required={config.required}
      >
        {config.allowEmpty && <option value="">— Select —</option>}
        {config.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {config.hint && (
        <p className="mls-hint mt-1 text-xs text-gray-500">{config.hint}</p>
      )}
    </div>
  );
}
