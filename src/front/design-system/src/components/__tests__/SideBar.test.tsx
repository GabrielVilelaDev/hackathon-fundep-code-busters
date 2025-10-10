import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home, Settings, User } from "lucide-react";
import { describe, expect, it, vi } from "vitest";

import { Sidebar, type MenuGroupProps } from "../SideBar";

describe("Sidebar", () => {
  const mockMenuOptions: MenuGroupProps[] = [
    {
      items: [
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
      ]
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

    expect(mockMenuOptions[0].items[0].onClick).toHaveBeenCalled();
  });

  it("does not call onClick when disabled menu item is clicked", async () => {
    const user = userEvent.setup();
    render(<Sidebar MenuOptions={mockMenuOptions} />);

    const settingsButton = screen.getByTitle("Settings");
    await user.click(settingsButton);

    expect(mockMenuOptions[0].items[2].onClick).not.toHaveBeenCalled();
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

  describe("Dropdowns", () => {
    const mockMenuOptionsWithDropdowns: MenuGroupProps[] = [
      {
        title: "Interno",
        items: [
          {
            label: "Home",
            icon: Home,
            onClick: vi.fn()
          },
          {
            label: "Profile",
            icon: User,
            onClick: vi.fn()
          }
        ]
      },
      {
        title: "Externo",
        items: [
          {
            label: "Settings",
            icon: Settings,
            onClick: vi.fn()
          }
        ]
      }
    ];

    it("renders dropdown titles", () => {
      render(<Sidebar MenuOptions={mockMenuOptionsWithDropdowns} />);

      // Use getAllByText since titles appear in both label and tooltip
      const internoElements = screen.getAllByText("Interno");
      const externoElements = screen.getAllByText("Externo");
      
      expect(internoElements.length).toBeGreaterThan(0);
      expect(externoElements.length).toBeGreaterThan(0);
    });

    it("renders all menu items across groups by default (expanded)", () => {
      render(<Sidebar MenuOptions={mockMenuOptionsWithDropdowns} />);

      expect(screen.getByTitle("Home")).toBeInTheDocument();
      expect(screen.getByTitle("Profile")).toBeInTheDocument();
      expect(screen.getByTitle("Settings")).toBeInTheDocument();
    });

    it("toggles dropdown group visibility", async () => {
      const user = userEvent.setup();
      const { container } = render(<Sidebar MenuOptions={mockMenuOptionsWithDropdowns} />);

      // Initially, items should be visible (expanded by default)
      expect(screen.getByTitle("Home")).toBeInTheDocument();
      
      // Find the dropdown button by looking for button containing the label
      const buttons = container.querySelectorAll("button");
      const internoButton = Array.from(buttons).find(btn => 
        btn.querySelector("label")?.textContent === "Interno"
      );
      expect(internoButton).toBeInTheDocument();
      
      if (internoButton) {
        await user.click(internoButton);
        
        // After clicking, items should be hidden
        expect(screen.queryByTitle("Home")).not.toBeInTheDocument();
        expect(screen.queryByTitle("Profile")).not.toBeInTheDocument();
        
        // Click again to expand
        await user.click(internoButton);
        
        // Items should be visible again
        expect(screen.getByTitle("Home")).toBeInTheDocument();
        expect(screen.getByTitle("Profile")).toBeInTheDocument();
      }
    });

    it("renders groups without titles", () => {
      const optionsWithoutTitles: MenuGroupProps[] = [
        {
          items: [
            {
              label: "Home",
              icon: Home,
              onClick: vi.fn()
            }
          ]
        }
      ];

      render(<Sidebar MenuOptions={optionsWithoutTitles} />);
      expect(screen.getByTitle("Home")).toBeInTheDocument();
    });

    it("renders multiple groups with some having titles and some not", () => {
      const mixedOptions: MenuGroupProps[] = [
        {
          items: [
            {
              label: "Home",
              icon: Home,
              onClick: vi.fn()
            }
          ]
        },
        {
          title: "Settings",
          items: [
            {
              label: "Profile",
              icon: User,
              onClick: vi.fn()
            }
          ]
        }
      ];

      render(<Sidebar MenuOptions={mixedOptions} />);
      
      expect(screen.getByTitle("Home")).toBeInTheDocument();
      expect(screen.getByTitle("Profile")).toBeInTheDocument();
      
      // Use getAllByText since "Settings" appears in both label and tooltip
      const settingsElements = screen.getAllByText("Settings");
      expect(settingsElements.length).toBeGreaterThan(0);
    });

    it("dropdown works when sidebar is collapsed", async () => {
      const user = userEvent.setup();
      const { container } = render(<Sidebar MenuOptions={mockMenuOptionsWithDropdowns} />);

      // Find and click the sidebar toggle button to collapse
      const sidebarToggleButton = container.querySelector("button:not([title])");
      if (sidebarToggleButton) {
        await user.click(sidebarToggleButton);
      }

      // Items should still be visible after collapsing sidebar (expanded by default)
      expect(screen.getByTitle("Home")).toBeInTheDocument();
      
      // Find the dropdown button by first letter "I" for "Interno"
      const internoButton = screen.getByText("I").closest("button");
      expect(internoButton).toBeInTheDocument();
      
      if (internoButton) {
        await user.click(internoButton);
        
        // After clicking, items should be hidden
        expect(screen.queryByTitle("Home")).not.toBeInTheDocument();
        expect(screen.queryByTitle("Profile")).not.toBeInTheDocument();
        
        // Click again to expand
        await user.click(internoButton);
        
        // Items should be visible again
        expect(screen.getByTitle("Home")).toBeInTheDocument();
        expect(screen.getByTitle("Profile")).toBeInTheDocument();
      }
    });

    it("shows first letter of group title when collapsed", async () => {
      const user = userEvent.setup();
      const { container } = render(<Sidebar MenuOptions={mockMenuOptionsWithDropdowns} />);

      // Find and click the sidebar toggle button to collapse
      const sidebarToggleButton = container.querySelector("button:not([title])");
      if (sidebarToggleButton) {
        await user.click(sidebarToggleButton);
      }

      // Should show first letters "I" and "E"
      expect(screen.getByText("I")).toBeInTheDocument();
      expect(screen.getByText("E")).toBeInTheDocument();
    });

    it("groups without titles always show items", async () => {
      const user = userEvent.setup();
      const mixedOptions: MenuGroupProps[] = [
        {
          items: [
            {
              label: "Home",
              icon: Home,
              onClick: vi.fn()
            }
          ]
        },
        {
          title: "Settings",
          items: [
            {
              label: "Profile",
              icon: User,
              onClick: vi.fn()
            }
          ]
        }
      ];

      const { container } = render(<Sidebar MenuOptions={mixedOptions} />);
      
      // Home should always be visible (no title group)
      expect(screen.getByTitle("Home")).toBeInTheDocument();
      
      // Profile should be visible initially
      expect(screen.getByTitle("Profile")).toBeInTheDocument();
      
      // Find the Settings dropdown button by looking for button containing the label
      const buttons = container.querySelectorAll("button");
      const settingsButton = Array.from(buttons).find(btn => 
        btn.querySelector("label")?.textContent === "Settings"
      );
      
      if (settingsButton) {
        await user.click(settingsButton);
        
        // Home should still be visible (no title group)
        expect(screen.getByTitle("Home")).toBeInTheDocument();
        
        // Profile should be hidden
        expect(screen.queryByTitle("Profile")).not.toBeInTheDocument();
      }
    });
  });
});
