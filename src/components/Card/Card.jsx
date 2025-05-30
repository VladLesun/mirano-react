import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/cart.slice';
import './card.scss';

export const Card = ({ id, img, title, dateDelivery, price }) => {
	const dispatch = useDispatch();
	const [buttonText, setButtonText] = useState(`${price}\u00A0₽`);

	const handleAddToCart = () => {
		dispatch(addToCart({ id, img, title, dateDelivery, price }));
	};

	const handleMouseEnter = () => setButtonText('в корзину');
	const handleMouseLeave = () => setButtonText(`${price}\u00A0₽`);

	return (
		<article className='goods__card card'>
			<img className='card__image' src={img} alt={title} />
			<div className='card__content'>
				<h3 className='card__title'>{title}</h3>
				<div className='card__footer'>
					<p className='card__date-delivery'>{dateDelivery}</p>
					<button
						className='card__button'
						onClick={handleAddToCart}
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						{buttonText}
					</button>
				</div>
			</div>
		</article>
	);
};
