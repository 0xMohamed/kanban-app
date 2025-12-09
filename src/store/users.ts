import { User } from '@/types/types';
import { create } from 'zustand';

interface UserStore {
	users: User[];
	getUserById: (id: string) => User | undefined;
	updateUser: (id: string, updated: User) => void;
}

export const useUsersStore = create<UserStore>((set, get) => ({
	users: [
		{ firstName: 'Margaret', lastName: 'Hamilton', id: '1' },
		{ firstName: 'Nicolas', lastName: 'Lambert', id: '2' },
		{ firstName: 'Peter', lastName: 'Parker', id: '3' },
		{ firstName: 'Tony', lastName: 'Stark', id: '4' },
		{ firstName: 'Bruce', lastName: 'Wayne', id: '5' },
		{ firstName: 'Clark', lastName: 'Kent', id: '6' },
		{ firstName: 'Diana', lastName: 'Prince', id: '7' },
		{ firstName: 'Barry', lastName: 'Allen', id: '8' },
		{ firstName: 'Hal', lastName: 'Jordan', id: '9' },
		{ firstName: 'Arthur', lastName: 'Curry', id: '10' },
		{ firstName: 'Oliver', lastName: 'Queen', id: '11' },
		{ firstName: 'John', lastName: 'Stewart', id: '12' },
	],

	getUserById: (id) => {
		return get().users.find((u) => u.id === id);
	},

	updateUser: (id, updatedUser) =>
		set(() => ({
			users: get().users.map((u) => (u.id === id ? updatedUser : u)),
		})),
}));
