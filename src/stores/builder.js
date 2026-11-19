import { ref } from 'vue'
import { defineStore } from 'pinia'
import api from '@/services/api'

export const useBuilderStore = defineStore('builder', () => {
  const itinerary = ref(null)
  const templates = ref([])
  const selectedTemplate = ref('')
  const loading = ref(false)
  const saving = ref(false)
  const error = ref('')

  async function fetchItinerary(slug) {
    loading.value = true
    error.value = ''
    try {
      const response = await api.get(`/itineraries/${slug}`)
      itinerary.value = response.data.data
      return itinerary.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load itinerary'
      throw err
    } finally {
      loading.value = false
    }
  }

  // read template
  async function fetchTemplates() {
    try {
      const response = await api.get('/templates')
      templates.value = response.data.data
      return templates.value
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load templates'
      throw err
    }
  }

  // detail template
  async function fetchTemplate(slug) {
    try {
      const response = await api.get(`/templates/${slug}`)
      return response.data.data
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to load template'
      throw err
    }
  }

  // create block
  async function addBlock(slug, payload) {
    saving.value = true
    error.value = ''
    try {
      const response = await api.post(`/itineraries/${slug}/blocks`, payload)
      const newBlock = response.data.data
      itinerary.value.blocks.push(newBlock)
      return newBlock
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to add block'
      throw err
    } finally {
      saving.value = false
    }
  }

  // update block
  async function updateBlockFields(slug, blockId, payload) {
    saving.value = true
    error.value = ''
    try {
      const response = await api.put(`/itineraries/${slug}/blocks/${blockId}/fields`, payload)
      const updatedBlock = response.data.data
      const index = itinerary.value.blocks.findIndex((block) => block.id === blockId)
      if (index !== -1) {
        itinerary.value.blocks[index] = updatedBlock
      }
      return updatedBlock
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to update block'
      throw err
    } finally {
      saving.value = false
    }
  }

  // reorder block
  async function reorderBlocks(slug, payload) {
    saving.value = true
    error.value = ''
    try {
      const response = await api.put(`/itineraries/${slug}/blocks/reorder`, payload)
      const updatedBlocks = response.data.data
      if (Array.isArray(updatedBlocks)) {
        itinerary.value.blocks = updatedBlocks
      }
      return updatedBlocks
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to reorder blocks'
      throw err
    } finally {
      saving.value = false
    }
  }

  // delete block
  async function deleteBlock(slug, blockId) {
    saving.value = true
    error.value = ''
    try {
      await api.delete(`/itineraries/${slug}/blocks/${blockId}`)
      itinerary.value.blocks = itinerary.value.blocks.filter((block) => block.id !== blockId)
    } catch (err) {
      error.value = err.response?.data?.message || 'Failed to delete block'
      throw err
    } finally {
      saving.value = false
    }
  }

  return {
    itinerary,
    templates,
    selectedTemplate,
    loading,
    saving,
    error,
    fetchItinerary,
    fetchTemplates,
    fetchTemplate,
    addBlock,
    updateBlockFields,
    reorderBlocks,
    deleteBlock,
  }
})
