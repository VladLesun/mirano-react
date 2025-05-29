import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/cart.slice';
import './card.scss';

export const Card = ({ id, img, title, dateDelivery, price }) => {
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		dispatch(addToCart({ id, img, title, dateDelivery, price }));
	};

	return (
		<article className='goods__card card'>
			<img className='card__image' src={img} alt={title} />
			<div className='card__content'>
				<h3 className='card__title'>{title}</h3>
				<div className='card__footer'>
					<p className='card__date-delivery'>{dateDelivery}</p>
					<button className='card__button' onClick={handleAddToCart}>
						{price}&nbsp;₽
					</button>
				</div>
			</div>
		</article>
	);
};
