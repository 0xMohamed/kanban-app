import Avatar from '@/components/utils/Avatar';
import { Notification } from '@/types/types';
import { AiOutlineClose } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa6';
import { RiNotification2Line } from 'react-icons/ri';
import { RiNotification3Line } from 'react-icons/ri';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useDarkMode } from 'usehooks-ts';

interface HeaderProps {
	showNotification: () => void;
	notifications: Notification[];
	isNotificationShow: boolean;
}

export default function Header({
	showNotification,
	notifications,
	isNotificationShow,
}: HeaderProps) {
	const { isDarkMode, toggle, enable, disable } = useDarkMode();

	return (
		<header
			className={`ml-auto mr-2 mt-2 flex w-[calc(100%-15.5rem)] items-center justify-center rounded-lg ${
				isDarkMode ? 'bg-dark-2' : 'bg-white'
			} px-6 py-4`}
		>
			<label className='relative ml-auto'>
				<input
					type='text'
					className={`rounded-md ${isDarkMode ? 'bg-dark-1' : 'bg-light-1'} px-4 py-2 pr-7 text-sm`}
					placeholder='Search anything'
				/>
				<FiSearch color={'#94A2BC'} className='absolute right-2 top-1/2 -translate-y-1/2' />
			</label>
			<div className='ml-auto flex items-center gap-x-4'>
				<div className='flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 hover:cursor-pointer hover:bg-[#303030]'>
					{!isNotificationShow ? (
						<div
							className='relative hover:cursor-pointer'
							onClick={showNotification}
							data-tooltip-id={'notification-icon'}
						>
							<RiNotification3Line
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
					) : (
						<AiOutlineClose
							className='hover:cursor-pointer'
							color={isDarkMode ? 'var(--color-third-dark)' : 'var(--color-third-light)'}
							size={'1.25rem'}
						/>
					)}
				</div>
				<div className='group relative flex cursor-pointer select-none items-center gap-x-1.5'>
					<Avatar medium value='mohamed sayed' id={'13242'} border={false} />
					{/* <FaChevronDown className='text-purple' /> */}
				</div>
			</div>
		</header>
	);
}
