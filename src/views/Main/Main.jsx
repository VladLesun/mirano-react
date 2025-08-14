import { Filter } from '@components/Filter/Filter';
import { Goods } from '@components/Goods/Goods';
import { Hero } from '@components/Hero/Hero';
import { Subscribe } from '@components/Subscribe/Subscribe';

const Main = ({ title, setTitle }) => {
	return (
		<main>
			<Hero />
			<Filter setTitle={setTitle} />
			<Goods title={title} />
			<Subscribe />
		</main>
	);
};

export default Main;
