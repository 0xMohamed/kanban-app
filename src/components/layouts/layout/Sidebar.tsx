import { useDarkMode } from 'usehooks-ts';

export default function Sidebar() {
	const { isDarkMode, toggle, enable, disable } = useDarkMode();

	return (
		<aside
			className={`fixed left-0 top-0 h-screen w-56 ${isDarkMode ? 'bg-dark-2' : 'bg-light-2'}`}
		>
			sidebar
			<span onClick={toggle}>toggle</span>
		</aside>
	);
}
