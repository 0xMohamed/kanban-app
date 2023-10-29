import { Notification } from '@/types/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useOnClickOutside';
import { useDarkMode } from 'usehooks-ts';
import Avatar from '@/components/utils/Avatar';

interface NotificationPopupProps {
	isNotificationShow: boolean;
	notifications: Notification[];
	closeNotification: () => void;
}

export default function NotificationPopup({
	isNotificationShow,
	closeNotification,
	notifications,
}: NotificationPopupProps) {
	const notificationRef = useRef(null);
	const { isDarkMode } = useDarkMode();

	useClickOutside(notificationRef, closeNotification);

	return (
		<div
			ref={notificationRef}
			className={`absolute top-[5.25rem] z-50 w-60 rounded-md border border-white/10 p-2.5 py-3 ${
				isDarkMode ? 'bg-[#1c263399] text-dark-3' : 'bg-[#c3c8d07d] text-black'
			}
			shadow-lg backdrop-blur-lg transition-[right] duration-300 ${
				isNotificationShow ? 'right-6' : '-right-60'
			} `}
		>
			<ul className='flex flex-col gap-y-4'>
				{notifications.map((notification) => {
					return (
						<li key={notification.id} className='flex cursor-pointer items-center gap-x-3'>
							<Avatar
								id={notification.id}
								border={false}
								value={notification.user.firstName + ' ' + notification.user.lastName}
							/>
							<div>
								<span className='capitalize'>{notification.title}</span>
								<p className='line-clamp-2 text-xs'>{notification.discription}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
