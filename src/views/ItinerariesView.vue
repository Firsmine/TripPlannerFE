<template>
  <div class="app-layout">
    <main class="app-main">
      <div class="page-container">
        <!-- Page Header -->
        <div class="page-header">
          <div class="page-header__left">
            <h1 class="page-title">My Itineraries</h1>
            <p class="page-subtitle">3 itineraries · plan and organize your trips</p>
          </div>
          <div>
            <button class="btn btn--primary" type="button">
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

        <!-- Itineraries List -->
        <div class="pages-grid">
          <!-- Itinerary Item 1 -->
          <div class="page-item">
            <div class="page-item__info">
              <span class="page-item__title">
                <a href="builder.html">Japan Spring Trip</a>
                <span class="page-item__title-arrow">→</span>
              </span>
              <div class="page-item__meta">
                <span class="page-item__slug">/japan-spring-trip</span>
                <span class="page-item__summary"
                  >A 7-day journey across Kyoto and Tokyo during cherry blossom season.</span
                >
              </div>
            </div>
            <div class="page-item__actions">
              <a href="builder.html" class="btn btn--ghost btn--sm"> Build </a>
              <button class="btn btn--ghost btn--sm" type="button">Edit</button>
              <button class="btn btn--danger btn--sm" type="button">Delete</button>
            </div>
          </div>

          <!-- Itinerary Item 2 -->
          <div class="page-item">
            <div class="page-item__info">
              <span class="page-item__title">
                <a href="builder.html">Bali Family Holiday</a>
                <span class="page-item__title-arrow">→</span>
              </span>
              <div class="page-item__meta">
                <span class="page-item__slug">/bali-family-holiday</span>
                <span class="page-item__summary"
                  >Five days of beaches, temples, and rice terraces with the family.</span
                >
              </div>
            </div>
            <div class="page-item__actions">
              <a href="builder.html" class="btn btn--ghost btn--sm"> Build </a>
              <button class="btn btn--ghost btn--sm" type="button">Edit</button>
              <button class="btn btn--danger btn--sm" type="button">Delete</button>
            </div>
          </div>

          <!-- Itinerary Item 3 (no summary) -->
          <div class="page-item">
            <div class="page-item__info">
              <span class="page-item__title">
                <a href="builder.html">Europe Backpacking</a>
                <span class="page-item__title-arrow">→</span>
              </span>
              <div class="page-item__meta">
                <span class="page-item__slug">/europe-backpacking</span>
              </div>
            </div>
            <div class="page-item__actions">
              <a href="builder.html" class="btn btn--ghost btn--sm"> Build </a>
              <button class="btn btn--ghost btn--sm" type="button">Edit</button>
              <button class="btn btn--danger btn--sm" type="button">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- ======================================================
      MODAL: Create / Edit Itinerary
      ====================================================== -->
  <div class="modal-backdrop hidden">
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-create-title">
      <div class="modal__header">
        <h2 class="modal__title" id="modal-create-title">New Itinerary</h2>
        <button class="modal__close" type="button" aria-label="Close">✕</button>
      </div>

      <div class="modal__body">
        <div class="form-group">
          <label class="form-label" for="new-title">Title</label>
          <input
            class="form-input"
            type="text"
            id="new-title"
            name="title"
            placeholder="e.g. Japan Spring Trip"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="new-slug">Slug</label>
          <input
            class="form-input"
            type="text"
            id="new-slug"
            name="slug"
            placeholder="e.g. japan-spring-trip"
          />
          <span class="form-hint">Auto-generated from title. Lowercase, no spaces.</span>
        </div>

        <div class="form-group">
          <label class="form-label" for="new-summary"
            >Summary <span class="form-hint">(optional)</span></label
          >
          <textarea
            class="form-input"
            id="new-summary"
            name="summary"
            placeholder="Brief description of this trip…"
          ></textarea>
        </div>
      </div>

      <div class="modal__footer">
        <button class="btn btn--ghost" type="button">Cancel</button>
        <button class="btn btn--primary" type="button">Save Itinerary</button>
      </div>
    </div>
  </div>

  <!-- ======================================================
      MODAL: Confirm Delete
      ====================================================== -->
  <!--
  <div class="modal-backdrop">
    <div class="modal confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-delete-title">

      <div class="modal__header">
        <h2 class="modal__title" id="modal-delete-title">Delete Itinerary</h2>
        <button class="modal__close" type="button" aria-label="Close">✕</button>
      </div>

      <div class="modal__body">
        <div class="confirm-dialog__icon">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4v7" stroke="#c0392b" stroke-width="2" stroke-linecap="square"/>
            <circle cx="11" cy="16" r="1" fill="#c0392b"/>
            <path d="M3 19L11 3l8 16H3z" stroke="#c0392b" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </div>
        <p class="confirm-dialog__text">
          Are you sure you want to delete <strong>"Japan Spring Trip"</strong>?<br>
          This action cannot be undone.
        </p>
      </div>

      <div class="modal__footer">
        <button class="btn btn--ghost" type="button">Cancel</button>
        <button class="btn btn--danger" type="button">Ok, Delete</button>
      </div>

    </div>
  </div>
  -->
</template>
