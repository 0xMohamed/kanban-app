import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Column from '@/components/layouts/board/Column';
import { useAppDispatch } from '@/store/hooks';
import NewColumnButton from '../components/layouts/board/NewColumnButton';
// import { Board } from '@/types/types';
import { useDarkMode } from 'usehooks-ts';
import BoardHeader from '@/components/layouts/board/BoardHeader';

export default function Board() {
	const board = {
		id: '123',
		title: 'hello world',
		icon: '🔥',
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
			<BoardHeader boardTitle={board.title} boardIcon={board.icon} />
			<DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
				<div
					style={{
						gridTemplateColumns: 'repeat(auto-fill,minmax(16.5rem,1fr))',
						gridAutoFlow: 'column',
						gridAutoColumns: 'minmax(16.5rem,1fr)',
					}}
					className='no-scrollbar grid min-h-screen gap-x-6 overflow-auto px-8'
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
