import { useModalStore } from '@/store/modal';

import Modal from '../layouts/modal/Modal';
import EditColumn from '../layouts/modal/EditColumn';
import Task from '../layouts/modal/Task';
import TaskForm from '../layouts/modal/TaskForm';

export default function ModalManager() {
	const { isOpen, componentName, close } = useModalStore();
	const componentsLookUp = {
		TaskForm,
		EditColumn,
		Task,
	};

	const RenderComponent = componentsLookUp[componentName as keyof typeof componentsLookUp];
	if (componentName) {
		return <Modal isOpen={isOpen}>{<RenderComponent />}</Modal>;
	}
}
