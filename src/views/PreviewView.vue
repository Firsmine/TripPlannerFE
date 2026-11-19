<template>
  <div class="preview-layout">
    <!-- Top bar -->
    <div class="preview-topbar">
      <div class="preview-topbar__info">
        <span class="preview-topbar__badge">Preview</span>
        <span class="preview-topbar__title">Japan Spring Trip</span>
        <span class="preview-topbar__slug">/japan-spring-trip</span>
      </div>
      <a href="builder.html" class="btn btn--ghost btn--sm">
        <svg
          width="13"
          height="13"
          viewBox="0 0 13 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2L3 6.5 8 11"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="square"
            stroke-linejoin="round"
          />
        </svg>
        Back to Builder
      </a>
    </div>

    <!-- Preview content -->
    <div class="preview-content">
      <!-- Block 1: Trip Overview -->
      <div class="preview-section">
        <div class="preview-section__label">
          <span class="preview-section__num">01</span>
          <span class="preview-section__template-name">overview</span>
        </div>
        <div class="preview-section__body">
          <div class="preview-hero">
            <h1 class="preview-hero__title">Kyoto &amp; Tokyo, Japan</h1>
            <p class="preview-hero__subtitle">
              5 - 12 April 2026 · A 7-day journey through Japan during cherry blossom season.
            </p>
            <div>
              <button class="btn btn--primary" type="button">View Trip</button>
            </div>
            <!-- No image URL provided — placeholder shown -->
            <div class="preview-hero__image-placeholder">No image URL provided</div>
          </div>
        </div>
      </div>

      <!-- Block 2: Day Plan -->
      <div class="preview-section">
        <div class="preview-section__label">
          <span class="preview-section__num">02</span>
          <span class="preview-section__template-name">day-plan</span>
        </div>
        <div class="preview-section__body">
          <div class="preview-about">
            <div class="preview-about__image-placeholder">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="30" height="30" stroke="currentColor" stroke-width="1.5" />
                <circle cx="10" cy="11" r="3" stroke="currentColor" stroke-width="1.5" />
                <path
                  d="M1 22l8-7 6 5 5-4 11 9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="square"
                />
              </svg>
              <span>day_photo</span>
            </div>
            <div class="preview-about__body">
              <div class="preview-about__label">Day 1</div>
              <h2 class="preview-about__heading">Arrival in Kyoto</h2>
              <p class="preview-about__description">
                Land at Kansai International Airport, take the Haruka express to Kyoto Station,
                check in, and spend the evening exploring Gion's old streets and trying local
                kaiseki cuisine.
              </p>
              <a href="#" class="btn btn--ghost btn--sm">See details →</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Block 3: Activity List -->
      <div class="preview-section">
        <div class="preview-section__label">
          <span class="preview-section__num">03</span>
          <span class="preview-section__template-name">activities</span>
        </div>
        <div class="preview-section__body">
          <div class="preview-services">
            <div class="preview-services__heading">Planned Activities</div>
            <div class="preview-services__grid">
              <div class="preview-service-card">
                <div class="preview-service-card__icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M3 3h16v16H3z" stroke="currentColor" stroke-width="1.5" />
                    <path
                      d="M7 11h8M11 7v8"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="square"
                    />
                  </svg>
                </div>
                <div class="preview-service-card__name">activity_1_name</div>
                <div class="preview-service-card__meta">activity_1_photo</div>
              </div>

              <div class="preview-service-card">
                <div class="preview-service-card__icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="11" cy="11" r="9" stroke="currentColor" stroke-width="1.5" />
                    <path
                      d="M11 7v4l3 2.5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="square"
                    />
                  </svg>
                </div>
                <div class="preview-service-card__name">activity_2_name</div>
                <div class="preview-service-card__meta">activity_2_photo</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Block 4: Accommodation -->
      <div class="preview-section">
        <div class="preview-section__label">
          <span class="preview-section__num">04</span>
          <span class="preview-section__template-name">accommodation</span>
        </div>
        <div class="preview-section__body">
          <div class="preview-hero-section">
            <div class="preview-hero-section__content">
              <h2 class="preview-hero-section__title">Hotel Granvia Kyoto</h2>
              <p class="preview-hero-section__subtitle">
                Karasuma Chuoguchi, Shimogyo Ward, Kyoto · Check-in: 5 April 2026, 15:00
              </p>
              <button class="btn btn--primary" type="button">View on Map →</button>
            </div>
            <div class="preview-hero-section__image-placeholder">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="30" height="30" stroke="currentColor" stroke-width="1.5" />
                <circle cx="10" cy="11" r="3" stroke="currentColor" stroke-width="1.5" />
                <path
                  d="M1 22l8-7 6 5 5-4 11 9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="square"
                />
              </svg>
              <span>hotel_image</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Block 5: Transport -->
      <div class="preview-section">
        <div class="preview-section__label">
          <span class="preview-section__num">05</span>
          <span class="preview-section__template-name">transport</span>
        </div>
        <div class="preview-section__body">
          <div class="preview-contact">
            <div class="preview-contact__left">
              <h2 class="preview-contact__title">Getting Around</h2>
              <div class="preview-contact__details">
                <div class="preview-contact__detail">
                  <div class="preview-contact__detail-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1 3h14v10H1z" stroke="currentColor" stroke-width="1.5" />
                      <path
                        d="M1 3l7 6 7-6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="square"
                      />
                    </svg>
                  </div>
                  <span class="preview-contact__detail-value">Shinkansen — Kyoto to Tokyo</span>
                </div>
                <div class="preview-contact__detail">
                  <div class="preview-contact__detail-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 2h4l1.5 3.5-2 1.5c.9 1.8 2.5 3.4 4.3 4.3l1.5-2L15 10.5V14c0 .6-.4 1-1 1C5.7 15 1 10.3 1 3c0-.6.4-1 1-1z"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <span class="preview-contact__detail-value">Departure: 9 April 2026, 08:30</span>
                </div>
              </div>
            </div>
            <div class="preview-contact__map-placeholder">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 3C11 3 7 7 7 12c0 7 9 17 9 17s9-10 9-17c0-5-4-9-9-9z"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <circle cx="16" cy="12" r="3" stroke="currentColor" stroke-width="1.5" />
              </svg>
              <span>route_map</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Block 6: Budget Summary -->
      <div class="preview-section">
        <div class="preview-section__label">
          <span class="preview-section__num">06</span>
          <span class="preview-section__template-name">budget</span>
        </div>
        <div class="preview-section__body">
          <div class="preview-about">
            <div class="preview-about__image-placeholder">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="1" y="1" width="30" height="30" stroke="currentColor" stroke-width="1.5" />
                <path
                  d="M6 22l6-8 5 5 5-7"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="square"
                  stroke-linejoin="round"
                />
              </svg>
              <span>chart_image</span>
            </div>
            <div class="preview-about__body">
              <div class="preview-about__label">Budget</div>
              <h2 class="preview-about__heading">Total: ¥285,000</h2>
              <p class="preview-about__description">
                Covers flights, accommodation, transport, and activities for two travelers.
                Currency: JPY. Note: meals and souvenirs are not included in this estimate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /preview-content -->
  </div>
</template>
