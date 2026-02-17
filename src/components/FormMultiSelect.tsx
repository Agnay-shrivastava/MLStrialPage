import { useState } from "react";
import type { MultiSelectFieldConfig } from "../types";

interface FormMultiSelectProps {
  config: MultiSelectFieldConfig;
  value?: string[];
}

export function FormMultiSelect({ config, value }: FormMultiSelectProps) {
  const id = config.id ?? `field-${config.name}`;
  const max = config.maxSelections ?? 10;

  const [selected, setSelected] = useState<string[]>(value ?? []);
  const [open, setOpen] = useState(false);

  const toggleValue = (value: string) => {
    setSelected((prev) => {
      if (prev.includes(value)) {
        return prev.filter((v) => v !== value);
      }
      if (prev.length >= max) return prev;
      return [...prev, value];
    });
  };

  const removeValue = (value: string) => {
    setSelected((prev) => prev.filter((v) => v !== value));
  };

  return (
    <div
      className="mls-field mls-field-multiselect"
      data-field-name={config.name}
    >
      {/* Label */}
      <label
        htmlFor={id}
        className="mls-label block text-sm font-medium text-gray-700"
      >
        {config.label}
        {config.required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {/* Input container */}
      <div
        className="relative mt-1"
        onBlur={() => setOpen(false)}
        tabIndex={-1}
      >
        {/* Selected values / input */}
        <div
          id={id}
          className="mls-input flex min-h-[40px] w-full flex-wrap items-center gap-1 rounded border border-gray-300 bg-white px-2 py-1 text-gray-900 focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500"
          onClick={() => setOpen((v) => !v)}
          role="combobox"
          aria-expanded={open}
        >
          {selected.length === 0 && (
            <span className="text-sm text-gray-400">
              Select up to {max} items
            </span>
          )}

          {selected.map((value) => {
            const opt = config.options.find((o) => o.value === value);
            if (!opt) return null;

            return (
              <span
                key={value}
                className="inline-flex items-center rounded bg-gray-200 px-2 py-0.5 text-sm text-gray-800"
                data-selected-value={value}
              >
                {opt.label}
                <button
                  type="button"
                  className="ml-1 text-gray-600 hover:text-gray-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeValue(value);
                  }}
                  aria-label={`Remove ${opt.label}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>

        {/* Dropdown */}
        {open && (
          <ul
            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded border border-gray-300 bg-white shadow"
            role="listbox"
          >
            {config.options.map((opt) => {
              const isSelected = selected.includes(opt.value);

              return (
                <li
                  key={opt.value}
                  className={`cursor-pointer flex items-center px-3 py-2 text-sm hover:bg-gray-100 ${
                    isSelected ? "bg-gray-100 font-medium" : ""
                  }`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => toggleValue(opt.value)}
                  role="option"
                  aria-selected={isSelected}
                  data-option-value={opt.value}
                >
                  {/* checkbox indicator */}
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 cursor-pointer text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={isSelected}
                    readOnly
                  />
                  <span>{opt.label}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Hint */}
      <p className="mls-hint mt-1 text-xs text-gray-500">
        {config.hint ?? `Select up to ${max} items.`}
      </p>
    </div>
  );
}
