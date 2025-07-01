'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { isQuoteFormValid } from '@utils/validation'
import { QuoteForm } from '@components/QuoteForm'
import { fetcher } from '@utils/fetcher'

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
  const QUOTES_API_ENDPOINT = `quotes/${id}`

  const fetchQuote = async () => {
    const data = await fetcher.get(QUOTES_API_ENDPOINT)
    if (data) {
      setFormValues({
        text: data.text,
        author: data.author,
        categories: data.categories.join(', '), // Assuming categories is an array
      })
    }
    setIsLoading(false)
  }

  useEffect(() => {
    fetchQuote()
  }, [])

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

    const data = await fetcher.patch(QUOTES_API_ENDPOINT, payload)
    if (data) {
      toast.success('Quote edited successfully!')
      router.push(`/quotes/${id}`)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-20">
        <ClipLoader size={60} color="violet" />
      </div>
    )
  }

  return (
    <QuoteForm
      values={formValues}
      setValues={setFormValues}
      validationErrors={validationErrors}
      handleSubmit={handleSubmit}
      buttonText="Update"
    />
  )
}
