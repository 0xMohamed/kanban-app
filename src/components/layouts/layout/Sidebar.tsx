import Checkbox from '@/components/utils/Checkbox';
import { useState } from 'react';
import { useDarkMode } from 'usehooks-ts';

export default function Sidebar({ isDarkMode, toggle }) {
	return (
		<aside
			className={`fixed left-0 top-0 flex h-screen w-56 flex-col items-center justify-between py-4 ${
				isDarkMode ? 'bg-dark-2' : 'bg-light-2'
			}`}
		>
			<h2 className='pt-1 text-xl text-[#5150F9]'>VisionBoard</h2>
			<Checkbox handler={toggle} checked={isDarkMode} className='mt-auto' />
		</aside>
	);
}
