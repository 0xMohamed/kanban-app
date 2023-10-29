import { useState } from 'react';
import { BsMoon, BsMoonFill, BsSun, BsSunFill } from 'react-icons/bs';

interface CheckboxProps {
	checked: boolean;
	handler: () => void;
	className: string;
}

export default function Checkbox({ checked, handler, className }: CheckboxProps) {
	return (
		<div className='relative w-12'>
			<label>
				<input
					type='checkbox'
					className={`toggle block bg-gray-400 ${className}`}
					checked={checked}
					onChange={handler}
				/>
				{!checked ? (
					<BsSunFill
						className='absolute left-1 top-1/2 -translate-y-1/2 cursor-pointer'
						size={'0.85rem'}
						color='black'
					/>
				) : (
					<BsMoonFill
						className='absolute right-[0.325rem] top-1/2 -translate-y-1/2 cursor-pointer'
						size={'0.825rem'}
						color='black'
					/>
				)}
			</label>
		</div>
	);
}
