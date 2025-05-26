import { Filter } from '@components/Filter/Filter';
import { Goods } from '@components/Goods/Goods';
import { Hero } from '@components/Hero/Hero';
import { Subscribe } from '@components/Subscribe/Subscribe';

const Main = () => {
	return (
		<main>
			<Hero />
			<Filter />
			<Goods />
			<Subscribe />
		</main>
	);
};

export default Main;
