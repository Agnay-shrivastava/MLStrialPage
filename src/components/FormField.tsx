import type { FormFieldConfig } from "../types";
import { FormInputText } from "./FormInputText";
import { FormInputNumber } from "./FormInputNumber";
import { FormInputDate } from "./FormInputDate";
import { FormTextArea } from "./FormTextArea";
import { FormSelect } from "./FormSelect";
import { FormCheckbox } from "./FormCheckbox";
import { FormRadio } from "./FormRadio";
import { FormYesNoButtons } from "./FormYesNoButtons";
import { FormMultiSelect } from "./FormMultiSelect";
import { MapPlaceholder } from "./MapPlaceholder";

interface FormFieldProps {
  config: FormFieldConfig;
  /** Optional value override for controlled usage; not required for static page */
  value?: string | number | boolean;
}

/**
 * Renders a single form field based on config.
 * Stable structure and class names for automation.
 */
export function FormField({ config, value }: FormFieldProps) {
  switch (config.type) {
    case "text":
    case "email":
    case "tel":
    case "url":
      return <FormInputText config={config} value={value as string | undefined} />;
    case "number":
      return <FormInputNumber config={config} value={value as number | undefined} />;
    case "date":
      return <FormInputDate config={config} value={value as string | undefined} />;
    case "textarea":
      return <FormTextArea config={config} value={value as string | undefined} />;
    case "select":
      return <FormSelect config={config} value={value as string | undefined} />;
    case "checkbox":
      return <FormCheckbox config={config} value={value as boolean | undefined} />;
    case "radio":
      return <FormRadio config={config} value={value as string | undefined} />;
    case "yesno":
      return <FormYesNoButtons config={config} value={value as string | undefined} />;
    case "multiselect":
      return <FormMultiSelect config={config} value={value as string[] | undefined} />;
    case "map_placeholder":
      return <MapPlaceholder />;
    default:
      return null;
  }
}
