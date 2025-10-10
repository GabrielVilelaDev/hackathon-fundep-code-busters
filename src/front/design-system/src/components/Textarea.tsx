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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FormFieldProps } from "@/types";

export interface TextareaFormProps<T extends FieldValues = FieldValues>
  extends Omit<React.ComponentProps<"textarea">, "name">,
  FormFieldProps {
  name: Path<T>;
  control: Control<T>;
}

export interface TextareaCommonProps extends Omit<TextareaFormProps, "control"> {
  control?: never;
}

function TextareaForm<T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  className,
  required = false,
  disabled = false,
  placeholder,
  control,
  ...props
}: TextareaFormProps<T>) {
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
            <Textarea
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

function TextareaCommon({
  name,
  label,
  description,
  className,
  required = false,
  disabled = false,
  placeholder,
  ...props
}: TextareaCommonProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}
      <Textarea
        id={name}
        name={name}
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

export { TextareaForm, TextareaCommon };
