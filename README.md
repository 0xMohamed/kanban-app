# Kanban App

## Description

Kanban App is a modern, user-friendly web application for managing tasks and projects using the Kanban methodology. It allows individuals and teams to organize work into boards, columns, and tasks, visualize progress, and collaborate efficiently. The app supports multiple boards, customizable columns, drag-and-drop task management, and more.

## Features

- **Multiple Boards**: Create and manage multiple project boards, each with its own columns and tasks.
- **Customizable Columns**: Add, rename, or remove columns (e.g., Backlog, To Do, In Progress, Review, Done) to fit your workflow.
- **Task Management**: Add, edit, and delete tasks within columns. Tasks support descriptions, tags, subtasks, due dates, and user assignments.
- **Drag-and-Drop**: Move tasks between columns or reorder them within a column using intuitive drag-and-drop powered by dnd-kit.
- **Board Overview**: View all your boards at a glance from the Home page, including key stats (columns, tasks).
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.
- **Quick Add**: Easily add new boards, columns, and tasks with minimal clicks.
- **Rich UI Components**: Utilizes a modern component library and icon set for a polished user experience.


## Technologies & Libraries

### Front-end
- **React**: For building user interfaces
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast and modern build tool
- **React Router DOM**: Client-side routing

### State Management
- **Zustand**: Lightweight state management

### Styling & UI
- **Tailwind CSS**: Utility-first CSS framework
- **React Icons**: Icon library

### Features & Utilities
- **dnd-kit**: Drag-and-drop toolkit
- **React Hook Form**: Form management
- **usehooks-ts**: Useful React hooks
- **Jest**: Testing framework
- **Prettier & ESLint**: Code formatting and linting

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/0xMohamed/kanban-app.git
   cd kanban-app
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Run the app locally:**
   ```sh
   npm run start
   # or
   yarn start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

4. **Build for production:**
   ```sh
   npm run build
   # or
   yarn build
   ```

5. **Run tests:**
   ```sh
   npm run test
   # or
   yarn test
   ```

## Usage

1. **Home Page:**
   - View all your boards and create a new board.
2. **Board Page:**
   - View columns and tasks for the selected board.
   - Drag and drop tasks between columns.
   - Add new columns or tasks as needed.
   - Click a task to view and edit details (description, tags, subtasks, etc.).
3. **Dark/Light Mode:**
   - Toggle the theme using the UI switch.

_Example:_
- Create a new board for your project.
- Add columns such as "Backlog", "To Do", "In Progress", "Review", and "Done".
- Add tasks to columns, set descriptions, assign users, and use drag-and-drop to move tasks as work progresses.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Open a Pull Request

Please follow the existing code style, write clear commit messages, and add tests for new features when possible.

## License

This project is licensed under the MIT License.