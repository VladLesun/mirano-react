import { API_URL } from '@store/API/api';
import { useSelector } from 'react-redux';
import { Preload } from '../../views/Preload/Preload';
import { Card } from '../Card/Card';
import { Cart } from '../Cart/Cart';
import './goods.scss';

export const Goods = ({ title }) => {
	const { items: products, isStatus: productsStatus } = useSelector(
		state => state.products
	);

	let content = null;

	if (productsStatus === 'loading') {
		content = <Preload />;
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
		<section
			className='goods'
			style={{ position: productsStatus === 'loading' ? 'relative' : '' }}
		>
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
