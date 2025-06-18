'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { API_URL } from '@config/config'
import Quotes from '@components/Quotes'
import Button from '@components/Button'

const RANDOM_QUOTES_LIMIT = 9
const RANDOM_QUOTES_URL = `${API_URL}/quotes/random?limit=${RANDOM_QUOTES_LIMIT}`

export default function RandomQuotesPage() {
  const [quotes, setQuotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchQuotes = async () => {
    try {
      const response = await fetch(RANDOM_QUOTES_URL)
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      toast.error(error.message)
      console.log('Error fetching quotes: ', error)
    } finally {
      setIsLoading(false)
    }
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
