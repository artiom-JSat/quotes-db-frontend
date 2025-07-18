'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { QuoteForm } from '@components/QuoteForm'
import { editQuote, fetchQuoteById } from '@utils/quoteApiHandlers'

const INITIAL_FORM_VALUES = {
  text: '',
  author: '',
  categories: '',
}

export default function EditQuotePage({ params }) {
  const { id } = use(params)
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES)
  const [validationErrors, setValidationErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    fetchQuoteById({ quoteId: id, setFormValues, setIsLoading })
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-20">
        <ClipLoader size={60} color="violet" />
      </div>
    )
  }

  const handleSubmitHandler = () =>
    editQuote({
      formValues,
      setValidationErrors,
      router,
      quoteId: id,
    })

  return (
    <QuoteForm
      values={formValues}
      setValues={setFormValues}
      validationErrors={validationErrors}
      handleSubmit={handleSubmitHandler}
      buttonText="Update"
    />
  )
}
