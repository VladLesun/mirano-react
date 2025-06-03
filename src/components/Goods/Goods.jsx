import { API_URL } from '@store/API/api';
import { searchCloseProducts } from '@store/products/products.slice';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '../Card/Card';
import { Cart } from '../Cart/Cart';
import './goods.scss';

export const Goods = ({ title }) => {
	const {
		items: products,
		isStatus: productsStatus,
		isSearch: productsSearch,
	} = useSelector(state => state.products);
	const dispatch = useDispatch();
	const productsRef = useRef();

	useEffect(() => {
		if (productsSearch) {
			productsRef.current.scrollIntoView({ behavior: 'smooth' });
		}
		dispatch(searchCloseProducts());
	}, [productsSearch, dispatch]);

	let content = null;

	if (productsStatus === 'loading') {
		content = <p>Loading...</p>;
	}

	if (productsStatus === 'succeeded' && products.length) {
		content = (
			<ul className='goods__list'>
				{products.map(item => (
					<li key={item.id} className='goods__item'>
						<Card
							id={item.id}
							img={`${API_URL}${item.photoUrl}`}
							title={item.name}
							dateDelivery='сегодня в 14:00'
							price={item.price}
						/>
					</li>
				))}
			</ul>
		);
	}

	if (productsStatus === 'succeeded' && !products.length) {
		content = <p className='goods__item_empty'>Товары не найдены...</p>;
	}

	if (productsStatus === 'failed') {
		content = <p>Error...</p>;
	}

	return (
		<section className='goods' ref={productsRef}>
			<div className='container goods__container'>
				<div className='goods__box'>
					<h2 className='goods__title'>{title}</h2>
					{content}
				</div>

				<Cart />
			</div>
		</section>
	);
};
