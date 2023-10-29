import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useDarkMode } from 'usehooks-ts';

interface AvatarProps {
	value: string;
	id: string;
	// radius?: boolean;
	// border?: boolean;
	// shadow?: boolean;
	small?: boolean;
	medium?: boolean;
	hover?: boolean;
	border?: boolean;
}

function getInitials(value: string): string | null {
	return value.match(/(\b\S)?/g)?.join('') ?? null;
}

function stringToColour(str: string) {
	let hash = 0;
	str.split('').forEach((char) => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash);
	});
	let colour = '#';
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff;
		colour += value.toString(16).padStart(2, '0');
	}
	return colour;
}

function hashCode(str: string) {
	// java String#hashCode
	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	return hash;
}

function intToRGB(i: number) {
	const c = (i & 0x00ffffff).toString(16).toUpperCase();

	return '00000'.substring(0, 6 - c.length) + c;
}

function invertHex(hex: string) {
	return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
}

function getContrastColor(color: string) {
	const hex = color.replace(/#/, '');
	const red = parseInt(hex.substr(0, 2), 16);
	const green = parseInt(hex.substr(2, 2), 16);
	const blue = parseInt(hex.substr(4, 2), 16);

	const luminance = (0.2126 * red + 0.7152 * green + 0.0722 * blue) / 255;
	return luminance > 0.5 ? '#000000' : '#ffffff';
}

export default function Avatar({ value, small, medium, hover, id, border = true }: AvatarProps) {
	const name = getInitials(value);
	const { isDarkMode } = useDarkMode();

	// console.log(intToRGB(hashCode(value)));
	// console.log(getContrastColor(intToRGB(hashCode(value))));

	return (
		<div>
			<div
				className={`flex items-center justify-center rounded-full ${border ? 'border-2' : ''} ${
					isDarkMode ? 'border-dark-2' : 'border-white'
				} transition-[border] duration-300 hover:cursor-pointer ${
					hover ? 'hover:border-[#1E1F25]' : ''
				} ${small ? 'h-7 w-7 text-[0.5rem]' : 'h-10 w-10 text-xs'} 
				${medium ? 'h-8 w-8 text-[0.65rem]' : 'h-10 w-10 text-xs'}
				`}
				style={{
					backgroundColor: '#' + intToRGB(hashCode(value)),
					color: getContrastColor(intToRGB(hashCode(value))),
				}}
				data-tooltip-id={'user-tooltip-' + id}
			>
				<span className='uppercase'>{name}</span>
			</div>
			{hover ? (
				<ReactTooltip id={'user-tooltip-' + id} place='top' className='!px-2 !py-1 !text-xs'>
					{value}
				</ReactTooltip>
			) : null}
		</div>
	);
}
