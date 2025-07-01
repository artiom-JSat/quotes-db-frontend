import { Button } from '@components/Button'
import { QuoteFormFields } from '@components/QuoteFormFields'

export const QuoteForm = ({
  values,
  setValues,
  validationErrors,
  handleSubmit,
  buttonText,
}) => {
  return (
    <div className="p-4">
      <QuoteFormFields
        values={values}
        setValues={setValues}
        validationErrors={validationErrors}
      />
      <div className="flex justify-center mb-6">
        <Button text={buttonText} onClick={handleSubmit} />
      </div>
    </div>
  )
}
