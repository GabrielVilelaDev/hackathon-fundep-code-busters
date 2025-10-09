import React from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FormFieldProps } from "@/types";

export interface InputFormProps<T extends FieldValues = FieldValues>
  extends Omit<React.ComponentProps<"input">, "name">,
    FormFieldProps {
  name: Path<T>;
  control: Control<T>;
  type?: "text" | "number";
}

export interface InputCommonProps extends Omit<InputFormProps, "control"> {
  control?: never;
}

function InputForm<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  className,
  type = "text",
  required = false,
  disabled = false,
  placeholder,
  control,
  ...props
}: InputFormProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              type={type}
              className={cn(
                className,
                fieldState.error && "border-destructive focus:ring-destructive"
              )}
              placeholder={placeholder ?? ""}
              disabled={disabled}
              aria-invalid={!!fieldState.error}
              aria-describedby={
                description || fieldState.error
                  ? `${name}-description`
                  : undefined
              }
              {...field}
              onChange={(e) => {
                if (type === "number") {
                  const value =
                    e.target.value === "" ? "" : parseFloat(e.target.value);
                  field.onChange(isNaN(value as number) ? "" : value);
                } else {
                  field.onChange(e.target.value);
                }
              }}
              {...props}
            />
          </FormControl>
          {description && (
            <FormDescription id={`${name}-description`}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function InputCommon({
  name,
  label,
  description,
  className,
  type = "text",
  required = false,
  disabled = false,
  placeholder,
  ...props
}: InputCommonProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Input
        id={name}
        name={name}
        type={type}
        className={cn(className)}
        placeholder={placeholder ?? ""}
        disabled={disabled}
        aria-describedby={description ? `${name}-description` : undefined}
        {...props}
      />
      {description && (
        <div
          id={`${name}-description`}
          className="text-sm text-muted-foreground"
        >
          {description}
        </div>
      )}
    </div>
  );
}

export { InputForm, InputCommon };
