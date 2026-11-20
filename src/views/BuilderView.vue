<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import MainNavbar from '@/components/mainNavbar.vue'
import { useBuilderStore } from '@/stores/builder'

const route = useRoute()
const router = useRouter()
const builderStore = useBuilderStore()

const slug = computed(() => route.params.slug)
const expandedBlockId = ref(null)
const showAddSectionPanel = ref(false)
const showDeleteModal = ref(false)
const deletingBlock = ref(null)
const blockForm = ref({})
const draggedBlockId = ref(null)

onMounted(async () => {
  window.addEventListener('keydown', handleKeyboard)
  try {
    await Promise.all([builderStore.fetchItinerary(slug.value), builderStore.fetchTemplates()])
    document.title = `TripPlanner | ${builderStore.itinerary?.title || 'Builder'}`
  } catch (error) {
    console.error('Failed to initialize builder:', error)
  }
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboard)
})
// shortcuts
function handleKeyboard(event) {
  if (event.altKey && event.key.toLowerCase() === 's') {
    event.preventDefault()
    openAddSectionPanel()
  }
  if (event.key === 'Escape') {
    if (showDeleteModal.value) {
      closeDeleteModal()
    } else {
      closeAddSectionPanel()
      expandedBlockId.value = null
    }
  }
}
// open close block panel
function openAddSectionPanel() {
  showAddSectionPanel.value = true
}
function closeAddSectionPanel() {
  showAddSectionPanel.value = false
  builderStore.selectedTemplate = ''
}
async function handleAddBlock() {
  if (!builderStore.selectedTemplate) return
  try {
    const nextPosition = (builderStore.itinerary?.blocks?.length || 0) + 1

    await builderStore.addBlock(slug.value, {
      template_id: builderStore.selectedTemplate,
      position: nextPosition,
    })
    closeAddSectionPanel()
  } catch (error) {
    console.error('Failed to add block:', error.response?.data || error)
  }
}
function normalizeFields(fields) {
  if (fields && !Array.isArray(fields) && typeof fields === 'object') {
    return { ...fields }
  }
  if (Array.isArray(fields)) {
    return Object.fromEntries(fields.map((field) => [field.name, field.value ?? '']))
  }
  return {}
}

function getFieldDefinitions(block) {
  const fields = block.template?.fields
  if (Array.isArray(fields)) {
    return fields
  }
  if (fields && typeof fields === 'object') {
    return Object.entries(fields).map(([name, definition]) => ({
      name,
      ...(typeof definition === 'object' ? definition : {}),
    }))
  }
  return Object.keys(normalizeFields(block.fields)).map((name) => ({
    name,
    label: name.replaceAll('_', ' '),
    type: 'text',
  }))
}
function getFieldValue(fieldName) {
  return blockForm.value[fieldName] ?? ''
}

// update
function toggleBlock(block) {
  if (expandedBlockId.value === block.id) {
    expandedBlockId.value = null
    blockForm.value = {}
    return
  }
  expandedBlockId.value = block.id
  blockForm.value = normalizeFields(block.fields)
}
async function saveBlock(block) {
  try {
    await builderStore.updateBlockFields(slug.value, block.id, {
      fields: blockForm.value,
    })
    expandedBlockId.value = null
    blockForm.value = {}
  } catch (error) {
    console.error('Failed to save block:', error)
  }
}

// delete
function openDeleteModal(block) {
  deletingBlock.value = block
  showDeleteModal.value = true
}
function closeDeleteModal() {
  if (builderStore.saving) return
  showDeleteModal.value = false
  deletingBlock.value = null
}
async function confirmDelete() {
  if (!deletingBlock.value) return
  try {
    await builderStore.deleteBlock(slug.value, deletingBlock.value.id)
    if (expandedBlockId.value === deletingBlock.value.id) {
      expandedBlockId.value = null
      blockForm.value = {}
    }
    showDeleteModal.value = false
    deletingBlock.value = null
  } catch (error) {
    console.error('Failed to delete block:', error)
  }
}

// drag n drop
function startDrag(block) {
  draggedBlockId.value = block.id
}
async function dropBlock(targetBlock) {
  if (!draggedBlockId.value) return
  const blocks = builderStore.itinerary?.blocks || []
  const oldIndex = blocks.findIndex((block) => block.id === draggedBlockId.value)
  const newIndex = blocks.findIndex((block) => block.id === targetBlock.id)
  if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
    draggedBlockId.value = null
    return
  }
  // create ordered
  const reorderedBlocks = [...blocks]
  const [movedBlock] = reorderedBlocks.splice(oldIndex, 1)
  reorderedBlocks.splice(newIndex, 0, movedBlock)
  try {
    await builderStore.reorderBlocks(slug.value, {
      blocks: reorderedBlocks.map((block, index) => ({
        id: block.id,
        order: index + 1,
      })),
    })
    builderStore.itinerary.blocks = reorderedBlocks
  } catch (error) {
    console.error('Failed to reorder blocks:', error)
    await builderStore.fetchItinerary(slug.value)
  } finally {
    draggedBlockId.value = null
  }
}
function endDrag() {
  draggedBlockId.value = null
}
function goToPreview() {
  router.push(`/itineraries/${slug.value}/preview`)
}
</script>

