<script setup>
import MainNavbar from '@/components/mainNavbar.vue'
import { useItineraryStore } from '@/stores/itineraries'
import { ref, onMounted, watch, onUnmounted } from 'vue'

const itineraryStore = useItineraryStore()
const showModal = ref(false)
const isEditing = ref(false)
const editingSlug = ref(null)
const form = ref({
  title: '',
  slug: '',
  summary: '',
})
const saving = ref(false)
const pageError = ref('')
const showDeleteModal = ref(false)
const deletingItinerary = ref(null)
const deleting = ref(false)

onMounted(async () => {
  try {
    await itineraryStore.fetchItineraries()
  } catch (error) {
    pageError.value = error.response?.data?.message || 'Failed to load itineraries'
  }
})
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
watch(
  () => form.value.title,
  (newTitle) => {
    if (!isEditing.value) {
      form.value.slug = generateSlug(newTitle)
    }
  },
)

function openCreateModal() {
  isEditing.value = false
  editingSlug.value = null

  form.value = {
    title: '',
    slug: '',
    summary: '',
  }

  pageError.value = ''
  showModal.value = true
}
function openEditModal(itinerary) {
  isEditing.value = true
  editingSlug.value = itinerary.slug

  form.value = {
    title: itinerary.title,
    slug: itinerary.slug,
    summary: itinerary.summary || '',
  }

  pageError.value = ''
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  pageError.value = ''
}
async function saveItinerary() {
  saving.value = true
  pageError.value = ''

  try {
    const formData = {
      title: form.value.title,
      slug: form.value.slug,
      summary: form.value.summary || null,
    }

    if (isEditing.value) {
      await itineraryStore.updateItinerary(editingSlug.value, formData)
    } else {
      await itineraryStore.createItinerary(formData)
    }

    closeModal()
  } catch (error) {
    pageError.value = error.response?.data?.message || 'Failed to save itinerary'
    console.error(error)
  } finally {
    saving.value = false
  }
}
async function removeItinerary(itinerary) {
  deletingItinerary.value = itinerary
  showDeleteModal.value = true
}
async function confirmDelete() {
  if (!deletingItinerary.value) return
  deleting.value = true
  pageError.value = ''
  try {
    await itineraryStore.deleteItinerary(deletingItinerary.value.slug)
    showDeleteModal.value = false
    deletingItinerary.value = null
  } catch (error) {
    pageError.value = error.response?.data?.message || 'Failed to delete itinerary'
  } finally {
    deleting.value = false
  }
}

function handleKeyboard(event) {
  // alt + n: new itinerary
  if (event.altKey && event.key.toLowerCase() === 'n') {
    event.preventDefault()
    if (!showModal.value) {
      openCreateModal()
    }
  }
  // escape: close modal
  if (event.key === 'Escape') {
    if (showModal.value) {
      closeModal()
    }
  }
}
onMounted(async () => {
  document.title = 'TripPlanner | My Itineraries'
  window.addEventListener('keydown', handleKeyboard)
  try {
    await itineraryStore.fetchItineraries()
  } catch (error) {
    pageError.value = error.response?.data?.message || 'Failed to load itineraries'
    console.error(error)
  }
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboard)
})
</script>

