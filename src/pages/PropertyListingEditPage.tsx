import { MainLayout } from "../layouts";
import { FormSection, propertyFormSections } from "../sections";

/**
 * Single main page: Property Listing Edit.
 * Scrollable content with multiple form sections; no submit logic.
 */
export function PropertyListingEditPage() {
  return (
    <MainLayout title="Property Listing Edit">
      <div className="mls-page-content max-w-3xl">
        {propertyFormSections.map((section) => (
          <FormSection key={section.id} section={section} />
        ))}
      </div>
    </MainLayout>
  );
}
