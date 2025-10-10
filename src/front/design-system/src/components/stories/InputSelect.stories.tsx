import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

import { InputSelectForm } from "../InputSelect";
import { Form } from "../ui/form";

const InputSelectWrapper = (args: any) => {
  const form = useForm({
    defaultValues: {
      [args.name]: ""
    }
  });

  return (
    <Form {...form}>
      <form className="w-[300px]">
        <InputSelectForm {...args} control={form.control} />
      </form>
    </Form>
  );
};

const meta = {
  title: "Components/InputSelect",
  component: InputSelectWrapper,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof InputSelectWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries = [
  { label: "Brasil", value: "br" },
  { label: "Estados Unidos", value: "us" },
  { label: "Canadá", value: "ca" },
  { label: "México", value: "mx" },
  { label: "Argentina", value: "ar" }
];

const fruits = [
  { label: "Maçã", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Laranja", value: "orange" },
  { label: "Uva", value: "grape" },
  { label: "Morango", value: "strawberry" }
];

export const Default: Story = {
  args: {
    name: "country",
    label: "País",
    placeholder: "Selecione um país",
    options: countries
  }
};

export const Required: Story = {
  args: {
    name: "country",
    label: "País obrigatório",
    placeholder: "Selecione um país",
    options: countries,
    required: true
  }
};

export const WithSearchPlaceholder: Story = {
  args: {
    name: "fruit",
    label: "Fruta favorita",
    placeholder: "Escolha uma fruta",
    searchPlaceholder: "Buscar frutas...",
    options: fruits
  }
};

export const CustomEmptyMessage: Story = {
  args: {
    name: "country",
    label: "País",
    placeholder: "Selecione um país",
    emptyMessage: "Nenhum país encontrado",
    options: countries
  }
};

export const Disabled: Story = {
  args: {
    name: "country",
    label: "País (desabilitado)",
    placeholder: "Selecione um país",
    options: countries,
    disabled: true
  }
};

export const WithoutClear: Story = {
  args: {
    name: "country",
    label: "País (sem limpar)",
    placeholder: "Selecione um país",
    options: countries,
    allowClear: false
  }
};

export const CustomClearText: Story = {
  args: {
    name: "fruit",
    label: "Fruta",
    placeholder: "Escolha uma fruta",
    options: fruits,
    clearText: "Remover seleção"
  }
};
