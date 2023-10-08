import { Notification } from '@/types/types';
import { FiSearch } from 'react-icons/fi';
import { RiNotification2Line } from 'react-icons/ri';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useDarkMode } from 'usehooks-ts';

interface HeaderProps {
	showNotification: () => void;
	notifications: Notification[];
}

export default function Header({ showNotification, notifications }: HeaderProps) {
	const { isDarkMode, toggle, enable, disable } = useDarkMode();

	return (
		<header
			className={`flex items-center justify-center ${
				isDarkMode ? 'bg-dark-2' : 'bg-white'
			} px-8 py-4`}
		>
			<label className='relative ml-auto'>
				<input
					type='text'
					className={`rounded ${isDarkMode ? 'bg-dark-1' : 'bg-light-1'} px-4 py-2 pr-7 text-sm`}
					placeholder='Search anything'
				/>
				<FiSearch color={'#94A2BC'} className='absolute right-2 top-1/2 -translate-y-1/2' />
			</label>
			<div
				className='relative ml-auto hover:cursor-pointer'
				onClick={showNotification}
				data-tooltip-id={'notification-icon'}
			>
				<RiNotification2Line
					color={isDarkMode ? 'var(--color-third-dark)' : 'var(--color-third-light)'}
					size={'1.25rem'}
				/>
				{notifications.length ? (
					<span
						className={`absolute -right-0.5 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-[#5150F9] text-[0.55rem] text-white `}
					>
						{notifications.length}
					</span>
				) : null}
			</div>
		</header>
	);
}
