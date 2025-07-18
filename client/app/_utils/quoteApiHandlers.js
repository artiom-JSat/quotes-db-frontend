import { toast } from 'react-toastify'
import { fetcher } from '@utils/fetcher'
import { isQuoteFormValid } from '@utils/validation'

const QUOTES_API_ENDPOINT = 'quotes'

export const fetchQuoteById = async ({
  quoteId,
  setFormValues,
  setIsLoading,
}) => {
  const SINGLE_QUOTE_API_ENDPOINT = `${QUOTES_API_ENDPOINT}/${quoteId}`
  const data = await fetcher.get(SINGLE_QUOTE_API_ENDPOINT)

  if (data) {
    const { text, author, categories } = data
    setFormValues({
      text,
      author,
      categories: categories.join(', '), // Assuming categories is an array
    })
  }
  setIsLoading(false)
}

const handleQuoteForm = async ({
  method,
  formValues,
  setValidationErrors,
  router,
  quoteId,
}) => {
  const SINGLE_QUOTE_API_ENDPOINT = `${QUOTES_API_ENDPOINT}/${quoteId}`

  if (!isQuoteFormValid({ values: formValues, setValidationErrors })) {
    return
  }

  const { text, author, categories } = formValues
  const payload = {
    text,
    author,
    categories: categories.split(',').map((category) => category.trim()),
  }

  let data
  if (method === 'POST') data = await fetcher.post(QUOTES_API_ENDPOINT, payload)
  if (method === 'PATCH')
    data = await fetcher.patch(SINGLE_QUOTE_API_ENDPOINT, payload)

  if (data) {
    toast.success(
      `Quote ${method === 'post' ? 'created' : 'edited'} successfully!`,
    )
    router.push(`/quotes/${quoteId || data.id}`)
  }
}

export const createQuote = ({ formValues, setValidationErrors, router }) => {
  const method = 'POST'
  handleQuoteForm({ method, formValues, setValidationErrors, router })
}

export const editQuote = ({
  formValues,
  setValidationErrors,
  router,
  quoteId,
}) => {
  const method = 'PATCH'
  handleQuoteForm({ method, formValues, setValidationErrors, router, quoteId })
}
