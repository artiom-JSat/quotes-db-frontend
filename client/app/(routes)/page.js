'use client'

import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { Button } from '@components/Button'
import { Quotes } from '@components/Quotes'
import { fetcher } from '@utils/fetcher'

const RANDOM_QUOTES_LIMIT = 9
const RANDOM_QUOTES_ENDPOINT = `quotes/random`

export default function RandomQuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchQuotes = async () => {
    const queryParams = {
      limit: RANDOM_QUOTES_LIMIT,
    }
    const data = await fetcher.get(RANDOM_QUOTES_ENDPOINT, queryParams)
    if (data) setQuotes(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <div className="p-4">
      <Button onClick={fetchQuotes} text="Get random quotes" />
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
