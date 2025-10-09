import React from "react";
import { cva } from "class-variance-authority";
import { Menu } from "lucide-react";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import type { MenuProps } from "@/types";

export interface ActionMenuProps {
  trigger?: React.ReactNode;
  menu: MenuProps[];
}

const buttonsVariants = cva(
  "w-full justify-start border-none shadow-none disabled:bg-transparent disabled:cursor-not-allowed disabled:shadow-none disabled:border-none",
  {
    variants: {
      variant: {
        primary: "text-primary hover:text-primary-dark",
        red: "text-red-500 hover:text-red-600",
        green: "text-green-500 hover:text-green-600",
        yellow: "text-yellow-500 hover:text-yellow-600",
        default: ""
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export function ActionMenu({ menu, trigger }: ActionMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="group">
          {trigger ? (
            trigger
          ) : (
            <Menu className="cursor-pointer text-primary-foreground" />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-60"
        onOpenAutoFocus={(e: Event) => e.preventDefault()}
      >
        {menu?.map((menu, index) => (
          <React.Fragment key={index}>
            {menu.title && (
              <div className="flex flex-1 items-center gap-1">
                <Separator className="my-2 flex-1" />
                <Label className="text-sm text-muted-foreground">
                  {menu.title}
                </Label>
                <Separator className="my-2 flex-1" />
              </div>
            )}
            <div className="flex flex-col gap-2">
              {menu.actions?.map((action, actionIndex) =>
                action.hidden ? null : (
                  <Button
                    key={actionIndex}
                    className={buttonsVariants({ variant: action.colorTitle })}
                    variant="secondary"
                    size="sm"
                    onClick={action.onClick}
                    disabled={action.disabled}
                    icon={action.icon}
                  >
                    {action.label}
                  </Button>
                )
              )}
            </div>
          </React.Fragment>
        ))}
      </PopoverContent>
    </Popover>
  );
}
