import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { SimplesTable } from "../SimplesTable";
import type { TableHeader } from "@/types";

const meta = {
  title: "Components/SimplesTable",
  component: SimplesTable,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof SimplesTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const basicHeaders: TableHeader[] = [
  { key: "id", label: "ID" },
  { key: "name", label: "Nome" },
  { key: "email", label: "Email" }
];

const basicData = [
  { id: "1", name: "João Silva", email: "joao@example.com" },
  { id: "2", name: "Maria Santos", email: "maria@example.com" },
  { id: "3", name: "Pedro Costa", email: "pedro@example.com" }
];

export const Default: Story = {
  args: {
    headers: basicHeaders,
    data: basicData
  }
};

export const Empty: Story = {
  args: {
    headers: basicHeaders,
    data: []
  }
};

export const WithActions: Story = {
  args: {
    headers: [...basicHeaders, { key: "actions", label: "Ações" }],
    data: basicData.map((item) => ({
      ...item,
      actions: (
        <div className="flex gap-2">
          <button
            onClick={() => fn()(`Edit ${item.name}`)}
            className="text-primary hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => fn()(`Delete ${item.name}`)}
            className="text-destructive hover:underline"
          >
            Deletar
          </button>
        </div>
      )
    }))
  }
};

export const LargeDataset: Story = {
  args: {
    headers: basicHeaders,
    data: Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      name: `Usuário ${i + 1}`,
      email: `user${i + 1}@example.com`
    }))
  }
};

export const CustomWidth: Story = {
  args: {
    headers: [
      { key: "id", label: "ID" },
      { key: "name", label: "Nome Completo" },
      { key: "email", label: "Endereço de Email" },
      { key: "phone", label: "Telefone" }
    ],
    data: [
      {
        id: "1",
        name: "João Pedro Silva Santos",
        email: "joao.pedro.silva@example.com",
        phone: "(11) 98765-4321"
      },
      {
        id: "2",
        name: "Maria Fernanda Costa",
        email: "maria.fernanda@example.com",
        phone: "(21) 99876-5432"
      }
    ],
    className: "w-full"
  }
};

export const WithLoadingState: Story = {
  args: {
    headers: basicHeaders,
    data: basicData,
    isLoading: true
  }
};

export const WithErrorState: Story = {
  args: {
    headers: basicHeaders,
    data: [],
    emptyMessage: "Erro ao carregar dados"
  }
};

export const CustomEmptyMessage: Story = {
  args: {
    headers: basicHeaders,
    data: [],
    emptyMessage: "Nenhum usuário encontrado"
  }
};
