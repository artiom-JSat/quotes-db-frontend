'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { API_URL } from '@/config/config'
import Button from '@/components/Button'

const QUOTES_URL = `${API_URL}/quotes`

export default function QuotePage({ params }) {
  const { id } = use(params)
  const [quote, setQuote] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const SINGLE_QUOTE_API_URL = `${QUOTES_URL}/${id}`

  const isValidId = (id) => {
    const parsedId = parseInt(id, 10)
    return Number.isInteger(parsedId) && parsedId > 0
  }

  const deleteQuote = async () => {
    const response = await fetch(SINGLE_QUOTE_API_URL, {
      method: 'DELETE',
    })
    console.log(response)
    if (!response.ok) {
      toast.error(
        response.status === 404
          ? `Quote with ID ${id} was not found`
          : `Unknown error. Quote with ID ${id} was not deleted`,
      )
      return
    }

    toast.success(`Quote with ID ${id} was successfully deleted!`)
    setTimeout(() => router.push('/'), 2000)
  }

  useEffect(() => {
    const fetchQuote = async () => {
      if (!isValidId(id)) {
        toast.error(`Invalid quote ID ${id}. ID must be an integer than 0.`)
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(SINGLE_QUOTE_API_URL)
        const data = await response.json()
        if (response.status === 404) {
          toast.error(data.message)
          console.log(data.message)
          return
        }
        if (response.status === 400) {
          data.errors.forEach((error) => {
            toast.error(error.msg)
            console.log(error.msg)
          })
          return
        }
        if (response.ok) {
          setQuote(data)
        }
      } catch (error) {
        toast.error(error.message)
        console.error('Error fetching quote: ', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchQuote()
  }, [id])

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
      <div className="max-w-4xl mx-auto p-6 mt-8 bg-white shadow-lg rounded-lg dark:bg-gray-800">
        <h2 className="text-xl md:text-2xl text-gray-900 dark:text-violet-300">
          {quote.text}
        </h2>
        <p className="text-2xl font-bold text-right mb-6 mt-4 text-gray-600 dark:text-gray-300">
          — {quote.author}
        </p>
        <div className="flex flex-wrap mt-2">
          {quote.categories.map((category) => (
            <span
              key={category}
              className="text-base bg-blue-200  text-gray-700  px-4 py-1 rounded-lg mr-2 mb-2"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <Button onClick={deleteQuote} variant="danger">
          Delete
        </Button>
      </div>
    </div>
  )
}
