'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { QuoteForm } from '@components/QuoteForm'
import { createQuote } from '@utils/quoteApiHandlers'

const INITIAL_FORM_VALUES = {
  text: '',
  author: '',
  categories: '',
}

export default function CreateQuotePage() {
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES)
  const [validationErrors, setValidationErrors] = useState({})

  const router = useRouter()

  const handleSubmitHandler = () =>
    createQuote({
      formValues,
      setValidationErrors,
      router,
    })

  return (
    <QuoteForm
      values={formValues}
      setValues={setFormValues}
      validationErrors={validationErrors}
      handleSubmit={handleSubmitHandler}
      buttonText="Create"
    />
  )
}
