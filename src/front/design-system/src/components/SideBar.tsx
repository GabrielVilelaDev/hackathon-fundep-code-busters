"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import React from "react";

export interface MenuOptionsProps {
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: VoidFunction;
  disabled?: boolean;
}

export interface MenuGroupProps {
  title?: string;
  items: MenuOptionsProps[];
}

export function Sidebar({
  MenuOptions,
}: {
  MenuOptions: MenuGroupProps[];
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>(
    Object.fromEntries(MenuOptions.map((_, index) => [index, true]))
  );

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleGroup = (groupIndex: number) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupIndex]: !prev[groupIndex]
    }));
  };

  return (
    <aside
      className={`
        relative h-100vh bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 
        border-r border-border/40 transition-width duration-300 ease-in-out
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
            {MenuOptions.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-2">
                {group.title && (
                  <Button
                    variant="ghost"
                    onClick={() => toggleGroup(groupIndex)}
                    className={`
                      w-full mb-1 hover:bg-muted/50 relative group
                      ${isCollapsed
                        ? "justify-center px-2"
                        : "justify-between px-2 md:px-3"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between w-full">
                      <Label 
                        className={`
                          text-xs text-muted-foreground font-semibold uppercase tracking-wider cursor-pointer
                          ${isCollapsed ? "hidden" : "hidden md:inline"}
                        `}
                      >
                        {group.title}
                      </Label>
                      {/* Mobile and collapsed: Show first letter */}
                      <Label className={`text-xs text-muted-foreground font-semibold uppercase tracking-wider cursor-pointer ${isCollapsed ? "block md:block" : "md:hidden"}`}>
                        {group.title.charAt(0)}
                      </Label>
                      <ChevronDown 
                        className={`
                          h-4 w-4 transition-transform duration-200
                          ${expandedGroups[groupIndex] ? "rotate-180" : ""}
                          ${isCollapsed ? "hidden" : "hidden md:block"}
                        `}
                      />
                    </div>
                    
                    {/* Tooltip on hover for collapsed state (desktop) */}
                    {isCollapsed && (
                      <div className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {group.title}
                      </div>
                    )}
                    
                    {/* Tooltip on hover (mobile) */}
                    <div className="md:hidden absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {group.title}
                    </div>
                  </Button>
                )}
                {(!group.title || expandedGroups[groupIndex]) && group.items.map((menu, index) => (
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
                    {/* Always show icon (mobile and desktop) */}
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

                    {/* Desktop expanded: Show full label */}
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

                    {/* Tooltip on hover for collapsed state (desktop) */}
                    {isCollapsed && (
                      <div className="hidden md:block absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                        {menu.label}
                      </div>
                    )}

                    {/* Tooltip on hover (mobile) */}
                    <div className="md:hidden absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-sm rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {menu.label}
                    </div>
                  </Button>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}