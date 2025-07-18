'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { Button } from '@components/Button'
import { CategoryTags } from '@components/CategoryTags'
import { deleteQuoteById, fetchQuoteById } from '@utils/quoteApiHandlers'

export default function QuotePage({ params }) {
  const { id } = use(params)
  const [quote, setQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

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
        <Button
          onClick={() => deleteQuoteById({ id, router })}
          variant="danger"
          text="Delete"
        />
      </div>
    </div>
  )
}
