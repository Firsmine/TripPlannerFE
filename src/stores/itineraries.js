import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useItineraryStore = defineStore('itinerary', () => {
  const itineraries = ref([])
  const selectedItinerary = ref(null)
  const loading = ref(false)

  // read
  async function fetchItineraries() {
    loading.value = true
    try {
      const response = await api.get('/itineraries')
      const result = response.data.data.itineraries
      itineraries.value = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : []
    } catch (error) {
      console.error('Failed to fetch itineraries', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // detail
  async function detailItineraries(slug) {
    loading.value = true
    try {
      const response = await api.get(`/itineraries/${slug}`)
      itineraries.value = response.data.data
      return selectedItinerary.value
    } catch (error) {
      console.error('Detail itineraries not found', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  // create
  async function createItinerary(formData) {
    try {
      const response = await api.post('/itineraries', formData)
      const newItinerary = response.data.data
      if (Array.isArray(itineraries.value)) {
        itineraries.value.unshift(newItinerary)
      } else {
        itineraries.value = [newItinerary]
      }
      return newItinerary
    } catch (error) {
      console.error('Failed to create a new itinerary', error)
      throw error
    }
  }

  // update
  async function updateItinerary(oldslug, formData) {
    try {
      const response = await api.put(`/itineraries/${oldslug}`, formData)
      const updatedItinerary = response.data.data
      const index = itineraries.value.findIndex((item) => item.slug === oldslug)
      if (index !== -1) {
        itineraries.value[index] = updatedItinerary
      }
      return updatedItinerary
    } catch (error) {
      console.error('Failed to update itinerary', error)
      throw error
    }
  }

  // delete
  async function deleteItinerary(slug) {
    try {
      await api.delete(`/itineraries/${slug}`)
      itineraries.value = itineraries.value.filter((item) => item.slug !== slug)
    } catch (error) {
      console.error('Failed to delete itinerary', error)
      throw error
    }
  }

  return {
    itineraries,
    loading,
    fetchItineraries,
    detailItineraries,
    createItinerary,
    updateItinerary,
    deleteItinerary,
  }
})
