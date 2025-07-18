'use client'

import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { Button } from '@components/Button'
import { Quotes } from '@components/Quotes'
import { fetchQuotes } from '@utils/quoteApiHandlers'

export default function RandomQuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchRandomQuotes = () => {
    fetchQuotes({ setQuotes, setIsLoading })
  }

  useEffect(fetchRandomQuotes, [])

  return (
    <div className="p-4">
      <Button onClick={fetchRandomQuotes} text="Get random quotes" />
      {isLoading ? (
        <div className="flex justify-center items-center pt-20">
          <ClipLoader size={60} color="violet" />
        </div>
      ) : (
        <Quotes quotes={quotes} />
      )}
    </div>
  )
}
