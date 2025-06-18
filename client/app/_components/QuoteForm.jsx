import { Button } from '@components/Button'
import { QuoteFormFields } from '@components/QuoteFormFields'

export const QuoteForm = ({
  text,
  setText,
  author,
  setAuthor,
  categories,
  setCategories,
  validationErrors,
  handleSubmit,
  buttonText,
}) => {
  return (
    <div className="p-4">
      <QuoteFormFields
        text={text}
        setText={setText}
        author={author}
        setAuthor={setAuthor}
        categories={categories}
        setCategories={setCategories}
        validationErrors={validationErrors}
      />
      <div className="flex justify-center mb-6">
        <Button text={buttonText} onClick={handleSubmit} />
      </div>
    </div>
  )
}
