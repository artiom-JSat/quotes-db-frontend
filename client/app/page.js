'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/Button'
import Quote from '@/components/Quote'

const RANDOM_QUOTES_URL = 'http://localhost:3000/quotes/random?limit=9'

export default function Home() {
  const [quotes, setQuotes] = useState([])

  const fetchQuotes = async () => {
    try {
      const response = await fetch(RANDOM_QUOTES_URL)
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      console.log('Error fetching quotes: ', error)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  console.log('quotes', quotes)

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-6 text-center dark:text-white">
        Random Quotes
      </h1>

      <Button onClick={fetchQuotes}>Get random quotes</Button>

      <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <Quote key={quote.id} quote={quote} />
        ))}
      </div>
    </div>
  )
}
