import { toast } from "react-toastify"

export const handleErrors = async (response) => {
  if (!response.ok) {
    let errorMessage = 'Some error occurred'
    let inputValidationErrors

    try {
      const errorData = await response.json()
      if (errorData?.message) {
        errorMessage = errorData.message
      }
      if (errorData.errors && Array.isArray(errorData.errors)) {
        inputValidationErrors = errorData.errors
          .filter((err) => err.type === 'field')
          .map((err) => `${err.msg} (${err.path}, ${err.value})`)
      }
    } catch {
      errorMessage = 'JSON parsing error'
    }
    if (inputValidationErrors) {
      inputValidationErrors.forEach((errorMessage) => {
        console.log(errorMessage)
        toast.error(errorMessage)
      })
    } else {
      console.log(errorMessage)
      toast.error(errorMessage)
    }
  }
}