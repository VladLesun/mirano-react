export const isNumber = num => {
	return !isNaN(parseInt(num)) && isFinite(num);
};
