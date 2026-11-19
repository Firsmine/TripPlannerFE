<template>
  <div class="app-layout">
    <!-- Navbar -->
    <nav class="navbar">
      <a href="itineraries.html" class="navbar__brand"> TripPlanner </a>
      <div class="navbar__actions">
        <button class="navbar__menu-toggle" type="button" aria-label="Menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button class="btn btn--ghost btn--sm" type="button">
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6.5" cy="4.5" r="2.5" stroke="currentColor" stroke-width="1.5" />
            <path
              d="M1 12c0-2.485 2.462-4.5 5.5-4.5S12 9.515 12 12"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="square"
            />
          </svg>
          John Doe
        </button>
        <button class="btn btn--ghost btn--sm" type="button">Logout</button>
      </div>
    </nav>

    <div class="app-main">
      <div class="builder-layout">
        <!-- ── MAIN CANVAS ── -->
        <div class="builder-main">
          <!-- Toolbar -->
          <div class="builder-toolbar">
            <div class="builder-toolbar__left">
              <div class="builder-breadcrumb">
                <a href="itineraries.html">Itineraries</a>
                <span>→</span>
                <span>Japan Spring Trip</span>
              </div>
              <div class="builder-toolbar__divider"></div>
              <span class="tag">3 blocks</span>
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
            <!-- Field editor: Trip Overview Block (open/active) -->
            <div class="field-editor field-editor--open">
              <div class="field-editor__header">
                <div>
                  <div class="field-editor__title">
                    <span class="tag">01</span>
                    &nbsp; Trip Overview
                  </div>
                  <div class="field-editor__meta">template: overview</div>
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
              <div class="field-editor__body">
                <div class="form-group">
                  <label class="form-label" for="f-overview-destination">Destination</label>
                  <input
                    class="form-input"
                    type="text"
                    id="f-overview-destination"
                    placeholder="Enter destination…"
                    value="Kyoto & Tokyo, Japan"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="f-overview-dates">Trip Dates</label>
                  <input
                    class="form-input"
                    type="text"
                    id="f-overview-dates"
                    placeholder="Enter trip dates…"
                    value="5 - 12 April 2026"
                  />
                </div>
                <div class="form-group">
                  <label class="form-label" for="f-overview-image">Cover Image URL</label>
                  <input
                    class="form-input"
                    type="url"
                    id="f-overview-image"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <div class="field-editor__footer">
                <div class="shortcuts-hint"><span class="kbd">Esc</span> to close</div>
                <div class="field-editor__footer-actions">
                  <button class="btn btn--ghost btn--sm" type="button">Remove</button>
                  <button class="btn btn--primary btn--sm" type="button">Save</button>
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
  <!--
  <div class="modal-backdrop">
    <div class="modal confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-remove-title">
      <div class="modal__header">
        <h2 class="modal__title" id="modal-remove-title">Remove Block</h2>
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
          Remove <strong>"Trip Overview"</strong> from this itinerary?<br>
          This action cannot be undone.
        </p>
      </div>
      <div class="modal__footer">
        <button class="btn btn--ghost" type="button">Cancel</button>
        <button class="btn btn--danger" type="button">Ok, Remove</button>
      </div>
    </div>
  </div>
  -->
</template>
