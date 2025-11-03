# Travel4All

A modern travel companion built with Next.js and Tailwind CSS.

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- 🚀 Next.js 15 with App Router (stable)
- 🎨 Tailwind CSS for styling
- 📱 Responsive design
- ⚡ TypeScript support
- ✨ ESLint + Prettier for code quality
- 🎣 Husky Git hooks for automated checks
- 🖼️ Optimized image handling

## Code Quality

This project uses a robust code quality setup:

- **ESLint**: Catches errors and enforces best practices
- **Prettier**: Ensures consistent code formatting
- **TypeScript**: Type safety across the application
- **Husky**: Git hooks that run automatically:
  - **Pre-commit**: Lints and formats staged files
  - **Pre-push**: Runs type checking and linting on entire codebase

### Available Scripts

```bash
npm run lint          # Check for linting errors
npm run lint:fix      # Fix linting errors automatically
npm run format        # Format all files with Prettier
npm run format:check  # Check if files are formatted
npm run type-check    # Check TypeScript types
```

📖 For detailed information, see [LINTING.md](./LINTING.md)

## Project Structure

```
├── app/
│   ├── globals.css      # Global styles with Tailwind directives
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Home page component
│   └── login/
│       └── page.tsx     # Login page component
├── components/          # Reusable UI components
│   ├── Header/          # Header component
│   ├── Hero/            # Hero section component
│   ├── MissionSection/  # Mission and values section
│   ├── Destinations/    # Destination-related components
│   ├── WeekendDeals/    # Weekend deals components
│   ├── Footer/          # Footer component
│   ├── Login/           # Login component
│   └── index.ts         # Component exports
├── types/               # TypeScript type definitions
│   └── index.ts         # Main types file
├── lib/                 # Utility functions and constants
│   └── constants.ts     # Application constants
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - learn about TypeScript
