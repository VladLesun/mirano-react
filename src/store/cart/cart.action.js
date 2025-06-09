import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	API_ENDPOINTS_CART,
	API_ENDPOINTS_CART_REGISTER,
	API_URL,
} from '../API/api';

export const registerCart = createAsyncThunk('cart/registerCart', async () => {
	try {
		const res = await fetch(`${API_URL}${API_ENDPOINTS_CART_REGISTER}`, {
			method: 'POST',
			credentials: 'include',
		});

		if (!res.ok) {
			throw new Error('Не удалось отправить данные на сервер...');
		}

		return await res.json();
	} catch (error) {
		console.error(error);
	}
});

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
	try {
		const res = await fetch(`${API_URL}${API_ENDPOINTS_CART}`, {
			credentials: 'include',
		});

		if (!res.ok) {
			throw new Error('Не удалось получить данные с сервера...');
		}

		return await res.json();
	} catch (error) {
		console.error(error);
	}
});

export const addToCart = createAsyncThunk(
	'cart/addToCart',
	async ({ productId, quantity }, { getState, rejectWithValue }) => {
		try {
			const state = getState();
			const cartItems = state.cart.items;

			if (isNaN(parseInt(quantity))) {
				const cartItem = cartItems.find(item => item.id === productId);
				quantity = cartItem ? cartItem.quantity + 1 : 1;
			}

			const res = await fetch(`${API_URL}${API_ENDPOINTS_CART}/items`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ productId, quantity }),
			});

			if (!res.ok) {
				throw new Error('Не удалось отправить товар в корзину...');
			}

			return await res.json();
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);
