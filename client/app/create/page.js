'use client'

import Button from '@/components/Button'
import InputField from '@/components/InputField'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function CreateQuotePage() {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [categories, setCategories] = useState('')
  const [validationErrors, setValidationErrors] = useState({})

  const router = useRouter()

  const isFormValid = () => {
    const errors = {}
    if (text.length < 10)
      errors.text = 'Text must be at least 10 characters long.'
    if (author.length < 2 || author.length > 255)
      errors.author = 'Author must be between 2 and 255 characters long.'
    if (!categories.trim())
      errors.categories = 'There must be at least one category.'

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return
    }

    const payload = {
      text,
      author,
      categories: categories.split(',').map((category) => category.trim()),
    }

    try {
      const response = await fetch('http://localhost:3000/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to create quote.')
      }

      const data = await response.json()
      toast.success('Quote created successfully!')

      router.push(`/quotes/${data.id}`)
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="p-4">
      <div className="text-xl grid grid-cols-1 gap-4 mb-6 mx-auto md:w-3/4 lg:w-1/2">
        <InputField
          placeholder="Quote text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          error={validationErrors.text}
          showError={true}
        />
        <InputField
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          error={validationErrors.author}
          showError={true}
        />
        <InputField
          placeholder="Categories (comma-separated)"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          error={validationErrors.categories}
          showError={true}
        />
      </div>
      <div className="flex justify-center mb-6">
        <Button onClick={handleSubmit}>Create</Button>
      </div>
    </div>
  )
}
