# UI Components Library

A modern, accessible, and customizable React component library built with TypeScript, Tailwind CSS, and Shadcn/ui components.

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Components](#-components)
  - [Button](#button)
  - [Badge](#badge)
  - [Avatar](#avatar)
- [Development](#️-development)
- [License](#-license)

## ⚡ Quick Start

```tsx
import { Button, Badge, Avatar, AvatarImage, AvatarFallback } from 'dgz-ui';

function App() {
  return (
    <div className="space-y-4 p-8">
      <Button>Hello World</Button>
      <Badge variant="secondary">New Feature</Badge>
      <Avatar>
        <AvatarImage src="/avatar.jpg" alt="User" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

## 🚀 Features

- **TypeScript Support** - Full type safety with comprehensive TypeScript definitions
- **Accessibility First** - WCAG compliant components with proper ARIA attributes
- **Shadcn/ui Based** - Built on proven Shadcn/ui patterns and Radix UI primitives
- **Customizable** - Easy theming with Tailwind CSS and CSS variables
- **Copy & Paste Friendly** - Components designed for easy customization and modification

## 📦 Installation

```bash
npm install dgz-ui
# or
yarn add dgz-ui
# or
pnpm add dgz-ui
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react react-dom
```

### Shadcn/ui Setup

This library is built on top of Shadcn/ui. If you're starting fresh, initialize Shadcn/ui in your project:

```bash
npx shadcn-ui@latest init
```

## 📚 Components

### Button

A versatile button component with multiple variants, sizes, and states.

```tsx
import { Button } from 'dgz-ui';

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="secondary">Secondary Button</Button>
<Button variant="tertiary">Tertiary Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Destructive Button</Button>

// With sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
<Button size="icon">🎯</Button>

// With states
<Button disabled>Disabled Button</Button>
<Button loading>Loading Button</Button>
```

**Available Props:**

- `variant`: `'default' | 'destructive' | 'secondary' | 'tertiary' | 'ghost'`
- `size`: `'lg' | 'default' | 'sm' | 'xs' | 'icon'`
- `disabled`: `boolean`
- `asChild`: `boolean` - Render as child component
- All standard HTML button attributes

---

### Badge

A flexible badge component with multiple types, color variants, sizes, and styling options.

```tsx
import { Badge } from 'dgz-ui';

// Basic usage
<Badge>New</Badge>

// Different types
<Badge type="status">Online</Badge>
<Badge type="indicator">5</Badge>
<Badge type="icon">⭐</Badge>

// Color variants (filled)
<Badge variant="blue">Info</Badge>
<Badge variant="green">Success</Badge>
<Badge variant="red">Error</Badge>
<Badge variant="orange">Warning</Badge>
<Badge variant="purple">Premium</Badge>

// Outlined variants
<Badge variant="blue-outlined">Info Outlined</Badge>
<Badge variant="green-outlined">Success Outlined</Badge>
<Badge variant="red-outlined">Error Outlined</Badge>

// Different sizes
<Badge size="sm">Small</Badge>
<Badge size="lg">Large</Badge>

// Different border radius
<Badge rounded="default">Default Rounded</Badge>
<Badge rounded="full">Fully Rounded</Badge>

// Combinations
<Badge
  type="status"
  variant="green"
  size="sm"
  rounded="full"
>
  Active
</Badge>
```

**Available Props:**

- `type`: `'default' | 'status' | 'indicator' | 'icon'`
- `variant`: `'default' | 'gray' | 'blue' | 'cyan' | 'green' | 'lime' | 'orange' | 'red' | 'purple' | 'indigo' | 'default-outlined' | 'gray-outlined' | 'blue-outlined' | 'cyan-outlined' | 'green-outlined' | 'lime-outlined' | 'orange-outlined' | 'red-outlined' | 'purple-outlined' | 'indigo-outlined'`
- `size`: `'sm' | 'lg'`
- `rounded`: `'default' | 'full'`
- `className`: `string` - Additional CSS classes
- All standard HTML span attributes

---

### Avatar

A circular avatar component for displaying user profile images with automatic fallback.

```tsx
import { Avatar, AvatarImage, AvatarFallback } from 'dgz-ui';

// Basic usage
<Avatar>
  <AvatarImage src="/path/to/image.jpg" alt="User name" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

// With sizes
<Avatar size="sm">
  <AvatarImage src="/avatar.jpg" alt="Small avatar" />
  <AvatarFallback>S</AvatarFallback>
</Avatar>

<Avatar size="lg">
  <AvatarImage src="/avatar.jpg" alt="Large avatar" />
  <AvatarFallback>L</AvatarFallback>
</Avatar>

// Custom styling
<Avatar className="border-2 border-blue-500">
  <AvatarImage src="/avatar.jpg" alt="Styled avatar" />
  <AvatarFallback className="bg-blue-100">ST</AvatarFallback>
</Avatar>
```

**Available Props:**

**Avatar:**

- `size`: `'sm' | 'default' | 'md' | 'lg' | 'xl'`
- `className`: `string` - Additional CSS classes

**AvatarImage:**

- `src`: `string` - Image source URL
- `alt`: `string` - Alternative text for accessibility
- `className`: `string` - Additional CSS classes

**AvatarFallback:**

- `className`: `string` - Additional CSS classes
- `children`: `ReactNode` - Fallback content (usually initials)

---

## 🏗️ Development

### Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Testing

```bash
npm run test
# or
yarn test
```

### Building

```bash
npm run build
# or
yarn build
```

## 🤝 Acknowledgments

- [Shadcn/ui](https://ui.shadcn.com/) - For the excellent component patterns and design system
- [Radix UI](https://www.radix-ui.com/) - For the accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) - For the utility-first CSS framework

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Alisher1119/dgz-ui/blob/main/LICENSE) file for details.

## 🐛 Issues

If you encounter any issues or have feature requests, please [create an issue](https://github.com/Alisher1119/dgz-ui/issues) on GitHub.
