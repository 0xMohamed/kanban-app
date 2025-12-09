import { create } from 'zustand';

export const useModalStore = create((set) => ({
	isOpen: false,
	componentName: '',
	columnId: '',
	taskId: '',
	open: (componentName: string, columnId?: string, taskId?: string) =>
		set({
			isOpen: true,
			componentName,
			...(columnId && { columnId }),
			...(taskId && { taskId }),
		}),

	close: () => set({ isOpen: false, componentName: '', columnId: '', taskId: '' }),
}));