<template>
  <div class="app-layout">
    <MainNavbar />
    <main class="app-main">
      <div class="page-container">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-header__left">
            <h1 class="page-title">My Itineraries</h1>
            <p class="page-subtitle">
              {{ itineraryStore.itineraries.length }} itineraries · plan and organize your trips
            </p>
          </div>
          <div>
            <button class="btn btn--primary" type="button" @click="openCreateModal">
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.5 1v11M1 6.5h11"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="square"
                />
              </svg>
              New Itinerary
              <span class="kbd">Alt+N</span>
            </button>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="itineraryStore.loading">Loading itineraries...</div>
        <!-- Error message -->
        <div v-else-if="pageError" class="form-error">
          {{ pageError }}
        </div>
        <!-- <div v-if="pageError && !showModal" class="form-error">
          {{ pageError }}
        </div> -->

        <!-- Itineraries List -->
        <div class="pages-grid" v-else-if="itineraryStore.itineraries.length > 0">
          <div
            v-for="itinerary in itineraryStore.itineraries"
            :key="itinerary.slug"
            class="page-item"
          >
            <div class="page-item__info">
              <span class="page-item__title">
                <RouterLink :to="`/itineraries/${itinerary.slug}/builder`">
                  {{ itinerary.title }}
                </RouterLink>
                <span class="page-item__title-arrow">→</span>
              </span>

              <div class="page-item__meta">
                <span class="page-item__slug"> /{{ itinerary.slug }} </span>

                <span v-if="itinerary.summary" class="page-item__summary">
                  {{ itinerary.summary }}
                </span>
              </div>
            </div>

            <div class="page-item__actions">
              <RouterLink
                :to="`/itineraries/${itinerary.slug}/builder`"
                class="btn btn--ghost btn--sm"
              >
                Build
              </RouterLink>

              <button
                class="btn btn--ghost btn--sm"
                type="button"
                @click="openEditModal(itinerary)"
              >
                Edit
              </button>

              <button
                class="btn btn--danger btn--sm"
                type="button"
                @click="removeItinerary(itinerary)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        <!-- Empty State -->
        <!-- <p v-else>You don't have any itineraries yet. Create your first itinerary!</p> -->
      </div>
    </main>
  </div>

  <!-- ======================================================
      MODAL: Create / Edit Itinerary
      ====================================================== -->
  <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-create-title">
      <div class="modal__header">
        <h2 class="modal__title" id="modal-create-title">
          {{ isEditing ? 'Edit Itinerary' : 'New Itinerary' }}
        </h2>
        <button class="modal__close" type="button" aria-label="Close" @click="closeModal">✕</button>
      </div>

      <form @submit.prevent="saveItinerary">
        <div class="modal__body">
          <div class="form-group">
            <label class="form-label" for="new-title">Title</label>
            <input
              v-model="form.title"
              class="form-input"
              type="text"
              id="new-title"
              name="title"
              placeholder="e.g. Japan Spring Trip"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label" for="new-slug">Slug</label>
            <input
              v-model="form.slug"
              class="form-input"
              type="text"
              id="new-slug"
              name="slug"
              placeholder="e.g. japan-spring-trip"
              required
            />
            <span class="form-hint">Auto-generated from title. Lowercase, no spaces.</span>
          </div>

          <div class="form-group">
            <label class="form-label" for="new-summary"
              >Summary <span class="form-hint">(optional)</span></label
            >
            <textarea
              v-model="form.summary"
              class="form-input"
              id="new-summary"
              name="summary"
              placeholder="Brief description of this trip…"
            ></textarea>
          </div>
          <div v-if="pageError" class="form-error">
            {{ pageError }}
          </div>
        </div>

        <div class="modal__footer">
          <button class="btn btn--ghost" type="button" @click="closeModal">Cancel</button>
          <button class="btn btn--primary" type="submit" :disabled="saving">
            {{ saving ? 'Saving...' : isEditing ? 'Update Itinerary' : 'Save Itinerary' }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <!-- ======================================================
      MODAL: Confirm Delete
      ====================================================== -->
  <div class="modal-backdrop" v-if="showDeleteModal" @click.self="showDeleteModal = false">
    <div
      class="modal confirm-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-delete-title"
    >
      <div class="modal__header">
        <h2 class="modal__title" id="modal-delete-title">Delete Itinerary</h2>
        <button
          class="modal__close"
          type="button"
          aria-label="Close"
          @click="showDeleteModal = false"
        >
          ✕
        </button>
      </div>

      <div class="modal__body">
        <div class="confirm-dialog__icon">
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 4v7" stroke="#c0392b" stroke-width="2" stroke-linecap="square" />
            <circle cx="11" cy="16" r="1" fill="#c0392b" />
            <path
              d="M3 19L11 3l8 16H3z"
              stroke="#c0392b"
              stroke-width="2"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p class="confirm-dialog__text">
          Are you sure you want to delete <strong> "{{ deletingItinerary?.title }}"</strong>?<br />
          This action cannot be undone.
        </p>
      </div>

      <div class="modal__footer">
        <button class="btn btn--ghost" type="button" @click="showDeleteModal = false">
          Cancel
        </button>
        <button class="btn btn--danger" type="button" @click="confirmDelete">
          {{ deleting ? 'Deleting...' : 'Ok, Delete' }}
        </button>
      </div>
    </div>
  </div>
</template>
