import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CardNotFound } from "../CardNotFound";

Object.defineProperty(window, "location", {
  value: {
    assign: vi.fn(),
    href: ""
  },
  writable: true
});

Object.defineProperty(window, "history", {
  value: {
    back: vi.fn()
  },
  writable: true
});

describe("CardNotFound", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = "";
  });

  it("renders with default props", () => {
    render(<CardNotFound />);

    expect(screen.getByText("404 - Página não encontrada")).toBeInTheDocument();
    expect(
      screen.getByText(
        "A página que você está procurando não existe ou foi movida."
      )
    ).toBeInTheDocument();
  });

  it("renders with custom title and message", () => {
    const customTitle = "Conteúdo não encontrado";
    const customMessage = "O item que você procura não está disponível.";

    render(<CardNotFound title={customTitle} message={customMessage} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("renders search suggestion by default", () => {
    render(<CardNotFound />);

    expect(
      screen.getByText(
        "Verifique se o endereço está correto ou use a navegação para encontrar o que procura."
      )
    ).toBeInTheDocument();
  });

  it("does not render search suggestion when showSearchSuggestion is false", () => {
    render(<CardNotFound showSearchSuggestion={false} />);

    expect(
      screen.queryByText("Verifique se o endereço está correto ou tente:")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Pesquisar no site")).not.toBeInTheDocument();
  });

  it("renders back button by default", () => {
    render(<CardNotFound />);

    expect(screen.getByText("Voltar")).toBeInTheDocument();
  });

  it("does not render back button when showBackButton is false", () => {
    render(<CardNotFound showBackButton={false} />);

    expect(screen.queryByText("Voltar")).not.toBeInTheDocument();
  });

  it("always renders home button", () => {
    render(<CardNotFound />);

    expect(screen.getByText("Ir para página inicial")).toBeInTheDocument();
  });

  it("calls onGoHome when home button is clicked", () => {
    const mockGoHome = vi.fn();
    render(<CardNotFound onGoHome={mockGoHome} />);

    const homeButton = screen.getByRole("button", {
      name: /ir para página inicial/i
    });
    fireEvent.click(homeButton);

    expect(mockGoHome).toHaveBeenCalledTimes(1);
  });

  it("calls onGoBack when back button is clicked", () => {
    const mockOnGoBack = vi.fn();
    render(<CardNotFound onGoBack={mockOnGoBack} />);

    const backButton = screen.getByRole("button", { name: /voltar/i });
    fireEvent.click(backButton);

    expect(mockOnGoBack).toHaveBeenCalledTimes(1);
  });

  it("navigates to home when home button is clicked without onGoHome prop", () => {
    render(<CardNotFound />);

    const homeButton = screen.getByText("Ir para página inicial");
    fireEvent.click(homeButton);

    expect(window.location.href).toBe("/home");
  });

  it("uses history.back when back button is clicked without onGoBack prop", () => {
    render(<CardNotFound />);

    const backButton = screen.getByText("Voltar");
    fireEvent.click(backButton);

    expect(window.history.back).toHaveBeenCalledTimes(1);
  });

  it("disables navigation when disableNavigation is true", () => {
    render(<CardNotFound disableNavigation />);

    const homeButton = screen.getByText("Ir para página inicial");
    const backButton = screen.getByText("Voltar");

    fireEvent.click(homeButton);
    fireEvent.click(backButton);

    expect(window.location.href).not.toBe("/home");
    expect(window.history.back).not.toHaveBeenCalled();
  });

  it("renders arrow left icon in back button", () => {
    render(<CardNotFound />);

    const backButton = screen.getByText("Voltar");
    expect(backButton.querySelector("svg")).toBeInTheDocument();
  });

  it("renders search icon when search suggestion is shown", () => {
    render(<CardNotFound />);

    const searchIcon = document.querySelector(".lucide-search");
    expect(searchIcon).toBeInTheDocument();
  });

  it("renders home icon in home button", () => {
    render(<CardNotFound />);

    const homeButton = screen.getByText("Ir para página inicial");
    expect(homeButton.querySelector("svg")).toBeInTheDocument();
  });

  it("renders all components when all show flags are true", () => {
    render(<CardNotFound showSearchSuggestion showBackButton />);

    expect(screen.getByText("404 - Página não encontrada")).toBeInTheDocument();
    expect(screen.getByText("Voltar")).toBeInTheDocument();
    expect(screen.getByText("Ir para página inicial")).toBeInTheDocument();
  });

  it("has proper semantic structure", () => {
    render(<CardNotFound />);

    const card = document.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();

    const cardHeader = document.querySelector('[data-slot="card-header"]');
    const cardContent = document.querySelector('[data-slot="card-content"]');
    expect(cardHeader).toBeInTheDocument();
    expect(cardContent).toBeInTheDocument();
  });
});
