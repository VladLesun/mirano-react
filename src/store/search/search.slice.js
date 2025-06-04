import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: '',
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		changeSearchValue(state, action) {
			state.value = action.payload;
		},
		clearSearch(state) {
			state.value = '';
		},
	},
});

export const { changeSearchValue, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;
