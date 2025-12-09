import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Avatar from '../../utils/Avatar';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Task as T } from '@/types/types';
import { useDarkMode } from 'usehooks-ts';
import { useModalStore } from '@/store/modal';
import React from 'react';

interface TaskProps {
	task: T;
	columnId?: '';
	overlay?: boolean;
}

function TaskComponent({ task, columnId, overlay = false }: TaskProps) {
	const { open } = useModalStore();
	const { isDarkMode } = useDarkMode();

	const taskId = task.id;

	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
		id: `task-${task.id}`,
	});

	// تحسين الحركة وتقليل flicker
	const style = {
		transform: CSS.Transform.toString(
			transform
				? { ...transform, scaleX: isDragging ? 1.03 : 1, scaleY: isDragging ? 1.03 : 1 }
				: null,
		),
		transition: transition || 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1)',
		opacity: isDragging && !overlay ? 0.7 : 1,
		zIndex: isDragging ? 999 : 'auto',
		cursor: 'grab',
		backfaceVisibility: 'hidden', // يقلل flicker أثناء transform
	};

	const isTasksCompleted = task.subTasks.filter((s) => s.complete).length === task.subTasks.length;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			onClick={() => open('Task', columnId, taskId)}
			className={`space-y-3 rounded-lg p-4 shadow-sm ${
				isDarkMode ? 'bg-dark-2 text-grey' : 'bg-white text-blue'
			}`}
		>
			{/* Tags */}
			<div className='flex gap-x-2 overflow-auto'>
				{task.tags.map((tag) => (
					<span
						key={tag.title}
						className='rounded px-2 py-1 text-xs text-white'
						style={{ backgroundColor: tag.color }}
					>
						{tag.title}
					</span>
				))}
			</div>

			{/* Image */}
			{task.image && (
				<div
					className='w-full overflow-hidden rounded-lg'
					style={{
						backgroundImage: `url(${task.image})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						aspectRatio: task.aspectRatio,
					}}
				></div>
			)}

			{/* Title & Description */}
			<div className='space-y-1'>
				<h3 className='text-sm'>{task.title}</h3>
				<p className='text-xs text-[#768396]'>{task.description}</p>
			</div>

			{/* Date */}
			<div>
				<span className='rounded border border-[#E2E2E2] px-2 py-1 text-xs'>{task.date}</span>
			</div>

			{/* Users & Subtasks */}
			<div className='flex items-center justify-between'>
				<div className='flex -space-x-1.5'>
					{task.users.map((user) => (
						<Avatar id={user.id} value={user.firstName + ' ' + user.lastName} small key={user.id} />
					))}
				</div>

				<div
					className={`flex items-center gap-x-1 text-sm ${
						isTasksCompleted ? 'text-green' : 'text-[#768396]'
					}`}
				>
					<IoIosCheckmarkCircleOutline size='1.7rem' />
					<span>
						{task.subTasks.filter((s) => s.complete).length}/{task.subTasks.length}
					</span>
				</div>
			</div>
		</div>
	);
}

// React.memo لتجنب rerender غير ضروري
export default React.memo(TaskComponent);
