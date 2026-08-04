<template>
  <div class="religious-buildings-page">
    <!-- Hero Section -->
    <section class="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${religiousHero})` }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>
      
      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4">
          Édifices <span class="text-amber-400 font-bold">Religieux</span>
        </h1>
        <p class="text-xl text-white/70 font-light max-w-3xl mx-auto">
          Des lieux de culte où l'architecture rencontre la spiritualité
        </p>
      </div>
    </section>

    <!-- Cathédrale Saint-Esprit de Grand-Bassam -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Images en cascade -->
          <div class="relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  :src="cathedrale1" 
                  alt="Cathédrale Saint-Esprit de Grand-Bassam - Vue aérienne"
                  class="w-full h-[300px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  :src="cathedrale2" 
                  alt="Cathédrale Saint-Esprit - Architecture"
                  class="w-full h-[200px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  :src="cathedrale3" 
                  alt="Cathédrale Saint-Esprit - Vitraux"
                  class="w-full h-[200px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <!-- Badge -->
            <div class="absolute -bottom-4 -right-4 bg-amber-500 text-white rounded-2xl p-4 shadow-xl">
              <span class="text-2xl font-bold block">6000</span>
              <span class="text-sm">m²</span>
            </div>
          </div>

          <!-- Texte -->
          <div>
            <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Édifice Religieux</span>
            <h2 class="text-4xl font-light text-gray-900 mt-4 mb-6">
              Cathédrale Saint-Esprit <br/>
              <span class="text-amber-500 font-bold">de Grand-Bassam</span>
            </h2>
            
            <div class="prose prose-lg text-gray-600 space-y-4">
              <p>
                Née d'un concours en <strong>février 1996</strong>, la cathédrale de Grand-Bassam hisse ses voiles 
                vers l'histoire. Inspirée par le moyen de locomotion des premiers missionnaires arrivés en 
                Côte d'Ivoire pour l'évangélisation, elle épouse la forme d'un <strong>navire</strong>, 
                symbole du voyage spirituel.
              </p>
              <p>
                Vue du ciel, sa proue et sa poupe évoquent un bateau porté par la foi, tandis que sa nef, 
                tel un pont sacré, invite au recueillement.
              </p>
              <p>
                Avec une surface bâtie de <strong>6 000 m²</strong>, elle s'impose par ses dimensions remarquables : 
                plus de <strong>140 mètres</strong> de long et plus de <strong>80 mètres</strong> de large.
              </p>
            </div>

            <!-- Caractéristiques -->
            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">3500</span>
                <p class="text-sm text-gray-600">Fidèles assis</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">36</span>
                <p class="text-sm text-gray-600">Mètres de haut</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">2026</span>
                <p class="text-sm text-gray-600">Achèvement</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Description détaillée -->
        <div class="mt-16 max-w-4xl mx-auto text-center">
          <div class="prose prose-lg text-gray-600 mx-auto space-y-4">
            <p>
              Pensée pour embrasser le vent tropical, elle respire au rythme de la mer et du ciel. 
              Ses ouvertures en forme d'<strong>ogive</strong> rappelant l'architecture Gréco-Romaine 
              laissent danser la lumière et l'air, tandis que ses murs de béton de 
              <strong>80 cm à 1 m</strong> d'épaisseur gardent en son chœur une fraîcheur apaisante.
            </p>
            <p>
              Les <strong>vitraux</strong>, éclats de couleurs et de récits, filtrent le jour en un chant lumineux.
            </p>
            <p class="text-amber-500 font-medium italic">
              "Plus qu'un édifice, cette cathédrale est un héritage vivant, un équilibre entre mémoire et modernité, 
              foi et architecture."
            </p>
            <p>
              En cours de construction, elle s'apprête à voguer vers son achèvement en <strong>2026</strong>, 
              portant en elle l'âme de Grand-Bassam.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Séparateur visuel -->
    <div class="relative py-16 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-amber-500/10">
      <div class="container mx-auto px-4 text-center">
        <div class="inline-flex items-center gap-4">
          <div class="w-16 h-px bg-amber-400"></div>
          <span class="text-amber-400 text-sm font-semibold tracking-widest">✦ ✦ ✦</span>
          <div class="w-16 h-px bg-amber-400"></div>
        </div>
      </div>
    </div>

    <!-- Paroisse Sainte Bernadette de Marcory -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Texte -->
          <div class="order-2 lg:order-1">
            <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Édifice Religieux</span>
            <h2 class="text-4xl font-light text-gray-900 mt-4 mb-6">
              Paroisse Sainte Bernadette <br/>
              <span class="text-amber-500 font-bold">de Marcory</span>
            </h2>
            
            <div class="prose prose-lg text-gray-600 space-y-4">
              <p>
                La nouvelle Église Catholique de Marcory, située à <strong>Abidjan</strong>, 
                Côte d'Ivoire, est un projet ambitieux qui s'étend sur une superficie de 
                <strong>900 m²</strong>.
              </p>
              <p>
                Conçue pour répondre aux besoins spirituels et sociaux des populations environnantes, 
                cette nouvelle construction vise à accueillir un plus grand nombre de fidèles, 
                passant de <strong>700 à 1400 places</strong>.
              </p>
              <p>
                La construction, prévue pour débuter en <strong>2025</strong>, promet de transformer 
                l'édifice en un espace moderne et artistique, tout en respectant les normes 
                environnementales actuelles.
              </p>
            </div>

            <!-- Caractéristiques -->
            <div class="grid grid-cols-3 gap-4 mt-8">
              <div class="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
                <span class="text-amber-500 text-2xl font-bold">900</span>
                <p class="text-sm text-gray-600">m²</p>
              </div>
              <div class="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
                <span class="text-amber-500 text-2xl font-bold">1400</span>
                <p class="text-sm text-gray-600">Places</p>
              </div>
              <div class="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
                <span class="text-amber-500 text-2xl font-bold">2025</span>
                <p class="text-sm text-gray-600">Début travaux</p>
              </div>
            </div>
          </div>

          <!-- Images -->
          <div class="order-1 lg:order-2 relative">
            <div class="grid grid-cols-2 gap-4">
              <div class="col-span-2 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  :src="marcory1" 
                  alt="Paroisse Sainte Bernadette de Marcory - Vue d'ensemble"
                  class="w-full h-[300px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  :src="marcory2" 
                  alt="Paroisse Sainte Bernadette - Architecture"
                  class="w-full h-[200px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div class="rounded-2xl overflow-hidden shadow-xl">
                <img 
                  :src="marcory3" 
                  alt="Paroisse Sainte Bernadette - Vitraux"
                  class="w-full h-[200px] object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <!-- Badge -->
            <div class="absolute -bottom-4 -left-4 bg-amber-500 text-white rounded-2xl p-4 shadow-xl">
              <span class="text-2xl font-bold block">2025</span>
              <span class="text-sm">Début des travaux</span>
            </div>
          </div>
        </div>

        <!-- Description détaillée -->
        <div class="mt-16 max-w-4xl mx-auto text-center">
          <div class="prose prose-lg text-gray-600 mx-auto space-y-4">
            <p>
              En plus de sa capacité accrue, cet édifice Catholique se distingue par son engagement 
              envers l'<strong>innovation architecturale</strong> et la <strong>durabilité</strong>.
            </p>
            <p>
              Les <strong>vitraux</strong>, intégrés dans cette nouvelle configuration, jouent un rôle 
              essentiel en apportant une lumière naturelle et colorée à l'intérieur.
            </p>
            <p class="text-amber-500 font-medium italic">
              "Ces éléments artistiques, en plus d'enrichir l'expérience des fidèles, ajoutent une 
              dimension esthétique unique à l'édifice."
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-light mb-6">
          Vous avez un projet <span class="text-amber-400 font-bold">d'édifice religieux</span> ?
        </h2>
        <p class="text-xl text-gray-300 font-light max-w-2xl mx-auto mb-8">
          Contactez-nous pour donner vie à votre lieu de culte
        </p>
        <RouterLink 
          to="/contact"
          class="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Nous contacter
          <ArrowRight class="w-5 h-5" />
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ArrowRight } from 'lucide-vue-next'

// ✅ IMPORT DES IMAGES POUR LA CATHÉDRALE SAINT-ESPRIT
import religiousHero from '@/assets/images/religious-hero.png'
import cathedrale1 from '@/assets/images/cathedrale1.png'
import cathedrale2 from '@/assets/images/cathedrale2.png'
import cathedrale3 from '@/assets/images/cathedrale3.png'

// ✅ IMPORT DES IMAGES POUR LA PAROISSE SAINTE BERNADETTE
import marcory1 from '@/assets/images/marcory1.png'
import marcory2 from '@/assets/images/marcory2.png'
import marcory3 from '@/assets/images/marcory3.png'
</script>

<style scoped>
.religious-buildings-page {
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