import type { Meta, StoryObj } from '@storybook/react'
import { Input } from '../src/components/ui/input'

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date'],
    },
    placeholder: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const WithValue: Story = {
  args: {
    placeholder: 'With value',
    defaultValue: 'This is a value',
  },
}

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
  },
}

export const Number: Story = {
  args: {
    type: 'number',
    placeholder: '0',
  },
}

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="email-input" className="text-sm font-medium">
        Email
      </label>
      <Input {...args} id="email-input" />
    </div>
  ),
  args: {
    type: 'email',
    placeholder: 'john@example.com',
  },
}

export const WithHelperText: Story = {
  render: (args) => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <label htmlFor="password-input" className="text-sm font-medium">
        Password
      </label>
      <Input {...args} id="password-input" />
      <p className="text-sm text-muted-foreground">
        Your password must be at least 8 characters.
      </p>
    </div>
  ),
  args: {
    type: 'password',
    placeholder: '••••••••',
  },
}
