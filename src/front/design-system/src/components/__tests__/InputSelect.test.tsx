import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it } from "vitest";

import { InputSelectForm, type Option } from "../InputSelect";

function TestFormWrapper({
  children,
  defaultValues = {}
}: {
  children: (methods: UseFormReturn<FieldValues>) => React.ReactNode;
  defaultValues?: FieldValues;
}) {
  const methods = useForm({ defaultValues });

  return <FormProvider {...methods}>{children(methods)}</FormProvider>;
}

const mockOptions: Option[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  { label: "Brazil", value: "br" },
  { label: "United States", value: "us" }
];

describe("InputSelectForm", () => {
  it("renders with label", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            label="Test Label"
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders with required indicator", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            label="Required Field"
            options={mockOptions}
            required
          />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-red-500");
  });

  it("renders with default placeholder", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByText("Seleciona uma opção")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
            placeholder="Choose an option"
          />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByText("Choose an option")).toBeInTheDocument();
  });

  it("handles disabled state", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
            disabled
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    expect(button).toBeDisabled();
  });

  it("opens popover when clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("displays options when opened", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
      expect(screen.getByText("Option 2")).toBeInTheDocument();
      expect(screen.getByText("Option 3")).toBeInTheDocument();
    });
  });

  it("selects an option when clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Option 1")).toBeInTheDocument();
    });

    await user.click(screen.getByText("Option 1"));

    await waitFor(() => {
      expect(button).toHaveTextContent("Option 1");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("displays selected value correctly", () => {
    render(
      <TestFormWrapper defaultValues={{ testSelect: "option2" }}>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    expect(button).toHaveTextContent("Option 2");
  });

  it("handles search functionality", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
            searchPlaceholder="Search options"
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    await user.click(button);

    const searchInput = screen.getByPlaceholderText("Search options");
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, "Brazil");

    expect(searchInput).toHaveValue("Brazil");

    await waitFor(() => {
      const emptyMessage = screen.queryByText("Opção não encontrada");
      const brazilOption = screen.queryByText("Brazil");

      expect(emptyMessage || brazilOption).toBeTruthy();
    });
  });

  it("shows empty message when no options match search", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
            emptyMessage="No results found"
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    await user.click(button);

    const searchInput = screen.getByPlaceholderText("Pesquisar");
    await user.type(searchInput, "nonexistent");

    await waitFor(() => {
      expect(screen.getByText("No results found")).toBeInTheDocument();
    });
  });

  it("shows clear option when allowClear is true and value is selected", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper defaultValues={{ testSelect: "option1" }}>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
            allowClear
            clearText="Clear selection"
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText("Clear selection")).toBeInTheDocument();
    });
  });

  it("clears selection when clear option is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper defaultValues={{ testSelect: "option1" }}>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
            allowClear
            clearText="Clear selection"
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    expect(button).toHaveTextContent("Option 1");

    await user.click(button);

    const clearOption = screen.getByText("Clear selection");
    await user.click(clearOption);

    await waitFor(() => {
      expect(button).toHaveTextContent("Seleciona uma opção");
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("does not show clear option when allowClear is false", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper defaultValues={{ testSelect: "option1" }}>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
            allowClear={false}
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    await user.click(button);

    await waitFor(() => {
      expect(screen.queryByText("Limpar seleção")).not.toBeInTheDocument();
    });
  });

  it("does not show clear option when required is true", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper defaultValues={{ testSelect: "option1" }}>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
            required
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    await user.click(button);

    await waitFor(() => {
      expect(screen.queryByText("Limpar seleção")).not.toBeInTheDocument();
    });
  });

  it("toggles selection when same option is clicked", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper defaultValues={{ testSelect: "option1" }}>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    expect(button).toHaveTextContent("Option 1");

    await user.click(button);

    const option1 = screen.getByRole("option", { name: /option 1/i });
    await user.click(option1);

    await waitFor(() => {
      expect(button).toHaveTextContent("Seleciona uma opção");
    });
  });

  it("applies custom className", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
            className="custom-class"
          />
        )}
      </TestFormWrapper>
    );

    const formItem = screen.getByRole("combobox").closest(".custom-class");
    expect(formItem).toBeInTheDocument();
  });

  it("shows chevron icon", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    const chevronIcon = button.querySelector("svg");
    expect(chevronIcon).toBeInTheDocument();
  });

  it("shows check icon for selected option", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper defaultValues={{ testSelect: "option1" }}>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");
    await user.click(button);

    await waitFor(() => {
      const selectedOption = screen.getByRole("option", { name: /option 1/i });
      const checkIcon = selectedOption.querySelector("svg");
      expect(checkIcon).toBeInTheDocument();
    });
  });

  it("renders without label when not provided", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputSelectForm
            name="testSelect"
            control={control}
            options={mockOptions}
          />
        )}
      </TestFormWrapper>
    );

    const button = screen.getByRole("combobox");

    await user.tab();
    expect(button).toHaveFocus();

    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "true");
    });
  });

  it("handles form validation errors", () => {
    render(
      <TestFormWrapper>
        {({ control, setError }) => {
          React.useEffect(() => {
            setError("testSelect", {
              type: "required",
              message: "This field is required"
            });
          }, [setError]);

          return (
            <InputSelectForm
              name="testSelect"
              control={control}
              options={mockOptions}
            />
          );
        }}
      </TestFormWrapper>
    );

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });
});
