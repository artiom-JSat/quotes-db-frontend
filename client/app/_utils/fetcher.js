import { toast } from 'react-toastify'
import { API_URL } from '@config/config'
import { handleErrors } from '@utils/fetcherErrorsHandler'

export default {
  // get: async (endpoint) => {
  //   try {
  //     const response = await fetch(`${API_URL}/${endpoint}`)
  //     await handleErrors(response)
  //     return await response.json()
  //   } catch (error) {
  //     console.error('Error during GET request: ', error)
  //     throw error
  //   }
  // },
  // post: async (endpoint, payload) => {
  //   try {
  //     const response = await fetch(`${API_URL}/${endpoint}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     })
  //     await handleErrors(response)
  //     return await response.json()
  //   } catch (error) {
  //     console.error('Error during POST request: ', error)
  //     throw error
  //   }
  // },
  // patch: async (endpoint, payload) => {
  //   try {
  //     const response = await fetch(`${API_URL}/${endpoint}`, {
  //       method: 'PATCH',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(payload),
  //     })
  //     await handleErrors(response)
  //     return await response.json()
  //   } catch (error) {
  //     console.error('Error during PATCH request: ', error)
  //     throw error
  //   }
  // },
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'DELETE',
      })
      await handleErrors(response)
      // return await response.json()
      if (response.ok) {
        return true
      }
    } catch (error) {
      console.error('Error during DELETE request: ', error)
      toast.error(error.message)
    }
  },
}
