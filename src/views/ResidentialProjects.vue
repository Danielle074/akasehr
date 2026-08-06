<template>
  <div class="residential-projects-page">
    <!-- Hero Section -->
    <section class="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${residentialHero})` }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>
      
      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4">
          Projets <span class="text-amber-400 font-bold">Résidentiels</span>
        </h1>
        <p class="text-xl text-white/70 font-light max-w-3xl mx-auto">
          Des demeures d'exception alliant élégance et confort moderne
        </p>
      </div>
    </section>

    <!-- Projet 1: Résidence de l'Ambassade du Gabon -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Image -->
          <div class="relative">
            <div class="rounded-2xl overflow-hidden shadow-2xl">
              <img 
                :src="residence1" 
                alt="Résidence de l'Ambassade du Gabon - Vue d'ensemble"
                class="w-full h-[400px] object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div class="absolute -bottom-4 -right-4 bg-amber-500 text-white rounded-2xl p-4 shadow-xl">
              <span class="text-2xl font-bold block">30</span>
              <span class="text-sm">Ans d'existence</span>
            </div>
          </div>

          <div>
            <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Projet Résidentiel</span>
            <h2 class="text-4xl font-light text-gray-900 mt-4 mb-6">
              Résidence de l'<span class="text-amber-500 font-bold">Ambassade du Gabon</span>
            </h2>
            
            <div class="prose prose-lg text-gray-600 space-y-4">
              <p>
                Située à <strong>Abidjan</strong>, <strong>Cocody Riviera Golf</strong>, 
                à environ <strong>1 km</strong> du siège d'Orange CI, cette demeure 
                se distingue par ses <strong>volumes verticaux spectaculaires</strong> 
                visant à conserver la structure du bâtiment et ses façades élégantes.
              </p>
              <p>
                Le projet initial de <strong>30 pièces</strong>, érigé il y a plusieurs années, 
                nécessitait un renforcement des parties endommagées par les intempéries et l'abandon.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">30</span>
                <p class="text-sm text-gray-600">Pièces</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">1</span>
                <p class="text-sm text-gray-600">km d'Orange CI</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">30</span>
                <p class="text-sm text-gray-600">Ans</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                <Building2 class="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Rénovation Complète</h3>
              <p class="text-gray-600 text-sm">
                Réhabilitation du bâtiment principal, d'un préau et d'un bâtiment annexe, 
                création d'une pergola, d'une piscine et réhabilitation de la clôture.
              </p>
            </div>
            
            <div class="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                <Sun class="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Lumière Naturelle</h3>
              <p class="text-gray-600 text-sm">
                L'ajout de grandes baies vitrées inonde les espaces intérieurs d'une 
                harmonieuse lumière naturelle.
              </p>
            </div>
            
            <div class="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                <Wind class="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Ventilation Naturelle</h3>
              <p class="text-gray-600 text-sm">
                Position stratégique des ouvertures pour une ventilation optimale 
                réduisant la dépendance à la climatisation.
              </p>
            </div>
            
            <div class="bg-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div class="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors duration-300">
                <Leaf class="w-7 h-7 text-amber-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Approche Écologique</h3>
              <p class="text-gray-600 text-sm">
                Architecture moderne améliorant le confort tout en minimisant 
                l'impact environnemental.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projet 2: Immeuble B -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="order-2 lg:order-1">
            <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Projet Résidentiel</span>
            <h2 class="text-4xl font-light text-gray-900 mt-4 mb-6">
              Immeuble <span class="text-amber-500 font-bold">B</span>
            </h2>
            
            <div class="prose prose-lg text-gray-600 space-y-4">
              <p>
                Plutôt que des espaces séparés traditionnels, le style moderne de cet immeuble de 
                <strong>haut standing</strong> se distingue par ses espaces communs, notamment 
                une grande <strong>piscine</strong> et une salle de sport aérée.
              </p>
              <p>
                Ces installations favorisent non seulement la convivialité mais aussi le 
                <strong>bien-être des résidents</strong>, en leur offrant des lieux de détente 
                et de remise en forme accessibles à tous.
              </p>
              <p>
                Ce projet, situé à <strong>Bonoumin</strong>, propose un ensemble d'appartements 
                de <strong>3 et 4 pièces</strong> répartis sur <strong>cinq étages</strong>.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
                <span class="text-amber-500 text-2xl font-bold">3-4</span>
                <p class="text-sm text-gray-600">Pièces</p>
              </div>
              <div class="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
                <span class="text-amber-500 text-2xl font-bold">5</span>
                <p class="text-sm text-gray-600">Étages</p>
              </div>
              <div class="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
                <span class="text-amber-500 text-2xl font-bold">Bonoumin</span>
                <p class="text-sm text-gray-600">Localisation</p>
              </div>
            </div>
          </div>

          <div class="order-1 lg:order-2 relative">
            <div class="grid grid-cols-1 gap-4">
              <div class="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  :src="immeubleB1" 
                  alt="Immeuble B - Vue d'ensemble"
                  class="w-full h-[300px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  :src="immeubleB2" 
                  alt="Immeuble B - Piscine"
                  class="w-full h-[200px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div class="absolute -bottom-4 -left-4 bg-amber-500 text-white rounded-2xl p-4 shadow-xl">
              <span class="text-2xl font-bold block">5</span>
              <span class="text-sm">Étages</span>
            </div>
          </div>
        </div>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-2xl p-8 border border-amber-200">
            <div class="flex items-start gap-4">
              <Quote class="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" />
              <div>
                <p class="text-lg text-gray-700 italic">
                  "L'architecture de l'immeuble intègre des éléments qui maximisent le confort, 
                  des espaces verts et la qualité de vie des occupants, tels que des balcons végétalisés."
                </p>
                <p class="text-gray-600 mt-4">
                  Ces caractéristiques créent un environnement chaleureux et accueillant, 
                  propice à la relaxation et à la vie en famille.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projet 3: Villa Atheba -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  :src="villaAtheba1" 
                  alt="Villa Atheba - Vue d'ensemble"
                  class="w-full h-[300px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  :src="villaAtheba2" 
                  alt="Villa Atheba - Architecture"
                  class="w-full h-[200px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  :src="villaAtheba3" 
                  alt="Villa Atheba - Intérieur"
                  class="w-full h-[200px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div class="absolute -bottom-4 -right-4 bg-amber-500 text-white rounded-2xl p-4 shadow-xl">
              <span class="text-2xl font-bold block">4</span>
              <span class="text-sm">Pièces</span>
            </div>
          </div>

          <div>
            <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Projet Résidentiel</span>
            <h2 class="text-4xl font-light text-gray-900 mt-4 mb-6">
              Villa <span class="text-amber-500 font-bold">Atheba</span>
            </h2>
            
            <div class="prose prose-lg text-gray-600 space-y-4">
              <p>
                Le style moderne de cette villa de <strong>haut standing</strong> se distingue 
                par ses espaces ouverts et lumineux, créant une atmosphère de 
                <strong>convivialité et de bien-être</strong>.
              </p>
              <p>
                Les installations favorisent non seulement la convivialité mais aussi le 
                <strong>bien-être des résidents</strong>, en leur offrant des lieux de détente 
                et de remise en forme accessibles à tous.
              </p>
              <p>
                Ce projet propose un ensemble d'espaces de vie repensés pour offrir un 
                <strong>cadre de vie exceptionnel</strong>, où chaque résident peut profiter 
                pleinement de son environnement.
              </p>
            </div>

            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">4</span>
                <p class="text-sm text-gray-600">Pièces</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">Haut</span>
                <p class="text-sm text-gray-600">Standing</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">Moderne</span>
                <p class="text-sm text-gray-600">Architecture</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 max-w-4xl mx-auto">
          <div class="bg-gray-50 rounded-2xl p-8 border border-gray-200">
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles class="w-5 h-5 text-amber-500" />
                  Caractéristiques
                </h4>
                <ul class="text-gray-600 space-y-1">
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Architecture moderne
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Espaces ouverts et lumineux
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Haut standing
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Lieux de détente
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart class="w-5 h-5 text-amber-500" />
                  Atouts
                </h4>
                <ul class="text-gray-600 space-y-1">
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Convivialité
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Bien-être des résidents
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Design contemporain
                  </li>
                  <li class="flex items-center gap-2">
                    <Check class="w-4 h-4 text-amber-500" />
                    Qualité de vie
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
          Vous avez un projet <span class="text-amber-400 font-bold">résidentiel</span> ?
        </h2>
        <p class="text-xl text-gray-300 font-light max-w-2xl mx-auto mb-8">
          Contactez-nous pour réaliser votre demeure d'exception
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
            to="/promotions"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-full font-medium transition-all duration-300"
          >
            <Building2 class="w-5 h-5" />
            Voir nos promotions
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { 
  Building2, 
  Sun, 
  Wind, 
  Leaf, 
  Quote, 
  Sparkles, 
  Check,
  Phone,
  Heart
} from 'lucide-vue-next'

// ✅ IMPORT DES IMAGES - RÉSIDENCE AMBASSADE DU GABON
import residentialHero from '@/assets/images/residential-hero.png'
import residence1 from '@/assets/images/residence1.png'

// ✅ IMPORT DES IMAGES - IMMEUBLE B
import immeubleB1 from '@/assets/images/immeubleB1.png'
import immeubleB2 from '@/assets/images/immeubleB2.png'

// ✅ IMPORT DES IMAGES - VILLA ATHEBA
import villaAtheba1 from '@/assets/images/villaAtheba1.png'
import villaAtheba2 from '@/assets/images/villaAtheba2.png'
import villaAtheba3 from '@/assets/images/villaAtheba3.png'
</script>

<style scoped>
.residential-projects-page {
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