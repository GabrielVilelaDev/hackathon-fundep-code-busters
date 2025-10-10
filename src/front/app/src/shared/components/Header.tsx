
import { LogOut, Moon, Sun, User } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { ActionMenu } from "@design-system";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { toggleTheme, theme } = useTheme();
  const navigate = useNavigate()
  const isDarkMode = theme === "dark";

  const menu = [
    {
      title: "Configurations",
      actions: [
        {
          label: isDarkMode ? "Modo Claro" : "Modo Escuro",
          icon: isDarkMode ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          ),
          onClick: toggleTheme,
        },
      ],
    },
    {
      title: "Sair",
      actions: [
        {
          label: "Sair",
          icon: <LogOut className="h-4 w-4" />,
          onClick: () => {
            navigate("/login")
          },
        },
      ],
    },
  ];

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 min-h-16">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-sm">
                G
              </span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">
              GPF 2.0
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ActionMenu
            trigger={
              <User className="h-4 w-4 text-primary" />
            }
            menu={menu}
          />
        </div>
      </div>
    </header>
  );
}