import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { setCookie, getCookie } from '../utils/cookieManager';

const initialState = {
	componentName: '',
	isOpen: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<string>) => {
			state.isOpen = true;
			state.componentName = action.payload;
		},
		closeModal: (state) => {
			state.isOpen = false;
			state.componentName = '';
		},
	},
	extraReducers: (builder) => {},
});

export default modalSlice.reducer;
export const { openModal, closeModal } = modalSlice.actions;
