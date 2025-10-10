import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { CardError } from "../CardError";

const meta = {
  title: "Components/CardError",
  component: CardError,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof CardError>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const CustomTitle: Story = {
  args: {
    title: "Erro de Conexão",
    message:
      "Não foi possível conectar ao servidor. Verifique sua conexão com a internet."
  }
};

export const WithoutHomeButton: Story = {
  args: {
    showHomeButton: false
  }
};

export const WithoutRetryButton: Story = {
  args: {
    showRetryButton: false
  }
};

export const CustomHandlers: Story = {
  args: {
    onRetry: fn(),
    onGoHome: fn(),
    onGoBack: fn()
  }
};

export const WithDisabledNavigation: Story = {
  args: {
    disableNavigation: true,
    onRetry: fn(),
    onGoHome: fn(),
    onGoBack: fn()
  }
};

export const MinimalButtons: Story = {
  args: {
    showHomeButton: false,
    showRetryButton: false,
    title: "Erro Fatal",
    message: "Ocorreu um erro crítico. Por favor, volte à página anterior."
  }
};
