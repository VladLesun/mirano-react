import { useSelector } from 'react-redux';
import { API_URL } from '../../store/API/api';
import { Card } from '../Card/Card';
import { Cart } from '../Cart/Cart';
import './goods.scss';

export const Goods = ({ title }) => {
	const { items: products, isStatus: productsStatus } = useSelector(
		state => state.products
	);

	let content = null;

	productsStatus === 'loading'
		? (content = <p>Loading...</p>)
		: productsStatus === 'succeeded'
		? (content = (
				<ul className='goods__list'>
					{products.length === 0 ? (
						<p>Товары не найдены...</p>
					) : (
						products.map(item => (
							<li key={item.id} className='goods__item'>
								<Card
									id={item.id}
									img={`${API_URL}${item.photoUrl}`}
									title={item.name}
									dateDelivery='сегодня в 14:00'
									price={item.price}
								/>
							</li>
						))
					)}
				</ul>
		  ))
		: productsStatus === 'failed'
		? (content = <p>Error...</p>)
		: '';

	return (
		<section className='goods'>
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
