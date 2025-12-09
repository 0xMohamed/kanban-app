import Checkbox from '@/components/utils/Checkbox';
import { useRef, useState } from 'react';
import { useDarkMode } from 'usehooks-ts';
import { PiKanban } from 'react-icons/pi';
import { Link, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { AiOutlineClose } from 'react-icons/ai';
import { useClickOutside } from '@/hooks/useOnClickOutside';
import Popup from '@/components/utils/Popup';
import { useBoardsStore } from '@/store/boards';
import ProjectIcon from '@/components/utils/ProjectIcon';

export default function Sidebar() {
	const { boardId } = useParams();
	const [isCreatePanel, setIsCreatePanel] = useState(false);
	const { isDarkMode, toggle } = useDarkMode();
	const { addBoard } = useBoardsStore();

	const { boards } = useBoardsStore();
	const createBoardRef = useRef(null);

	useClickOutside(createBoardRef, () => setIsCreatePanel(false));

	return (
		<aside
			className={`fixed left-2 top-2 flex h-[calc(100vh-1rem)] w-56 flex-col items-center justify-between rounded-lg px-2 py-4 pb-6 text-light-3 shadow-sm ${
				isDarkMode ? 'bg-dark-2' : 'bg-light-2'
			}`}
		>
			<Link to='/'>
				<ProjectIcon />
			</Link>
			<div className='flex h-full w-full flex-col items-center justify-between'>
				<div className='mt-10 w-full space-y-4'>
					<h3 className='px-4 text-lg uppercase'>all borads ({boards.length})</h3>
					<div className='space-y-3'>
						{boards.map((board) => {
							return (
								<Link
									to={'/board/' + board.id}
									key={board.id}
									className={`flex w-full items-center gap-x-2 rounded-md px-4 py-2	 transition-colors duration-200 ${
										boardId === board.id ? 'bg-purple text-white' : ''
									}`}
								>
									<PiKanban />
									<h4>{board.title}</h4>
								</Link>
							);
						})}
						<div className='relative' ref={createBoardRef}>
							<button
								onClick={() => setIsCreatePanel((prev) => !prev)}
								className={`flex w-full items-center gap-x-2 rounded-md px-4 py-2 capitalize text-purple transition-colors duration-200 `}
							>
								<FaPlus />
								<h4>new board</h4>
							</button>
							{isCreatePanel ? (
								<Popup
									x={'-right-[14.5rem]'}
									y={'top-0'}
									colors={isDarkMode ? 'bg-[#1c263399] text-dark-3' : 'bg-[#c3c8d07d] text-black'}
								>
									<header className='flex items-center justify-center capitalize'>
										<h4>create board</h4>
										<button className='absolute right-2' onClick={() => setIsCreatePanel(false)}>
											<AiOutlineClose />
										</button>
									</header>
									<div className='mt-4 text-xs capitalize'>
										<h4 className='mb-1'>
											board title
											<span className='text-red-500'>*</span>
										</h4>
										<form
											onSubmit={(e) => {
												e.preventDefault();
												const title = e.target.title.value;
												console.log('submit', title);
												if (!title) return;
												addBoard(title);
											}}
										>
											<input
												type='text'
												minLength={3}
												maxLength={16}
												className={`w-full rounded ${
													isDarkMode ? 'bg-[#1315178a]' : 'bg-[#f3f4f8d1] '
												} px-3 py-1.5`}
												name='title'
											/>
											<button className='mt-4 w-full rounded bg-purple py-1.5 text-dark-3'>
												Create
											</button>
										</form>
									</div>
								</Popup>
							) : null}
						</div>
					</div>
				</div>

				<Checkbox handler={toggle} checked={isDarkMode} className='mt-auto' />
			</div>
		</aside>
	);
}
