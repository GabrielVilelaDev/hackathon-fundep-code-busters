import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "../ui/separator";

const meta = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  )
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center space-x-4 text-sm">
      <div>Item 1</div>
      <Separator orientation="vertical" />
      <div>Item 2</div>
      <Separator orientation="vertical" />
      <div>Item 3</div>
      <Separator orientation="vertical" />
      <div>Item 4</div>
    </div>
  )
};

export const InText: Story = {
  render: () => (
    <div className="w-[300px]">
      <h1 className="text-2xl font-bold">Section Title</h1>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">
        This is some content below the separator. You can use separators to
        visually divide different sections of your UI.
      </p>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">
        Here's another section with more content.
      </p>
    </div>
  )
};

export const InList: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold">Item 1</h3>
          <p className="text-sm text-muted-foreground">Description 1</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Item 2</h3>
          <p className="text-sm text-muted-foreground">Description 2</p>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Item 3</h3>
          <p className="text-sm text-muted-foreground">Description 3</p>
        </div>
      </div>
    </div>
  )
};

export const WithCustomColors: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <h3 className="font-semibold">Default</h3>
        <Separator className="my-2" />
      </div>
      <div>
        <h3 className="font-semibold">Primary</h3>
        <Separator className="my-2 bg-primary" />
      </div>
      <div>
        <h3 className="font-semibold">Destructive</h3>
        <Separator className="my-2 bg-destructive" />
      </div>
    </div>
  )
};
