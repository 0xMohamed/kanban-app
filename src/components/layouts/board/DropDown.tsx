import { useBoardsStore } from '@/store/boards';
import { useParams } from 'react-router-dom';
import { HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi2';
import { useModalStore } from '@/store/modal';
import { useDarkMode } from 'usehooks-ts';

export default function ColumnDropdown({ columnId }) {
	const { boardId } = useParams();
	const { isDarkMode } = useDarkMode();
	const { deleteColumn } = useBoardsStore();
	const { open: openModal } = useModalStore();

	const inputBg = isDarkMode ? 'bg-dark-2 border-white/10' : 'bg-white border-black/10 text-black';

	return (
		<ul
			className={`	  
				absolute -right-1 top-8
				w-32 
				overflow-hidden 
				rounded-xl border		  
				${inputBg}
				text-sm
				shadow-xl
				shadow-black/30
			`}
		>
			<li
				onClick={() => openModal('EditColumn', columnId)}
				className={`
					flex cursor-pointer items-center 
					gap-2 px-4 
					py-2 
					transition
					${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}
				`}
			>
				<HiOutlinePencil />
				<span className=''>Edit</span>
			</li>

			<li
				onClick={() => deleteColumn(boardId, columnId)}
				className={`
					flex cursor-pointer items-center 
					gap-2 px-4 
					py-2 
					text-red-400
					transition 
					${isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/10'}
				`}
			>
				<HiOutlineTrash />
				<span>Remove</span>
			</li>
		</ul>
	);
}
