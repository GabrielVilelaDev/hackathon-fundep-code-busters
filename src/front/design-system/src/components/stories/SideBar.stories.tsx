import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Bell, FileText, Home, LogOut, Settings, User } from "lucide-react";

import { Sidebar } from "../SideBar";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Sidebar responsivo que mostra a primeira letra dos labels em mobile e ícones/texto completo em desktop. Suporta grupos com dropdowns expansíveis."
      }
    }
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    MenuOptions: [
      {
        items: [
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
    ]
  }
};

export const WithDisabledItems: Story = {
  args: {
    MenuOptions: [
      {
        items: [
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
    ]
  }
};

export const ManyItems: Story = {
  args: {
    MenuOptions: [
      {
        items: [
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
    ]
  }
};

export const SingleItem: Story = {
  args: {
    MenuOptions: [
      {
        items: [
          {
            label: "Home",
            icon: Home,
            onClick: fn()
          }
        ]
      }
    ]
  }
};

export const Empty: Story = {
  args: {
    MenuOptions: []
  }
};

export const WithDropdowns: Story = {
  args: {
    MenuOptions: [
      {
        title: "Interno",
        items: [
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
          }
        ]
      },
      {
        title: "Externo",
        items: [
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
    ]
  },
  parameters: {
    docs: {
      description: {
        story: "Grupos com títulos que funcionam como dropdowns expansíveis. Clique no título para expandir/colapsar os itens do grupo."
      }
    }
  }
};

export const MultipleGroupsWithMixedStates: Story = {
  args: {
    MenuOptions: [
      {
        title: "Principal",
        items: [
          {
            label: "Home",
            icon: Home,
            onClick: fn()
          },
          {
            label: "Profile",
            icon: User,
            onClick: fn()
          }
        ]
      },
      {
        title: "Configurações",
        items: [
          {
            label: "Settings",
            icon: Settings,
            onClick: fn()
          },
          {
            label: "Documents",
            icon: FileText,
            onClick: fn(),
            disabled: true
          }
        ]
      },
      {
        title: "Ações",
        items: [
          {
            label: "Notifications",
            icon: Bell,
            onClick: fn()
          },
          {
            label: "Logout",
            icon: LogOut,
            onClick: fn()
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: "Múltiplos grupos com dropdowns. Cada grupo pode ser expandido/colapsado independentemente. Suporta itens desabilitados dentro dos grupos."
      }
    }
  }
};

export const MobileView: Story = {
  args: {
    MenuOptions: [
      {
        title: "Navigation",
        items: [
          {
            label: "Dashboard",
            icon: Home,
            onClick: fn()
          },
          {
            label: "Analytics",
            icon: FileText,
            onClick: fn()
          },
          {
            label: "Notifications",
            icon: Bell,
            onClick: fn()
          }
        ]
      },
      {
        title: "Settings",
        items: [
          {
            label: "Profile",
            icon: User,
            onClick: fn()
          },
          {
            label: "Preferences",
            icon: Settings,
            onClick: fn()
          },
          {
            label: "Sign Out",
            icon: LogOut,
            onClick: fn()
          }
        ]
      }
    ]
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1"
    },
    docs: {
      description: {
        story: "Em mobile (< 768px), o sidebar mostra apenas a primeira letra de cada item centralizada. Hover mostra o label completo em um tooltip. Dropdowns funcionam normalmente com a primeira letra do título do grupo."
      }
    }
  }
};

export const CollapsedWithDropdowns: Story = {
  args: {
    MenuOptions: [
      {
        title: "Principal",
        items: [
          {
            label: "Dashboard",
            icon: Home,
            onClick: fn()
          },
          {
            label: "Profile",
            icon: User,
            onClick: fn()
          }
        ]
      },
      {
        title: "Documentos",
        items: [
          {
            label: "Files",
            icon: FileText,
            onClick: fn()
          },
          {
            label: "Notifications",
            icon: Bell,
            onClick: fn()
          }
        ]
      },
      {
        title: "Sistema",
        items: [
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
    ]
  },
  parameters: {
    docs: {
      description: {
        story: "Sidebar retraída com grupos dropdown. Mostra a primeira letra de cada título de grupo (P, D, S). Clique na letra para expandir/colapsar o grupo. Hover sobre a letra mostra o nome completo do grupo em um tooltip."
      }
    }
  }
};
