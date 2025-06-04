import { API_URL } from '@store/API/api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/cart.action';
import { debounce } from '../../utils/debounce';
import { isNumber } from '../../utils/isNumber';
// import { isNumber } from '../../utils/isNumber';

export const CartItem = ({ photoUrl, name, price, id, quantity }) => {
	const [inputQuantity, setInputQuantity] = useState(quantity);
	const dispatch = useDispatch();

	const debounceInputChange = debounce(newQuantity => {
		dispatch(addToCart({ productId: id, quantity: newQuantity }));
	}, 500);

	const handleInputChange = e => {
		const newQuantity = parseInt(e.target.value);
		if (isNumber(newQuantity)) {
			setInputQuantity(newQuantity);
			debounceInputChange(newQuantity);
		}
	};

	const handleIncrement = () => {
		const newQuantity = inputQuantity + 1;
		setInputQuantity(newQuantity);
		dispatch(addToCart({ productId: id, quantity: newQuantity }));
	};

	const handleDecrement = () => {
		const newQuantity = inputQuantity - 1;
		setInputQuantity(newQuantity);
		dispatch(addToCart({ productId: id, quantity: newQuantity }));
	};

	const totalPrice = price * quantity;
	return (
		<li className='cart__item'>
			<img className='cart__img' src={`${API_URL}${photoUrl}`} alt={name} />
			<h4 className='cart__item-title'>{name}</h4>
			<div className='cart__counter'>
				<button className='cart__counter-btn' onClick={handleDecrement}>
					-
				</button>
				<input
					className='cart__counter-input'
					type='number'
					max='99'
					min='0'
					value={inputQuantity}
					onChange={handleInputChange}
				/>
				<button className='cart__counter-btn' onClick={handleIncrement}>
					+
				</button>
			</div>
			<p className='cart__price'>{totalPrice}&nbsp;₽</p>
		</li>
	);
};
