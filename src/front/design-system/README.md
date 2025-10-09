# Design System Library

A modern, type-safe React component library built with Shadcn/UI, Tailwind CSS, and TypeScript.

## 🚀 Features

- ✅ **Type-safe** - Built with TypeScript for better developer experience
- 🎨 **Customizable** - Fully customizable theme with design tokens
- 📦 **Tree-shakeable** - Import only what you need
- ♿ **Accessible** - WCAG 2.1 AA compliant components
- 📚 **Well documented** - Comprehensive Storybook documentation
- 🧪 **Tested** - Unit tests with Jest and React Testing Library
- 🎯 **Based on Shadcn/UI** - Beautiful, accessible components

## 📦 Installation

```bash
npm install @myorg/design-system
# or
yarn add @myorg/design-system
# or
pnpm add @myorg/design-system
```

## 🎯 Quick Start

### 1. Import styles

Import the global styles in your app entry point:

```tsx
import '@myorg/design-system/dist/style.css'
```

### 2. Use components

```tsx
import { Button, Card, Input } from '@myorg/design-system'

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  )
}
```

## 📚 Components

### Button

Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@myorg/design-system'

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
```

### Input

Text input component with validation support.

```tsx
import { Input } from '@myorg/design-system'

<Input type="text" placeholder="Enter text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
```

### Card

Container component for grouping related content.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@myorg/design-system'

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>
```

## 🎨 Theming

The design system includes a comprehensive theming system based on design tokens.

### Design Tokens

```tsx
import { colors, tokens } from '@myorg/design-system'

// Access color tokens
colors.light.primary
colors.dark.background

// Access spacing, typography, etc.
tokens.spacing.md
tokens.fontSize.lg
tokens.borderRadius.md
```

### Customizing Theme

You can extend the Tailwind theme in your project:

```js
// tailwind.config.js
module.exports = {
  presets: [
    require('@myorg/design-system/tailwind.config')
  ],
  theme: {
    extend: {
      // Your custom theme
    }
  }
}
```

## 🧪 Development

### Install dependencies

```bash
npm install
```

### Run Storybook

```bash
npm run storybook
```

### Run tests

```bash
npm test
npm run test:watch
npm run test:coverage
```

### Build

```bash
npm run build
```

## 📖 Documentation

Full documentation and interactive examples are available in Storybook:

```bash
npm run storybook
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📝 License

MIT © [Your Organization]

## 🔗 Links

- [Storybook](https://your-storybook-url.com)
- [Documentation](https://your-docs-url.com)
- [GitHub](https://github.com/yourorg/design-system)
