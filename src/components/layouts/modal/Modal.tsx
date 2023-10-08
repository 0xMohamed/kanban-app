import { useAppDispatch } from '@/store/hooks';
import { closeModal } from '@/store/modalSlice';
import { useDarkMode } from 'usehooks-ts';

interface ModalProps {
	isOpen: boolean;
	children: JSX.Element;
}

export default function Modal({ isOpen, children }: ModalProps) {
	const disptach = useAppDispatch();
	const { isDarkMode } = useDarkMode();

	const closeModalHandle = () => {
		disptach(closeModal());
	};

	return (
		<div className='fixed left-0 top-0 z-40 h-screen w-full'>
			<div
				className={`absolute left-0 top-0 h-full w-full ${
					isDarkMode ? 'bg-gray-500' : 'bg-gray-300'
				} opacity-60`}
				onClick={closeModalHandle}
			></div>
			<div
				className={`absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg ${
					isDarkMode ? 'bg-dark-2' : 'bg-white'
				} p-4`}
			>
				{children}
			</div>
		</div>
	);
}
