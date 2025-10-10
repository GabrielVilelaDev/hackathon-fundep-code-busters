import type { Meta, StoryObj } from "@storybook/react";

import { LoadingSpinner } from "../LoadingSpinner";

const meta = {
  title: "Components/LoadingSpinner",
  component: LoadingSpinner,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const Small: Story = {
  args: {
    size: "sm",
    message: "Carregando..."
  }
};

export const Medium: Story = {
  args: {
    size: "md",
    message: "Processando dados..."
  }
};

export const Large: Story = {
  args: {
    size: "lg",
    message: "Aguarde um momento..."
  }
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    message: "Carregando conteúdo..."
  }
};

export const PrimaryVariant: Story = {
  args: {
    variant: "primary",
    message: "Carregando..."
  }
};

export const SecondaryVariant: Story = {
  args: {
    variant: "secondary",
    message: "Carregando..."
  }
};

export const MutedVariant: Story = {
  args: {
    variant: "muted",
    message: "Carregando..."
  }
};

export const WithoutMessage: Story = {
  args: {
    message: ""
  }
};

export const CustomMessage: Story = {
  args: {
    message: "Por favor, aguarde enquanto processamos sua solicitação...",
    size: "lg"
  }
};

export const FullScreen: Story = {
  args: {
    fullScreen: true,
    message: "Carregando aplicação...",
    size: "xl"
  },
  parameters: {
    layout: "fullscreen"
  }
};
