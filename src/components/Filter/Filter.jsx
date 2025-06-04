import {
	changeCategory,
	changePrice,
	changeType,
} from '@store/filter/filters.slice';
import { fetchProducts } from '@store/products/products.action';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from '../../utils/debounce';
import { getValidFilters } from '../../utils/getValidFilters';
import { Choices } from '../Choices/Choices';
import './filter.scss';
import { FilterRadio } from './FilterRadio';

const filterTypes = [
	{ value: 'bouquets', title: 'Цветы' },
	{ value: 'toys', title: 'Игрушки' },
	{ value: 'postcards', title: 'Открытки' },
];

export const Filter = ({ setTitle }) => {
	const dispatch = useDispatch();
	const [openChoice, setOpenChoice] = useState(null);
	const filters = useSelector(state => state.filters);

	const prevFiltersRef = useRef(filters);

	const debouncedFetchProducts = useRef(
		debounce(filters => {
			dispatch(fetchProducts(filters));
		}, 300)
	).current;

	useEffect(() => {
		const prevFilters = prevFiltersRef.current;
		const validFilter = getValidFilters(filters);
		if (!validFilter.type) {
			return;
		}
		setTitle(filterTypes.find(item => item.value === validFilter.type).title);
		if (prevFilters.type !== validFilter.type) {
			dispatch(fetchProducts(validFilter));
		} else {
			debouncedFetchProducts(validFilter);
		}

		prevFiltersRef.current = filters;
	}, [dispatch, debouncedFetchProducts, setTitle, filters]);

	const handleToggleChoice = str =>
		setOpenChoice(openChoice === str ? null : str);

	const handleChangeFilter = ({ target }) => {
		const { value } = target;
		dispatch(changeType(value));
		setOpenChoice(-1);
	};

	const handleChangePrice = ({ target }) => {
		const { name, value } = target;
		dispatch(changePrice({ name, value }));
	};

	const handleChangeTypes = ({ target }) => {
		const { value } = target;
		dispatch(changeCategory(value));
		setOpenChoice(-1);
	};

	return (
		<section className='filter'>
			<h2 className='visually-hidden'></h2>
			<div className='container'>
				<form className='filter__form'>
					<fieldset className='filter__group'>
						{filterTypes.map(item => {
							return (
								<FilterRadio
									key={item.value}
									data={item}
									type={filters.type}
									handleChangeFilter={handleChangeFilter}
								/>
							);
						})}
					</fieldset>

					{filters.type && (
						<fieldset className='filter__group filter__group_choices'>
							<Choices
								buttonLabel='Цена'
								isOpen={openChoice === 'price'}
								onToggle={() => handleToggleChoice('price')}
							>
								<fieldset className='filter__price'>
									<input
										className='filter__input-price'
										type='text'
										name='minPrice'
										placeholder='от'
										value={filters.minPrice}
										onChange={handleChangePrice}
									/>
									<input
										className='filter__input-price'
										type='text'
										name='maxPrice'
										placeholder='до'
										value={filters.maxPrice}
										onChange={handleChangePrice}
									/>
								</fieldset>
							</Choices>

							{filters.type === 'bouquets' && (
								<Choices
									buttonLabel='Тип товара'
									isOpen={openChoice === 'type'}
									onToggle={() => handleToggleChoice('type')}
								>
									<ul className='filter__type-list'>
										<li className='filter__type-item'>
											<button
												className='filter__type-button'
												type='button'
												value='Монобукеты'
												onClick={handleChangeTypes}
											>
												Монобукеты
											</button>
										</li>
										<li className='filter__type-item'>
											<button
												className='filter__type-button'
												type='button'
												value='Авторские букеты'
												onClick={handleChangeTypes}
											>
												Авторские букеты
											</button>
										</li>
										<li className='filter__type-item'>
											<button
												className='filter__type-button'
												type='button'
												value='Цветы в коробке'
												onClick={handleChangeTypes}
											>
												Цветы в коробке
											</button>
										</li>
										<li className='filter__type-item'>
											<button
												className='filter__type-button'
												type='button'
												value='Цветы в корзине'
												onClick={handleChangeTypes}
											>
												Цветы в корзине
											</button>
										</li>
										<li className='filter__type-item'>
											<button
												className='filter__type-button'
												type='button'
												value='Букеты из сухоцветов'
												onClick={handleChangeTypes}
											>
												Букеты из сухоцветов
											</button>
										</li>
									</ul>
								</Choices>
							)}
						</fieldset>
					)}
				</form>
			</div>
		</section>
	);
};
