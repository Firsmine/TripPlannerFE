<script setup>
import MainNavbar from '@/components/mainNavbar.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useBuilderStore } from '@/stores/builder'
import { useRoute } from 'vue-router'
const route = useRoute()

const builderStore = useBuilderStore()
const slug = computed(() => route.params.slug)
const expandedBlockId = ref(null)
const showAddSectionPanel = ref(false)
const showDeleteModal = ref(false)
const deletingBlock = ref(null)

onMounted(async () => {
  document.title = 'TripPlanner | Builder'
  try {
    await Promise.all([builderStore.fetchItinerary(slug.value), builderStore.fetchTemplates()])
  } catch (error) {
    console.error('Failed to initialize builder:', error)
  }
  window.addEventListener('keydown', handleKeyboard)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboard)
})

// open close block panel
function openAddSectionPanel() {
  showAddSectionPanel.value = true
}
function closeAddSectionPanel() {
  showAddSectionPanel.value = false
}
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

// block editor
function toggleBlock(blockId) {
  expandedBlockId.value = expandedBlockId.value === blockId ? null : blockId
}
// delete
function openDeleteModal(block) {
  deletingBlock.value = block
  showDeleteModal.value = true
}
function closeDeleteModal() {
  showDeleteModal.value = false
  deletingBlock.value = null
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
              <a href="preview.html" class="btn btn--ghost btn--sm">
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
              </a>
            </div>
          </div>

          <!-- Canvas -->
          <div class="builder-canvas">
            <div v-if="builderStore.loading">Loading itinerary...</div>
            <!-- Field editor: Trip Overview Block (open/active) -->
            <div v-else-if="builderStore.itinerary">
              <div
                class="field-editor field-editor--open"
                v-for="(block, index) in builderStore.itinerary.blocks"
                :key="block.id"
              >
                <div class="field-editor__header" @click="toggleBlock(block.id)">
                  <div>
                    <div class="field-editor__title">
                      <span class="tag">
                        {{ String(index + 1).padStart(2, '0') }}
                      </span>
                      {{ block.title }}
                    </div>
                    <div class="field-editor__meta">template: {{ block.template?.slug }}</div>
                  </div>
                  <div class="field-editor__toggle">
                    <span>Collapse</span>
                    <svg
                      class="field-editor__chevron"
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1l5 5 5-5"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                    </svg>
                  </div>
                </div>
                <div class="field-editor__body" v-if="expandedBlockId === block.id">
                  <select v-model="builderStore.selectedTemplate" class="form-input">
                    <option value="" disabled>Choose a template...</option>
                    <option
                      v-for="template in builderStore.templates"
                      :key="template.id"
                      :value="template.id"
                    >
                      {{ template.slug }} — {{ template.name }}
                    </option>
                  </select>
                </div>
                <div class="field-editor__footer">
                  <div class="shortcuts-hint"><span class="kbd">Esc</span> to close</div>
                  <div class="field-editor__footer-actions">
                    <button class="btn btn--ghost btn--sm" type="button">Remove</button>
                    <button class="btn btn--primary btn--sm" type="button">Save</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Field editor: Day Plan Block (collapsed) -->
            <div class="field-editor">
              <div class="field-editor__header">
                <div>
                  <div class="field-editor__title">
                    <span class="tag">02</span>
                    &nbsp; Day Plan
                  </div>
                  <div class="field-editor__meta">template: day-plan · 3 fields</div>
                </div>
                <div class="field-editor__toggle">
                  <span>Expand</span>
                  <svg
                    class="field-editor__chevron"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7l5-5 5 5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="square"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Field editor: Budget Summary Block (collapsed) -->
            <div class="field-editor">
              <div class="field-editor__header">
                <div>
                  <div class="field-editor__title">
                    <span class="tag">03</span>
                    &nbsp; Budget Summary
                  </div>
                  <div class="field-editor__meta">template: budget · 4 fields</div>
                </div>
                <div class="field-editor__toggle">
                  <span>Expand</span>
                  <svg
                    class="field-editor__chevron"
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 7l5-5 5 5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="square"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <!-- Add Block inline panel -->
            <div class="add-section-panel">
              <div class="add-section-panel__header">
                <span class="add-section-panel__title">Add Block</span>
              </div>
              <div class="form-wrap">
                <div class="form-group" style="flex: 1">
                  <label class="form-label" for="block-template">Block Template</label>
                  <select class="form-input" id="block-template" name="template_id">
                    <option value="" disabled selected>Choose a template…</option>
                    <option value="overview">overview — Trip Overview Block</option>
                    <option value="day-plan">day-plan — Day Plan Block</option>
                    <option value="activities">activities — Activity List Block</option>
                    <option value="accommodation">accommodation — Accommodation Block</option>
                    <option value="transport">transport — Transport Block</option>
                    <option value="budget">budget — Budget Summary Block</option>
                  </select>
                </div>
                <button class="btn btn--primary" type="button" style="align-self: flex-start">
                  Add
                </button>
              </div>
            </div>
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
  <div class="modal-backdrop">
    <div
      class="modal confirm-dialog"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-remove-title"
    >
      <div class="modal__header">
        <h2 class="modal__title" id="modal-remove-title">Remove Block</h2>
        <button class="modal__close" type="button" aria-label="Close">✕</button>
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
          Remove <strong>"Trip Overview"</strong> from this itinerary?<br />
          This action cannot be undone.
        </p>
      </div>
      <div class="modal__footer">
        <button class="btn btn--ghost" type="button">Cancel</button>
        <button class="btn btn--danger" type="button">Ok, Remove</button>
      </div>
    </div>
  </div>
</template>
