import { changePrice, changeType } from '@store/filter/filters.slice';
import { fetchProducts } from '@store/products/products.action';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../../store/filter/filters.slice';
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
	const filters = useSelector(state => state.filters);
	const categories = useSelector(state => state.products.categories);

	const [openChoice, setOpenChoice] = useState(null);

	const filterRef = useRef(null);
	const prevFiltersRef = useRef(filters);

	const debouncedFetchProducts = useRef(
		debounce(filters => {
			dispatch(fetchProducts(filters));
		}, 300)
	).current;

	useEffect(() => {
		document.addEventListener('click', e => {
			const target = e.target.closest('.filter__group_choices');

			if (!target && openChoice !== null) {
				setOpenChoice(null);
			}
		});
	}, [openChoice]);

	useEffect(() => {
		if (filters !== prevFiltersRef.current) {
			filterRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [filters]);

	useEffect(() => {
		const prevMinPrice = prevFiltersRef.current.minPrice;
		const prevMaxPrice = prevFiltersRef.current.maxPrice;

		const validFilter = getValidFilters(filters);

		if (!validFilter.type && !validFilter.search) {
			return;
		}

		if (
			prevMinPrice !== filters.minPrice ||
			prevMaxPrice !== filters.maxPrice
		) {
			debouncedFetchProducts(validFilter);
		} else {
			dispatch(fetchProducts(validFilter));

			const type = filterTypes.find(item => item.value === validFilter.type);

			if (type) {
				setTitle(type.title);
			}

			if (validFilter.search) {
				setTitle(`Результат поиска: ${validFilter.search}`);
			}
		}

		prevFiltersRef.current = filters;
	}, [dispatch, debouncedFetchProducts, setTitle, filters]);

	const handleToggleChoice = str =>
		setOpenChoice(openChoice === str ? null : str);

	const handleChangeFilter = ({ target }) => {
		const { value } = target;
		dispatch(changeType(value));
		setOpenChoice(null);
	};

	const handleChangePrice = ({ target }) => {
		const { name, value } = target;
		dispatch(changePrice({ name, value }));
	};

	const handleChangeCategory = category => {
		dispatch(changeCategory(category));
		setOpenChoice(null);
	};

	return (
		<section className='filter' ref={filterRef}>
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

						{categories.length ? (
							<Choices
								buttonLabel='Тип товара'
								isOpen={openChoice === 'type'}
								onToggle={() => handleToggleChoice('type')}
							>
								<ul className='filter__type-list'>
									<li className='filter__type-item'>
										<button
											className={classNames(
												'filter__type-button',
												!filters.category ? 'filter__type-button_active' : ''
											)}
											type='button'
											onClick={() => handleChangeCategory('')}
										>
											Все товары
										</button>
									</li>
									{categories.map(category => (
										<li key={category} className='filter__type-item'>
											<button
												className={classNames(
													'filter__type-button',
													category === filters.category
														? 'filter__type-button_active'
														: ''
												)}
												type='button'
												onClick={() => handleChangeCategory(category)}
											>
												{category}
											</button>
										</li>
									))}
								</ul>
							</Choices>
						) : null}
					</fieldset>
				</form>
			</div>
		</section>
	);
};
