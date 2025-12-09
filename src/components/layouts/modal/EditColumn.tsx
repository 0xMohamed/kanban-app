import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBoardsStore } from '@/store/boards';
import { useModalStore } from '@/store/modal';
import { useDarkMode } from 'usehooks-ts';

export default function EditColumn() {
	const { boardId } = useParams();
	const { isDarkMode } = useDarkMode();
	const { columnId, close } = useModalStore(); // columnId محدد عند فتح المينيو
	const { getBoardById, editColumn } = useBoardsStore();

	// جلب العمود الحالي
	const column = getBoardById(boardId)?.columns.find((c) => c.id === columnId);

	const [title, setTitle] = useState(column?.title || '');

	if (!column) return <div>Column not found</div>;

	const handleSave = () => {
		editColumn(boardId, columnId, title);
		close();
	};

	const inputBg = isDarkMode ? 'bg-dark-2' : 'bg-white';

	return (
		<div className=''>
			<h2 className='mb-4 text-xl font-bold'>Edit Column</h2>

			{/* Title input */}
			<div className='mb-4 flex flex-col gap-2'>
				<label>Column Title</label>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					className={`${inputBg} rounded p-2 outline-none`}
				/>
			</div>

			{/* Buttons */}
			<div className='flex justify-end gap-2'>
				<button onClick={close} className={`${inputBg} rounded  px-3 py-1`}>
					Cancel
				</button>
				<button
					onClick={handleSave}
					className='hover:bg-purple/80 rounded bg-purple px-3 py-1 text-white'
				>
					Save
				</button>
			</div>
		</div>
	);
}
