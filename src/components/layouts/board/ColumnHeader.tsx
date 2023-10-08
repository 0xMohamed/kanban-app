import { BsThreeDots } from 'react-icons/bs';
import { ReactComponent as PlusIcon } from '@assets/images/plus.svg';
import { ReactComponent as PlusDarkIcon } from '@assets/images/plus-dark.svg';
import { useAppDispatch } from '@/store/hooks';
import { openModal } from '@/store/modalSlice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useOnClickOutside';
import DropDown from './DropDown';
import { useDarkMode } from 'usehooks-ts';

interface ColumnHeaderProps {
	title: string;
}

export default function ColumnHeader({ title }: ColumnHeaderProps) {
	const disptach = useAppDispatch();
	const dropDownRef = useRef(null);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const { isDarkMode } = useDarkMode();

	const openAddTask = () => {
		disptach(openModal('AddTask'));
	};

	const close = () => {
		setIsDropdownOpen(false);
	};

	useClickOutside(dropDownRef, close);

	return (
		<div
			className={`flex items-center justify-between rounded-lg px-4 py-3 capitalize  ${
				isDarkMode ? 'bg-dark-2 text-white' : 'bg-white text-blue'
			} `}
		>
			<h4>{title}</h4>
			<div className='flex items-center gap-x-2.5'>
				<div className='relative flex' ref={dropDownRef}>
					<button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
						<BsThreeDots color={isDarkMode ? 'white' : 'var(--color-third-light)'} />
					</button>
					{isDropdownOpen ? <DropDown /> : null}
				</div>
				<button onClick={openAddTask}>
					{!isDarkMode ? (
						<PlusIcon className='hover:cursor-pointer' />
					) : (
						<PlusDarkIcon className='hover:cursor-pointer' />
					)}
				</button>
			</div>
		</div>
	);
}
