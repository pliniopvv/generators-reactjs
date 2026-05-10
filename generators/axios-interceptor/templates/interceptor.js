import axios from 'axios'

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('<%= tokenKey %>')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('<%= tokenKey %>')
      window.location.href = '<%= loginPath %>'
    }
    return Promise.reject(error)
  }
)
