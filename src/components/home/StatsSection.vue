<template>
  <section class="py-20 bg-black">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="text-center group"
          :style="{ animationDelay: index * 0.2 + 's' }"
        >
          <div class="stat-number text-4xl md:text-5xl font-light text-amber-400 mb-2">
            <span class="counter" :data-target="stat.value">0</span>
            <span v-if="stat.suffix">{{ stat.suffix }}</span>
          </div>
          <p class="text-white/60 text-sm uppercase tracking-wider">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Les données sont utilisées dans le template via v-for
const stats = [
  { value: 150, suffix: '+', label: 'Projets réalisés' },
  { value: 45, suffix: '', label: 'Clients satisfaits' },
  { value: 12, suffix: '+', label: "Années d'expérience" },
  { value: 8, suffix: '', label: 'Prix remportés' },
]

onMounted(() => {
  const counters = document.querySelectorAll('.counter')
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target') || '0')
    const duration = 2000
    const startTime = performance.now()

    const updateCounter = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * target)
      
      counter.textContent = current.toString()
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target.toString()
      }
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(updateCounter)
        observer.disconnect()
      }
    })

    observer.observe(counter)
  })
})
</script>

<style scoped>
.stat-number {
  font-family: 'Georgia', serif;
}
</style>