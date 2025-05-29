import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isOpen: false,
	items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
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
	// extraReducers: builder => {
	// 	builder.addCase().addCase().addCase();
	// },
});

export const { openCart, closeCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;
