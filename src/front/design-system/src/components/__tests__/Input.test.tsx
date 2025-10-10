import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { FormProvider, useForm } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import { InputCommon, InputForm } from "../Input";

describe("InputCommon", () => {
  it("renders with label", () => {
    render(<InputCommon name="test" label="Test Label" />);

    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders with required indicator", () => {
    render(<InputCommon name="test" label="Test Label" required />);

    expect(screen.getByText("*")).toBeInTheDocument();
  });

  it("renders with description", () => {
    render(
      <InputCommon
        name="test"
        label="Test Label"
        description="This is a description"
      />
    );

    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("renders input field with correct attributes", () => {
    render(<InputCommon name="test" id="test-input" />);

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("name", "test");
    expect(input).toHaveAttribute("id", "test-input");
  });

  it("handles text input type", () => {
    render(<InputCommon name="text" type="text" />);

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  it("handles number input type", () => {
    render(<InputCommon name="number" type="number" />);

    const input = screen.getByRole("spinbutton");
    expect(input).toHaveAttribute("type", "number");
  });

  it("applies custom placeholder", () => {
    render(<InputCommon name="test" placeholder="Enter value" />);

    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<InputCommon name="test" className="custom-input" />);

    expect(screen.getByRole("textbox")).toHaveClass("custom-input");
  });

  it("handles disabled state", () => {
    render(<InputCommon name="test" disabled />);

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("associates label with input correctly", () => {
    render(<InputCommon name="test" label="Test Label" />);

    const input = screen.getByRole("textbox");
    const label = screen.getByText("Test Label");

    expect(label).toHaveAttribute("for", "test");
    expect(input).toHaveAttribute("id", "test");
  });

  it("handles user input", async () => {
    const user = userEvent.setup();
    render(<InputCommon name="test" />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });

  it("handles onChange event", async () => {
    const handleChange = vi.fn();
    render(<InputCommon name="test" onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test value" } });

    expect(handleChange).toHaveBeenCalled();
  });

  it("handles onFocus and onBlur events", async () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();

    render(
      <InputCommon name="test" onFocus={handleFocus} onBlur={handleBlur} />
    );

    const input = screen.getByRole("textbox");

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalled();

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalled();
  });

  it("handles required field styling", () => {
    render(<InputCommon name="test" label="Required Field" required />);

    const requiredIndicator = screen.getByText("*");
    expect(requiredIndicator).toHaveClass("text-red-500");
  });

  it("renders without label when not provided", () => {
    render(<InputCommon name="test" />);

    expect(screen.queryByRole("label")).not.toBeInTheDocument();
  });

  it("supports allowed input types", () => {
    const { rerender } = render(<InputCommon name="test" type="text" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");

    rerender(<InputCommon name="number" type="number" />);
    expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
  });
});

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

describe("InputForm", () => {
  it("renders with control and label", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="testField" control={control} label="Test Label" />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByText("Test Label")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("renders with required indicator", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm
            name="testField"
            control={control}
            label="Required Field"
            required
          />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByText("*")).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-red-500");
  });

  it("renders with description", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm
            name="testField"
            control={control}
            label="Test Field"
            description="This is a description"
          />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByText("This is a description")).toBeInTheDocument();
  });

  it("handles text input type", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="textField" control={control} type="text" />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  it("handles number input type", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="numberField" control={control} type="number" />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByRole("spinbutton")).toHaveAttribute("type", "number");
  });

  it("handles disabled state", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="testField" control={control} disabled />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("applies custom placeholder", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm
            name="testField"
            control={control}
            placeholder="Enter value"
          />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByPlaceholderText("Enter value")).toBeInTheDocument();
  });

  it("handles number input with valid number", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="numberField" control={control} type="number" />
        )}
      </TestFormWrapper>
    );

    const input = screen.getByRole("spinbutton");
    await user.type(input, "123.45");

    expect(input).toHaveValue(123.45);
  });

  it("handles number input with invalid number", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="numberField" control={control} type="number" />
        )}
      </TestFormWrapper>
    );

    const input = screen.getByRole("spinbutton");
    await user.type(input, "abc");

    expect(input).toHaveValue(null);
  });

  it("handles empty number input", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="numberField" control={control} type="number" />
        )}
      </TestFormWrapper>
    );

    const input = screen.getByRole("spinbutton");
    await user.type(input, "123");
    await user.clear(input);

    expect(input).toHaveValue(null);
  });

  it("handles text input change", async () => {
    const user = userEvent.setup();

    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="textField" control={control} type="text" />
        )}
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });

  it("renders without label when not provided", () => {
    render(
      <TestFormWrapper>
        {({ control }) => <InputForm name="testField" control={control} />}
      </TestFormWrapper>
    );

    expect(screen.queryByRole("label")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("sets aria-describedby when description is provided", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm
            name="testField"
            control={control}
            description="Test description"
          />
        )}
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-describedby", "testField-description");
  });

  it("applies custom className", () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm
            name="testField"
            control={control}
            className="custom-class"
          />
        )}
      </TestFormWrapper>
    );

    expect(screen.getByRole("textbox")).toHaveClass("custom-class");
  });

  it("handles onChange event for number input with NaN value", async () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="numberField" control={control} type="number" />
        )}
      </TestFormWrapper>
    );

    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "invalid" } });

    expect(input).toHaveValue(null);
  });

  it("handles aria-invalid attribute on field error", () => {
    render(
      <TestFormWrapper defaultValues={{ testField: "" }}>
        {({ control, setError }) => {
          React.useEffect(() => {
            setError("testField", {
              type: "required",
              message: "Field is required"
            });
          }, [setError]);

          return <InputForm name="testField" control={control} required />;
        }}
      </TestFormWrapper>
    );

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("handles empty string value for number input", async () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="numberField" control={control} type="number" />
        )}
      </TestFormWrapper>
    );

    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "123" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(input).toHaveValue(null);
  });

  it("handles edge case in number input onChange for empty string", async () => {
    render(
      <TestFormWrapper>
        {({ control }) => (
          <InputForm name="numberField" control={control} type="number" />
        )}
      </TestFormWrapper>
    );

    const input = screen.getByRole("spinbutton");

    fireEvent.change(input, { target: { value: "42" } });
    fireEvent.change(input, { target: { value: "" } });

    expect(input).toHaveValue(null);
  });
});
