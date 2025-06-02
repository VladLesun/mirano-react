import './filter.scss';

export const FilterRadio = ({ data, type, handleChangeFilter }) => {
	return (
		<>
			<input
				className='filter__radio'
				type='radio'
				name='type'
				value={data.value}
				id={data.value}
				checked={type === data.value}
				onChange={handleChangeFilter}
			/>
			<label
				className={`filter__label filter__label_${data.value}`}
				htmlFor={data.value}
			>
				{data.title}
			</label>
		</>
	);
};
