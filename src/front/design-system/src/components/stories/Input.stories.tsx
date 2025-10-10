import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";

import { InputCommon, InputForm } from "../Input";
import { Form } from "../ui/form";

const InputFormWrapper = (args: any) => {
  const form = useForm({
    defaultValues: {
      [args.name]: ""
    }
  });

  return (
    <Form {...form}>
      <form className="w-[300px]">
        <InputForm {...args} control={form.control} />
      </form>
    </Form>
  );
};

const meta = {
  title: "Components/Input",
  component: InputFormWrapper,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof InputFormWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "username",
    label: "Nome de usuário",
    placeholder: "Digite seu nome"
  }
};

export const Required: Story = {
  args: {
    name: "email",
    label: "Email",
    placeholder: "seu@email.com",
    type: "email",
    required: true
  }
};

export const Password: Story = {
  args: {
    name: "password",
    label: "Senha",
    placeholder: "••••••••",
    type: "password",
    required: true
  }
};

export const Number: Story = {
  args: {
    name: "age",
    label: "Idade",
    placeholder: "Digite sua idade",
    type: "number"
  }
};

export const WithDescription: Story = {
  args: {
    name: "username",
    label: "Nome de usuário",
    placeholder: "Digite seu nome",
    description: "Este será o seu nome de exibição público."
  }
};

export const Disabled: Story = {
  args: {
    name: "disabled",
    label: "Campo desabilitado",
    placeholder: "Não editável",
    disabled: true
  }
};

export const CommonInput: StoryObj<typeof InputCommon> = {
  render: (args) => (
    <div className="w-[300px]">
      <InputCommon {...args} />
    </div>
  ),
  args: {
    name: "common",
    label: "Input Comum",
    placeholder: "Sem form control"
  }
};
