# MLS Property Listing Edit — Trial Page

A **frontend-only** React application that simulates an MLS "Edit Property Listing" page for **browser automation testing**. No backend, auth, or data persistence.

## Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS**
- **Vite** (deploy-ready for Vercel / Netlify)

## Project Structure

```
src/
  components/     # Reusable form fields (FormField, FormInputText, FormSelect, etc.)
  sections/       # MLS-like form sections (FormSection, property-sections config)
  pages/          # Main screens (PropertyListingEditPage)
  types/          # Form field definitions (form-fields.ts)
  layouts/        # Base layout (MainLayout — header + scrollable content)
```

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`. Deploy that folder to Vercel or Netlify (or use the repo link; both detect Vite).

## Automation-Friendly Conventions

- **Semantic HTML**: `<form>`, `<label>`, `<fieldset>`, `<section>`, etc.
- **Stable class names**: `mls-layout`, `mls-header`, `mls-main`, `mls-section`, `mls-field`, `mls-input`, `mls-label`, etc.
- **Stable IDs**: Configurable via `id` in field config (e.g. `field-mls-number`, `field-list-price`).
- **Data attributes**: `data-section-id`, `data-field-name` for section/field targeting.
- No random IDs or generated class names.

## Extending the Page

- **Add/change fields**: Edit `src/sections/property-sections.ts` (add fields to existing sections or new sections).
- **Add section types**: Reuse `FormSection` with new config; field types are defined in `src/types/form-fields.ts` and implemented in `src/components/`.

This is a static trial page; additional instructions can be given later to add exact MLS fields, flows, and behaviors.
