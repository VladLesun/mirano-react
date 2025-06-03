import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './products.action';

const initialState = {
	items: [],
	isSearch: false,
	isStatus: 'idle',
	isError: null,
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		searchOpenProducts(state) {
			state.isSearch = true;
		},
		searchCloseProducts(state) {
			state.isSearch = false;
		},
	},
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

export const { searchOpenProducts, searchCloseProducts } =
	productsSlice.actions;

export default productsSlice.reducer;
