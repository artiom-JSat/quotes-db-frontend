import { toast } from 'react-toastify'
import { API_URL } from '@config/config'
import { handleErrors } from '@utils/fetcherErrorsHandler'

const request = async (method, endpoint, payload = null, queryParams = {}) => {
  try {
    const queryString = new URLSearchParams(queryParams).toString()
    const url = queryString
      ? `${API_URL}/${endpoint}?${queryString}`
      : `${API_URL}/${endpoint}`

    const options = {
      method,
      headers: {},
    }

    if (method === 'POST' || method === 'PATCH') {
      options.headers['Content-Type'] = 'application/json'
    }

    if (payload) {
      options.body = JSON.stringify(payload)
    }

    const response = await fetch(url, options)

    await handleErrors(response)

    if (response.ok && method !== 'DELETE') {
      return await response.json()
    }

    if (response.ok && method === 'DELETE') {
      return true
    }
  } catch (error) {
    console.error(`Error during ${method} request: `, error)
    toast.error(error.message)
  }
}

export const fetcher = {
  get: (endpoint, queryParams = {}) =>
    request('GET', endpoint, null, queryParams),
  post: (endpoint, payload) => request('POST', endpoint, payload),
  patch: (endpoint, payload) => request('PATCH', endpoint, payload),
  delete: (endpoint) => request('DELETE', endpoint),
}

// // Alternative approach to rewrite code above
// export const fetcher = {
//   get: async (endpoint, queryParams = {}) => {
//     try {
//       const queryString = new URLSearchParams(queryParams).toString()
//       const url = queryString
//         ? `${API_URL}/${endpoint}?${queryString}`
//         : `${API_URL}/${endpoint}`
//       const response = await fetch(url)
//       await handleErrors(response)
//       if (response.ok) {
//         return await response.json()
//       }
//     } catch (error) {
//       console.error('Error during GET request: ', error)
//       toast.error(error.message)
//     }
//   },
//   post: async (endpoint, payload) => {
//     try {
//       const response = await fetch(`${API_URL}/${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       })
//       await handleErrors(response)
//       if (response.ok) {
//         return await response.json()
//       }
//     } catch (error) {
//       console.error('Error during POST request: ', error)
//       toast.error(error.message)
//     }
//   },
//   patch: async (endpoint, payload) => {
//     try {
//       const response = await fetch(`${API_URL}/${endpoint}`, {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       })
//       await handleErrors(response)
//       if (response.ok) {
//         return await response.json()
//       }
//     } catch (error) {
//       console.error('Error during PATCH request: ', error)
//       toast.error(error.message)
//     }
//   },
//   delete: async (endpoint) => {
//     try {
//       const response = await fetch(`${API_URL}/${endpoint}`, {
//         method: 'DELETE',
//       })
//       await handleErrors(response)
//       if (response.ok) {
//         return true
//       }
//     } catch (error) {
//       console.error('Error during DELETE request: ', error)
//       toast.error(error.message)
//     }
//   },
// }
