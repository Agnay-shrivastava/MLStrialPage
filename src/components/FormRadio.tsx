import type { RadioFieldConfig } from "../types";

interface FormRadioProps {
  config: RadioFieldConfig;
  value?: string;
}

export function FormRadio({ config, value }: FormRadioProps) {
  const groupId = config.id ?? `field-${config.name}`;
  return (
    <fieldset className="mls-field mls-field-radio" data-field-name={config.name} aria-required={config.required}>
      <legend className="mls-label block text-sm font-medium text-gray-700">
        {config.label}
        {config.required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </legend>
      <div className="mt-2 space-y-2">
        {config.options.map((opt) => {
          const optId = `${groupId}-${opt.value}`;
          return (
            <div key={opt.value} className="flex items-center">
              <input
                id={optId}
                name={config.name}
                type="radio"
                value={opt.value}
                className="mls-input mls-input-radio h-4 w-4 border-gray-300 text-gray-600 focus:ring-gray-500"
                defaultChecked={value === opt.value || (!value && config.options[0]?.value === opt.value)}
                required={config.required}
              />
              <label htmlFor={optId} className="mls-label ml-2 text-sm text-gray-700">
                {opt.label}
              </label>
            </div>
          );
        })}
      </div>
      {config.hint && (
        <p className="mls-hint mt-1 text-xs text-gray-500">{config.hint}</p>
      )}
    </fieldset>
  );
}
