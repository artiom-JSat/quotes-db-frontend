'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ClipLoader } from 'react-spinners'
import { Quotes } from '@components/Quotes'
import { InputField } from '@components/InputField'
import { Button } from '@components/Button'
import { createSearchInputFields } from '@config/inputFields'
import { getSearchInputValidationMessage } from '@utils/validation'
import { fetchQuotes } from '@utils/quoteApiHandlers'
import {
  createSearchQueryString,
  createSearchValuesFromQueryString,
} from '@utils/queryString'

const INITIAL_SEARCH_VALUES = {
  text: '',
  author: '',
  category: '',
  limit: '',
}

export default function SearchQuotesPage() {
  const [searchValues, setSearchValues] = useState(INITIAL_SEARCH_VALUES)
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const [searchButtonClicked, setSearchButtonClicked] = useState(false)
  const [quotes, setQuotes] = useState([])
  const [validationErrors, setValidationErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const searchValuesFromQueryString =
      createSearchValuesFromQueryString(searchParams)

    const shouldTriggerSearch = Object.entries(searchValuesFromQueryString)
      .some(([key, value]) => searchValues[key] !== value)

    if (shouldTriggerSearch) {
      setSearchValues(searchValuesFromQueryString)
      handleSearch(searchValuesFromQueryString)
    }
  }, [searchParams])

  const handleSearch = async (inputSearchValues) => {
    setSearchButtonClicked(true)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    const queryParams = { ...inputSearchValues }

    const query = createSearchQueryString(queryParams)
    // Update the query string in the URL
    router.push(`?${query}`)

    setSearchSubmitted(true)
    fetchQuotes({ setQuotes, setIsLoading, queryParams })
  }

  const clearSearch = () => {
    setSearchValues({ ...INITIAL_SEARCH_VALUES })
    setSearchButtonClicked(false)
    setSearchSubmitted(false)
    setQuotes([])
    router.push(window.location.pathname)
  }

  const handleInputChange = (name, value) => {
    setSearchValues({ ...searchValues, [name]: value })

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
    searchValues,
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
        <Button onClick={() => handleSearch(searchValues)} text="Search" />
        <Button onClick={clearSearch} text="Clear" variant="secondary" />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center pt-20">
          <ClipLoader size={60} color="violet" />
        </div>
      ) : quotes.length > 0 ? (
        <Quotes
          quotes={quotes}
          category={searchValues.category}
          searchText={searchValues.text}
        />
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
