import type { ReactNode } from "react";

interface MainLayoutProps {
  children: ReactNode;
  /** Optional page title for header */
  title?: string;
}

/**
 * Base layout: header + scrollable content.
 * Stable class names for automation.
 */
export function MainLayout({ children, title = "Property Listing Edit" }: MainLayoutProps) {
  return (
    <div className="mls-layout min-h-screen flex flex-col bg-gray-50">
      <header className="mls-header flex-shrink-0 border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="mls-page-title text-xl font-semibold text-gray-900">
          {title}
        </h1>
      </header>
      <main className="mls-main flex-1 overflow-auto px-6 py-6">
        {children}
      </main>
    </div>
  );
}
