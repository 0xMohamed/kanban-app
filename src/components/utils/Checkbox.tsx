import { BsMoonFill, BsSunFill } from 'react-icons/bs';

interface CheckboxProps {
	checked: boolean;
	handler: () => void;
	className?: string;
}

export default function Checkbox({ checked, handler, className = '' }: CheckboxProps) {
	return (
		<label className={`relative inline-block h-6 w-12 ${className}`}>
			<input
				type='checkbox'
				checked={checked}
				onChange={handler}
				className='peer absolute h-full w-full cursor-pointer opacity-0'
			/>

			<span
				className={`block h-full w-full rounded-full transition-colors duration-300 ${
					checked ? 'bg-gray-700' : 'bg-yellow-400'
				}`}
			></span>

			<span
				className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition-all duration-300 ${
					checked ? 'translate-x-6' : 'translate-x-0'
				}`}
			>
				{!checked ? (
					<BsSunFill
						className='pointer-events-none absolute left-1 top-1/2 -translate-y-1/2 text-yellow-500'
						size='0.7rem'
					/>
				) : (
					<BsMoonFill
						className='pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-gray-800'
						size='0.7rem'
					/>
				)}
			</span>
		</label>
	);
}
