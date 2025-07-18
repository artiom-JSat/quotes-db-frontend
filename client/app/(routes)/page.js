'use client'

import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { Button } from '@components/Button'
import { Quotes } from '@components/Quotes'
import { fetchRandomQuotes } from '@utils/quoteApiHandlers'

export default function RandomQuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRandomQuotes({ setQuotes, setIsLoading })
  }, [])

  return (
    <div className="p-4">
      <Button
        onClick={() => fetchRandomQuotes({ setQuotes, setIsLoading })}
        text="Get random quotes"
      />
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
