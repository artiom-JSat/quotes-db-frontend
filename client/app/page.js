'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@/components/Button'
import Quotes from '@/components/Quotes'

const RANDOM_QUOTES_URL = 'http://localhost:3000/quotes/random?limit=9'

export default function RandomQuotesPage() {
  const [quotes, setQuotes] = useState([])

  const fetchQuotes = async () => {
    try {
      const response = await fetch(RANDOM_QUOTES_URL)
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      toast.error(error.message)
      console.log('Error fetching quotes: ', error)
    }
  }

  useEffect(() => {
    fetchQuotes()
  }, [])

  return (
    <div className="p-4">
      <Button onClick={fetchQuotes}>Get random quotes</Button>
      <Quotes quotes={quotes} />
    </div>
  )
}
