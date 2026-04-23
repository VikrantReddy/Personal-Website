# Vikrant Reddy - Portfolio

A modern, conversational portfolio built with React and LLM integration. Powered by Gravity OS, an AI agent that provides interactive insights into my work and expertise.

## Features

- **Interactive Chat Interface** - Explore my portfolio through natural conversation
- **LLM Integration** - Powered by Gravity OS for intelligent responses
- **Real-time Streaming** - Live response streaming for smooth UX
- **Multi-turn Conversations** - Full conversation history and context awareness
- **Modern Design** - Clean, responsive UI built with Tailwind CSS

## Tech Stack

- **Frontend**: Vite, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn-ui
- **State Management**: React Hooks, React Query
- **AI**: LLM backend integration with streaming responses
- **Deployment**: GitHub Pages

## Getting Started

### Prerequisites

- Node.js & npm installed ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd Personal-Website

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```sh
npm run build
```

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatInterface/  # Main chat UI
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── pages/              # Page components
├── types/              # TypeScript types
└── App.tsx             # Main app component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

The project is deployed to GitHub Pages automatically on push via GitHub Actions.

### Custom Domain

To set up a custom domain, configure it in your GitHub repository settings under Pages.

## License

All rights reserved © Vikrant Reddy
