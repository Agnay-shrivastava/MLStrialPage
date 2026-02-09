import type { CheckboxFieldConfig } from "../types";

interface FormCheckboxProps {
  config: CheckboxFieldConfig;
  value?: boolean;
}

export function FormCheckbox({ config, value }: FormCheckboxProps) {
  const id = config.id ?? `field-${config.name}`;
  return (
    <div className="mls-field mls-field-checkbox flex items-start" data-field-name={config.name}>
      <input
        id={id}
        name={config.name}
        type="checkbox"
        className="mls-input mls-input-checkbox h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
        defaultChecked={value}
        value={config.valueWhenChecked ?? "yes"}
      />
      <label htmlFor={id} className="mls-label ml-2 block text-sm font-medium text-gray-700">
        {config.label}
        {config.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>
      {config.hint && (
        <p className="mls-hint ml-6 mt-1 text-xs text-gray-500">{config.hint}</p>
      )}
    </div>
  );
}
