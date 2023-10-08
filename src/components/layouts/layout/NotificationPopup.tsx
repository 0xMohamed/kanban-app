import { Notification } from '@/types/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '@/hooks/useOnClickOutside';

interface NotificationPopupProps {
	isNotificationShow: boolean;
	notifications: Notification[];
}

export default function NotificationPopup({
	isNotificationShow,
}: // closeNotification,
NotificationPopupProps) {
	// const notificationRef = useRef(null);
	// useClickOutside(notificationRef, closeNotification);

	return (
		<div
			// ref={notificationRef}
			className={`absolute top-20 h-80 w-60 rounded-md bg-white transition-[right] duration-300 ${
				isNotificationShow ? 'right-8 ' : '-right-60'
			} `}
		></div>
	);
}
