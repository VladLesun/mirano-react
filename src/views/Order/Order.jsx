import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOrder } from '../../store/order/order.action';
import { closeOrder, updateOrderData } from '../../store/order/order.slice';
import './order.scss';

const Order = () => {
	const { isOpenOrder, orderId, data } = useSelector(state => state.order);
	const itemsCart = useSelector(state => state.cart.items);
	const dispatch = useDispatch();

	const handleCloseOrder = useCallback(() => {
		dispatch(closeOrder());
	}, [dispatch]);

	const handleChange = ({ target }) => {
		const { name, value } = target;
		dispatch(updateOrderData({ [name]: value }));
	};

	const handleSubmit = e => {
		e.preventDefault();
		dispatch(sendOrder());
	};

	const totalPrice = itemsCart.reduce((acc, item) => {
		return item.quantity * item.price + acc;
	}, 0);

	useEffect(() => {
		const handleEscape = e => {
			if (e.key === 'Escape') handleCloseOrder();
		};

		if (isOpenOrder) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpenOrder, handleCloseOrder]);

	if (!isOpenOrder) return null;

	return (
		<div className='order' onClick={handleCloseOrder}>
			<div className='order__wrapper' onClick={e => e.stopPropagation()}>
				{orderId ? (
					<>
						<h2 className='order__title'>Заказ оформлен!</h2>
						<p className='order__id'>Ваш номер заказа: {orderId}</p>
					</>
				) : (
					<>
						<h2 className='order__title'>Оформить заказ</h2>
						<form className='order__form' id='order' onSubmit={handleSubmit}>
							<fieldset className='order__fieldset'>
								<legend className='order__legend'>Данные заказчика</legend>
								<div className='order__input-group'>
									<input
										className='order__input'
										type='text'
										name='buyerName'
										placeholder='Имя'
										value={data.buyerName}
										onChange={handleChange}
										required
									/>
									<input
										className='order__input'
										type='text'
										name='buyerPhone'
										placeholder='Телефон'
										value={data.buyerPhone}
										onChange={handleChange}
										required
									/>
								</div>
							</fieldset>
							<fieldset className='order__fieldset'>
								<legend className='order__legend'>Данные получателя</legend>
								<div className='order__input-group'>
									<input
										className='order__input'
										type='text'
										name='recipientName'
										placeholder='Имя'
										value={data.recipientName}
										onChange={handleChange}
										required
									/>
									<input
										className='order__input'
										type='text'
										name='recipientPhone'
										placeholder='Телефон'
										value={data.recipientPhone}
										onChange={handleChange}
										required
									/>
								</div>
							</fieldset>
							<fieldset className='order__fieldset'>
								<legend className='order__legend'>Адрес</legend>
								<div className='order__input-group'>
									<input
										className='order__input'
										type='text'
										name='street'
										placeholder='Улица'
										value={data.street}
										onChange={handleChange}
										required
									/>
									<input
										className='order__input order__input_min'
										type='text'
										name='house'
										placeholder='Дом'
										value={data.house}
										onChange={handleChange}
										required
									/>
									<input
										className='order__input order__input_min'
										type='text'
										name='apartment'
										placeholder='Квартира'
										value={data.apartment}
										onChange={handleChange}
										required
									/>
								</div>
							</fieldset>
							<fieldset className='order__fieldset'>
								<div className='order__payment'>
									<label className='order__label-radio'>
										<input
											className='order__radio'
											type='radio'
											name='paymentOnline'
											value={data.paymentOnline === 'true'}
											onChange={handleChange}
											defaultChecked
										/>
										Оплата онлайн
									</label>
								</div>
								<div className='order__delivery'>
									<label htmlFor='delivery'>Дата доставки</label>
									<input
										className='order__input'
										type='date'
										name='deliveryDate'
										value={data.deliveryDate}
										onChange={handleChange}
										required
									/>
									<div className='order__select-wrapper'>
										<select
											className='order__select'
											name='deliveryTime'
											id='delivery'
											value={data.deliveryTime}
											onChange={handleChange}
											required
										>
											<option value='9-12'>с 9:00 до 12:00</option>
											<option value='12-15'>с 12:00 до 15:00</option>
											<option value='15-18'>с 15:00 до 18:00</option>
											<option value='18-21'>с 18:00 до 21:00</option>
										</select>
									</div>
								</div>
							</fieldset>
						</form>
						<div className='order__footer'>
							<p className='order__total'>{totalPrice}&nbsp;₽</p>
							<button className='order__button' type='submit' form='order'>
								Заказать
							</button>
						</div>
					</>
				)}
			</div>
			<button className='order__close' type='button'>
				×
			</button>
		</div>
	);
};

export default Order;
