import { RefObject, useEffect } from 'react';

type Handler = () => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
	elementRef: RefObject<T>,
	callback: Handler,
) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			event.preventDefault();

			if (elementRef && elementRef.current && !elementRef.current?.contains(event.target as Node)) {
				// Call Callback only if event happens outside element or descendent elements
				callback();
			}
			return;
		};
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, [elementRef, callback]);
}
