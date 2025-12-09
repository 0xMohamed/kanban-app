import { Task as TTask } from '@/types/types';
import Task from './Task';

export default function TaskOverlay({ id, task }: { id: string; task: TTask }) {
	return <Task key={id} task={task} overlay />;
}
