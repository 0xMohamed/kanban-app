import { useAppDispatch, useAppSelector } from '@/store/hooks';
import InviteUser from '../layouts/modal/InviteUser';
import Modal from '../layouts/modal/Modal';
import AddTask from '../layouts/modal/AddTask';
import NewColumn from '../layouts/modal/NewColumn';
import NewBoard from '../layouts/modal/NewBoard';
import Task from '../layouts/modal/Task';

export default function ModalManager() {
	const { isOpen, componentName } = useAppSelector((state) => state.modal);
	const componentsLookUp = {
		InviteUser,
		AddTask,
		NewColumn,
		NewBoard,
		Task,
	};

	const RenderComponent = componentsLookUp[componentName as keyof typeof componentsLookUp];
	if (componentName) {
		return <Modal isOpen={isOpen}>{<RenderComponent />}</Modal>;
	}
}
