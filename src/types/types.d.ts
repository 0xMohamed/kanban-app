interface Board {
	id: string;
	title: string;
	columns: Column[];
}

interface Column {
	id: string;
	title: string;
	tasks: Task[];
}

export interface Task {
	id: string;
	title: string;
	image: string | null;
	description: string;
	date: string;
	users: User[];
	subTasks: SubTask[];
	tags: Tag[];
}

interface Tag {
	title: string;
	color: string;
}

interface SubTask {
	id: string;
	title: string;
	complete: boolean;
}

interface User {
	id: string;
	firstName: string;
	lastName: string;
}

export interface Notification {
	id: string;
	title: string;
	user: string;
	isRead: boolean;
}
