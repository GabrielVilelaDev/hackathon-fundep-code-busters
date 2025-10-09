"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export interface MenuOptionsProps {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: VoidFunction;
  disabled?: boolean;
}

export function Sidebar({
  MenuOptions,
}: {
  MenuOptions: MenuOptionsProps[];
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <aside
      className={`
        relative h-100vh bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
        border-r border-border/40 transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-16" : "w-16 md:w-64"}
      `}
    >
      <button
        onClick={toggleSidebar}
        className="hidden md:flex absolute -right-3 top-6 z-10 w-6 h-6 bg-background border border-border/40 rounded-full items-center justify-center hover:bg-muted/50 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </button>

      <div className="flex flex-col h-full">
        <div className="flex-1 h-full p-3 md:p-4 pt-6">
          <nav className="space-y-1">
            {MenuOptions.map((menu, index) => (
              <Button
                key={index}
                className={`
                  w-full group relative transition-all duration-200
                  ${isCollapsed
                    ? "justify-center px-2"
                    : "justify-center md:justify-start px-2 md:px-3"
                  }
                  ${menu.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-muted/50"
                  }
                `}
                variant="ghost"
                onClick={menu.onClick}
                title={menu.label}
                disabled={menu.disabled}
              >
                {menu.icon && (
                  <menu.icon
                    className={`
                    h-5 w-5 flex-shrink-0 transition-colors
                    ${menu.disabled
                        ? "text-muted-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                      }
                    ${!isCollapsed ? "md:mr-3" : ""}
                  `}
                  />
                )}

                <span
                  className={`
                  font-medium transition-all duration-200
                  ${isCollapsed ? "hidden" : "hidden md:inline"}
                  ${menu.disabled
                      ? "text-muted-foreground"
                      : "group-hover:text-foreground"
                    }
                `}
                >
                  {menu.label}
                </span>

                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {menu.label}
                  </div>
                )}
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}