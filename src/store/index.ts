import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectSlice';
import modalReducer from './modalSlice';

const store = configureStore({
	reducer: {
		project: projectReducer,
		modal: modalReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
