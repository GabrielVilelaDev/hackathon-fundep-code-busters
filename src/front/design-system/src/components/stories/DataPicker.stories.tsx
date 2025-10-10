import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

import { DataPicker } from "../DataPicker";
import { Form } from "../ui/form";

const DataPickerWrapper = (args: any) => {
  const form = useForm({
    defaultValues: {
      date: undefined
    }
  });

  return (
    <Form {...form}>
      <form className="w-[300px]">
        <DataPicker {...args} control={form.control} />
      </form>
    </Form>
  );
};

const meta = {
  title: "Components/DataPicker",
  component: DataPickerWrapper,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof DataPickerWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "date",
    label: "Data",
    placeholder: "Selecione a data"
  }
};

export const Required: Story = {
  args: {
    name: "date",
    label: "Data obrigatória",
    placeholder: "Selecione a data",
    required: true
  }
};

export const WithMinDate: Story = {
  args: {
    name: "date",
    label: "Data (a partir de hoje)",
    placeholder: "Selecione a data",
    minDate: new Date()
  }
};

export const WithMaxDate: Story = {
  args: {
    name: "date",
    label: "Data (até hoje)",
    placeholder: "Selecione a data",
    maxDate: new Date()
  }
};

export const Disabled: Story = {
  args: {
    name: "date",
    label: "Data (desabilitado)",
    placeholder: "Selecione a data",
    disabled: true
  }
};

export const WithDateRange: Story = {
  args: {
    name: "date",
    label: "Data (próximos 30 dias)",
    placeholder: "Selecione a data",
    minDate: new Date(),
    maxDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  }
};
