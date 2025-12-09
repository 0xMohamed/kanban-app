import { Link } from 'react-router-dom';
import { useBoardsStore } from '@/store/boards';
import { getBoardMeta } from '@/utils/getBoardMeta';
import { useDarkMode } from 'usehooks-ts';
import ProjectIcon from '@/components/utils/ProjectIcon';

export default function Home() {
	const { boards } = useBoardsStore();
	const { isDarkMode } = useDarkMode();

	return (
		<div
			className={`mx-auto h-screen w-full p-8 pr-0 ${
				isDarkMode ? 'bg-dark-1 text-white' : 'bg-light-1 text-black'
			}`}
		>
			<div className='mx-auto w-full max-w-7xl'>
				<ProjectIcon />

				<h1 className='mb-8 font-bold'>Your Boards</h1>

				<div className='grid grid-cols-1 gap-6 pr-8 sm:grid-cols-2 xl:grid-cols-3'>
					{boards.map((board) => {
						const meta = getBoardMeta(board);

						return (
							<Link
								key={board.id}
								to={`/board/${board.id}`}
								className={`cursor-pointer rounded-xl border p-6 shadow-sm transition ${
									isDarkMode
										? 'border-neutral-700 bg-dark-2 hover:bg-neutral-800'
										: 'border-gray-200 bg-white hover:shadow-md'
								}`}
							>
								<div className='mb-4 flex items-center gap-3'>
									<span className='text-3xl'>{board.icon}</span>
									<h2 className='text-xl font-semibold'>{board.title}</h2>
								</div>

								<div
									className={`flex flex-col gap-1 text-sm ${
										isDarkMode ? 'text-neutral-400' : 'text-gray-500'
									}`}
								>
									<span>Columns: {meta.columnCount}</span>
									<span>Tasks: {meta.taskCount}</span>
								</div>
							</Link>
						);
					})}

					{/* Create New Board */}
					<div
						className={`flex cursor-pointer items-center justify-center rounded-xl border p-6 text-lg font-medium transition ${
							isDarkMode
								? 'border-neutral-700 bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
								: 'border-gray-300 bg-gray-200 text-gray-700 hover:bg-gray-300'
						}`}
					>
						+ Create Board
					</div>
				</div>
			</div>
		</div>
	);
}
