import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/products/products.action';
import { debounce } from '../../utils/debounce';
import { getValidFilters } from '../../utils/getValidFilters';
import { Choices } from '../Choices/Choices';
import './filter.scss';

export const Filter = () => {
	const dispatch = useDispatch();
	const [openChoice, setOpenChoice] = useState(null);
	const [filters, setFilters] = useState({
		type: 'bouquets',
		minPrice: '',
		maxPrice: '',
		category: '',
	});

	const prevFiltersRef = useRef(filters);

	const debouncedFetchProducts = useRef(
		debounce(filters => {
			dispatch(fetchProducts(filters));
		}, 300)
	).current;

	useEffect(() => {
		const prevFilters = prevFiltersRef.current;
		const validFilters = getValidFilters(filters);
		if (prevFilters.type !== filters.type) {
			dispatch(fetchProducts(validFilters));
		} else {
			debouncedFetchProducts(validFilters);
		}

		prevFiltersRef.current = filters;
	}, [dispatch, debouncedFetchProducts, filters]);

	const handleToggleChoice = str =>
		setOpenChoice(openChoice === str ? null : str);

	const handleChangeFilter = ({ target }) => {
		const { value } = target;
		const newFilter = { ...filters, type: value };
		setFilters({ ...newFilter, minPrice: '', maxPrice: '' });
		setOpenChoice(null);
	};

	const handleChangePrice = ({ target }) => {
		const { name, value } = target;
		const newFilter = {
			...filters,
			[name]: !isNaN(parseInt(value, 10)) ? value : '',
		};
		setFilters(newFilter);
	};

	return (
		<section className='filter'>
			<h2 className='visually-hidden'></h2>
			<div className='container'>
				<form className='filter__form'>
					<fieldset className='filter__group'>
						<input
							className='filter__radio'
							type='radio'
							name='type'
							value='bouquets'
							id='flower'
							checked={filters.type === 'bouquets'}
							onChange={handleChangeFilter}
						/>
						<label
							className='filter__label filter__label_flower'
							htmlFor='flower'
						>
							Цветы
						</label>

						<input
							className='filter__radio'
							type='radio'
							name='type'
							value='toys'
							id='toys'
							checked={filters.type === 'toys'}
							onChange={handleChangeFilter}
						/>
						<label className='filter__label filter__label_toys' htmlFor='toys'>
							Игрушки
						</label>

						<input
							className='filter__radio'
							type='radio'
							name='type'
							value='postcards'
							id='postcard'
							checked={filters.type === 'postcards'}
							onChange={handleChangeFilter}
						/>
						<label
							className='filter__label filter__label_postcard'
							htmlFor='postcard'
						>
							Открытки
						</label>
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

						<Choices
							buttonLabel='Тип товара'
							isOpen={openChoice === 'type'}
							onToggle={() => handleToggleChoice('type')}
						>
							<ul className='filter__type-list'>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Монобукеты
									</button>
								</li>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Авторские букеты
									</button>
								</li>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Цветы в коробке
									</button>
								</li>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Цветы в корзине
									</button>
								</li>
								<li className='filter__type-item'>
									<button className='filter__type-button' type='button'>
										Букеты из сухоцветов
									</button>
								</li>
							</ul>
						</Choices>
					</fieldset>
				</form>
			</div>
		</section>
	);
};
