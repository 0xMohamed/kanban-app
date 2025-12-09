import Avatar from '@/components/utils/Avatar';
import Popup from '@/components/utils/Popup';
import { useClickOutside } from '@/hooks/useOnClickOutside';

import { useModalStore } from '@/store/modal';
import { useUsersStore } from '@/store/users';
import { User } from '@/types/types';
import { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa6';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useDarkMode } from 'usehooks-ts';

interface BoardHeaderProps {
	boardTitle: string;
	boardIcon: string;
}

export default function BoardHeader({ boardTitle, boardIcon }: BoardHeaderProps) {
	const { isDarkMode } = useDarkMode();
	const [isInvitePopup, setIsIetinvPopupite] = useState(false);

	const { users } = useUsersStore();
	const invitePopup = useRef(null);

	useClickOutside(invitePopup, () => setIsIetinvPopupite(false));

	return (
		<div className='flex items-center justify-between px-8 pb-4 shadow-sm'>
			<div className='flex items-center gap-x-2 text-3xl'>
				{boardIcon ? <span>{boardIcon}</span> : null}
				<h2>{boardTitle}</h2>
			</div>
			<div className='flex items-center'>
				<div className='flex -space-x-2.5'>
					{users.slice(0, 4).map((user: User) => {
						return (
							<Avatar
								value={user.firstName + ' ' + user.lastName}
								key={user.id}
								id={user.id}
								hover
							/>
						);
					})}
				</div>
				{users.length > 4 ? (
					<span className={`mx-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
						+{users.length - 4}
					</span>
				) : null}
				<div className='relative' ref={invitePopup}>
					<button
						onClick={() => setIsIetinvPopupite((prev) => !prev)}
						data-tooltip-id={'user-add-tooltip'}
						className={`flex h-10 w-10 items-center justify-center rounded-full border border-dashed text-purple ${
							isDarkMode ? 'border-[#272934] bg-[#1E1F25]' : 'border-[#D9E0E8] bg-[#EDF2F8]'
						}   hover:cursor-pointer`}
					>
						<FaPlus />
					</button>
					{isInvitePopup ? (
						<Popup
							x={'right-0.5'}
							y='top-12'
							colors={isDarkMode ? 'bg-[#1c263399] text-dark-3' : 'bg-[#c3c8d07d] text-black'}
						>
							<header className='flex items-center justify-center capitalize'>
								<h4>invite member</h4>
								<button className='absolute right-2' onClick={() => setIsIetinvPopupite(false)}>
									<AiOutlineClose />
								</button>
							</header>
							<div className='mt-4 text-xs capitalize'>
								<h4 className='mb-1'>
									email address
									<span className='text-red-500'>*</span>
								</h4>
								<form onSubmit={(e) => e.preventDefault()}>
									<input
										type='email'
										className={`w-full rounded ${
											isDarkMode ? 'bg-[#1315178a]' : 'bg-[#f3f4f8d1] '
										} px-3 py-1.5`}
									/>
									<button className='mt-4 w-full rounded bg-purple py-1.5 text-dark-3'>
										invite
									</button>
								</form>
							</div>
						</Popup>
					) : null}
				</div>
			</div>
		</div>
	);
}
