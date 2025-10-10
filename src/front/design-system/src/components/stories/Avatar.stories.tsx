import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
};

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="invalid-url" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  )
};

export const OnlyFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  )
};

export const CustomSize: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar className="size-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="Small" />
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      <Avatar className="size-8">
        <AvatarImage src="https://github.com/shadcn.png" alt="Medium" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <Avatar className="size-12">
        <AvatarImage src="https://github.com/shadcn.png" alt="Large" />
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
      <Avatar className="size-16">
        <AvatarImage src="https://github.com/shadcn.png" alt="XLarge" />
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  )
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-4">
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/shadcn.png" alt="User 1" />
        <AvatarFallback>U1</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarImage src="https://github.com/vercel.png" alt="User 2" />
        <AvatarFallback>U2</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>U3</AvatarFallback>
      </Avatar>
      <Avatar className="border-2 border-background">
        <AvatarFallback>U4</AvatarFallback>
      </Avatar>
    </div>
  )
};
