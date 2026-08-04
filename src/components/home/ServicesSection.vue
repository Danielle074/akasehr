<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Nos Services</span>
        <h2 class="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
          Une expertise <span class="text-amber-500 font-bold">sur mesure</span>
        </h2>
        <p class="text-gray-600 text-lg font-light">
          De la conception à la réalisation, nous accompagnons vos projets avec passion et excellence
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="(service, index) in services" 
          :key="index"
          class="service-card group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500"
        >
          <div class="relative h-64 overflow-hidden">
            <img 
              :src="service.image" 
              :alt="service.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <!-- Icône -->
            <div class="absolute top-4 right-4 w-12 h-12 bg-amber-400/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <component :is="service.icon" class="w-6 h-6 text-amber-400" />
            </div>
          </div>

          <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 class="text-xl font-semibold mb-2">{{ service.title }}</h3>
            <p class="text-white/80 text-sm font-light">{{ service.description }}</p>
          </div>
        </div>
      </div>

      <!-- Bouton Voir tous nos services -->
      <div class="text-center mt-12">
        <RouterLink 
          to="/services"
          class="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Voir tous nos services
          <ArrowRight class="w-5 h-5" />
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Building2, Sparkles, Ruler, ArrowRight } from 'lucide-vue-next'
import service1 from '@/assets/images/service1.jpg'
import service2 from '@/assets/images/service2.jpg'
import service3 from '@/assets/images/service3.jpg'

const services = [
  {
    title: "Architecture d'intérieur",
    description: "Design d'espaces élégants et fonctionnels",
    icon: Building2,
    image: service1
  },
  {
    title: 'Architecture extérieure',
    description: 'Création de bâtiments uniques et durables',
    icon: Sparkles,
    image: service2
  },
  {
    title: 'Rénovation & Extension',
    description: 'Donner une nouvelle vie à vos espaces',
    icon: Ruler,
    image: service3
  }
]
</script>

<style scoped>
.service-card {
  transform: translateY(0);
}

.service-card:hover {
  transform: translateY(-10px);
}
</style>