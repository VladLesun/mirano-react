import { createSlice } from '@reduxjs/toolkit';
import { registerCart } from './cart.action';

const initialState = {
	isOpen: false,
	items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
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
		addToCart(state, action) {
			const { id, img, title, dateDelivery, price, count = 1 } = action.payload;

			const existingItem = state.items.find(item => item.id === id);

			if (existingItem) {
				existingItem.count = count;
			} else {
				state.items.push({ id, img, title, dateDelivery, price, count });
			}

			localStorage.setItem('cartItems', JSON.stringify(state.items));
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
			});
	},
});
export const { openCart, closeCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
