import { useAppDispatch } from '@/store/hooks';
import { openModal } from '@/store/modalSlice';
import { FaPlus } from 'react-icons/fa6';

export default function NewColumnButton() {
	const disptach = useAppDispatch();

	const openNewColumn = () => {
		disptach(openModal('NewColumn'));
	};

	return (
		<button
			onClick={openNewColumn}
			className='flex h-screen items-center justify-center gap-x-2 border border-dashed border-[#D9E0E8] bg-[#EDF2F8] text-[#5D68FE] hover:cursor-pointer'
		>
			<FaPlus />
			<span>new column</span>
		</button>
	);
}
