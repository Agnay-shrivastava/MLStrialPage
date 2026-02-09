import { useRef, useState, useEffect } from "react";
import type { DateFieldConfig } from "../types";

interface FormInputDateProps {
  config: DateFieldConfig;
  value?: string;
}

const fieldClass =
  "mls-input mls-input-date w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 pr-10";

export function FormInputDate({ config, value }: FormInputDateProps) {
  const id = config.id ?? `field-${config.name}`;
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState(value ?? "");

  // Update internal state if prop value changes (e.g. from parent reset)
  useEffect(() => {
    if (value !== undefined) {
      setDisplayValue(value);
    }
  }, [value]);

  // YYYY-MM-DD -> MM/DD/YYYY
  const formatDateToAmerican = (isoDate: string) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${month}/${day}/${year}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    if (newVal) {
      setDisplayValue(formatDateToAmerican(newVal));
    }
  };

  const handleIconClick = () => {
    // Trigger the native picker
    try {
      dateInputRef.current?.showPicker();
    } catch (err) {
      // Fallback: try focus or click if showPicker isn't supported
      dateInputRef.current?.focus();
      dateInputRef.current?.click();
    }
  };

  return (
    <div className="mls-field mls-field-date" data-field-name={config.name}>
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
      <div className="relative mt-1">
        <input
          id={id}
          name={config.name}
          type="text"
          className={fieldClass}
          value={displayValue}
          onChange={(e) => setDisplayValue(e.target.value)}
          placeholder="MM/DD/YYYY"
          pattern="\d{2}/\d{2}/\d{4}"
          required={config.required}
          aria-required={config.required}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={handleIconClick}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-600 focus:outline-none"
          title="Open Calendar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </button>
        {/* Hidden date input to drive the picker */}
        <input
          ref={dateInputRef}
          type="date"
          className="sr-only"
          tabIndex={-1}
          onChange={handleDateChange}
          aria-hidden="true"
        />
      </div>
      {config.hint && (
        <p className="mls-hint mt-1 text-xs text-gray-500">{config.hint}</p>
      )}
    </div>
  );
}
