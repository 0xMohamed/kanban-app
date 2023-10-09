import { useState } from 'react';
import { BsMoon, BsMoonFill, BsSun, BsSunFill } from 'react-icons/bs';

export default function Checkbox({ checked, handler, className }) {
	return (
		<div className='relative w-12'>
			<input
				type='checkbox'
				className={`toggle block ${className}`}
				checked={checked}
				onChange={handler}
			/>
			{!checked ? (
				<BsSunFill
					className='absolute left-1 top-1/2 -translate-y-1/2'
					size={'0.85rem'}
					color='black'
				/>
			) : (
				<BsMoonFill
					className='absolute right-1 top-1/2 -translate-y-1/2'
					size={'0.85rem'}
					color='black'
				/>
			)}
		</div>
	);
}
