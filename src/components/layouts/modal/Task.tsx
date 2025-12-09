import Avatar from '@/components/utils/Avatar';
import { useBoardsStore } from '@/store/boards';
import { useModalStore } from '@/store/modal';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

import { FiTrash2, FiX, FiEdit2 } from 'react-icons/fi';

export default function Task() {
	const { boardId } = useParams();
	const { columnId, taskId, close, open: openModal } = useModalStore();
	const { getTask, deleteTask, editTask } = useBoardsStore();

	const task = getTask(boardId, columnId, taskId);

	const [subTasks, setSubTasks] = useState(task?.subTasks ?? []);

	if (!task) return <div>Task not found</div>;

	// Toggle subtask complete
	const toggleComplete = (id: string) => {
		const updated = subTasks.map((s) => (s.id === id ? { ...s, complete: !s.complete } : s));

		setSubTasks(updated);
		editTask(boardId, columnId, taskId, { subTasks: updated });
	};

	// Edit subtask title
	const editTitle = (id: string, title: string) => {
		const updated = subTasks.map((s) => (s.id === id ? { ...s, title } : s));

		setSubTasks(updated);
		editTask(boardId, columnId, taskId, { subTasks: updated });
	};

	const handleDelete = () => {
		deleteTask(boardId, columnId, taskId);
		close();
	};

	return (
		<div className='flex max-h-[80vh] flex-col gap-5 overflow-y-auto p-5 text-sm'>
			{/* Header */}
			<div className='flex items-start justify-between'>
				<div>
					<h1 className='text-2xl font-bold'>{task.title}</h1>
					<p className='uppercase text-gray-500'>{task.priority}</p>
				</div>

				<div className='flex gap-2'>
					{/* Edit */}
					<button
						onClick={() => openModal('TaskForm')}
						className='bg-blue-500 hover:bg-blue-600 flex items-center justify-center rounded-md p-2 text-white'
						title='Edit Task'
					>
						<FiEdit2 size={18} />
					</button>

					{/* Delete */}
					<button
						onClick={handleDelete}
						className='flex items-center justify-center rounded-md bg-red-500 p-2 text-white hover:bg-red-600'
						title='Delete Task'
					>
						<FiTrash2 size={18} />
					</button>

					{/* Close */}
					<button
						onClick={close}
						className='flex items-center justify-center rounded-md bg-gray-300 p-2 hover:bg-gray-400'
						title='Close'
					>
						<FiX size={18} />
					</button>
				</div>
			</div>

			{/* Image */}
			{task.image && (
				<div
					className='max-h-60 w-full overflow-hidden rounded-lg shadow-sm'
					style={{ aspectRatio: task.aspectRatio }}
				>
					<img src={task.image} alt={task.title} className='h-full w-full object-cover' />
				</div>
			)}

			{/* Description */}
			{task.description && (
				<div className='rounded-lg leading-relaxed'>
					<h2 className='mb-2 text-base font-semibold'>Description</h2>
					<p className='whitespace-pre-line '>{task.description}</p>
				</div>
			)}

			{/* Tags */}
			{task.tags?.length > 0 && (
				<div>
					<h2 className='mb-1 text-base font-semibold'>Tags</h2>
					<div className='flex flex-wrap gap-2'>
						{task.tags.map((tag) => (
							<span
								key={tag.title}
								style={{ backgroundColor: tag.color }}
								className='rounded px-2 py-1 text-xs capitalize text-white'
							>
								{tag.title}
							</span>
						))}
					</div>
				</div>
			)}

			{/* Assignees */}
			{task.users?.length > 0 && (
				<div>
					<h2 className='mb-1 text-base font-semibold'>Assignees</h2>
					<div className='flex gap-2'>
						{task.users.map((user) => (
							<Avatar
								key={user.id}
								id={user.id}
								value={user.firstName + ' ' + user.lastName}
								hover
							/>
						))}
					</div>
				</div>
			)}

			{/* Subtasks (Editable) */}
			{subTasks.length > 0 && (
				<div>
					<h2 className='mb-2 text-base font-semibold'>Sub Tasks</h2>

					<div className='flex flex-col gap-2'>
						{subTasks.map((sub) => (
							<div key={sub.id} className='flex items-center gap-3 rounded-md p-3 shadow-md'>
								{/* Checkbox */}
								<input
									type='checkbox'
									checked={sub.complete}
									onChange={() => toggleComplete(sub.id)}
									className='h-4 w-4 accent-purple'
								/>

								{/* Editable title */}
								<input
									value={sub.title}
									onChange={(e) => editTitle(sub.id, e.target.value)}
									className={`w-full bg-transparent outline-none ${
										sub.complete ? 'text-gray-500 line-through' : 'text-gray-800'
									}`}
								/>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Footer Info */}
			<div className='mt-2 flex flex-col gap-1 text-gray-700'>
				<div>
					<span className='font-semibold'>Due Date: </span>
					{task.date}
				</div>
			</div>
		</div>
	);
}
