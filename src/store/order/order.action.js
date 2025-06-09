import { createAsyncThunk } from '@reduxjs/toolkit';
import { API_ENDPOINTS_ORDERS, API_URL } from '../API/api';
import { fetchCart } from '../cart/cart.action';
import { closeCart } from '../cart/cart.slice';
import { clearOrderData } from './order.slice';

export const sendOrder = createAsyncThunk(
	'order/sendOrder',
	async (_, { getState, dispatch, rejectWithValue }) => {
		try {
			const {
				order: {
					data: {
						buyerName,
						buyerPhone,
						recipientName,
						recipientPhone,
						street,
						house,
						apartment,
						paymentOnline,
						deliveryDate,
						deliveryTime,
					},
				},
			} = getState();
			const orderData = {
				buyer: {
					name: buyerName,
					phone: buyerPhone,
				},
				recipient: {
					name: recipientName,
					phone: recipientPhone,
				},
				address: `${street}, ${house}, ${apartment}`,
				paymentOnline,
				deliveryDate,
				deliveryTime,
			};
			const res = await fetch(`${API_URL}${API_ENDPOINTS_ORDERS}`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData),
			});

			if (!res.ok) {
				throw new Error('Не удалось оформить заказ, попробуйте позже...');
			}

			const data = await res.json();

			dispatch(clearOrderData());
			dispatch(closeCart());
			dispatch(fetchCart());

			return data;
		} catch (error) {
			rejectWithValue(error.message);
		}
	}
);
