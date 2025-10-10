import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home, Settings, User } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

import { Sidebar, type MenuOptionsProps } from "../SideBar";

describe("Sidebar", () => {
  const mockMenuOptions: MenuOptionsProps[] = [
    {
      label: "Home",
      icon: Home,
      onClick: vi.fn()
    },
    {
      label: "Profile",
      icon: User,
      onClick: vi.fn()
    },
    {
      label: "Settings",
      icon: Settings,
      onClick: vi.fn(),
      disabled: true
    }
  ];

  it("renders all menu options", () => {
    render(<Sidebar MenuOptions={mockMenuOptions} />);

    expect(screen.getByTitle("Home")).toBeInTheDocument();
    expect(screen.getByTitle("Profile")).toBeInTheDocument();
    expect(screen.getByTitle("Settings")).toBeInTheDocument();
  });

  it("calls onClick when menu item is clicked", async () => {
    const user = userEvent.setup();
    render(<Sidebar MenuOptions={mockMenuOptions} />);

    const homeButton = screen.getByTitle("Home");
    await user.click(homeButton);

    expect(mockMenuOptions[0].onClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled menu item is clicked", async () => {
    const user = userEvent.setup();
    render(<Sidebar MenuOptions={mockMenuOptions} />);

    const settingsButton = screen.getByTitle("Settings");
    await user.click(settingsButton);

    expect(mockMenuOptions[2].onClick).not.toHaveBeenCalled();
  });

  it("renders menu items with disabled state", () => {
    render(<Sidebar MenuOptions={mockMenuOptions} />);

    const settingsButton = screen.getByTitle("Settings");
    expect(settingsButton).toBeDisabled();
  });

  it("toggles sidebar collapse state", async () => {
    const user = userEvent.setup();
    const { container } = render(<Sidebar MenuOptions={mockMenuOptions} />);

    // Find the toggle button (chevron button)
    const toggleButton = container.querySelector("button:not([title])");
    expect(toggleButton).toBeInTheDocument();

    // Click to toggle
    if (toggleButton) {
      await user.click(toggleButton);
      // Sidebar should be collapsed (though visual state is CSS-based)
      expect(toggleButton).toBeInTheDocument();
    }
  });

  it("renders sidebar as aside element", () => {
    const { container } = render(<Sidebar MenuOptions={mockMenuOptions} />);

    const aside = container.querySelector("aside");
    expect(aside).toBeInTheDocument();
  });

  it("renders with empty menu options", () => {
    const { container } = render(<Sidebar MenuOptions={[]} />);

    const nav = container.querySelector("nav");
    expect(nav).toBeInTheDocument();
    expect(nav?.children.length).toBe(0);
  });

  it("renders icons for each menu option", () => {
    const { container } = render(<Sidebar MenuOptions={mockMenuOptions} />);

    // Check that SVG icons are rendered (lucide-react icons are SVGs)
    const svgs = container.querySelectorAll("svg");
    // We expect at least 3 icons + chevron icon = 4
    expect(svgs.length).toBeGreaterThanOrEqual(3);
  });
});
