import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Modal } from "../Modal";

describe("Modal", () => {
  const mockOnClose = vi.fn();

  it("renders modal when open is true", () => {
    render(
      <Modal
        open={true}
        onClose={mockOnClose}
        title="Test Title"
        description="Test Description"
        content={<div>Test Content</div>}
      />
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("does not render modal when open is false", () => {
    render(
      <Modal
        open={false}
        onClose={mockOnClose}
        title="Test Title"
        content={<div>Test Content</div>}
      />
    );

    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("renders without title and description", () => {
    render(
      <Modal
        open={true}
        onClose={mockOnClose}
        content={<div>Only Content</div>}
      />
    );

    expect(screen.getByText("Only Content")).toBeInTheDocument();
  });

  it("renders footer when provided", () => {
    render(
      <Modal
        open={true}
        onClose={mockOnClose}
        content={<div>Content</div>}
        footer={<button>Footer Button</button>}
      />
    );

    expect(screen.getByText("Footer Button")).toBeInTheDocument();
  });

  it("calls onClose when dialog is closed", async () => {
    const user = userEvent.setup();
    render(
      <Modal
        open={true}
        onClose={mockOnClose}
        title="Test"
        content={<div>Content</div>}
      />
    );

    // Try to close by clicking the close button (X)
    const closeButton = screen.getByRole("button", { name: /close/i });
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("renders complex content correctly", () => {
    const complexContent = (
      <div>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
        <button>Action Button</button>
      </div>
    );

    render(
      <Modal open={true} onClose={mockOnClose} content={complexContent} />
    );

    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    expect(screen.getByText("Action Button")).toBeInTheDocument();
  });
});
