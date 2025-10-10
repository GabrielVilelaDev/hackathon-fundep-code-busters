export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FormFieldProps {
  name: string;
  label?: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface ActionProps {
  label: string;
  onClick: VoidFunction;
  icon?: React.ReactNode;
  colorTitle?: "primary" | "red" | "green" | "yellow";
  disabled?: boolean;
  hidden?: boolean;
}

export interface MenuProps {
  title?: string;
  actions: ActionProps[];
}

export interface TableHeader {
  key: string;
  label: string;
}

export type ColorVariant = "primary" | "red" | "green" | "yellow" | "default";

export type SizeVariant = "sm" | "default" | "lg";

export type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
