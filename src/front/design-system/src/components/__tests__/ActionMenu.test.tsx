import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ActionMenu } from "../ActionMenu";
import type { MenuProps } from "@/types";

describe("ActionMenu", () => {
  const mockOnClick = vi.fn();

  const mockMenu: MenuProps[] = [
    {
      title: "Ações Principais",
      actions: [
        {
          label: "Editar",
          onClick: mockOnClick,
          icon: <span data-testid="edit-icon">✏️</span>,
          colorTitle: "primary"
        },
        {
          label: "Excluir",
          onClick: mockOnClick,
          colorTitle: "red"
        }
      ]
    },
    {
      actions: [
        {
          label: "Ocultar",
          onClick: mockOnClick,
          hidden: true
        },
        {
          label: "Desabilitado",
          onClick: mockOnClick,
          disabled: true
        }
      ]
    }
  ];

  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it("renders trigger button correctly", () => {
    render(<ActionMenu menu={mockMenu} />);

    const menuIcon = document.querySelector(".lucide-menu");
    expect(menuIcon).toBeInTheDocument();
  });

  it("renders custom trigger when provided", () => {
    const customTrigger = <button data-testid="custom-trigger">Custom</button>;

    render(<ActionMenu menu={mockMenu} trigger={customTrigger} />);

    expect(screen.getByTestId("custom-trigger")).toBeInTheDocument();
  });

  it("opens menu when trigger is clicked", async () => {
    render(<ActionMenu menu={mockMenu} />);

    const trigger = document.querySelector(".lucide-menu");
    fireEvent.click(trigger!);

    expect(screen.getByText("Ações Principais")).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
  });

  it("calls onClick when action is clicked", async () => {
    render(<ActionMenu menu={mockMenu} />);

    const trigger = document.querySelector(".lucide-menu");
    fireEvent.click(trigger!);

    const editButton = screen.getByText("Editar");
    fireEvent.click(editButton);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("renders action with icon", async () => {
    render(<ActionMenu menu={mockMenu} />);

    const trigger = document.querySelector(".lucide-menu");
    fireEvent.click(trigger!);

    expect(screen.getByTestId("edit-icon")).toBeInTheDocument();
  });

  it("does not render hidden actions", async () => {
    render(<ActionMenu menu={mockMenu} />);

    const trigger = document.querySelector(".lucide-menu");
    fireEvent.click(trigger!);

    expect(screen.queryByText("Ocultar")).not.toBeInTheDocument();
  });

  it("renders disabled actions as disabled", async () => {
    render(<ActionMenu menu={mockMenu} />);

    const trigger = document.querySelector(".lucide-menu");
    fireEvent.click(trigger!);

    const disabledButton = screen.getByText("Desabilitado");
    expect(disabledButton).toBeDisabled();
  });

  it("renders menu sections without title", async () => {
    render(<ActionMenu menu={mockMenu} />);

    const trigger = document.querySelector(".lucide-menu");
    fireEvent.click(trigger!);

    expect(screen.getByText("Desabilitado")).toBeInTheDocument();
  });

  it("applies correct color variants", async () => {
    render(<ActionMenu menu={mockMenu} />);

    const trigger = document.querySelector(".lucide-menu");
    fireEvent.click(trigger!);

    const editButton = screen.getByText("Editar");
    const deleteButton = screen.getByText("Excluir");

    expect(editButton).toHaveClass("text-primary");
    expect(deleteButton).toHaveClass("text-red-500");
  });
});
