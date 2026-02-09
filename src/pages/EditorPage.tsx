import { useRef } from "react";
import { EditorSidebar } from "../layouts";
import { useScrollSpy } from "../hooks/useScrollSpy";
import type { EditorSidebarConfig } from "../sections";
import {
  propertyFormSections,
  editorSidebarSections,
  FormSection,
} from "../sections";

export function EditorPage() {
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const sectionIds = (editorSidebarSections as EditorSidebarConfig[]).map(
    (s) => s.id,
  );
  const activeSectionId = useScrollSpy(sectionIds, mainScrollRef);

  const handleSectionClick = (id: string) => {
    const section = document.getElementById(id);
    const container = mainScrollRef.current;
    if (section && container) {
      // Calculate position relative to container to avoid scrolling the whole page
      const sectionTop = section.getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;
      // Scroll container to place section at top (with slight padding)
      const relativeOffset = sectionTop - containerTop;

      container.scrollTo({
        top: container.scrollTop + relativeOffset - 24, // 24px padding/margin
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <EditorSidebar
        sections={editorSidebarSections}
        activeSectionId={activeSectionId}
        onSectionClick={handleSectionClick}
      />
      <div
        ref={mainScrollRef}
        className="mls-editor-main min-h-0 flex-1 overflow-y-auto bg-gray-50"
        id="editor-main-content"
      >
        <div className="mls-page-content max-w-3xl px-6 py-6">
          <h2 className="mls-content-form-title mb-4 text-sm font-semibold text-gray-700">
            Residential Input Form
          </h2>
          {propertyFormSections.map((section) => (
            <FormSection key={section.id} section={section} />
          ))}
        </div>
      </div>
    </>
  );
}
