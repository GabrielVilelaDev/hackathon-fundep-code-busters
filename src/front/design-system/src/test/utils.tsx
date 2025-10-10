import type { ReactElement } from "react";
import { render, type RenderResult } from "@testing-library/react";

export const renderWithProviders = (ui: ReactElement): RenderResult => {
  return render(ui);
};

export const mockUseForm = () => ({
  register: () => ({}),
  handleSubmit: (fn: () => void) => fn,
  formState: { errors: {} },
  control: {
    _formState: { errors: {} },
    _getWatch: () => undefined,
    _formValues: {},
    _defaultValues: {},
    _subjects: {
      values: { next: () => {} },
      array: { next: () => {} },
      state: { next: () => {} }
    },
    _names: {
      mount: new Set(),
      unMount: new Set(),
      array: new Set(),
      focus: new Set(),
      watch: new Set(),
      watchAll: false
    },
    _fields: {},
    _fieldsWithValidation: {}
  },
  setValue: () => {},
  getValues: () => ({}),
  watch: () => undefined,
  reset: () => {},
  clearErrors: () => {},
  setError: () => {},
  trigger: () => Promise.resolve(true)
});

export type MockFormControl = ReturnType<typeof mockUseForm>["control"];
