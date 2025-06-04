import { createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchCart, registerCart } from './cart.action';

const initialState = {
	isOpen: false,
	items: [],
	isStatus: 'idle',
	accessKey: null,
	isError: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		openCart(state) {
			state.isOpen = true;
		},
		closeCart(state) {
			state.isOpen = false;
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registerCart.pending, state => {
				state.isStatus = 'loading';
			})
			.addCase(registerCart.fulfilled, (state, action) => {
				state.isStatus = 'succeeded';
				state.accessKey = action.payload.accessKey;
			})
			.addCase(registerCart.rejected, (state, action) => {
				state.isStatus = 'failed';
				state.accessKey = '';
				state.isError = action.error.message;
			})
			.addCase(fetchCart.pending, state => {
				state.isStatus = 'loading';
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				state.isStatus = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchCart.rejected, (state, action) => {
				state.isStatus = 'failed';
				state.isError = action.error.message;
			})
			.addCase(addToCart.pending, state => {
				state.isStatus = 'loading';
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				console.log('action add to cart: ', action);
				state.isStatus = 'succeeded';
				state.items = action.payload;
			})
			.addCase(addToCart.rejected, (state, action) => {
				state.isStatus = 'failed';
				state.isError = action.error.message;
			});
	},
});
export const { openCart, closeCart } = cartSlice.actions;

export default cartSlice.reducer;
