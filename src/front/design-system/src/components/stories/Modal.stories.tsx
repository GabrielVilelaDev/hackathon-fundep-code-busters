import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { Modal } from "../Modal";
import { Button } from "../ui/button";

const ModalWrapper = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Abrir Modal</Button>
      <Modal
        {...args}
        open={open}
        onClose={() => {
          setOpen(false);
          args.onClose?.();
        }}
      />
    </div>
  );
};

const meta = {
  title: "Components/Modal",
  component: ModalWrapper,
  parameters: {
    layout: "centered"
  },
  tags: ["autodocs"]
} satisfies Meta<typeof ModalWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Modal Title",
    description: "This is a modal description.",
    content: <div>This is the modal content.</div>,
    onClose: fn()
  }
};

export const WithFooter: Story = {
  args: {
    title: "Confirm Action",
    description: "Are you sure you want to proceed?",
    content: <div>This action cannot be undone.</div>,
    footer: (
      <div className="flex gap-2">
        <Button variant="outline">Cancel</Button>
        <Button>Confirm</Button>
      </div>
    ),
    onClose: fn()
  }
};

export const WithoutDescription: Story = {
  args: {
    title: "Simple Modal",
    content: <div>This modal has no description.</div>,
    onClose: fn()
  }
};

export const WithoutTitle: Story = {
  args: {
    content: <div>This modal has no title or description.</div>,
    onClose: fn()
  }
};

export const LongContent: Story = {
  args: {
    title: "Terms and Conditions",
    description: "Please read carefully",
    content: (
      <div className="space-y-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
        <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
          officia deserunt mollit anim id est laborum.
        </p>
      </div>
    ),
    footer: (
      <div className="flex gap-2">
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </div>
    ),
    onClose: fn()
  }
};

export const FormModal: Story = {
  args: {
    title: "Edit Profile",
    description: "Update your profile information",
    content: (
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded-md p-2 mt-1"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full border rounded-md p-2 mt-1"
            placeholder="your@email.com"
          />
        </div>
      </div>
    ),
    footer: (
      <div className="flex gap-2 w-full justify-end">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    ),
    onClose: fn()
  }
};
