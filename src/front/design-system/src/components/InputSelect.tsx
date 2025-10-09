"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import type { Control, FieldValue, FieldValues } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface Option {
  label: string;
  value: string;
}

export interface InputSelectFormProps {
  control: Control<FieldValue<FieldValues>>;
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  emptyMessage?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  allowClear?: boolean;
  clearText?: string;
  required?: boolean;
}

export function InputSelectForm({
  control,
  name,
  label,
  placeholder = "Seleciona uma opção",
  options,
  emptyMessage = "Opção não encontrada",
  searchPlaceholder = "Pesquisar",
  disabled = false,
  className,
  required,
  allowClear = required ? false : true,
  clearText = "Limpar seleção"
}: InputSelectFormProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col", className)}>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </FormLabel>
          )}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn(
                    "w-full justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value
                    ? (options.find((option) => option.value === field.value)
                        ?.label ?? "")
                    : placeholder}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={searchPlaceholder} />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {field.value && allowClear && (
                      <CommandItem
                        onSelect={() => {
                          field.onChange("");
                          setOpen(false);
                        }}
                        className="text-muted-foreground"
                      >
                        <X className="mr-2 h-4 w-4" />
                        {clearText}
                      </CommandItem>
                    )}
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={String(option.value)}
                        onSelect={(currentValue) => {
                          field.onChange(
                            currentValue === field.value ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value === option.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
