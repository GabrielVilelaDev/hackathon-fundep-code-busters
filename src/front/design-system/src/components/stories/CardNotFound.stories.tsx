import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { CardNotFound } from "../CardNotFound";

const meta = {
  title: "Components/CardNotFound",
  component: CardNotFound,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof CardNotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const CustomTitle: Story = {
  args: {
    title: "Recurso não encontrado",
    message:
      "O recurso que você está tentando acessar não está disponível no momento."
  }
};

export const WithoutSearchSuggestion: Story = {
  args: {
    showSearchSuggestion: false
  }
};

export const WithoutBackButton: Story = {
  args: {
    showBackButton: false
  }
};

export const CustomHandlers: Story = {
  args: {
    onGoHome: fn(),
    onGoBack: fn()
  }
};

export const WithDisabledNavigation: Story = {
  args: {
    disableNavigation: true,
    onGoHome: fn(),
    onGoBack: fn()
  }
};

export const Minimal: Story = {
  args: {
    showSearchSuggestion: false,
    showBackButton: false,
    title: "Página não encontrada",
    message: "Use o botão abaixo para retornar à página inicial."
  }
};
