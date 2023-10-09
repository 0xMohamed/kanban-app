import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import NotificationPopup from './NotificationPopup';
import { Notification } from '@/types/types';
import { useDarkMode } from 'usehooks-ts';

interface LayoutProps {
	children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
	const [isNotificationShow, setNotificationShow] = useState(false);

	const { isDarkMode, toggle } = useDarkMode();

	const [notifications, setNotifications] = useState<Notification[]>([
		{ title: 'mohamed added task', id: '2323', user: 'adsa', isRead: false },
		{ title: 'mohamed added task', id: '2323', user: 'adsa', isRead: false },
		{ title: 'mohamed added task', id: '2323', user: 'adsa', isRead: false },
	]);

	const showNotification = () => {
		if (!isNotificationShow) {
			setNotificationShow(true);
			setNotifications((notifications) => {
				return notifications.map((notification) => ({ ...notification, isRead: true }));
			});
		} else {
			setNotificationShow(false);
		}
	};

	const closeNotification = () => setNotificationShow(false);

	return (
		<div className={`relative flex flex-col ${isDarkMode ? 'bg-dark-1' : 'bg-light-1'} `}>
			<Header
				showNotification={showNotification}
				notifications={notifications.filter((notification) => !notification.isRead)}
			/>
			<Sidebar isDarkMode={isDarkMode} toggle={toggle} />
			<NotificationPopup
				// closeNotification={closeNotification}
				isNotificationShow={isNotificationShow}
				notifications={notifications}
			/>
			{children}
		</div>
	);
}
