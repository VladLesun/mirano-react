import { createSlice } from '@reduxjs/toolkit';
import { sendOrder } from './order.action';

const initialState = {
	isStatus: 'idle',
	isError: null,
	isOpenOrder: false,
	orderId: '',
	data: {
		buyerName: '',
		buyerPhone: '',
		recipientName: '',
		recipientPhone: '',
		street: '',
		house: '',
		apartment: '',
		paymentOnline: 'true',
		deliveryDate: '',
		deliveryTime: '',
	},
};

const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		openOrder(state) {
			state.isOpenOrder = true;
		},
		closeOrder(state) {
			state.isOpenOrder = false;
		},
		clearOrderData(state) {
			state.data = {
				buyerName: '',
				buyerPhone: '',
				recipientName: '',
				recipientPhone: '',
				street: '',
				house: '',
				apartment: '',
				paymentOnline: 'true',
				deliveryDate: '',
				deliveryTime: '',
			};
		},
		updateOrderData(state, action) {
			state.data = { ...state.data, ...action.payload };
		},
	},
	extraReducers: builder => {
		builder
			.addCase(sendOrder.pending, state => {
				state.isStatus = 'loading';
				state.orderId = '';
			})
			.addCase(sendOrder.fulfilled, (state, action) => {
				state.isStatus = 'succeeded';
				state.orderId = action.payload.orderId;
			})
			.addCase(sendOrder.rejected, (state, action) => {
				state.isStatus = 'failed';
				state.orderId = '';
				state.isError = action.payload || action.error.message;
			});
	},
});

export const { openOrder, closeOrder, clearOrderData, updateOrderData } =
	orderSlice.actions;
export default orderSlice.reducer;
