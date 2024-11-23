import axios from 'axios'

const API_BASE_URL = '/api'

export const apiRequest = async (
  method,
  endpoint,
  data = null,
  params = null,
) => {
  try {
    const config = {
      method: method,
      url: API_BASE_URL + endpoint,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (data) {
      config.data = data
    }

    if (params) {
      config.params = params
    }

    const response = await axios(config)
    return response.data
  } catch (error) {
    console.log('API 요청 오류:', error)
    throw error
  }
}

export const api = {
  get: (endpoint, params) => apiRequest('get', endpoint, null, params),
  post: (endpoint, data) => apiRequest('post', endpoint, data),
  put: (endpoint, data) => apiRequest('put', endpoint, data),
  del: endpoint => apiRequest('delete', endpoint),
  patch: (endpoint, data, params) => apiRequest('patch', endpoint, data, params),
}
