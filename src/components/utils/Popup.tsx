interface PopupProps {
	x: string;
	y: string;
	colors?: string;
	children: JSX.Element | JSX.Element[];
	className?: string;
}

export default function Popup({ children, x, y, colors }: PopupProps) {
	return (
		<div
			className={`absolute ${x} ${y} z-50 w-56 rounded-md border border-white/10 pb-3 ${colors} p-2 text-sm shadow-lg backdrop-blur-lg`}
		>
			{children}
		</div>
	);
}
