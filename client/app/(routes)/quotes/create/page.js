'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { isQuoteFormValid } from '@utils/validation'
import { QuoteForm } from '@components/QuoteForm'
import { fetcher } from '@utils/fetcher'

const QUOTES_URL_ENDPOINT = `quotes`
const INITIAL_FORM_VALUES = {
    text: '',
    author: '',
    categories: '',
  }

export default function CreateQuotePage() {
  const [formValues, setFormValues] = useState(INITIAL_FORM_VALUES)
  const [validationErrors, setValidationErrors] = useState({})

  const router = useRouter()

  const handleSubmit = async () => {
    if (!isQuoteFormValid({ values: formValues, setValidationErrors })) {
      return
    }

    const payload = {
      text: formValues.text,
      author: formValues.author,
      categories: formValues.categories
        .split(',')
        .map((category) => category.trim()),
    }

    const data = await fetcher.post(QUOTES_URL_ENDPOINT, payload)
    if (data) {
      toast.success('Quote created successfully!')
      router.push(`/quotes/${data.id}`)
    }
  }

  return (
    <QuoteForm
      values={formValues}
      setValues={setFormValues}
      validationErrors={validationErrors}
      handleSubmit={handleSubmit}
      buttonText="Create"
    />
  )
}
