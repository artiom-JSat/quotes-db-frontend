'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { Quotes } from '@components/Quotes'
import { InputField } from '@components/InputField'
import { Button } from '@components/Button'
import { createSearchInputFields } from '@config/inputFields'
import { fetcher } from '@utils/fetcher'
import { getSearchInputValidationMessage } from '@utils/validation'

const QUOTES_URL_ENDPOINT = `quotes`

const createSearchQueryString = ({ text, author, category, limit = 9 }) => {
  const params = new URLSearchParams()

  if (text) params.append('text', text)
  if (author) params.append('author', author)
  if (category) params.append('category', category)
  if (limit) params.append('limit', limit)

  return params.toString()
}

export default function SearchQuotesPage() {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [limit, setLimit] = useState()
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const [searchButtonClicked, setSearchButtonClicked] = useState(false)
  const [quotes, setQuotes] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const initialText = searchParams.get('text') || ''
    const initialAuthor = searchParams.get('author') || ''
    const initialCategory = searchParams.get('category') || ''
    const initialLimit = searchParams.get('limit')

    if (initialText || initialAuthor || initialCategory || initialLimit) {
      initialText && setText(initialText)
      initialAuthor && setAuthor(initialAuthor)
      initialCategory && setCategory(initialCategory)
      initialLimit && setLimit(initialLimit)

      handleSearch({
        searchText: initialText,
        searchAuthor: initialAuthor,
        searchCategory: initialCategory,
        searchLimit: initialLimit,
      })
    }
  }, [])

  const handleSearch = async ({
    searchText = text,
    searchAuthor = author,
    searchCategory = category,
    searchLimit = limit,
  }) => {
    setSearchButtonClicked(true)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const query = createSearchQueryString({
      text: searchText,
      author: searchAuthor,
      category: searchCategory,
      limit: searchLimit,
    })
    router.push(`?${query}`)

    setSearchSubmitted(true)
    setIsLoading(true)
    const data = await fetcher.get(`${QUOTES_URL_ENDPOINT}?${query}`)
    if (data) setQuotes(data)
    setIsLoading(false)
  }

  const clearSearch = () => {
    setText('')
    setAuthor('')
    setCategory('')
    setLimit()
    setSearchButtonClicked(false)
    setSearchSubmitted(false)
    setQuotes([])
    router.push(window.location.pathname)
  }

  const handleInputChange = (name, value) => {
    if (name === 'text') setText(value)
    if (name === 'author') setAuthor(value)
    if (name === 'category') setCategory(value)
    if (name === 'limit') setLimit(value)

    const errorMessage = getSearchInputValidationMessage(name, value)
    const newValidationErrors = { ...validationErrors }
    if (errorMessage) {
      newValidationErrors[name] = errorMessage
    } else {
      delete newValidationErrors[name]
    }
    setValidationErrors(newValidationErrors)
  }

  const searchInputFields = createSearchInputFields({
    text,
    author,
    category,
    limit,
    validationErrors,
  })

  return (
    <div className="p-4">
      <div className="text-xl pb-1 grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_0.3fr] gap-4 mb-6">
        {searchInputFields.map(({ name, placeholder, value, error }) => (
          <InputField
            key={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleInputChange(name, e.target.value)}
            error={error}
            showError={searchButtonClicked}
          />
        ))}
      </div>

      <div className="flex justify-center md-6 space-x-4">
        <Button onClick={handleSearch} text="Search" />
        <Button onClick={clearSearch} text="Clear" variant="secondary" />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center pt-20">
          <ClipLoader size={60} color="violet" />
        </div>
      ) : quotes.length > 0 ? (
        <Quotes quotes={quotes} />
      ) : (
        searchSubmitted && (
          <p className="text-xl pt-10 text-center text-gray-600 dark:text-gray-400">
            Not found quotes.
          </p>
        )
      )}
    </div>
  )
}
