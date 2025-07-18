export const createSearchQueryString = (queryParams = {}) => {
  const allowedParamsNames = ['text', 'author', 'category', 'limit', 'offset']

  // Filter the queryParams object to only include allowed params names
  // Filter falsy values: undefined, null and ''
  const filteredParams = Object.fromEntries(
    Object.entries(queryParams).filter(
      ([key, value]) =>
        allowedParamsNames.includes(key) &&
        value !== undefined &&
        value !== null &&
        value !== '',
    ),
  )

  return new URLSearchParams(filteredParams).toString()
}
