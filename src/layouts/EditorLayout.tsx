import { Outlet } from "react-router-dom";
import { EditorGlobalHeader } from "./EditorGlobalHeader";
import { EditorTabs } from "./EditorTabs";

/** Static placeholder total required-unfilled for Editor tab badge */
const EDITOR_BADGE_COUNT = 28;

export function EditorLayout() {
  return (
    <div className="mls-editor-layout flex h-screen flex-col overflow-hidden">
      <EditorGlobalHeader />
      <EditorTabs editorBadgeCount={EDITOR_BADGE_COUNT} />
      <div className="mls-editor-body flex min-h-0 flex-1 flex-row overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
