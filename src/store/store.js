import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart.slice.js';
import filtersReducer from './filter/filters.slice.js';
import orderReducer from './order/order.slice.js';
import productsReducer from './products/products.slice.js';
import searchReducer from './search/search.slice.js';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		order: orderReducer,
		filters: filtersReducer,
		products: productsReducer,
		search: searchReducer,
	},
});
