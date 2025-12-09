import { useMemo, useState } from 'react';
import {
	DndContext,
	closestCenter,
	PointerSensor,
	KeyboardSensor,
	useSensor,
	useSensors,
	DragOverlay,
	pointerWithin,
} from '@dnd-kit/core';

import Column from '@/components/layouts/board/Column';
import NewColumnButton from '@/components/layouts/board/NewColumnButton';
import BoardHeader from '@/components/layouts/board/BoardHeader';
import { useDarkMode } from 'usehooks-ts';
import { useParams } from 'react-router-dom';
import { useBoardsStore } from '@/store/boards';
import { Task as T } from '@/types/types';
import Task from '@/components/layouts/board/Task';

export default function Board() {
	const { boardId } = useParams();
	const { getBoardById, updateBoard } = useBoardsStore();

	const board = getBoardById(boardId!);
	const { isDarkMode } = useDarkMode();
	const [activeTask, setActiveTask] = useState<T | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 5,
			},
		}),
	);

	if (!board) return <div>Board not found</div>;

	const handleDragStart = (event: any) => {
		const taskId = event.active.id.replace('task-', '');
		const task = board!.columns.flatMap((c) => c.tasks).find((t) => t.id === taskId);

		setActiveTask(task || null);
	};

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		setActiveTask(null);
		if (!over) return;

		const activeId = active.id.replace('task-', '');
		const overId = over.id;

		// Find source column
		const sourceColumn = board.columns.find((col) => col.tasks.find((t) => t.id === activeId));

		if (!sourceColumn) return;

		// Find destination column
		let destColumn;
		let destIndex = 0;

		console.log(overId);

		if (overId === 'new-column') {
			destColumn = {
				id: crypto.randomUUID(),
				title: 'New Column',
				tasks: [],
			};
			destIndex = board.columns.length + 1;
			board.columns.push(destColumn);
		}

		if (overId.startsWith('column-')) {
			destColumn = board.columns.find((c) => c.id === overId.replace('column-', ''));
			if (!destColumn) return;
			destIndex = destColumn.tasks.length;
		}

		if (overId.startsWith('task-')) {
			const taskId = overId.replace('task-', '');
			destColumn = board.columns.find((c) => c.tasks.find((t) => t.id === taskId));
			if (!destColumn) return;
			destIndex = destColumn.tasks.findIndex((t) => t.id === taskId);
		}

		const activeIndex = sourceColumn.tasks.findIndex((t) => t.id === activeId);
		const [moved] = sourceColumn.tasks.splice(activeIndex, 1);
		destColumn?.tasks.splice(destIndex, 0, moved);

		updateBoard(boardId!, board);
	};

	return (
		<div
			className={`flex h-full flex-col overflow-auto pb-2 pl-56 pr-0 pt-8 capitalize ${
				isDarkMode ? 'text-white' : 'text-black'
			}`}
		>
			<BoardHeader boardTitle={board.title} boardIcon={board.icon} />
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
			>
				<div
					style={{
						gridTemplateColumns: 'repeat(auto-fill,minmax(16.5rem,1fr))',
						gridAutoFlow: 'column',
						gridAutoColumns: 'minmax(16.5rem,1fr)',
					}}
					className='no-scrollbar grid gap-x-6 overflow-auto px-8 pt-4'
				>
					{board.columns.map((column) => (
						<Column key={column.id} column={column} />
					))}
					<NewColumnButton />
				</div>

				<DragOverlay
					dropAnimation={{
						duration: 250,
						easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
					}}
				>
					{activeTask ? <Task task={activeTask} overlay /> : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
}
