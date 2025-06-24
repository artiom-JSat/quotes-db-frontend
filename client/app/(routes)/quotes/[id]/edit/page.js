'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { isQuoteFormValid } from '@utils/validation'
import { QuoteForm } from '@components/QuoteForm'
import { fetcher } from '@utils/fetcher'

export default function EditQuotePage({ params }) {
  const { id } = use(params)
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [categories, setCategories] = useState('')
  const [validationErrors, setValidationErrors] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const QUOTES_API_ENDPOINT = `quotes/${id}`

  const fetchQuote = async () => {
    const data = await fetcher.get(QUOTES_API_ENDPOINT)
    if (data) {
      setText(data.text)
      setAuthor(data.author)
      setCategories(data.categories.join(', '))
    }
    setIsLoading(false)
  }
  
  useEffect(() => {
    fetchQuote()
  }, [])

  const handleSubmit = async () => {
    if (!isQuoteFormValid({ text, author, categories, setValidationErrors })) {
      return
    }

    const payload = {
      text,
      author,
      categories: categories.split(',').map((category) => category.trim()),
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
      text={text}
      setText={setText}
      author={author}
      setAuthor={setAuthor}
      categories={categories}
      setCategories={setCategories}
      validationErrors={validationErrors}
      handleSubmit={handleSubmit}
      buttonText="Update"
    />
  )
}
