import { ALLOWED_SEARCH_PARAMS_NAMES } from '@config/config'

export const createSearchQueryString = (queryParams = {}) => {
  // Filter the queryParams object to only include allowed params names
  // Filter falsy values: undefined, null and ''
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(
      ([key, value]) =>
        ALLOWED_SEARCH_PARAMS_NAMES.includes(key) &&
        value !== undefined &&
        value !== null &&
        value !== '',
    ),
  )

  return new URLSearchParams(filteredParams).toString()
}

export const createSearchValuesFromQueryString = (searchParams) => {
  return ALLOWED_SEARCH_PARAMS_NAMES.reduce((acc, searchParamName) => {
    const value = searchParams.get(searchParamName);
    // Only include the parameter if it exists and is not empty
    if (value) {
      acc[searchParamName] = value;
    }
    return acc;
  }, {});
};

// export const createSearchValuesFromQueryString = (searchParams) =>
//   ALLOWED_SEARCH_PARAMS_NAMES.reduce((acc, searchParamName) => {
//     acc[searchParamName] = searchParams.get(searchParamName) || ''
//     return acc
//   }, {})
