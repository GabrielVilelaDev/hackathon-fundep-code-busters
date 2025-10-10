import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Label>Label</Label>
};

export const WithInput: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
    </div>
  )
};

export const Required: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">
        Email <span className="text-red-500">*</span>
      </Label>
      <Input type="email" id="email" placeholder="Email" required />
    </div>
  )
};

export const WithHelper: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="Email" />
      <p className="text-sm text-muted-foreground">
        We'll never share your email with anyone else.
      </p>
    </div>
  )
};

export const Disabled: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email" className="text-muted-foreground">
        Email
      </Label>
      <Input type="email" id="email" placeholder="Email" disabled />
    </div>
  )
};

export const Form: Story = {
  render: () => (
    <form className="grid w-full max-w-sm gap-4">
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" placeholder="Your name" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="message">Message</Label>
        <Input type="text" id="message" placeholder="Your message" />
      </div>
    </form>
  )
};
