import type { FormSubsectionConfig } from "../types";
import { FormField } from "../components";

interface FormSubsectionProps {
  subsection: FormSubsectionConfig;
}

/**
 * Renders one subsection (title, optional description, fields).
 * Stable structure: data-subsection-id, class mls-subsection.
 */
export function FormSubsection({ subsection }: FormSubsectionProps) {
  return (
    <div
      id={subsection.id}
      className="mls-subsection mb-6"
      data-subsection-id={subsection.id}
    >
      <h3 className="mls-subsection-title mb-1 text-base font-semibold text-gray-900">
        {subsection.title}
      </h3>
      {subsection.description && (
        <p className="mls-subsection-description mb-4 text-sm text-gray-500">
          {subsection.description}
        </p>
      )}
      <div className="mls-subsection-fields space-y-4">
        {subsection.fields.map((fieldConfig) => (
          <FormField key={fieldConfig.name} config={fieldConfig} />
        ))}
      </div>
    </div>
  );
}
