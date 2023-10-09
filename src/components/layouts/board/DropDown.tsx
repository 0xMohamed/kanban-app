// import { useClickOutside } from '@/hooks/useOnClickOutside';
import { useRef, useState } from 'react';

export default function DropDown({}) {
	return (
		<ul className='absolute -left-1 top-6 flex w-32 flex-col items-start overflow-hidden rounded bg-[var(--rt-color-dark)]  text-white'>
			<li className='w-full px-2 py-0.5 hover:cursor-pointer hover:bg-[#545457]'>remove</li>
			<li className='w-full px-2 py-0.5 hover:cursor-pointer hover:bg-[#545457]'>edit</li>
		</ul>
	);
}
