# Project Context: MLS Property Listing Edit — Layout & Structure

This document describes how the app is wired: entry point, component tree, data flow, and where each file fits.

---

## 1. Entry point and render chain

```
index.html
    └── <div id="root"></div>
    └── <script src="/src/main.tsx">

main.tsx
    └── createRoot(document.getElementById('root')).render(
            <StrictMode>
              <App />
            </StrictMode>
        )
    └── imports: "./index.css", "./App.tsx"

App.tsx
    └── <PropertyListingEditPage />
    └── imports: "./pages" (PropertyListingEditPage)
```

So: **HTML → main.tsx → App → PropertyListingEditPage**. There is only one route/screen; the whole app is this one page.

---

## 2. Visual layout (what you see on screen)

Top to bottom:

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER (MainLayout)                                         │
│  "Property Listing Edit"                                     │
│  class: mls-header, mls-page-title                           │
└─────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────┐
│  MAIN (scrollable)                                           │
│  class: mls-main                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  mls-page-content (max-w-3xl container)               │   │
│  │                                                        │   │
│  │  SECTION 1: Basic Information (FormSection)            │   │
│  │    - Listing Type (select)                             │   │
│  │    - MLS Number (text)                                  │   │
│  │    - Listing Title (text)                               │   │
│  │    - Description (textarea)                             │   │
│  │                                                        │   │
│  │  SECTION 2: Property Details (FormSection)            │   │
│  │    - Property Type (select)                             │   │
│  │    - Bedrooms, Bathrooms (number)                       │   │
│  │    - Square Feet, Lot (Acres), Year Built (number)      │   │
│  │    - Has Garage (checkbox)                              │   │
│  │                                                        │   │
│  │  SECTION 3: Location (FormSection)                     │   │
│  │    - Street Address, Unit, City (text)                  │   │
│  │    - State (select), ZIP Code (text)                    │   │
│  │                                                        │   │
│  │  SECTION 4: Listing Details (FormSection)              │   │
│  │    - List Price (number)                                │   │
│  │    - Status (select)                                    │   │
│  │    - List Date, Expiration Date (date)                  │   │
│  │    - Display Agent Contact (radio)                      │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

The outer wrapper is **MainLayout** (full height, flex column). Inside it, the only content is the **PropertyListingEditPage** content: a div that contains four **FormSection** blocks in order.

---

## 3. Component tree (parent → child)

```
App
└── PropertyListingEditPage (pages/PropertyListingEditPage.tsx)
    └── MainLayout (layouts/MainLayout.tsx)
        │   props: title="Property Listing Edit"
        │   renders: mls-layout > mls-header + mls-main
        │
        └── children of MainLayout:
            └── <div className="mls-page-content max-w-3xl">
                    {propertyFormSections.map(section =>
                        <FormSection key={section.id} section={section} />
                    )}
                </div>

FormSection (sections/FormSection.tsx) — used 4 times, once per section
    props: section = one item from propertyFormSections
    renders: <section id={section.id} class="mls-section" data-section-id={...}>
                <h2 class="mls-section-title">...</h2>
                optional <p class="mls-section-description">...</p>
                <div class="mls-section-fields">
                    {section.fields.map(field =>
                        <FormField key={field.name} config={field} />
                    )}
                </div>
             </section>

FormField (components/FormField.tsx) — one per field in each section
    props: config = one field config from section.fields
    behavior: switch(config.type) → renders one of:
        FormInputText   (text, email, tel, url)
        FormInputNumber (number)
        FormInputDate   (date)
        FormTextArea    (textarea)
        FormSelect      (select)
        FormCheckbox    (checkbox)
        FormRadio       (radio)
```

So: **App → PropertyListingEditPage → MainLayout → (page content div) → FormSection × 4 → FormField × N** (N = number of fields in that section). FormField is the only place that decides which concrete input component to render.

---

## 4. Where each part lives

