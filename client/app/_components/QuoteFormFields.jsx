import { InputField } from '@components/InputField'

export const QuoteFormFields = ({
  text,
  setText,
  author,
  setAuthor,
  categories,
  setCategories,
  validationErrors,
}) => {
  const inputFields = [
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

  return (
    <div className="text-xl grid grid-cols-1 gap-4 mb-6 mx-auto md:w-3/4 lg:w-1/2">
      {inputFields.map(({ name, value, placeholder, error, onChange }) => (
        <InputField
          key={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          error={error}
          showError={true}
        />
      ))}
    </div>
  )
}
