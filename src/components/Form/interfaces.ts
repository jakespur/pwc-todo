export enum FormFields {
  action = 'action',
  priority = 'priority',
}

export type FormState = {
  [FormFields.action]?: string;
  [FormFields.priority]?: string;
};

export type FieldLevelErrors = {
  action?: string;
  priority?: string;
  [name: string]: string | undefined;
};

export type FormErrors = FieldLevelErrors | null;
