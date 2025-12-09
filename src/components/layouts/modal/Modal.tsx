import { useModalStore } from '@/store/modal';
import { useDarkMode } from 'usehooks-ts';

interface ModalProps {
	children: JSX.Element;
}

export default function Modal({ children }: ModalProps) {
	const { isOpen, close } = useModalStore();
	const { isDarkMode } = useDarkMode();

	const closeModalHandle = () => {
		close();
	};

	return (
		<div className='fixed left-0 top-0 z-40 h-screen w-full overflow-hidden'>
			<div
				className={`absolute left-0 top-0 h-full w-full bg-gray-500 opacity-40`}
				onClick={closeModalHandle}
			></div>
			<div
				className={`absolute left-1/2 top-1/2 z-50 max-h-[100%] w-[30%] min-w-[450px] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg ${
					isDarkMode ? 'shadow-dark bg-dark-1' : 'shadow-light bg-light-1'
				} p-4`}
			>
				{children}
			</div>
		</div>
	);
}
