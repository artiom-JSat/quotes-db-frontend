'use client'

import { useState } from 'react'
import Button from '@/components/Button'
import Quote from '@/components/Quote'

const CATEGORY_NAME_REGEX = /^[a-z0-9\-]+$/

const createSearchQueryString = ({ text, author, category }) => {
  const params = new URLSearchParams()

  if (text) params.append('text', text)
  if (author) params.append('author', author)
  if (category) params.append('category', category)

  params.append('limit', 9)

  return params.toString()
}

const Search = () => {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const [searchButtonClicked, setSearchButtonClicked] = useState(false)
  const [quotes, setQuotes] = useState([])
  const [errors, setErrors] = useState({})

  const handleSearch = async () => {
    setSearchButtonClicked(true)

    if (Object.keys(errors).length > 0) {
      return
    }

    try {
      setSearchSubmitted(true)
      const query = createSearchQueryString({ text, author, category })
      const response = await fetch(`http://localhost:3000/quotes?${query}`)
      const data = await response.json()
      setQuotes(data)
    } catch (error) {
      console.log('Error fetching quotes', error)
    }
  }

  const clearSearch = () => {
    setText('')
    setAuthor('')
    setCategory('')
    setSearchButtonClicked(false)
    setSearchSubmitted(false)
    setQuotes([])
  }

  console.log('quotes', quotes)

  const getValidationMessage = (name, value) => {
    if (name === 'text' && value && value.length < 2) {
      return '* Text must be at least 2 characters long.'
    }
    if (name === 'author' && value && value.length < 2) {
      return '* Author must be at least 2 characters long.'
    }
    if (name === 'category' && value && !CATEGORY_NAME_REGEX.test(value)) {
      return '* Category can only contain lowercase letters, numbers and dashes.'
    }
  }

  const handleInputChange = (name, value) => {
    if (name === 'text') setText(value)
    if (name === 'author') setAuthor(value)
    if (name === 'category') setCategory(value)

    const errorMessage = getValidationMessage(name, value)

    setErrors((prev) => {
      const newErrors = { ...prev }
      if (errorMessage) {
        newErrors[name] = errorMessage
      } else {
        delete newErrors[name]
      }
      return newErrors
    })
  }

  const inputStyle =
    'w-full p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600 dark:text-white'

  const errorStyle = 'text-red-500 text-sm absolute'

  return (
    <div className="p-4">
      <div className="text-xl pb-1 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by text"
            value={text}
            onChange={(e) => handleInputChange('text', e.target.value)}
            className={inputStyle}
          />
          {errors.text && searchButtonClicked && (
            <p className={errorStyle}>{errors.text}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by author"
            value={author}
            onChange={(e) => handleInputChange('author', e.target.value)}
            className={inputStyle}
          />
          {errors.author && searchButtonClicked && (
            <p className={errorStyle}>{errors.author}</p>
          )}
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Search by category"
            value={category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={inputStyle}
          />
          {errors.category && searchButtonClicked && (
            <p className={errorStyle}>{errors.category}</p>
          )}
        </div>
      </div>

      <div className="flex justify-center md-6 space-x-4">
        <Button onClick={handleSearch}>Search</Button>
        <Button onClick={clearSearch} variant='secondary'>Clear</Button>
      </div>

      {quotes.length > 0 ? (
        <div className="pt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quotes.map((quote) => (
            <Quote key={quote.id} quote={quote} />
          ))}
        </div>
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

export default Search
