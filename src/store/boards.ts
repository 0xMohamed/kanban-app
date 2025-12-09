import { create } from 'zustand';
import { Board, Task } from '@/types/types';
import { initialBoards } from '../constants/data';

interface BoardStore {
	boards: Board[];
	getBoardById: (id: string) => Board | undefined;
	updateBoard: (id: string, updated: Board) => void;

	addBoard: (title: string) => void;
	deleteBoard: (id: string) => void;

	addColumn: (boardId: string, title: string) => void;
	deleteColumn: (boardId: string, columnId: string) => void;
	editColumn: (boardId: string, columnId: string, title: string) => void;

	addTask: (boardId: string, columnId: string, task: Task) => void;
	deleteTask: (boardId: string, columnId: string, taskId: string) => void;
	editTask: (boardId: string, columnId: string, taskId: string, task: Task) => void;
	getTask: (boardId: string, columnId: string, taskId: string) => Task | undefined;
}

export const useBoardsStore = create<BoardStore>()((set, get) => ({
	boards: initialBoards,

	getBoardById: (id) => {
		return get().boards.find((b) => b.id === id);
	},

	updateBoard: (id, updatedBoard) =>
		set(() => ({
			boards: get().boards.map((b) => (b.id === id ? updatedBoard : b)),
		})),

	addBoard: (title: string) =>
		set((state) => ({
			boards: [
				...state.boards,
				{
					id: crypto.randomUUID(),
					title,
					icon: '🔥',
					columns: [
						{ id: crypto.randomUUID(), title: 'backlog', tasks: [] },
						{ id: crypto.randomUUID(), title: 'to do', tasks: [] },
						{ id: crypto.randomUUID(), title: 'in progress', tasks: [] },
						{ id: crypto.randomUUID(), title: 'review', tasks: [] },
						{ id: crypto.randomUUID(), title: 'done', tasks: [] },
					],
				},
			],
		})),

	deleteBoard: (id: string) =>
		set((state) => ({
			boards: state.boards.filter((board) => board.id !== id),
		})),

	addColumn: (boardId: string, title: string) =>
		set((state) => ({
			boards: state.boards.map((board) =>
				board.id === boardId
					? { ...board, columns: [...board.columns, { id: crypto.randomUUID(), title, tasks: [] }] }
					: board,
			),
		})),

	deleteColumn: (boardId: string, columnId: string) =>
		set((state) => ({
			boards: state.boards.map((board) =>
				board.id === boardId
					? { ...board, columns: board.columns.filter((col) => col.id !== columnId) }
					: board,
			),
		})),

	editColumn: (boardId: string, columnId: string, title: string) =>
		set((state) => ({
			boards: state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.map((col) => (col.id === columnId ? { ...col, title } : col)),
					  }
					: board,
			),
		})),

	addTask: (boardId: string, columnId: string, task: Task) =>
		set((state) => ({
			boards: state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.map((column) =>
								column.id === columnId ? { ...column, tasks: [...column.tasks, task] } : column,
							),
					  }
					: board,
			),
		})),

	deleteTask: (boardId: string, columnId: string, taskId: string) =>
		set((state) => ({
			boards: state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.map((column) =>
								column.id === columnId
									? { ...column, tasks: column.tasks.filter((task) => task.id !== taskId) }
									: column,
							),
					  }
					: board,
			),
		})),

	editTask: (boardId: string, columnId: string, taskId: string, task: Task) =>
		set((state) => ({
			boards: state.boards.map((board) =>
				board.id === boardId
					? {
							...board,
							columns: board.columns.map((column) =>
								column.id === columnId
									? {
											...column,
											tasks: column.tasks.map((t) => (t.id === taskId ? { ...t, ...task } : t)),
									  }
									: column,
							),
					  }
					: board,
			),
		})),

	getTask: (boardId: string, columnId: string, taskId: string) => {
		const board = get().boards.find((b) => b.id === boardId);
		if (!board) return undefined;

		const column = board.columns.find((c) => c.id === columnId);
		if (!column) return undefined;

		return column.tasks.find((t) => t.id === taskId);
	},
}));
