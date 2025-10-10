import type { Meta, StoryObj } from "@storybook/react";
import {
  Copy,
  Download,
  Edit,
  Eye,
  Menu,
  MoreHorizontal,
  Save,
  Settings,
  Share,
  Star,
  Trash2,
  User
} from "lucide-react";

import { ActionMenu } from "../ActionMenu";

const icons = {
  None: null,
  Menu: <Menu />,
  MoreHorizontal: <MoreHorizontal />,
  Settings: <Settings />,
  User: <User />,
  Eye: <Eye />,
  Star: <Star />
};

const meta: Meta<typeof ActionMenu> = {
  title: "Components/ActionMenu",
  component: ActionMenu,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Um componente de menu de ações que exibe uma lista de botões em um popover. Suporta agrupamento com títulos, diferentes variantes de cores, ícones personalizados e estados desabilitados."
      }
    }
  },
  argTypes: {
    trigger: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
      description:
        "Ícone personalizado para o trigger do menu. Se não fornecido, usa o ícone padrão de arrastar.",
      table: {
        type: { summary: "React.ReactNode" },
        defaultValue: { summary: "DragIndicatorIcon" }
      }
    },
    menu: {
      description: "Array de grupos de menu com suas respectivas ações",
      table: {
        type: { summary: "MenuProps[]" }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ActionMenu>;

export const Default: Story = {
  args: {
    menu: [
      {
        actions: [
          {
            label: "Editar",
            onClick: () => {},
            icon: <Edit size={16} />
          },
          {
            label: "Copiar",
            onClick: () => {},
            icon: <Copy size={16} />
          },
          {
            label: "Compartilhar",
            onClick: () => {},
            icon: <Share size={16} />
          },
          {
            label: "Excluir",
            onClick: () => {},
            icon: <Trash2 size={16} />,
            colorTitle: "red"
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu de ações básico com ícones e uma ação de exclusão em vermelho."
      }
    }
  }
};

export const WithCustomIcon: Story = {
  args: {
    trigger: <MoreHorizontal cursor="pointer" />,
    menu: [
      {
        actions: [
          {
            label: "Visualizar",
            onClick: () => {},
            icon: <Eye size={16} />
          },
          {
            label: "Baixar",
            onClick: () => {},
            icon: <Download size={16} />
          },
          {
            label: "Favoritar",
            onClick: () => {},
            icon: <Star size={16} />,
            colorTitle: "yellow"
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu com ícone personalizado (três pontos) e ação em amarelo para favoritar."
      }
    }
  }
};

export const WithGroupTitles: Story = {
  args: {
    menu: [
      {
        title: "Ações de Arquivo",
        actions: [
          {
            label: "Salvar",
            onClick: () => {},
            icon: <Save size={16} />
          },
          {
            label: "Baixar",
            onClick: () => {},
            icon: <Download size={16} />
          },
          {
            label: "Compartilhar",
            onClick: () => {},
            icon: <Share size={16} />
          }
        ]
      },
      {
        title: "Configurações",
        actions: [
          {
            label: "Editar",
            onClick: () => {},
            icon: <Edit size={16} />
          },
          {
            label: "Configurações",
            onClick: () => {},
            icon: <Settings size={16} />
          }
        ]
      },
      {
        title: "Ações Perigosas",
        actions: [
          {
            label: "Excluir",
            onClick: () => {},
            icon: <Trash2 size={16} />,
            colorTitle: "red"
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu com títulos de grupos para organizar ações. Inclui ações de arquivo, configurações e uma ação perigosa de exclusão."
      }
    }
  }
};

export const WithDisabledActions: Story = {
  args: {
    menu: [
      {
        actions: [
          {
            label: "Editar",
            onClick: () => {},
            icon: <Edit size={16} />
          },
          {
            label: "Copiar (Desabilitado)",
            onClick: () => {},
            icon: <Copy size={16} />,
            disabled: true
          },
          {
            label: "Compartilhar",
            onClick: () => {},
            icon: <Share size={16} />
          },
          {
            label: "Excluir (Desabilitado)",
            onClick: () => {},
            icon: <Trash2 size={16} />,
            disabled: true
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu com ações desabilitadas. As ações de copiar e excluir estão desabilitadas, indicando que não podem ser executadas."
      }
    }
  }
};

export const SimpleMenu: Story = {
  args: {
    menu: [
      {
        actions: [
          {
            label: "Perfil",
            onClick: () => {},
            icon: <User size={16} />
          },
          {
            label: "Configurações",
            onClick: () => {},
            icon: <Settings size={16} />
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu simples com duas ações: perfil e configurações, cada uma com seu respectivo ícone."
      }
    }
  }
};

export const WithoutIcons: Story = {
  args: {
    menu: [
      {
        title: "Opções",
        actions: [
          {
            label: "Opção 1",
            onClick: () => {}
          },
          {
            label: "Opção 2",
            onClick: () => {}
          },
          {
            label: "Opção 3",
            onClick: () => {}
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story: "Menu sem ícones, apenas com texto nas ações."
      }
    }
  }
};

export const WithColorVariants: Story = {
  args: {
    menu: [
      {
        title: "Ações por Cor",
        actions: [
          {
            label: "Ação Primária",
            onClick: () => {},
            icon: <Star size={16} />,
            colorTitle: "primary"
          },
          {
            label: "Ação de Sucesso",
            onClick: () => {},
            icon: <Download size={16} />,
            colorTitle: "green"
          },
          {
            label: "Ação de Aviso",
            onClick: () => {},
            icon: <Settings size={16} />,
            colorTitle: "yellow"
          },
          {
            label: "Ação de Perigo",
            onClick: () => {},
            icon: <Trash2 size={16} />,
            colorTitle: "red"
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstração de todas as variantes de cores disponíveis: primary, green, yellow e red."
      }
    }
  }
};

export const WithHiddenActions: Story = {
  args: {
    menu: [
      {
        title: "Visibilidade Condicional",
        actions: [
          {
            label: "Sempre Visível",
            onClick: () => {},
            icon: <Eye size={16} />
          },
          {
            label: "Ação Oculta",
            onClick: () => {},
            icon: <Settings size={16} />,
            hidden: true
          },
          {
            label: "Outra Visível",
            onClick: () => {},
            icon: <Share size={16} />
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          "Exemplo com ações condicionalmente visíveis. A ação do meio está oculta."
      }
    }
  }
};

export const ComplexMenu: Story = {
  args: {
    trigger: <Settings cursor="pointer" />,
    menu: [
      {
        title: "Ações Principais",
        actions: [
          {
            label: "Editar Item",
            onClick: () => {},
            icon: <Edit size={16} />,
            colorTitle: "primary"
          },
          {
            label: "Duplicar",
            onClick: () => {},
            icon: <Copy size={16} />
          }
        ]
      },
      {
        title: "Compartilhamento",
        actions: [
          {
            label: "Compartilhar Público",
            onClick: () => {},
            icon: <Share size={16} />,
            colorTitle: "green"
          },
          {
            label: "Baixar",
            onClick: () => {},
            icon: <Download size={16} />
          }
        ]
      },
      {
        title: "Ações Perigosas",
        actions: [
          {
            label: "Excluir",
            onClick: () => {},
            icon: <Trash2 size={16} />,
            colorTitle: "red"
          },
          {
            label: "Excluir Permanente",
            onClick: () => {},
            icon: <Trash2 size={16} />,
            colorTitle: "red",
            disabled: true
          }
        ]
      }
    ]
  },
  parameters: {
    docs: {
      description: {
        story:
          "Menu complexo com múltiplos grupos, diferentes cores e uma ação desabilitada."
      }
    }
  }
};
