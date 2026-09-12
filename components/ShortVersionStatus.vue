<template>
  <Transition name="short-version-toast">
    <div v-if="message" class="short-version-status" :class="{ error }" role="status" aria-live="polite">
      {{ message }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const message = ref('')
const error = ref(false)
let timeout: ReturnType<typeof setTimeout> | undefined

function show(event: Event) {
  const detail = (event as CustomEvent<{ message: string, error?: boolean }>).detail
  message.value = detail.message
  error.value = Boolean(detail.error)
  clearTimeout(timeout)
  timeout = setTimeout(() => { message.value = '' }, 5000)
}

onMounted(() => window.addEventListener('short-version-status', show))
onBeforeUnmount(() => {
  window.removeEventListener('short-version-status', show)
  clearTimeout(timeout)
})
</script>

<style scoped>
.short-version-status {
  position: fixed;
  z-index: 10000;
  left: 50%;
  top: 1.25rem;
  max-width: min(42rem, calc(100vw - 2rem));
  transform: translateX(-50%);
  border: 1px solid rgba(23, 137, 153, 0.5);
  border-radius: 0.45rem;
  background: rgba(236, 250, 250, 0.96);
  box-shadow: 0 0.5rem 1.5rem rgba(4, 47, 54, 0.18);
  color: #0d5661;
  padding: 0.65rem 0.9rem;
  font: 600 0.8rem/1.35 Cantarell, sans-serif;
}

.short-version-status.error {
  border-color: rgba(176, 91, 18, 0.55);
  background: rgba(255, 246, 230, 0.97);
  color: #8a4309;
}

.short-version-toast-enter-active,
.short-version-toast-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}

.short-version-toast-enter-from,
.short-version-toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -0.5rem);
}
</style>
