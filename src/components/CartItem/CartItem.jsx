import { API_URL } from '@store/API/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeItemCart } from '../../store/cart/cart.action';
// import { isNumber } from '../../utils/isNumber';

export const CartItem = ({ photoUrl, name, price, id, quantity }) => {
	const [isValue, setIsValue] = useState(quantity);
	const dispatch = useDispatch();

	// const handleChangeQuantityItem = ({ target }) => {
	// 	const { value } = target;
	// 	if (isNumber(value)) {
	// 		setIsValue(parseInt(value));
	// 		dispatch(addToCart({ productId: id, quantity: parseInt(value) }));
	// 	}
	// 	if (value === '') {
	// 		setIsValue(1);
	// 		dispatch(addToCart({ productId: id, quantity: 1 }));
	// 	}
	// };

	const handlePlusItem = () => {
		const newValue = isValue + 1;
		setIsValue(newValue);
		dispatch(addToCart({ productId: id, quantity: newValue }));
	};

	const handleMinusItem = () => {
		const newValue = isValue - 1;

		if (newValue < 1) {
			dispatch(removeItemCart({ productId: id }));
		} else {
			setIsValue(newValue);
			dispatch(addToCart({ productId: id, quantity: newValue }));
		}
	};

	const totalPrice = price * quantity;
	return (
		<li className='cart__item'>
			<img className='cart__img' src={`${API_URL}${photoUrl}`} alt={name} />
			<h4 className='cart__item-title'>{name}</h4>
			<div className='cart__counter'>
				<button className='cart__counter-btn' onClick={handleMinusItem}>
					-
				</button>
				<input
					className='cart__counter-input'
					type='number'
					max='99'
					min='0'
					value={isValue}
					// onChange={handleChangeQuantityItem}
				/>
				<button className='cart__counter-btn' onClick={handlePlusItem}>
					+
				</button>
			</div>
			<p className='cart__price'>{totalPrice}&nbsp;₽</p>
		</li>
	);
};
