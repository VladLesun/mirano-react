import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart.slice.js';
import filterReducer from './filter/filter.slice.js';
import orderReducer from './order/order.slice.js';
import productsReducer from './products/products.slice.js';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		order: orderReducer,
		filter: filterReducer,
		products: productsReducer,
	},
});
