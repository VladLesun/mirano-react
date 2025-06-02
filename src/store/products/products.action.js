import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS_PRODUCTS, API_URL } from '../API/api';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async params => {
		try {
			const queryString = new URLSearchParams(params).toString();
			const res = await fetch(
				`${API_URL}${API_ENDPOINTS_PRODUCTS}${
					queryString ? `?${queryString}` : ''
				}`
			);

			if (!res.ok) {
				throw new Error('Не получилось получить данные о продуктах...');
			}

			return await res.json();
		} catch (error) {
			console.error(error);
		}
	}
);
