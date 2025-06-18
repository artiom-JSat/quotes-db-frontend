import { InputField } from '@components/InputField'
import { createQuotesInputFields } from '@config/inputFields'

export const QuoteFormFields = ({
  text,
  setText,
  author,
  setAuthor,
  categories,
  setCategories,
  validationErrors,
}) => {
  const quotesInputFields = createQuotesInputFields({
    text,
    setText,
    author,
    setAuthor,
    categories,
    setCategories,
    validationErrors,
  })

  return (
    <div className="text-xl grid grid-cols-1 gap-4 mb-6 mx-auto md:w-3/4 lg:w-1/2">
      {quotesInputFields.map(
        ({ name, value, placeholder, error, onChange }) => (
          <InputField
            key={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            error={error}
            showError={true}
          />
        ),
      )}
    </div>
  )
}
