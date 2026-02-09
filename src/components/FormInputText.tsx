import type { TextFieldConfig } from "../types";

interface FormInputTextProps {
  config: TextFieldConfig;
  value?: string;
}

const fieldClass = "mls-input mls-input-text w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500";

export function FormInputText({ config, value }: FormInputTextProps) {
  const id = config.id ?? `field-${config.name}`;
  return (
    <div className="mls-field mls-field-text" data-field-name={config.name}>
      <label htmlFor={id} className="mls-label block text-sm font-medium text-gray-700">
        {config.label}
        {config.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={config.name}
        type={config.type}
        className={fieldClass}
        placeholder={config.placeholder}
        maxLength={config.maxLength}
        defaultValue={value}
        required={config.required}
        aria-required={config.required}
      />
      {config.hint && (
        <p className="mls-hint mt-1 text-xs text-gray-500">{config.hint}</p>
      )}
    </div>
  );
}
