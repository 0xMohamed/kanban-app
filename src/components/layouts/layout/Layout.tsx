import { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import NotificationPopup from './NotificationPopup';
import { Notification } from '@/types/types';
import { useDarkMode, useWindowSize } from 'usehooks-ts';
import { Outlet } from 'react-router-dom';
import ModalManager from '@/components/utils/ModalManager';

interface LayoutProps {
	children: JSX.Element;
}

export default function Layout() {
	const { width = 0 } = useWindowSize();

	const [isNotificationShow, setNotificationShow] = useState(false);

	const { isDarkMode } = useDarkMode();

	useEffect(() => {
		document.querySelector('html')!.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
	}, [isDarkMode]);

	const [notifications, setNotifications] = useState<Notification[]>([
		{
			title: 'Margaret added task',
			discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non ipsam nemo.',
			id: '53938',
			user: { firstName: 'Margaret', lastName: 'Hamilton' },
			isRead: false,
		},
		{
			title: 'Peter pan edit task',
			discription:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero vero explicabo laboriosam, ipsum minus enim aliquam.',
			id: '6598965',
			user: { firstName: 'Peter', lastName: 'Parker' },
			isRead: false,
		},
		{
			title: 'John Doe added task',
			discription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit non ipsam nemo.',
			id: '53939',
			user: { firstName: 'John', lastName: 'Doe' },
			isRead: false,
		},
	]);

	const showNotification = () => {
		console.log('22');

		if (!isNotificationShow) {
			setNotificationShow(true);
			setNotifications((notifications) => {
				return notifications.map((notification) => ({ ...notification, isRead: true }));
			});
		} else {
			setNotificationShow(false);
		}
	};

	const closeNotification = () => {
		setNotificationShow(false);
	};

	if (width < 640) {
		return (
			<div className='flex h-screen w-full items-center justify-center bg-dark-2 p-4 text-center text-white'>
				<p className='text-lg'>
					⚠️ This Kanban app is optimized for Desktop and iPad. Please view on a larger screen.
				</p>
			</div>
		);
	}

	return (
		<>
			<div
				className={`relative flex h-screen flex-col ${isDarkMode ? 'bg-dark-1' : 'bg-light-1'} `}
			>
				<Sidebar />
				<Header
					showNotification={showNotification}
					notifications={notifications.filter((notification) => !notification.isRead)}
					isNotificationShow={isNotificationShow}
				/>
				<Outlet />
				<NotificationPopup
					closeNotification={closeNotification}
					isNotificationShow={isNotificationShow}
					notifications={notifications}
				/>
			</div>
			<ModalManager />
		</>
	);
}
