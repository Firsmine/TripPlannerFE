import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  const savedUser = localStorage.getItem('user')
  const user = ref(savedUser && savedUser !== 'undefined' ? JSON.parse(savedUser) : null)
  const token = ref(localStorage.getItem('token') || null)
  const isLoggedIn = computed(() => !!token.value)

  async function register(name, email, password) {
    try {
      const response = await api.post('/register', {
        name,
        email,
        password,
      })
      const data = response.data.data

      user.value = {
        name: data.name,
        email: data.email,
      }

      token.value = data.token

      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('token', data.token)
      router.push('/itineraries')
    } catch (error) {
      console.error('Registration failed', error)
      throw error
    }
  }

  async function login(email, password) {
    try {
      const response = await api.post('/login', {
        email,
        password,
      })
      const data = response.data.data
      user.value = data.user || {
        name: data.name,
        email: data.email,
      }
      token.value = data.token

      localStorage.setItem('user', JSON.stringify(user.value))
      localStorage.setItem('token', data.token)
      router.push('/itineraries')
    } catch (error) {
      console.error('Login failed', error)
      throw error
    }
  }

  async function logout() {
    try {
      await api.post('logout')
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
    }
  }
  return { user, token, isLoggedIn, register, login, logout }
})
