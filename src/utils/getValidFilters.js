export const getValidFilters = filters => {
	const validFilters = {};

	for (const key in filters) {
		if (Object.prototype.hasOwnProperty.call(filters, key) && filters[key]) {
			validFilters[key] = filters[key];
		}
	}

	return validFilters;
};
