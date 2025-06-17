'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/config'
import Quotes from '@/components/Quotes'
import Button from '@/components/Button'

const RANDOM_QUOTES_LIMIT = 9
const RANDOM_QUOTES_URL = `${API_URL}/quotes/random?limit=${RANDOM_QUOTES_LIMIT}`

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
      <Button onClick={fetchQuotes} text='Get random quotes' />
      <Quotes quotes={quotes} />
    </div>
  )
}
