import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import ColumnHeader from './ColumnHeader';
import { Column as Col } from '@/types/types';

interface ColumnProps {
	column: Col;
}

export default function Column({ column }: ColumnProps) {
	return (
		<div className='space-y-4'>
			<ColumnHeader title={column.title} />
			<Droppable droppableId={column.id.toString()}>
				{(provided, snapshot) => {
					return (
						<div ref={provided.innerRef} {...provided.droppableProps} className='space-y-4'>
							{column.tasks.map((task, index) => {
								return <Task key={task.id} task={task} index={index} />;
							})}
						</div>
					);
				}}
			</Droppable>
		</div>
	);
}
