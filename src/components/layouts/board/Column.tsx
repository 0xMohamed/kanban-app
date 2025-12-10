import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Task from './Task';
import ColumnHeader from './ColumnHeader';
import { Column as Col } from '@/types/types';

interface ColumnProps {
	column: Col;
}

export default function Column({ column }: ColumnProps) {
	const { setNodeRef } = useDroppable({
		id: `column-${column.id}`,
	});

	return (
		<div className='space-y-4'>
			<ColumnHeader title={column.title} columnId={column.id} />

			<SortableContext
				items={column.tasks.map((t) => `task-${t.id}`)}
				strategy={verticalListSortingStrategy}
			>
				<div className='h-full space-y-4 ' ref={setNodeRef}>
					{column.tasks.map((task) => (
						<Task key={task.id} task={task} columnId={column.id} />
					))}
				</div>
			</SortableContext>
		</div>
	);
}
