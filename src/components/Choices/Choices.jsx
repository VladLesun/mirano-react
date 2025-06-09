import classNames from 'classnames';
import { useEffect, useRef } from 'react';
import { adjustElementPosition } from '../../utils/adjustElementPosition';
import { debounce } from '../../utils/debounce';
import './choices.scss';

export const Choices = ({
	children,
	buttonLabel,
	className,
	isOpen,
	onToggle,
}) => {
	const choiceRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			adjustElementPosition(choiceRef.current);
		}

		const debAdjustElementPosition = debounce(() => {
			if (isOpen) {
				adjustElementPosition(choiceRef.current);
			}
		}, 300);

		window.addEventListener('resize', debAdjustElementPosition);

		return () => {
			window.removeEventListener('resize', debAdjustElementPosition);
		};
	}, [isOpen]);

	return (
		<div className={classNames('choices', className)}>
			<button className='choices__btn' type='button' onClick={onToggle}>
				{buttonLabel}
			</button>

			{isOpen && (
				<div className='choices__box' ref={choiceRef}>
					{children}
				</div>
			)}
		</div>
	);
};
