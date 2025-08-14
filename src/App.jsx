import Footer from '@views/Footer/Footer';
import Header from '@views/Header/Header';
import Main from '@views/Main/Main';
import Order from '@views/Order/Order';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCart, registerCart } from './store/cart/cart.action';

function App() {
	const dispatch = useDispatch();
	const [titleProducts, setTitleProducts] = useState('');

	useEffect(() => {
		(async () => {
			await dispatch(registerCart());
			await dispatch(fetchCart());
		})();
	}, [dispatch]);

	return (
		<>
			<Header />
			<Main title={titleProducts} setTitle={setTitleProducts} />
			<Footer />
			<Order />
		</>
	);
}

export default App;
