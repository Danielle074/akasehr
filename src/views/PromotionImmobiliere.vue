<template>
  <div class="promotions-page">
    <!-- Hero Section -->
    <section class="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${promotionsHero})` }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>
      
      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4">
          Promotions <span class="text-amber-400 font-bold">Immobilières</span>
        </h1>
        <p class="text-xl text-white/70 font-light max-w-3xl mx-auto">
          Des habitations d'exception pour un art de vivre unique
        </p>
      </div>
    </section>

    <!-- Cité des Grâces -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Images en cascade -->
          <div class="relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  :src="cite1" 
                  alt="Cité des Grâces - Vue d'ensemble"
                  class="w-full h-[300px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  :src="cite2" 
                  alt="Cité des Grâces - Architecture"
                  class="w-full h-[200px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  :src="cite3" 
                  alt="Cité des Grâces - Intérieur"
                  class="w-full h-[200px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <!-- Badge -->
            <div class="absolute -bottom-4 -right-4 bg-amber-500 text-white rounded-2xl p-4 shadow-xl">
              <span class="text-2xl font-bold block">33</span>
              <span class="text-sm">Villas</span>
            </div>
          </div>

          <!-- Texte -->
          <div>
            <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Promotion Immobilière</span>
            <h2 class="text-4xl font-light text-gray-900 mt-4 mb-6">
              Cité des Grâces <br/>
              <span class="text-amber-500 font-bold">Bingerville</span>
            </h2>
            
            <div class="prose prose-lg text-gray-600 space-y-4">
              <p>
                Située dans la ville de <strong>Bingerville</strong>, dans le quartier <strong>Enfant</strong>, 
                non loin de l'hôpital Mère-Enfant et de la <strong>Mairie</strong>.
              </p>
              <p>
                Inspirée par l'architecture moderne et contemporaine, cette promotion immobilière 
                se distingue par ses lignes épurées et par ses fenêtres en bandeau qui 
                offrent un apport de lumière naturelle exceptionnelle.
              </p>
              <p>
                Il s'agit d'un ensemble de <strong>33 villas</strong> de haut standing, 
                comprenant des <strong>5 pièces</strong> avec une superficie totale de 
                <strong>300 m²</strong> chacune.
              </p>
            </div>

            <!-- Caractéristiques -->
            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">33</span>
                <p class="text-sm text-gray-600">Villas</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">300</span>
                <p class="text-sm text-gray-600">m²</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">5</span>
                <p class="text-sm text-gray-600">Pièces</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Description détaillée -->
        <div class="mt-16">
          <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                <Home class="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Confort et Espaces</h3>
              <p class="text-gray-600">
                Cette promotion immobilière a été conçue pour des habitations de haut standing, 
                offrant des espaces de convivialité et des lieux de détente, favorisant 
                le bien-être des résidents.
              </p>
            </div>
            
            <div class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                <Sun class="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Lumière et Nature</h3>
              <p class="text-gray-600">
                Les installations en dalles et les fenêtres en bandeau offrent un apport 
                de lumière naturelle exceptionnelle, créant une harmonie parfaite entre 
                l'intérieur et l'extérieur.
              </p>
            </div>
            
            <div class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                <ParkingCircle class="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Parkings et Espaces</h3>
              <p class="text-gray-600">
                Des parkings et des espaces de remise en forme sont accessibles à tous, 
                favorisant non seulement la sécurité mais aussi le bien-être des résidents.
              </p>
            </div>
            
            <div class="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                <Sparkles class="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Design Moderne</h3>
              <p class="text-gray-600">
                L'architecture moderne et contemporaine se distingue par ses lignes épurées, 
                offrant un cadre de vie exceptionnel et élégant.
              </p>
            </div>
          </div>

          <!-- Citation -->
          <div class="mt-12 max-w-4xl mx-auto bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-2xl p-8 border border-amber-200">
            <div class="flex items-start gap-4">
              <Quote class="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
              <p class="text-lg text-gray-700 italic">
                "Ces installations favorisent non seulement la sécurité et la convivialité, 
                mais aussi le bien-être des résidents, en leur offrant des formes accessibles à tous."
              </p>
            </div>
          </div>

          <!-- Informations complémentaires -->
          <div class="mt-12 max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin class="w-5 h-5 text-amber-500" />
                  Localisation
                </h4>
                <p class="text-gray-600">
                  Bingerville, quartier Enfant<br/>
                  À proximité de l'hôpital Mère-Enfant<br/>
                  Et de la Mairie de Bingerville
                </p>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Ruler class="w-5 h-5 text-amber-500" />
                  Caractéristiques
                </h4>
                <ul class="text-gray-600 space-y-1">
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    33 villas de haut standing
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    5 pièces par villa
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    300 m² de superficie
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Fenêtres en bandeau
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Architecture moderne et contemporaine
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-black text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-light mb-6">
          Vous êtes intéressé par <span class="text-amber-400 font-bold">cette promotion</span> ?
        </h2>
        <p class="text-xl text-gray-300 font-light max-w-2xl mx-auto mb-8">
          Contactez-nous pour plus d'informations sur la Cité des Grâces
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink 
            to="/contact"
            class="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Phone class="w-5 h-5" />
            Nous contacter
          </RouterLink>
          <RouterLink 
            to="/residential-projects"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-full font-medium transition-all duration-300"
          >
            <Building2 class="w-5 h-5" />
            Voir nos projets résidentiels
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { 
  Home, 
  Sun, 
  ParkingCircle, 
  Sparkles, 
  Quote, 
  MapPin, 
  Ruler, 
  Check,
  Phone,
  Building2
} from 'lucide-vue-next'

// ✅ IMPORT DES IMAGES POUR LA CITÉ DES GRÂCES
import promotionsHero from '@/assets/images/promotions-hero.png'
import cite1 from '@/assets/images/cite1.png'
import cite2 from '@/assets/images/cite2.png'
import cite3 from '@/assets/images/cite3.png'
</script>

<style scoped>
.promotions-page {
  overflow-x: hidden;
}

.prose p {
  margin-bottom: 1rem;
}

.prose strong {
  color: #1a1a1a;
  font-weight: 600;
}
</style>