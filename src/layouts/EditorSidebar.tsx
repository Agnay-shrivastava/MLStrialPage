export interface SidebarSectionItem {
  id: string;
  label: string;
  /** Static placeholder count for required-unfilled */
  requiredCount: number;
}

interface EditorSidebarProps {
  sections: SidebarSectionItem[];
  activeSectionId: string | null;
  onSectionClick: (id: string) => void;
}

export function EditorSidebar({
  sections,
  activeSectionId,
  onSectionClick,
}: EditorSidebarProps) {
  return (
    <aside
      className="mls-editor-sidebar flex h-full w-56 flex-shrink-0 flex-col overflow-hidden border-r border-gray-200"
      id="editor-sidebar"
      aria-label="Form sections"
    >
      <div className="flex-shrink-0 border-b border-gray-200 px-4 py-3">
        <h2 className="mls-sidebar-title text-sm font-semibold text-gray-900">
          Residential Input Form
        </h2>
        <label className="mt-2 flex items-center gap-2 text-xs text-gray-600">
          <input
            type="checkbox"
            className="mls-sidebar-required-toggle"
            id="sidebar-required-only"
          />
          Required
        </label>
      </div>
      <nav
        className="mls-sidebar-nav min-h-0 flex-1 overflow-hidden py-2"
        aria-label="Sections"
      >
        <ul className="space-y-0.5 px-2">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  onSectionClick(section.id);
                }}
                className={`mls-sidebar-item flex items-center justify-between rounded px-3 py-2 text-sm ${
                  activeSectionId === section.id
                    ? "bg-teal-100 text-teal-800 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                data-section-id={section.id}
                id={`sidebar-link-${section.id}`}
              >
                <span>{section.label}</span>
                {section.requiredCount > 0 && (
                  <span
                    className="mls-sidebar-badge ml-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-medium text-white"
                    aria-label={`${section.requiredCount} required`}
                  >
                    {section.requiredCount}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
