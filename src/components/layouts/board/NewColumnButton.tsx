import { useAppDispatch } from '@/store/hooks';
import { openModal } from '@/store/modalSlice';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useDarkMode, useIntersectionObserver } from 'usehooks-ts';

export default function NewColumnButton() {
	const disptach = useAppDispatch();
	const { isDarkMode } = useDarkMode();
	const buttonRef = useRef(null);
	const entry = useIntersectionObserver(buttonRef, {
		threshold: 0.3,
	});
	const isVisible = !!entry?.isIntersecting;

	const openNewColumn = () => {
		disptach(openModal('NewColumn'));
	};

	return (
		<button
			ref={buttonRef}
			onClick={openNewColumn}
			className={`${
				isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
			} flex h-screen items-center justify-center gap-x-2 rounded-lg border border-dashed border-[#D9E0E8] transition-opacity duration-300 ${
				isDarkMode ? 'border-blue bg-dark-2' : 'bg-[#EDF2F8]'
			} text-[#5D68FE] hover:cursor-pointer`}
		>
			<FaPlus />
			<span>new column</span>
		</button>
	);
}