<template>
  <div class="app-layout">
    <MainNavbar />>

    <div class="app-main">
      <div class="builder-layout">
        <!-- ── MAIN CANVAS ── -->
        <div class="builder-main">
          <!-- Toolbar -->
          <div class="builder-toolbar">
            <div class="builder-toolbar__left">
              <div class="builder-breadcrumb">
                <RouterLink to="/itineraries">Itineraries</RouterLink>
                <span>→</span>
                <span>{{ builderStore.itinerary?.title }}</span>
              </div>
              <div class="builder-toolbar__divider"></div>
              <span class="tag"> {{ builderStore.itinerary?.blocks?.length || 0 }} blocks </span>
            </div>
            <div class="navbar__actions">
              <button
                class="btn btn--ghost btn--sm"
                type="button"
                @click="goToPreview"
                :disabled="!builderStore.itinerary"
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 6.5C1 6.5 3 2 6.5 2S12 6.5 12 6.5 10 11 6.5 11 1 6.5 1 6.5z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <circle cx="6.5" cy="6.5" r="1.75" stroke="currentColor" stroke-width="1.5" />
                </svg>
                Preview
              </button>
            </div>
          </div>

          <!-- Canvas -->
          <div class="builder-canvas">
            <div v-if="builderStore.loading">Loading itinerary...</div>
            <div v-else-if="!builderStore.itinerary">
              {{ builderStore.error || 'Itinerary not found.' }}
            </div>
            <!-- Field editor: Trip Overview Block (open/active) -->
            <template v-else>
              <!-- ITINERARY INFORMATION -->
              <div class="itinerary-information">
                <h2>
                  {{ builderStore.itinerary.title }}
                </h2>

                <p v-if="builderStore.itinerary.summary">
                  {{ builderStore.itinerary.summary }}
                </p>
              </div>

              <!-- BLOCK LIST -->
              <div v-if="builderStore.itinerary.blocks?.length" class="blocks-list">
                <div
                  v-for="(block, index) in builderStore.itinerary.blocks"
                  :key="block.id"
                  class="field-editor"
                  :class="{
                    'field-editor--open': expandedBlockId === block.id,
                    'is-dragging': draggedBlockId === block.id,
                  }"
                  draggable="true"
                  @dragstart="startDrag(block)"
                  @dragover.prevent
                  @drop.prevent="dropBlock(block)"
                  @dragend="endDrag"
                >
                  <!-- BLOCK HEADER -->
                  <div class="field-editor__header" @click="toggleBlock(block)">
                    <div>
                      <div class="field-editor__title">
                        <span class="tag">
                          {{ String(index + 1).padStart(2, '0') }}
                        </span>
                        &nbsp;
                        {{ block.title || block.template?.name || 'Untitled Block' }}
                      </div>
                      <div class="field-editor__meta">
                        template:
                        {{ block.template?.slug || block.template_slug || 'unknown' }}
                      </div>
                    </div>
                    <div class="field-editor__toggle">
                      <span>
                        {{ expandedBlockId === block.id ? 'Collapse' : 'Expand' }}
                      </span>
                      <svg
                        class="field-editor__chevron"
                        width="12"
                        height="8"
                        viewBox="0 0 12 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          :d="expandedBlockId === block.id ? 'M1 1l5 5 5-5' : 'M1 7l5-5 5 5'"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="square"
                        />
                      </svg>
                    </div>
                  </div>

                  <!-- BLOCK BODY -->
                  <div v-if="expandedBlockId === block.id" class="field-editor__body">
                    <div v-if="getFieldDefinitions(block).length === 0">
                      This block has no editable fields.
                    </div>
                    <div
                      v-for="field in getFieldDefinitions(block)"
                      :key="field.name"
                      class="form-group"
                    >
                      <label class="form-label" :for="`field-${block.id}-${field.name}`">
                        {{ field.label || field.name }}
                      </label>
                      <!-- TEXTAREA -->
                      <textarea
                        v-if="field.type === 'textarea'"
                        class="form-input"
                        :id="`field-${block.id}-${field.name}`"
                        v-model="blockForm[field.name]"
                        :placeholder="field.placeholder || `Enter ${field.label || field.name}...`"
                      ></textarea>
                      <!-- OTHER INPUTS -->
                      <input
                        v-else
                        class="form-input"
                        :id="`field-${block.id}-${field.name}`"
                        :type="
                          field.type === 'image'
                            ? 'url'
                            : ['text', 'number', 'date', 'url', 'email'].includes(field.type)
                              ? field.type
                              : 'text'
                        "
                        v-model="blockForm[field.name]"
                        :placeholder="field.placeholder || `Enter ${field.label || field.name}...`"
                      />
                      <!-- IMAGE PREVIEW -->
                      <img
                        v-if="field.type === 'image' && getFieldValue(field.name)"
                        :src="getFieldValue(field.name)"
                        alt="Image preview"
                        style="
                          max-width: 100%;
                          max-height: 200px;
                          margin-top: 10px;
                          object-fit: cover;
                        "
                        @error="(event) => (event.target.style.display = 'none')"
                      />
                    </div>
                  </div>

                  <!-- BLOCK FOOTER -->
                  <div v-if="expandedBlockId === block.id" class="field-editor__footer">
                    <div class="shortcuts-hint">
                      <span class="kbd">Esc</span>
                      to close
                    </div>
                    <div class="field-editor__footer-actions">
                      <button
                        class="btn btn--ghost btn--sm"
                        type="button"
                        @click.stop="openDeleteModal(block)"
                      >
                        Remove
                      </button>
                      <button
                        class="btn btn--primary btn--sm"
                        type="button"
                        :disabled="builderStore.saving"
                        @click.stop="saveBlock(block)"
                      >
                        {{ builderStore.saving ? 'Saving...' : 'Save' }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- EMPTY STATE -->
              <div v-else class="empty-state">
                <h3>No blocks yet</h3>
                <p>Start building your itinerary by adding a block.</p>
              </div>

              <!-- ADD BLOCK PANEL -->
              <div v-if="showAddSectionPanel" class="add-section-panel">
                <div class="add-section-panel__header">
                  <span class="add-section-panel__title"> Add Block </span>
                  <button
                    class="btn btn--ghost btn--sm"
                    type="button"
                    @click="closeAddSectionPanel"
                  >
                    Close
                  </button>
                </div>

                <div class="form-wrap">
                  <div class="form-group" style="flex: 1">
                    <label class="form-label" for="block-template"> Block Template </label>
                    <select
                      id="block-template"
                      class="form-input"
                      v-model="builderStore.selectedTemplate"
                    >
                      <option value="" disabled>Choose a template...</option>
                      <option
                        v-for="template in builderStore.templates"
                        :key="template.id"
                        :value="template.id"
                      >
                        {{ template.slug }} —
                        {{ template.name }}
                      </option>
                    </select>
                  </div>
                  <button
                    class="btn btn--primary"
                    type="button"
                    style="align-self: flex-start"
                    :disabled="builderStore.saving || !builderStore.selectedTemplate"
                    @click="handleAddBlock"
                  >
                    {{ builderStore.saving ? 'Adding...' : 'Add' }}
                  </button>
                </div>
              </div>
              <!-- OPEN ADD BLOCK BUTTON -->
              <button v-else class="btn btn--primary" type="button" @click="openAddSectionPanel">
                + Add Block
              </button>
            </template>
          </div>
          <!-- /canvas -->
        </div>
        <!-- /builder-main -->
      </div>
    </div>
  </div>

  <!-- ======================================================
      MODAL: Confirm Remove Block
      ====================================================== -->
  <div class="modal-backdrop" v-if="showDeleteModal" @click.self="closeDeleteModal">
    <div
      class="modal confirm-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-remove-title"
    >
      <div class="modal__header">
        <h2 class="modal__title" id="modal-remove-title">Remove Block</h2>
        <button
          class="modal__close"
          type="button"
          aria-label="Close"
          :disabled="builderStore.saving"
          @click="closeDeleteModal"
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
          Remove
          <strong> "{{ deletingBlock?.title || deletingBlock?.template?.name }}" </strong> from this
          itinerary?<br />
          This action cannot be undone.
        </p>
      </div>
      <div class="modal__footer">
        <button
          class="btn btn--ghost"
          type="button"
          :disabled="builderStore.saving"
          @click="closeDeleteModal"
        >
          Cancel
        </button>
        <button
          class="btn btn--danger"
          type="button"
          :disabled="builderStore.saving"
          @click="confirmDelete"
        >
          {{ builderStore.saving ? 'Removing...' : 'Ok, Remove' }}
        </button>
      </div>
    </div>
  </div>
</template>
