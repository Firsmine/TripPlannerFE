import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const usePreviewStore = defineStore('preview', () => {
  const itinerary = ref(null)
  const loading = ref(false)
  const error = ref('')
  // display blocks according to their position
  const blocks = computed(() => {
    return [...(itinerary.value?.blocks || [])].sort(
      (a, b) => Number(a.position) - Number(b.position),
    )
  })

  // get itinerary detail
  async function fetchPreview(slug) {
    loading.value = true
    error.value = ''
    try {
      const response = await api.get(`/itineraries/${slug}`)
      itinerary.value = response.data.data
      return itinerary.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load preview'
      console.error('Failed to fetch preview:', err.response?.data || err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // clear previous preview data
  function clearPreview() {
    itinerary.value = null
    error.value = ''
  }

  return {
    itinerary,
    blocks,
    loading,
    error,
    fetchPreview,
    clearPreview,
  }
})
