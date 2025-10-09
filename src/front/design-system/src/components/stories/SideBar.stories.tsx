import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Bell, FileText, Home, LogOut, Settings, User } from "lucide-react";

import { Sidebar } from "../SideBar";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    MenuOptions: [
      {
        label: "Home",
        icon: Home,
        onClick: fn()
      },
      {
        label: "Profile",
        icon: User,
        onClick: fn()
      },
      {
        label: "Settings",
        icon: Settings,
        onClick: fn()
      }
    ]
  }
};

export const WithDisabledItems: Story = {
  args: {
    MenuOptions: [
      {
        label: "Home",
        icon: Home,
        onClick: fn()
      },
      {
        label: "Profile",
        icon: User,
        onClick: fn()
      },
      {
        label: "Settings",
        icon: Settings,
        onClick: fn(),
        disabled: true
      },
      {
        label: "Documents",
        icon: FileText,
        onClick: fn(),
        disabled: true
      }
    ]
  }
};

export const ManyItems: Story = {
  args: {
    MenuOptions: [
      {
        label: "Home",
        icon: Home,
        onClick: fn()
      },
      {
        label: "Profile",
        icon: User,
        onClick: fn()
      },
      {
        label: "Documents",
        icon: FileText,
        onClick: fn()
      },
      {
        label: "Notifications",
        icon: Bell,
        onClick: fn()
      },
      {
        label: "Settings",
        icon: Settings,
        onClick: fn()
      },
      {
        label: "Logout",
        icon: LogOut,
        onClick: fn()
      }
    ]
  }
};

export const SingleItem: Story = {
  args: {
    MenuOptions: [
      {
        label: "Home",
        icon: Home,
        onClick: fn()
      }
    ]
  }
};

export const Empty: Story = {
  args: {
    MenuOptions: []
  }
};