| What you see / use          | Component / file                 | Role |
|----------------------------|----------------------------------|------|
| Full page                  | PropertyListingEditPage          | Composes layout + sections; only “page” in the app. |
| Header + scrollable area   | MainLayout                       | Wraps all page content; provides mls-header and mls-main. |
| Section box (e.g. “Basic Information”) | FormSection                | Renders one section: title, description, and list of fields. |
| Single input (text, select, etc.) | FormField → FormInputText / FormSelect / … | Renders one form control from config. |
| Section list and field configs | propertyFormSections (sections/property-sections.ts) | Data only: array of FormSectionConfig; defines section order and every field. |
| Field/section types        | types/form-fields.ts             | TypeScript types for FormFieldConfig, FormSectionConfig, etc. |

---

## 5. Data flow (no backend)

- **Section and field definitions** live in **sections/property-sections.ts** as `propertyFormSections` (array of `FormSectionConfig`).
- **PropertyListingEditPage** imports that array and maps over it to render one **FormSection** per item.
- **FormSection** receives one `FormSectionConfig` (id, title, description, fields) and maps over `section.fields` to render **FormField** for each field.
- **FormField** receives one `FormFieldConfig` and, based on `config.type`, renders the right presentational component (FormInputText, FormSelect, etc.). Each of those uses `config` for name, label, id, placeholder, options, etc.

There is no form state in React, no submit handler, and no API. Inputs are uncontrolled (defaultValue); the DOM structure and stable ids/classes are for automation.

---

## 6. File map (by folder)

```
src/
  main.tsx                    → Renders <App /> into #root; loads index.css
  App.tsx                     → Renders <PropertyListingEditPage />
  index.css                   → Tailwind directives + base body styles

  pages/
    PropertyListingEditPage.tsx  → Main (and only) page; uses MainLayout + FormSection list
    index.ts                     → Re-exports PropertyListingEditPage

  layouts/
    MainLayout.tsx            → Shell: mls-layout, mls-header (title), mls-main (children)
    index.ts                  → Re-exports MainLayout

  sections/
    FormSection.tsx           → One section: title, description, list of FormField
    property-sections.ts      → propertyFormSections[] (section order + all field configs)
    index.ts                  → Re-exports FormSection, propertyFormSections

  components/
    FormField.tsx             → Dispatcher: chooses FormInput* / FormSelect / FormCheckbox / FormRadio by config.type
    FormInputText.tsx         → text, email, tel, url
    FormInputNumber.tsx       → number
    FormInputDate.tsx         → date
    FormTextArea.tsx          → textarea
    FormSelect.tsx            → select + options
    FormCheckbox.tsx          → single checkbox
    FormRadio.tsx             → radio group
    index.ts                  → Re-exports all of the above

  types/
    form-fields.ts            → FormFieldConfig, FormSectionConfig, *FieldConfig, *Option
    index.ts                  → Re-exports types
```

---

## 7. Section IDs and field IDs (for automation)

Sections (in DOM order):

1. `section-basic-info`       — Basic Information  
2. `section-property-details` — Property Details  
3. `section-location`         — Location  
4. `section-listing-details`  — Listing Details  

Each section has `id` and `data-section-id` set to the same value. Fields use stable `id`s from config, e.g. `field-mls-number`, `field-list-price`, `field-listing-type`. All form controls share consistent classes: `mls-field`, `mls-input`, `mls-label`, `mls-hint` (when present).

---

## 8. Summary

- **One page:** Property Listing Edit, built by **PropertyListingEditPage**.
- **Layout:** **MainLayout** provides the header and scrollable main area; its children are the page content.
- **Content:** A list of **FormSection** components, each driven by **propertyFormSections**.
- **Sections:** **FormSection** renders a section wrapper and a list of **FormField** components.
- **Fields:** **FormField** turns each **FormFieldConfig** into one of the seven input components (text, number, date, textarea, select, checkbox, radio).
- **Data:** Section order and every field come from **sections/property-sections.ts**; types from **types/form-fields.ts**. No backend or form state—structure and stable IDs are for browser automation.

To add or change sections/fields, edit **property-sections.ts** and, if needed, extend **types/form-fields.ts** and the components in **components/**.
