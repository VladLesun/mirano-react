import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS_CART_REGISTER, API_URL } from '../API/api';

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
