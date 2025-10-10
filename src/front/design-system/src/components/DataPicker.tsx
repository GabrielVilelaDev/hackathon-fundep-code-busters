import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import type { Control, FieldValues, Path } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "./ui/form";
import { Calendar } from "./ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "./ui/popover";
import { cn } from "../lib/utils";
import type { FormFieldProps } from "../types";

export interface DataPickerProps<T extends FieldValues = FieldValues>
  extends FormFieldProps {
  name: Path<T>;
  placeholder?: string;
  className?: string;
  id?: string;
  control: Control<T>;
  minDate?: Date;
  maxDate?: Date;
}

export const DataPicker = <T extends FieldValues = FieldValues>({
  name,
  placeholder = "Selecione a data",
  className,
  disabled = false,
  id,
  label,
  control,
  required = false,
  minDate,
  maxDate
}: DataPickerProps<T>) => {
  const [open, setOpen] = React.useState(false);

  const formatDate = (date: Date | undefined) => {
    if (!date) return placeholder;

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).format(date);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const handleSelect = (date: Date | undefined) => {
          field.onChange(date);
          setOpen(false);
        };

        return (
          <FormItem className={cn("flex flex-col", className)}>
            {label && (
              <FormLabel>
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
            )}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  id={id}
                  disabled={disabled}
                  className={cn(
                    "inline-flex h-9 w-full items-center justify-between gap-2 whitespace-nowrap rounded-md border bg-background px-4 py-2 text-sm font-medium shadow-xs transition-all outline-none",
                    "hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "cursor-pointer",
                    !field.value && "text-muted-foreground font-normal",
                    fieldState.error && "border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
                  )}
                  aria-expanded={open}
                  aria-haspopup="dialog"
                  aria-invalid={!!fieldState.error}
                >
                  <span className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    {formatDate(field.value)}
                  </span>
                  <ChevronDownIcon className="h-4 w-4 shrink-0" />
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={field.value}
                  captionLayout="dropdown"
                  onSelect={handleSelect}
                  disabled={(date) => {
                    if (disabled) return true;
                    if (minDate && date < minDate) return true;
                    if (maxDate && date > maxDate) return true;

                    return false;
                  }}
                  fromDate={minDate}
                  toDate={maxDate}
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

DataPicker.displayName = "DataPicker";
