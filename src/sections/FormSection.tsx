import type { FormSectionConfig } from "../types";
import { FormField } from "../components";
import { FormSubsection } from "./FormSubsection";

interface FormSectionProps {
  section: FormSectionConfig;
}

/**
 * Renders one MLS form section: title, optional description, then either
 * subsections (each with title + fields) or top-level fields.
 * Stable structure: data-section-id, class mls-section.
 */
export function FormSection({ section }: FormSectionProps) {
  const hasSubsections = section.subsections && section.subsections.length > 0;

  return (
    <section
      id={section.id}
      className="mls-section mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      data-section-id={section.id}
    >
      <h2 className="mls-section-title mb-1 text-lg font-semibold text-gray-900">
        {section.title}
      </h2>
      {section.description && (
        <p className="mls-section-description mb-4 text-sm text-gray-500">
          {section.description}
        </p>
      )}
      {hasSubsections ? (
        <div className="mls-section-subsections space-y-6">
          {section.subsections!.map((sub) => (
            <FormSubsection key={sub.id} subsection={sub} />
          ))}
        </div>
      ) : (
        <div className="mls-section-fields space-y-4">
          {section.fields.map((fieldConfig) => (
            <FormField key={fieldConfig.name} config={fieldConfig} />
          ))}
        </div>
      )}
    </section>
  );
}
