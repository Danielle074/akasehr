<template>
  <section class="py-20 bg-amber-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Témoignages</span>
        <h2 class="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
          Ce que nos clients <span class="text-amber-500 font-bold">disent</span>
        </h2>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div 
          v-for="(testimonial, index) in testimonials" 
          :key="index"
          class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div class="flex items-center gap-4 mb-4">
            <img 
              :src="testimonial.avatar" 
              :alt="testimonial.name"
              class="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
              <p class="text-sm text-gray-500">{{ testimonial.role }}</p>
            </div>
          </div>
          <div class="flex mb-3">
            <Star v-for="i in 5" :key="i" class="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <p class="text-gray-600 font-light italic">"{{ testimonial.text }}"</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Star } from 'lucide-vue-next'
import testimonial1 from '@/assets/images/testimonial1.jpg'
import testimonial2 from '@/assets/images/testimonial2.jpg'
import testimonial3 from '@/assets/images/testimonial3.jpg'

const testimonials = [
  {
    name: 'Marie Dupont',
    role: 'Promoteur immobilier',
    text: 'Un travail exceptionnel ! Le cabinet Aka Sehr a su donner vie à notre projet avec une élégance remarquable.',
    avatar: testimonial1
  },
  {
    name: 'Jean-Pierre Martin',
    role: 'Architecte indépendant',
    text: 'Une collaboration enrichissante. Leur approche allie créativité et rigueur technique.',
    avatar: testimonial2
  },
  {
    name: 'Sophie Lambert',
    role: 'Propriétaire',
    text: 'Notre maison a été transformée en un véritable chef-d\'œuvre. Un grand merci à toute l\'équipe !',
    avatar: testimonial3
  }
]
</script>