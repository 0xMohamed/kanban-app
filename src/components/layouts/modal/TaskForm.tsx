import { useForm, useFieldArray } from 'react-hook-form';
import Avatar from '@/components/utils/Avatar';
import { Tag, Task } from '@/types/types';
import { tags as tagList } from '@/constants/tags';
import { useUsersStore } from '@/store/users';
import { useDarkMode } from 'usehooks-ts';
import { useBoardsStore } from '@/store/boards';
import { useParams } from 'react-router-dom';
import { useModalStore } from '@/store/modal';

export type FormValues = {
	title: string;
	description: string;
	image: string;
	aspectRatio: string;
	tags: string[];
	users: string[];
	date: string;
	priority: string;
	subTasks: { id: string; title: string; complete: boolean }[];
};

export default function TaskForm() {
	const { boardId } = useParams();
	const { isDarkMode } = useDarkMode();
	const { columnId, taskId, close: clsoeModal } = useModalStore(); // 👈 لازم تضيف openEditTask في modalStore
	const { getTask, addTask, editTask } = useBoardsStore();
	const { users } = useUsersStore();

	const mode = taskId ? 'edit' : 'add';

	const task = getTask(boardId, columnId, taskId);

	console.log(task);

	const initialValues = task ?? undefined;

	const { register, handleSubmit, setValue, watch, control } = useForm<FormValues>({
		defaultValues: {
			title: initialValues?.title || '',
			description: initialValues?.description || '',
			image: initialValues?.image || '',
			aspectRatio: initialValues?.aspectRatio || '4/3',
			date: initialValues?.date || '',
			priority: initialValues?.priority || 'medium',
			tags: initialValues?.tags.map((tag) => tag.title) || [],
			users: initialValues?.users.map((user) => user.id) || [],
			subTasks: initialValues?.subTasks || [],
		},
	});

	const {
		fields: subTasks,
		append,
		remove,
	} = useFieldArray({
		control,
		name: 'subTasks',
	});

	const selectedTags = watch('tags');
	const selectedUsers = watch('users');

	const toggleTag = (tag: Tag) => {
		const updated = selectedTags.includes(tag.title)
			? selectedTags.filter((t) => t !== tag.title)
			: [...selectedTags, tag.title];

		setValue('tags', updated);
	};

	const toggleUser = (id: string) => {
		const updated = selectedUsers.includes(id)
			? selectedUsers.filter((u) => u !== id)
			: [...selectedUsers, id];

		setValue('users', updated);
	};

	const inputBg = isDarkMode ? 'bg-dark-2' : 'bg-white';

	const onSubmit = (data: FormValues) => {
		if (mode === 'edit') {
			const newTask: Task = {
				...data,
				users: selectedUsers.map((id) => users.find((user) => user.id === id)!),
				tags: selectedTags.map((title) => tagList.find((tag) => tag.title === title)!),
			};
			editTask(boardId, columnId, taskId, newTask);
		} else {
			const newTask: Task = {
				id: crypto.randomUUID(),
				...data,
				users: selectedUsers.map((id) => users.find((user) => user.id === id)!),
				tags: selectedTags.map((title) => tagList.find((tag) => tag.title === title)!),
			};
			addTask(boardId, columnId, newTask);
		}

		console.log('saads');

		clsoeModal();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 text-sm'>
			<h1 className='text-xl font-bold'>{mode === 'add' ? 'Create New Task' : 'Edit Task'}</h1>

			{/* Title */}
			<div className='flex flex-col gap-2'>
				<label>Title</label>
				<input {...register('title', { required: true })} className={`${inputBg} rounded p-2`} />
			</div>

			{/* Description */}
			<div className='flex flex-col gap-2'>
				<label>Description</label>
				<textarea {...register('description')} className={`${inputBg} rounded p-2`} />
			</div>

			{/* Image + Aspect Ratio */}
			<div className='flex gap-2'>
				<div className='flex w-1/2 flex-col gap-2'>
					<label>Image</label>
					<input {...register('image')} className={`${inputBg} rounded p-2`} />
				</div>

				<div className='flex w-1/2 flex-col gap-2'>
					<label>Aspect Ratio</label>
					<select {...register('aspectRatio')} className={`${inputBg} rounded p-2`}>
						<option value='2/1'>2/1</option>
						<option value='4/3'>4/3</option>
						<option value='4/5'>4/5</option>
					</select>
				</div>
			</div>

			{/* Tags */}
			<div className='flex flex-col gap-2'>
				<label>Tags</label>
				<div className='flex flex-wrap gap-2'>
					{tagList.map((tag) => (
						<span
							key={tag.title}
							onClick={() => toggleTag(tag)}
							style={{ backgroundColor: tag.color }}
							className={`cursor-pointer rounded px-2 py-1 text-xs text-white ${
								selectedTags.includes(tag.title) ? 'opacity-100' : 'opacity-50'
							}`}
						>
							{tag.title}
						</span>
					))}
				</div>
			</div>

			{/* Users */}
			<div className='flex flex-col gap-2'>
				<label>Assignees</label>

				<div className='no-scrollbar flex gap-2 overflow-x-auto'>
					{users.map((user) => (
						<div
							key={user.id}
							onClick={() => toggleUser(user.id)}
							className={`cursor-pointer rounded-full border-2 ${
								selectedUsers.includes(user.id) ? 'border-purple' : 'border-transparent'
							}`}
						>
							<Avatar id={user.id} value={user.firstName + ' ' + user.lastName} hover />
						</div>
					))}
				</div>
			</div>

			{/* Date */}
			<div className='flex flex-col gap-2'>
				<label>Due Date</label>
				<input type='date' {...register('date')} className={`${inputBg} rounded p-2`} />
			</div>

			{/* Priority */}
			<div className='flex flex-col gap-2'>
				<label>Priority</label>
				<select {...register('priority')} className={`${inputBg} rounded p-2`}>
					<option value='low'>Low</option>
					<option value='medium'>Medium</option>
					<option value='high'>High</option>
				</select>
			</div>

			{/* Subtasks */}
			<div className='flex flex-col gap-2'>
				<label>Subtasks</label>

				<div className='flex flex-col gap-2'>
					{subTasks.map((task, index) => (
						<div key={task.id} className='flex items-center gap-2'>
							<input
								{...register(`subTasks.${index}.title`)}
								className={`${inputBg} w-full rounded p-2 text-sm`}
								placeholder='Subtask title'
							/>

							<input type='checkbox' {...register(`subTasks.${index}.complete`)} />

							<button
								type='button'
								onClick={() => remove(index)}
								className='rounded bg-red-500 px-2 py-1 text-white'
							>
								X
							</button>
						</div>
					))}

					<button
						type='button'
						onClick={() => append({ id: crypto.randomUUID(), title: '', complete: false })}
						className='bg-green-500 w-fit rounded px-2 py-1 text-white'
					>
						+ Add Subtask
					</button>
				</div>
			</div>

			<button className='rounded bg-purple p-2 text-white'>
				{mode === 'add' ? 'Add Task' : 'Save Changes'}
			</button>
		</form>
	);
}
