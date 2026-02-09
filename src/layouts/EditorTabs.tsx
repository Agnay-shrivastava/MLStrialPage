import { NavLink } from "react-router-dom";

interface EditorTabsProps {
  /** Static placeholder count for required-unfilled (Editor tab) */
  editorBadgeCount?: number;
}

export function EditorTabs({ editorBadgeCount = 0 }: EditorTabsProps) {
  return (
    <nav
      className="mls-editor-tabs flex-shrink-0 border-b border-gray-200 bg-white"
      id="editor-tabs"
      aria-label="Editor tabs"
    >
      <div className="flex">
        <NavLink
          to="/editor"
          end
          className={({ isActive }) =>
            `mls-tab mls-tab-editor flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium ${
              isActive
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
            }`
          }
          id="tab-editor"
        >
          Editor
          {editorBadgeCount > 0 && (
            <span
              className="mls-tab-badge rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white"
              aria-label={`${editorBadgeCount} required`}
            >
              {editorBadgeCount}
            </span>
          )}
        </NavLink>
        <NavLink
          to="/photos"
          className={({ isActive }) =>
            `mls-tab mls-tab-photos flex items-center border-b-2 px-4 py-3 text-sm font-medium ${
              isActive
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900"
            }`
          }
          id="tab-photos"
        >
          Photos
        </NavLink>
      </div>
    </nav>
  );
}
