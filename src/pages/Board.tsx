import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Avatar from '@/components/utils/Avatar';
import Column from '@/components/layouts/board/Column';
import { FaPlus } from 'react-icons/fa6';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { useAppDispatch } from '@/store/hooks';
import { openModal } from '@/store/modalSlice';
import NewColumnButton from '../components/layouts/board/NewColumnButton';
// import { Board } from '@/types/types';
import { useDarkMode } from 'usehooks-ts';

export default function Board() {
	const dispatch = useAppDispatch();
	const board = {
		id: '123',
		title: 'hello world',
		columns: [
			{
				id: '21',
				title: 'backlog',
				tasks: [
					{
						id: '33',
						tags: [{ title: 'design', color: 'blue' }],
						image:
							'https://images.unsplash.com/photo-1629277152917-966a1f1705cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2832&q=80',
						title: 'Create styleguide foundation',
						description: 'Create content for peceland App',
						subTasks: [{ id: '1242', title: 'bla bal', complete: true }],
						date: 'Aug 20, 2021',
						users: [],
					},
					{
						id: '43',
						tags: [{ title: 'design', color: 'blue' }],
						image: 'https://images2.alphacoders.com/118/1182523.jpg',
						title: 'Design System',
						description:
							'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates ducimus blanditiis ipsum aperiam sit!',
						subTasks: [{ id: '1242', title: 'bla bal', complete: false }],
						date: 'Aug 23, 2021',
						users: [],
					},
				],
			},
			{
				id: '22',
				title: 'to do',
				tasks: [
					{
						id: '67',
						tags: [{ title: 'design', color: 'blue' }],
						image:
							'https://www.shl.com/assets/blog-featured-images/abstract-UN059__FocusFillMaxWyIwLjAwIiwiMC4wMCIsMTkyMCw4NDld.png',
						title: 'Copywriting Content',
						description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
						subTasks: [{ id: '1242', title: 'bla bal', complete: false }],
						date: 'Aug 13, 2021',
						users: [],
					},
				],
			},
			{
				id: '23',
				title: 'in progress',
				tasks: [
					{
						id: '55',
						tags: [{ title: 'design', color: 'blue' }],
						image:
							'https://images.unsplash.com/photo-1633837018163-3d3f09dec30d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2864&q=80',
						title: 'Update support documentation',
						description: 'Lorem ipsum dolor sit, amet consectetur adipisicing.',
						subTasks: [{ id: '1242', title: 'bla bal', complete: true }],
						date: 'Aug 23, 2021',
						users: [],
					},
				],
			},
			{ id: '24', title: 'review', tasks: [] },
			{ id: '25', title: 'done', tasks: [] },
		],
	};

	const { isDarkMode } = useDarkMode();

	const users = [
		{ firstName: 'Margaret', lastName: 'Hamilton', id: '1' },
		{ firstName: 'Nicolas', lastName: 'Lambert', id: '2' },
		{ firstName: 'Mahmoud', lastName: 'Fahim', id: '3' },
		{ firstName: 'Moaaz', lastName: 'Gouda', id: '4' },
	];

	const onDragEnd = (result: DropResult) => {
		console.log(result);
		setIsDraging(false);
	};

	const [isDraging, setIsDraging] = useState(false);

	const onDragStart = () => {
		setIsDraging(true);
	};

	return (
		<div
			className={`h-full space-y-8 p-8 pl-56 pr-0 capitalize ${
				isDarkMode ? 'text-white' : 'text-black'
			}`}
		>
			<div className='flex items-center justify-between px-8 '>
				<div className='flex gap-x-2 text-3xl'>
					<span>🔥</span>
					<h2>{board.title}</h2>
				</div>
				<div className='flex items-center'>
					<div className='flex -space-x-2.5'>
						{users.map((user) => {
							return (
								<Avatar
									value={user.firstName + ' ' + user.lastName}
									key={user.id}
									userId={user.id}
									hover
								/>
							);
						})}
					</div>
					<span className={`mx-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>+6</span>
					<div>
						<button
							onClick={() => dispatch(openModal('InviteUser'))}
							data-tooltip-id={'user-add-tooltip'}
							className={`flex h-10 w-10 items-center justify-center rounded-full border border-dashed text-purple ${
								isDarkMode ? 'border-[#272934] bg-[#1E1F25]' : 'border-[#D9E0E8] bg-[#EDF2F8]'
							}   hover:cursor-pointer`}
						>
							<FaPlus />
						</button>
						<ReactTooltip id={'user-add-tooltip'} place='top' className='!px-2 !py-1 !text-xs'>
							invite user
						</ReactTooltip>
					</div>
				</div>
			</div>
			<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
				<div
					style={{
						gridTemplateColumns: 'repeat(auto-fill,minmax(16rem,1fr))',
						gridAutoFlow: 'column',
						gridAutoColumns: 'minmax(16rem,1fr)',
					}}
					className='no-scrollbar grid min-h-screen gap-x-8 overflow-auto px-8'
				>
					{board.columns.map((column) => {
						return <Column key={column.id} column={column} />;
					})}
					<NewColumnButton />
				</div>
			</DragDropContext>
		</div>
	);
}
