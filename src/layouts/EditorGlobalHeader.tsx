import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LISTING_TITLE = "New Listing | 5701 Avenue G -";

export function EditorGlobalHeader() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header
      className="mls-global-header flex-shrink-0 border-b border-gray-200 bg-teal-800 px-4 py-3 text-white"
      id="editor-global-header"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="mls-listing-title text-lg font-semibold" id="header-listing-title">
          {LISTING_TITLE}
        </h1>
        <div className="mls-header-actions flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="mls-btn mls-btn-save-incomplete rounded border border-teal-600 bg-teal-700 px-3 py-1.5 text-sm font-medium hover:bg-teal-600"
            id="header-save-incomplete"
          >
            Save as Incomplete
          </button>
          <button
            type="button"
            className="mls-btn mls-btn-publish rounded bg-teal-600 px-3 py-1.5 text-sm font-medium hover:bg-teal-500"
            id="header-publish"
          >
            Publish Listing
          </button>
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="mls-btn mls-btn-cancel rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            id="header-cancel"
          >
            Cancel Input
          </button>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
        <label className="mls-toggle-label flex items-center gap-2">
          <span>Expand Data Source</span>
          <input
            type="checkbox"
            className="mls-toggle mls-toggle-expand-data"
            id="toggle-expand-data"
          />
        </label>
        <label className="mls-toggle-label flex items-center gap-2">
          <span>View Full Form</span>
          <input
            type="checkbox"
            className="mls-toggle mls-toggle-view-full-form"
            id="toggle-view-full-form"
            defaultChecked
          />
        </label>
      </div>
    </header>
  );
}
