# Unilist

A minimal, modern todo list application with a glassmorphism UI and Kanban-style columns.

## Features

- Add new todo items with title and optional description
- Three status columns: Haven't Started, Ongoing, and Completed
- Drag and drop tasks between columns
- Local storage persistence
- Search/filter functionality
- Responsive design for mobile and desktop
- Glassmorphism UI with dark pinkish color palette

## Tech Stack

- React + TypeScript
- Vite
- TailwindCSS
- @dnd-kit for drag and drop
- lucide-react for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm run test
```

## Folder Structure

```
src/
├── components/
│   ├── Column.tsx
│   ├── TodoItem.tsx
│   ├── AddTodoForm.tsx
│   └── SearchBar.tsx
├── __tests__/
│   ├── App.test.tsx
│   ├── TodoItem.test.tsx
│   └── AddTodoForm.test.tsx
├── types.ts
├── setupTests.ts
└── ...
```

## License

MIT