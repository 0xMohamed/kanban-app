import { Draggable } from '@hello-pangea/dnd';
import Avatar from '../../utils/Avatar';
import { ReactComponent as DoneIcon } from '@assets/images/done.svg';
import { openModal } from '@/store/modalSlice';
import { useAppDispatch } from '@/store/hooks';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Task as T } from '@/types/types';
import { useDarkMode } from 'usehooks-ts';

interface TaskProps {
	task: T;
	index: number;
}

export default function Task({ task, index }: TaskProps) {
	const disptach = useAppDispatch();
	const { isDarkMode } = useDarkMode();

	const openTask = () => {
		disptach(openModal('Task'));
	};

	const isTasksCompleted =
		task.subTasks.filter((subTask) => subTask.complete).length === task.subTasks.length;

	return (
		<Draggable draggableId={task.id.toString()} index={index}>
			{(provided, snapshot) => {
				return (
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={`!cursor-pointer space-y-3 rounded-lg ${
							isDarkMode ? 'bg-dark-2 text-grey' : 'bg-white text-blue'
						}  p-4`}
						onClick={openTask}
					>
						<div>
							{task.tags.map((tag) => {
								return (
									<span
										key={tag.title}
										className='rounded px-2 py-1 text-xs text-white'
										style={{
											backgroundColor: tag.color,
										}}
									>
										{tag.title}
									</span>
								);
							})}
						</div>
						{task.image ? (
							<div className='overflow-hidden rounded-lg'>
								<img
									src={task.image}
									loading='lazy'
									className='h-full w-full object-cover object-center'
								/>
							</div>
						) : null}
						<div className='space-y-1'>
							<h3 className='text-sm '>{task.title}</h3>
							<p className='text-xs text-[#768396]'>{task.description}</p>
						</div>
						<div>
							<span className='rounded border border-[#E2E2E2] px-2 py-1 text-xs '>
								{task.date}
							</span>
						</div>
						<div className='flex items-center justify-between'>
							<div className='flex -space-x-1.5'>
								{task.users.map((user) => {
									return (
										<Avatar
											userId={user.id}
											value={user.firstName + ' ' + user.lastName}
											small
											key={user.id}
										/>
									);
								})}
							</div>
							<div
								className={`flex items-center gap-x-1 text-sm ${
									isTasksCompleted ? 'text-green' : 'text-[#768396]'
								}`}
							>
								<IoIosCheckmarkCircleOutline
									size={'1.7rem'}
									// className={isTasksCompleted ? ' rounded-full bg-green text-white' : ''}
								/>
								<span>
									{task.subTasks.filter((subTask) => subTask.complete).length}/
									{task.subTasks.length}
								</span>
							</div>
						</div>
					</div>
				);
			}}
		</Draggable>
	);
}
