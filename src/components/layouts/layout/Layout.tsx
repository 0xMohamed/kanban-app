import { useEffect, useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import NotificationPopup from './NotificationPopup';
import { Notification } from '@/types/types';
import { useDarkMode } from 'usehooks-ts';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
	children: JSX.Element;
}

export default function Layout() {
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
			title: 'Fahim edit task',
			discription:
				'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero vero explicabo laboriosam, ipsum minus enim aliquam.',
			id: '6598965',
			user: { firstName: 'Mahmoud', lastName: 'Fahim' },
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

	return (
		<div className={`relative flex flex-col ${isDarkMode ? 'bg-dark-1' : 'bg-light-1'} `}>
			<Header
				showNotification={showNotification}
				notifications={notifications.filter((notification) => !notification.isRead)}
				isNotificationShow={isNotificationShow}
			/>
			<Sidebar />
			<NotificationPopup
				closeNotification={closeNotification}
				isNotificationShow={isNotificationShow}
				notifications={notifications}
			/>
			<Outlet />
		</div>
	);
}
