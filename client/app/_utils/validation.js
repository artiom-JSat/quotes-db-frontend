const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/

export const isQuoteFormValid = ({ values, setValidationErrors }) => {
  const errors = {}
  const { text, author, categories } = values

  if (text.length < 10)
    errors.text = 'Text must be at least 10 characters long.'
  if (author.length < 2 || author.length > 255)
    errors.author = 'Author must be between 2 and 255 characters long.'
  if (!categories.trim()) {
    errors.categories = 'There must be al least one category.'
  } else {
    const categoryArray = categories
      .split(',')
      .map((category) => category.trim())
    const invalidCategories = categoryArray.filter(
      (category) => !CATEGORY_NAME_REGEX.test(category),
    )
    if (invalidCategories.length > 0) {
      errors.categories = `Invalid categories: ${invalidCategories.join(
        ',',
      )}. Category names can only lowercase letters, numbers and dashes.`
    }
  }

  setValidationErrors(errors)
  return Object.keys(errors).length === 0
}

export const getSearchInputValidationMessage = (name, value) => {
  if (name === 'text' && value && value.length < 2) {
    return '* Text must be at least 2 characters long.'
  }
  if (name === 'author' && value && value.length < 2) {
    return '* Author must be at least 2 characters long.'
  }
  if (name === 'category' && value && !CATEGORY_NAME_REGEX.test(value)) {
    return '* Category can only contain lowercase letters, numbers and dashes.'
  }
}
