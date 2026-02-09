/**
 * Form field type definitions for MLS property listing edit.
 * Automation-friendly: stable structure for selectors.
 */

export type InputType =
  | "text"
  | "number"
  | "email"
  | "tel"
  | "url"
  | "date"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio";

export interface BaseFieldConfig {
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  /** Stable id for automation; prefer kebab-case */
  id?: string;
  /** Optional hint text */
  hint?: string;
}

export interface TextFieldConfig extends BaseFieldConfig {
  type: "text" | "email" | "tel" | "url";
  maxLength?: number;
}

export interface NumberFieldConfig extends BaseFieldConfig {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
}

export interface DateFieldConfig extends BaseFieldConfig {
  type: "date";
}

export interface TextAreaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  rows?: number;
  maxLength?: number;
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: SelectOption[];
  /** Allow empty selection */
  allowEmpty?: boolean;
}

export interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox";
  /** Optional value when checked (default true) */
  valueWhenChecked?: string;
}

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioFieldConfig extends BaseFieldConfig {
  type: "radio";
  options: RadioOption[];
}

/** Yes/No rendered as two toggle buttons (not dropdown) */
export interface YesNoFieldConfig extends BaseFieldConfig {
  type: "yesno";
  /** Option labels; default ["Yes", "No"] */
  options?: [string, string];
}

/** Multi-select dropdown placeholder; max 10 items */
export interface MultiSelectFieldConfig extends BaseFieldConfig {
  type: "multiselect";
  options: SelectOption[];
  maxSelections?: number;
}

/** Display-only map placeholder (no input) */
export interface MapPlaceholderFieldConfig extends BaseFieldConfig {
  type: "map_placeholder";
}

export type FormFieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | DateFieldConfig
  | TextAreaFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | RadioFieldConfig
  | YesNoFieldConfig
  | MultiSelectFieldConfig
  | MapPlaceholderFieldConfig;

/** Subsection within a section: title, optional description, fields */
export interface FormSubsectionConfig {
  /** Stable subsection id for automation */
  id: string;
  title: string;
  description?: string;
  fields: FormFieldConfig[];
}

export interface FormSectionConfig {
  /** Stable section id for automation */
  id: string;
  title: string;
  description?: string;
  /** When set, section has subsections; otherwise use fields */
  subsections?: FormSubsectionConfig[];
  /** Top-level fields (used when subsections is not set) */
  fields: FormFieldConfig[];
}
