import axios from 'axios'

const api = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { emailOrPhone: email, password })
  return response.data
}

export const getPendingExperts = async () => {
  const response = await api.get('/admin/experts/pending')
  return response.data
}

export const getExpertDocument = async (id) => {
  const response = await api.get(`/admin/experts/${id}/document`)
  return response.data
}

export const approveExpert = async (id) => {
  const response = await api.patch(`/admin/experts/${id}/approve`)
  return response.data
}

export default api