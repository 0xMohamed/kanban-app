import { Board } from '@/types/types';

export const initialBoards: Board[] = [
	{
		id: '123',
		title: 'Refactoring',
		icon: '🔥',
		columns: [
			{
				id: '21',
				title: 'backlog',
				tasks: [
					{
						id: '33',
						tags: [{ title: 'design', color: 'blue' }],
						image: 'https://images.pexels.com/photos/32275503/pexels-photo-32275503.jpeg',
						aspectRatio: '2/1',
						title: 'Create styleguide foundation',
						description: 'Create content for peceland App',
						subTasks: [{ id: '1242', title: 'bla bal', complete: true }],
						date: 'Aug 20, 2021',
						users: [],
					},
					{
						id: '43',
						tags: [{ title: 'design', color: 'blue' }],
						image: 'https://images.pexels.com/photos/35047995/pexels-photo-35047995.jpeg',
						aspectRatio: '4/3',
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
						image: 'https://images.pexels.com/photos/33225985/pexels-photo-33225985.jpeg',
						aspectRatio: '2/1',
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
						image: 'https://images.pexels.com/photos/31279916/pexels-photo-31279916.jpeg',
						aspectRatio: '4/5',
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
	},
	{
		id: '456',
		title: 'Marketing',
		icon: '💰',
		columns: [
			{ id: '21', title: 'backlog', tasks: [] },
			{ id: '22', title: 'to do', tasks: [] },
			{ id: '23', title: 'in progress', tasks: [] },
			{ id: '24', title: 'review', tasks: [] },
			{ id: '25', title: 'done', tasks: [] },
		],
	},
	{
		id: '789',
		title: 'Sales',
		icon: '💼',
		columns: [
			{ id: '21', title: 'backlog', tasks: [] },
			{ id: '22', title: 'to do', tasks: [] },
			{ id: '23', title: 'in progress', tasks: [] },
			{ id: '24', title: 'review', tasks: [] },
			{ id: '25', title: 'done', tasks: [] },
		],
	},
];
