'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { Button } from '@components/Button'
import { fetcher } from '@utils/fetcher'
import { CategoryTags } from '@components/CategoryTags'
import { fetchQuoteById } from '@utils/quoteApiHandlers'

export default function QuotePage({ params }) {
  const { id } = use(params)
  const [quote, setQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const SINGLE_QUOTE_ENDPOINT = `quotes/${id}`

  const deleteQuote = async () => {
    if (await fetcher.delete(SINGLE_QUOTE_ENDPOINT)) {
      toast.success(`Quote with ID ${id} was successfully deleted!`)
      setTimeout(() => router.push('/'), 2000)
    }
  }

  // const fetchQuote = async () => {
  //   const data = await fetcher.get(SINGLE_QUOTE_ENDPOINT)
  //   if (data) setQuote(data)
  //   setIsLoading(false)
  // }

  useEffect(() => {
    fetchQuoteById({ id, setIsLoading, setData: setQuote })
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center pt-20">
        <ClipLoader size={60} color="violet" />
      </div>
    )
  }

  if (!quote) {
    return (
      <p className="text-center text-2xl mt-10">{`Quote with id ${id} not found.`}</p>
    )
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 m-8 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <h2 className="text-xl md:text-2xl text-gray-900 dark:text-violet-300">
          {quote.text}
        </h2>
        <Link href={`/search?author=${quote.author}`}>
          <p className="text-2xl font-bold text-right mb-6 mt-4 text-gray-600 dark:text-gray-300">
            — <span className="hover:underline">{quote.author}</span>
          </p>
        </Link>
        <CategoryTags categories={quote.categories} isSingleQuotePage={true} />
      </div>
      <div className="flex justify-center md-6 space-x-4">
        <Link href={`/quotes/${quote.id}/edit`}>
          <Button text="Edit" variant="primary" />
        </Link>
        <Button onClick={deleteQuote} variant="danger" text="Delete" />
      </div>
    </div>
  )
}
