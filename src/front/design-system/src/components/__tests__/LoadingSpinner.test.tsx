import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoadingSpinner } from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders with default message", () => {
    render(<LoadingSpinner />);

    expect(screen.getByText("Carregando...")).toBeInTheDocument();
  });

  it("renders with custom message", () => {
    const customMessage = "Loading data...";
    render(<LoadingSpinner message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("applies size classes correctly", () => {
    const { rerender } = render(<LoadingSpinner size="sm" />);
    expect(screen.getByRole("status").querySelector("svg")).toHaveClass("h-4", "w-4");

    rerender(<LoadingSpinner size="md" />);
    expect(screen.getByRole("status").querySelector("svg")).toHaveClass("h-8", "w-8");

    rerender(<LoadingSpinner size="lg" />);
    expect(screen.getByRole("status").querySelector("svg")).toHaveClass("h-12", "w-12");

    rerender(<LoadingSpinner size="xl" />);
    expect(screen.getByRole("status").querySelector("svg")).toHaveClass("h-16", "w-16");
  });

  it("applies variant classes correctly", () => {
    const { rerender } = render(<LoadingSpinner variant="primary" />);
    expect(screen.getByRole("status").querySelector("svg")).toHaveClass("text-primary");

    rerender(<LoadingSpinner variant="secondary" />);
    expect(screen.getByRole("status").querySelector("svg")).toHaveClass("text-secondary");

    rerender(<LoadingSpinner variant="muted" />);
    expect(screen.getByRole("status").querySelector("svg")).toHaveClass("text-muted-foreground");
  });

  it("renders in fullScreen mode", () => {
    render(<LoadingSpinner fullScreen />);

    const container = screen.getByRole("status").parentElement;
    expect(container).toHaveClass(
      "fixed",
      "inset-0",
      "bg-background/80",
      "backdrop-blur-sm",
      "flex",
      "items-center",
      "justify-center",
      "z-50"
    );
  });

  it("renders in normal mode by default", () => {
    render(<LoadingSpinner />);

    const container = screen.getByRole("status").parentElement;
    expect(container).toHaveClass(
      "flex",
      "items-center",
      "justify-center",
      "p-4"
    );
  });

  it("applies custom className", () => {
    render(<LoadingSpinner className="custom-spinner" />);

    const container = screen.getByRole("status").parentElement;
    expect(container).toHaveClass("custom-spinner");
  });

  it("has correct accessibility attributes", () => {
    render(<LoadingSpinner message="Loading data" />);

    const statusElement = screen.getByRole("status");
    expect(statusElement).toHaveAttribute("aria-label", "Loading data");
  });

  it("spinner animates correctly", () => {
    render(<LoadingSpinner />);

    const spinner = screen.getByRole("status").querySelector("svg");
    expect(spinner).toHaveClass("animate-spin");
  });

  it("combines all props correctly", () => {
    render(
      <LoadingSpinner
        message="Custom loading"
        size="lg"
        variant="secondary"
        className="custom-class"
        fullScreen
      />
    );

    expect(screen.getByText("Custom loading")).toBeInTheDocument();
    expect(screen.getByRole("status").querySelector("svg")).toHaveClass(
      "h-12",
      "w-12",
      "text-secondary",
      "animate-spin"
    );
    expect(screen.getByRole("status").parentElement).toHaveClass(
      "custom-class"
    );
  });
});
