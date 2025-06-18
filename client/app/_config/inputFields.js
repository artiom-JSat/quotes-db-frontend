// For new quote page form and edit existing quote page form
export const createQuotesInputFields = ({
  text,
  setText,
  author,
  setAuthor,
  categories,
  setCategories,
  validationErrors,
}) => [
  {
    name: 'text',
    placeholder: 'Quote text',
    value: text,
    onChange: (e) => setText(e.target.value),
    error: validationErrors.text,
  },
  {
    name: 'author',
    placeholder: 'Author',
    value: author,
    onChange: (e) => setAuthor(e.target.value),
    error: validationErrors.author,
  },
  {
    name: 'categories',
    placeholder: 'Categories (comma-separated)',
    value: categories,
    onChange: (e) => setCategories(e.target.value),
    error: validationErrors.categories,
  },
]

// For search page form
export const createSearchInputFields = ({
  text,
  author,
  category,
  limit,
  validationErrors,
}) => [
  {
    name: 'text',
    placeholder: 'Search by text',
    value: text,
    error: validationErrors.text,
  },
  {
    name: 'author',
    placeholder: 'Search by author',
    value: author,
    error: validationErrors.author,
  },
  {
    name: 'category',
    placeholder: 'Search by category',
    value: category,
    error: validationErrors.category,
  },
  { name: 'limit', placeholder: 'Limit', value: limit || '', error: null }, // no error for limit
]
