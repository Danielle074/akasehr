<template>
  <section class="py-20 bg-black text-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-2 gap-12 items-center">
        <!-- Texte -->
        <div>
          <span class="text-amber-400 text-sm font-semibold tracking-wider uppercase">Contact</span>
          <h2 class="text-4xl md:text-5xl font-light mt-4 mb-6">
            Créons ensemble votre <span class="text-amber-400 font-bold">projet</span>
          </h2>
          <p class="text-gray-300 text-lg font-light mb-8">
            Une idée, un projet ? Contactez-nous pour un premier échange.
          </p>
          
          <div class="space-y-4">
            <!-- Téléphone -->
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-amber-400/10 rounded-full flex items-center justify-center">
                <Phone class="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p class="text-sm text-gray-400">Téléphone</p>
                <p class="font-medium">Cel. : 05.05.05.13.05</p>
                <p class="text-sm text-gray-400">Tél. : 27.20.22.77.09</p>
                <p class="text-sm text-gray-400">Fax : 27.20.22.88.66</p>
              </div>
            </div>
            
            <!-- Email -->
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-amber-400/10 rounded-full flex items-center justify-center">
                <Mail class="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p class="text-sm text-gray-400">Email</p>
                <p class="font-medium">contact@akasehrarchitecte.ci</p>
              </div>
            </div>
            
            <!-- Adresse -->
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-amber-400/10 rounded-full flex items-center justify-center">
                <MapPin class="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <p class="text-sm text-gray-400">Adresse</p>
                <p class="font-medium">Abidjan, Angré 8ème Tranche</p>
                <p class="text-sm text-gray-400">Carrefour Pri, A15</p>
              </div>
            </div>
          </div>

          <RouterLink 
            to="/contact"
            class="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            Nous contacter
            <ArrowRight class="w-5 h-5" />
          </RouterLink>
        </div>

        <!-- Image -->
        <div class="relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl">
            <img 
              :src="contactImage" 
              alt="Contact"
              class="w-full h-[400px] object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-vue-next'
import contactImage from '@/assets/images/contact-bg.jpeg'
</script>