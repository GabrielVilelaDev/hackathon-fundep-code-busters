import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SimplesTable } from "../SimplesTable";
import type { TableHeader } from "@/types";

describe("SimplesTable", () => {
  const mockHeaders: TableHeader[] = [
    { key: "id", label: "ID" },
    { key: "name", label: "Nome" },
    { key: "email", label: "Email" }
  ];

  const mockData = [
    { id: 1, name: "João Silva", email: "joao@email.com" },
    { id: 2, name: "Maria Santos", email: "maria@email.com" },
    { id: 3, name: "Pedro Costa", email: "pedro@email.com" }
  ];

  it("renders table headers correctly", () => {
    render(<SimplesTable headers={mockHeaders} data={mockData} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Nome")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders table data correctly", () => {
    render(<SimplesTable headers={mockHeaders} data={mockData} />);

    expect(screen.getByText("João Silva")).toBeInTheDocument();
    expect(screen.getByText("joao@email.com")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("Maria Santos")).toBeInTheDocument();
  });

  it("renders empty message when no data provided", () => {
    render(<SimplesTable headers={mockHeaders} data={[]} />);

    expect(screen.getByText("Nenhum dado encontrado")).toBeInTheDocument();
  });

  it("renders custom empty message", () => {
    const customMessage = "Nenhum usuário encontrado";
    render(
      <SimplesTable
        headers={mockHeaders}
        data={[]}
        emptyMessage={customMessage}
      />
    );

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <SimplesTable
        headers={mockHeaders}
        data={mockData}
        className="custom-table"
      />
    );

    expect(container.querySelector(".custom-table")).toBeInTheDocument();
  });

  it("applies aria-label for accessibility", () => {
    render(
      <SimplesTable
        headers={mockHeaders}
        data={mockData}
        aria-label="Tabela de usuários"
      />
    );

    expect(screen.getByLabelText("Tabela de usuários")).toBeInTheDocument();
  });

  it("handles undefined values in data", () => {
    const testData = [
      { id: 1, name: "João", email: "joao@email.com", phone: undefined },
      { id: 2, name: "Maria", email: "maria@email.com", phone: undefined }
    ];

    const testHeaders = [
      { key: "id", label: "ID" },
      { key: "name", label: "Nome" },
      { key: "email", label: "E-mail" },
      { key: "phone", label: "Telefone" }
    ];

    render(<SimplesTable data={testData} headers={testHeaders} />);

    expect(screen.getByText("joao@email.com")).toBeInTheDocument();
    expect(screen.getByText("maria@email.com")).toBeInTheDocument();
    // Verifica se as células vazias existem (valores undefined renderizam como string vazia)
    const cells = screen.getAllByRole("cell");
    const phoneCells = cells.filter((cell) => cell.textContent === "");
    expect(phoneCells.length).toBeGreaterThan(0);
  });

  it("handles null data gracefully", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render(<SimplesTable headers={mockHeaders} data={null as any} />);

    expect(screen.getByText("Nenhum dado encontrado")).toBeInTheDocument();
  });

  it("generates unique keys for rows and cells", () => {
    const { container } = render(
      <SimplesTable headers={mockHeaders} data={mockData} />
    );

    const rows = container.querySelectorAll("tbody tr");
    const cells = container.querySelectorAll("tbody td");

    expect(rows).toHaveLength(3);
    expect(cells).toHaveLength(9); // 3 rows × 3 columns
  });
});
