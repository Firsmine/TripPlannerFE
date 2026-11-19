<template>
  <!-- Form -->
  <div class="auth-panel">
    <div class="auth-card">
      <div class="auth-card__header">
        <h1 class="auth-card__title">Sign In</h1>
        <p class="auth-card__subtitle">Enter your credentials to continue</p>
      </div>

      <form class="auth-card__body" @submit.prevent="handleLogin">
        <div v-if="errorMessage" class="form-error">
          {{ errorMessage }}
        </div>

        <!-- Email field -->
        <div class="form-group">
          <label class="form-label" for="email">Email Address</label>
          <input
            v-model="email"
            class="form-input"
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            autocomplete="email"
            required
          />
        </div>

        <!-- Password field with error example -->
        <div class="form-group">
          <label class="form-label" for="password">Password</label>
          <input
            v-model="password"
            class="form-input form-input--error"
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            autocomplete="current-password"
            required
          />
        </div>

        <button class="btn btn--primary btn--full" type="submit" :disabled="loading">
          {{ loading ? 'Signing In...' : 'Sign In' }}
        </button>
      </form>

      <div class="auth-card__footer">
        <span>Don't have an account?</span>
        <RouterLink to="/register">Create one</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const authStore = useAuthStore()
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true

  try {
    await authStore.register(email.value, password.value)
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
