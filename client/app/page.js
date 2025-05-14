'use client'

import { useEffect, useState } from 'react'

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

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl mb-6 dark:text-white">
        Quotes frontend app
      </h1>

      <div className="text-center m-6" onClick={fetchQuotes}>
        <button className='px-4 py-2 text-xl cursor-pointer bg-violet-500 text-white rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-600'>Get random quotes</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <div
            key={quote.id}
            className="bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg"
          >
            <p className="mb-4 text-lg italic text-gray-900  dark:text-gray-100">
              &quot;{quote.text}&quot;
            </p>
            <p className="mb-10 text-right font-semibold text-gray-700  dark:text-gray-300">
              — {quote.author}
            </p>
            <div className="flex flex-wrap mt-2">
              {quote.categories.map((category) => (
                <span
                  key={category}
                  className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-2 mb-2"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
