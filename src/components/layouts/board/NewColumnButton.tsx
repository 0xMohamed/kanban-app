import { useBoardsStore } from '@/store/boards';
import { useModalStore } from '@/store/modal';
import { useDroppable } from '@dnd-kit/core';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';
import { useDarkMode, useIntersectionObserver } from 'usehooks-ts';

export default function NewColumnButton() {
	const { boardId } = useParams();
	const { addColumn } = useBoardsStore();
	const { setNodeRef } = useDroppable({
		id: `new-column`,
	});

	const { isDarkMode } = useDarkMode();
	const buttonRef = useRef(null);
	const entry = useIntersectionObserver(buttonRef, {
		threshold: 0.3,
	});
	const isVisible = !!entry?.isIntersecting;

	return (
		<div ref={setNodeRef}>
			<button
				ref={buttonRef}
				onClick={() => addColumn(boardId, 'New Column')}
				className={`w-full ${
					isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
				} flex h-screen items-center justify-center gap-x-2 rounded-lg border border-dashed border-[#D9E0E8] transition-opacity duration-300 ${
					isDarkMode ? 'border-blue bg-dark-2' : 'bg-[#EDF2F8]'
				} text-[#5D68FE] hover:cursor-pointer`}
			>
				<FaPlus />
				<span>new column</span>
			</button>
		</div>
	);
}
