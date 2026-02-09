import type { YesNoFieldConfig } from "../types";
import { useState } from "react";

interface FormYesNoButtonsProps {
  config: YesNoFieldConfig;
  value?: string;
}

export function FormYesNoButtons({ config, value }: FormYesNoButtonsProps) {
  const id = config.id ?? `field-${config.name}`;
  const [selected, setSelected] = useState<string | null>(value ?? null);

  const labels = config.options ?? ["Yes", "No"];
  const yesLabel = labels[0];
  const noLabel = labels[1];

  const showRequiredState = config.required && selected === null;

  return (
    <div
      className="mls-field mls-field-yesno"
      data-field-name={config.name}
      role="radiogroup"
      aria-required={config.required}
      aria-labelledby={`${id}-label`}
    >
      <span
        id={`${id}-label`}
        className="mls-label block text-sm font-medium text-gray-700"
      >
        {config.label}
        {config.required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </span>

      <div className="mt-2 flex gap-2">
        <button
          type="button"
          id={`${id}-yes`}
          role="radio"
          aria-checked={selected === "yes"}
          aria-label={yesLabel}
          className={`mls-yesno-btn cursor-pointer rounded border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
            selected === "yes"
              ? "border-teal-600 bg-teal-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
          }`}
          onClick={() => setSelected("yes")}
        >
          {yesLabel}
        </button>

        <button
          type="button"
          id={`${id}-no`}
          role="radio"
          aria-checked={selected === "no"}
          aria-label={noLabel}
          className={`mls-yesno-btn cursor-pointer rounded border px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 ${
            selected === "no"
              ? "border-teal-600 bg-teal-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
          }`}
          onClick={() => setSelected("no")}
        >
          {noLabel}
        </button>
      </div>

      {showRequiredState && (
        <p className="mls-field-error mt-1 text-sm text-red-600" role="alert">
          {config.label} is required.
        </p>
      )}

      {config.hint && !showRequiredState && (
        <p className="mls-hint mt-1 text-xs text-gray-500">{config.hint}</p>
      )}
    </div>
  );
}
