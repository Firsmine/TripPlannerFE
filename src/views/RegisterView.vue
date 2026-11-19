<template>
  <!-- Form -->
  <div class="auth-panel auth-panel--right">
    <div class="auth-card">
      <div class="auth-card__header">
        <h1 class="auth-card__title">Create Account</h1>
        <p class="auth-card__subtitle">Start planning your trips today</p>
      </div>

      <form class="auth-card__body" @submit.prevent="handleRegister">
        <div v-if="errorMessage" class="form-error">
          {{ errorMessage }}
        </div>

        <!-- Name field -->
        <div class="form-group">
          <label class="form-label" for="name">Full Name</label>
          <input
            v-model="name"
            class="form-input"
            type="text"
            id="name"
            name="name"
            placeholder="John Doe"
            autocomplete="name"
            required
          />
        </div>

        <!-- Email field with error example -->
        <div class="form-group">
          <label class="form-label" for="email">Email Address</label>
          <input
            v-model="email"
            class="form-input form-input--error"
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </div>

        <!-- Password field -->
        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input
            v-model="password"
            class="form-input"
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            autocomplete="new-password"
            required
          />
          <span class="form-hint">Minimum 8 characters</span>
        </div>

        <button class="btn btn--primary btn--full" type="submit" :disabled="loading">
          {{ loading ? 'Creating Account...' : 'Create Account' }}
        </button>
      </form>

      <div class="auth-card__footer">
        <span>Already have an account?</span>
        <RouterLink to="/login">Sign in</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function handleRegister() {
  errorMessage.value = ''
  loading.value = true

  try {
    await authStore.register(name.value, email.value, password.value)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
