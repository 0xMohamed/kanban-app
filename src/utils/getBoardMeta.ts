import { Column } from '@/types/types';

export function getBoardMeta(board: { columns: Column[] }) {
	const columnCount = board.columns.length;
	const taskCount = board.columns.reduce((sum: number, col: Column) => sum + col.tasks.length, 0);

	return { columnCount, taskCount };
}
