import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { CardError } from "../CardError";

Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost:3000/current-page",
    assign: vi.fn(),
    reload: vi.fn()
  },
  writable: true
});

Object.defineProperty(window, "history", {
  value: {
    back: vi.fn()
  },
  writable: true
});

describe("CardError", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.href = "http://localhost:3000/current-page";
  });

  it("renders with default props", () => {
    render(<CardError />);

    expect(screen.getByText("Ops! Algo deu errado")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ocorreu um erro inesperado. Tente novamente ou volte para a página inicial."
      )
    ).toBeInTheDocument();
  });

  it("renders with custom title and message", () => {
    const customTitle = "Error personalizado";
    const customMessage = "Mensagem de erro personalizada";

    render(<CardError title={customTitle} message={customMessage} />);

    expect(screen.getByText(customTitle)).toBeInTheDocument();
    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("renders retry button by default", () => {
    render(<CardError />);

    expect(screen.getByText("Tentar novamente")).toBeInTheDocument();
  });

  it("renders home button by default", () => {
    render(<CardError />);

    expect(screen.getByText("Ir para página inicial")).toBeInTheDocument();
  });

  it("does not render retry button when showRetryButton is false", () => {
    render(<CardError showRetryButton={false} />);

    expect(screen.queryByText("Tentar novamente")).not.toBeInTheDocument();
  });

  it("does not render home button when showHomeButton is false", () => {
    render(<CardError showHomeButton={false} />);

    expect(
      screen.queryByText("Ir para página inicial")
    ).not.toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", () => {
    const mockOnRetry = vi.fn();
    render(<CardError onRetry={mockOnRetry} />);

    const retryButton = screen.getByText("Tentar novamente");
    fireEvent.click(retryButton);

    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });

  it("calls onGoHome when home button is clicked", () => {
    const mockOnGoHome = vi.fn();
    render(<CardError onGoHome={mockOnGoHome} />);

    const homeButton = screen.getByText("Ir para página inicial");
    fireEvent.click(homeButton);

    expect(mockOnGoHome).toHaveBeenCalledTimes(1);
  });

  it("calls onGoBack when back button is clicked", () => {
    const mockOnGoBack = vi.fn();
    render(<CardError onGoBack={mockOnGoBack} />);

    const backButton = screen.getByText("Voltar");
    fireEvent.click(backButton);

    expect(mockOnGoBack).toHaveBeenCalledTimes(1);
  });

  it("reloads page when retry is clicked without onRetry prop", () => {
    render(<CardError />);

    const retryButton = screen.getByText("Tentar novamente");
    fireEvent.click(retryButton);

    expect(window.location.reload).toHaveBeenCalledTimes(1);
  });

  it("navigates to home when home button is clicked without onGoHome prop", () => {
    render(<CardError />);

    const homeButton = screen.getByText("Ir para página inicial");
    fireEvent.click(homeButton);

    expect(window.location.href).toBe("/");
  });

  it("uses history.back when back button is clicked without onGoBack prop", () => {
    render(<CardError />);

    const backButton = screen.getByText("Voltar");
    fireEvent.click(backButton);

    expect(window.history.back).toHaveBeenCalledTimes(1);
  });

  it("disables navigation when disableNavigation is true", () => {
    render(<CardError disableNavigation />);

    const homeButton = screen.getByText("Ir para página inicial");
    const backButton = screen.getByText("Voltar");

    fireEvent.click(homeButton);
    fireEvent.click(backButton);

    expect(window.location.href).toBe("http://localhost:3000/current-page");
    expect(window.history.back).not.toHaveBeenCalled();
  });

  it("renders error icon", () => {
    render(<CardError />);

    const icon = document.querySelector("svg");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("lucide");
  });

  it("has correct accessibility attributes", () => {
    render(<CardError />);

    const card = document.querySelector('[data-slot="card"]');
    expect(card).toBeInTheDocument();
  });

  it("renders all buttons when all show flags are true", () => {
    render(<CardError showRetryButton showHomeButton />);

    expect(screen.getByText("Tentar novamente")).toBeInTheDocument();
    expect(screen.getByText("Ir para página inicial")).toBeInTheDocument();
    expect(screen.getByText("Voltar")).toBeInTheDocument();
  });
});
