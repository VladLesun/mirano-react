import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './products.action';

const initialState = {
	items: [],
	isStatus: 'idle',
	isError: null,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.isStatus = 'loading';
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.isStatus = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.isStatus = 'failed';
				state.isError = action.error.message;
			});
	},
});

// export const {} = productsSlice.actions;

export default productsSlice.reducer;
