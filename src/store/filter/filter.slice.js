import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
};

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		toggleFilter(state) {
			state.isOpen = !state.isOpen;
		},
	},
});

export const { toggleFilter } = filterSlice.actions;
export default filterSlice.reducer;
