import { toast } from 'react-toastify'
import { fetcher } from '@utils/fetcher'
import { isQuoteFormValid } from '@utils/validation'

const QUOTES_API_ENDPOINT = 'quotes'

const isQuoteValidId = (id) => {
  const parsedId = parseInt(id, 10)
  return Number.isInteger(parsedId) && parsedId > 0 && parsedId < 2147483647
}

export const fetchQuoteById = async ({
  id,
  setData, // Generic setter function
  setIsLoading,
  formatData, // Optional function to format the response data
}) => {
  if (!isQuoteValidId(id)) {
    toast.error(
      `Invalid quote ID ${id}. ID must be an integer in the range 1...2147483647.`,
    )
    setIsLoading(false)
    return
  }

  const SINGLE_QUOTE_API_ENDPOINT = `${QUOTES_API_ENDPOINT}/${id}`
  const data = await fetcher.get(SINGLE_QUOTE_API_ENDPOINT)

  if (data) {
    const formattedData = formatData ? formatData(data) : data
    setData(formattedData)
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
