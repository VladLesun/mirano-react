import { useDispatch, useSelector } from 'react-redux';
import { closeCart } from '../../store/cart/cart.slice';
import { openOrder } from '../../store/order/order.slice';
import { CartItem } from '../CartItem/CartItem';
import './cart.scss';

export const Cart = () => {
	const dispatch = useDispatch();
	const { isOpen, items } = useSelector(state => state.cart);

	const handleCloseCart = () => dispatch(closeCart());
	const handleOpenOrder = () => dispatch(openOrder());

	if (isOpen) {
		return (
			<section className='cart'>
				<div className='cart__container'>
					<div className='cart__header'>
						<h3 className='cart__title'>Ваш заказ</h3>

						<button className='cart__close' onClick={handleCloseCart}>
							<svg
								width='28'
								height='28'
								viewBox='0 0 28 28'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<rect
									x='5'
									y='5.70715'
									width='1'
									height='25'
									transform='rotate(-45 5 5.70715)'
									fill='#D17D2F'
								/>
								<rect
									x='22.6777'
									y='5'
									width='1'
									height='25'
									transform='rotate(45 22.6777 5)'
									fill='#D17D2F'
								/>
							</svg>
						</button>
					</div>

					<p className='cart__date-delivery'>сегодня в 14:00</p>

					<ul className='cart__list'>
						{items.map(item => (
							<CartItem key={item.id} {...item} />
						))}
					</ul>

					<div className='cart__footer'>
						<button className='cart__order-btn' onClick={handleOpenOrder}>
							Оформить
						</button>
						<p className='cart__price cart__price_total'>0&nbsp;₽</p>
					</div>
				</div>
			</section>
		);
	}
};
