<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${aboutHero})` }"
      >
        <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>
      
      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4">
          À propos de <span class="text-amber-400 font-bold">nous</span>
        </h1>
        <p class="text-xl text-white/70 font-light max-w-2xl mx-auto">
          Découvrez l'histoire et l'expertise du Cabinet Aka Sehr
        </p>
      </div>
    </section>

    <!-- Présentation du Cabinet -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Image du fondateur -->
          <div class="relative group">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                :src="founderImage" 
                alt="Aka Sehr Ernest - Architecte"
                class="w-full h-500px object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 class="text-2xl font-semibold">Aka Sehr Ernest</h3>
                <p class="text-amber-400">Architecte DPLG - N°80</p>
              </div>
            </div>
            <!-- Badge d'expérience -->
            <div class="absolute -bottom-4 -right-4 bg-amber-500 text-white rounded-2xl p-4 shadow-xl">
              <span class="text-3xl font-bold block">30+</span>
              <span class="text-sm">Ans d'expérience</span>
            </div>
          </div>

          <!-- Texte -->
          <div>
            <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Qui sommes-nous ?</span>
            <h2 class="text-4xl font-light text-gray-900 mt-4 mb-6">
              L'excellence en <span class="text-amber-500 font-bold">architecture</span>
            </h2>
            
            <div class="prose prose-lg text-gray-600 space-y-4">
              <p>
                Spécialisé dans la <strong>conception</strong>, les <strong>dossiers de permis de construire</strong> 
                et le <strong>suivi de chantier</strong>, le <strong>Cabinet Aka Sehr</strong> est une référence 
                en architecture d'intérieur et toutes les autres formes d'architecture depuis <strong>1995</strong>.
              </p>
              <p>
                Dirigé par l'<strong>Architecte Aka Sehr Ernest</strong>, inscrit à l'<strong>Ordre des Architectes 
                de Côte d'Ivoire</strong> sous le numéro <strong>80</strong>, le cabinet exerce les activités 
                principales et connexes au métier d'architecte.
              </p>
              <p>
                Le cabinet a su murir sa capacité à concevoir des solutions architecturales efficaces, 
                applicables dans presque tous les types de constructions.
              </p>
            </div>

            <!-- Informations clés -->
            <div class="grid grid-cols-2 gap-4 mt-8">
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">1995</span>
                <p class="text-sm text-gray-600">Année de création</p>
              </div>
              <div class="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <span class="text-amber-500 text-2xl font-bold">80</span>
                <p class="text-sm text-gray-600">Numéro d'ordre</p>
              </div>
            </div>

            <!-- Bouton Contact -->
            <RouterLink 
              to="/contact"
              class="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Nous contacter
              <ArrowRight class="w-5 h-5" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Nos Valeurs -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Nos Valeurs</span>
          <h2 class="text-4xl md:text-5xl font-light text-gray-900 mt-4">
            Ce qui nous <span class="text-amber-500 font-bold">anime</span>
          </h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="(value, index) in values" :key="index" 
               class="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-center">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition-colors duration-300">
              <component :is="value.icon" class="w-8 h-8 text-amber-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Notre Expertise -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Notre Expertise</span>
          <h2 class="text-4xl md:text-5xl font-light text-gray-900 mt-4">
            Nos <span class="text-amber-500 font-bold">domaines</span> d'excellence
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(expertise, index) in expertises" :key="index"
               class="group relative overflow-hidden rounded-2xl bg-gray-50 hover:bg-amber-50 transition-all duration-500 p-6 text-center border border-gray-100 hover:border-amber-200">
            <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition-colors duration-300">
              <component :is="expertise.icon" class="w-6 h-6 text-amber-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ expertise.title }}</h3>
            <p class="text-sm text-gray-600">{{ expertise.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Localisation -->
    <section class="py-20 bg-gray-900 text-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span class="text-amber-400 text-sm font-semibold tracking-wider uppercase">Nous trouver</span>
            <h2 class="text-4xl font-light mt-4 mb-6">
              Notre <span class="text-amber-400 font-bold">cabinet</span>
            </h2>
            <div class="space-y-4 text-gray-300">
              <div class="flex items-start gap-4">
                <MapPin class="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p class="font-medium text-white">Adresse</p>
                  <p>Abidjan, Angré 8ème Tranche</p>
                  <p>Carrefour Pri, A15</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <Phone class="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p class="font-medium text-white">Téléphone</p>
                  <p>+225 01 23 45 67 89</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <Mail class="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p class="font-medium text-white">Email</p>
                  <p>contact@akasehr.ci</p>
                </div>
              </div>
            </div>
            
            <RouterLink 
              to="/contact"
              class="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Nous écrire
              <Send class="w-5 h-5" />
            </RouterLink>
          </div>

          <!-- Carte -->
          <div class="relative rounded-2xl overflow-hidden shadow-2xl h-400px bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center border border-white/10">
            <div class="text-center">
              <Building2 class="w-24 h-24 text-amber-400/50 mx-auto mb-4" />
              <p class="text-white/60 text-lg font-light">Cabinet Aka Sehr</p>
              <p class="text-amber-400 text-sm mt-2">Abidjan, Angré 8ème Tranche</p>
              <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 rounded-full border border-white/10">
                <MapPin class="w-4 h-4 text-amber-400" />
                <span class="text-white/80 text-sm">Carrefour Pri, A15</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { 
  ArrowRight, 
  MapPin, 
  Phone, 
  Mail, 
  Send, 
  Building2, 
  Award, 
  Users, 
  Lightbulb, 
  Shield, 
  Clock, 
  Target,
  PenTool,
  FileCheck,
  ClipboardCheck,
  Sofa
} from 'lucide-vue-next'

// Import des images
import aboutHero from '@/assets/images/hero-bg.jpg'
import founderImage from '@/assets/images/founder.png'

// Valeurs
const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'Nous visons l\'excellence dans chaque projet, de la conception à la réalisation.'
  },
  {
    icon: Users,
    title: 'Écoute client',
    description: 'Nous plaçons vos besoins et vos envies au cœur de notre démarche créative.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description: 'Nous innovons constamment pour vous offrir des solutions architecturales uniques.'
  },
  {
    icon: Shield,
    title: 'Fiabilité',
    description: 'Notre expertise reconnue vous garantit des projets solides et durables.'
  },
  {
    icon: Clock,
    title: 'Ponctualité',
    description: 'Nous respectons les délais et nous engageons à livrer vos projets dans les temps.'
  },
  {
    icon: Target,
    title: 'Précision',
    description: 'La rigueur et la précision sont au cœur de notre méthodologie de travail.'
  }
]

// Expertises avec icônes
const expertises = [
  {
    title: 'Conception',
    description: 'Études et conception de projets architecturaux sur mesure',
    icon: PenTool
  },
  {
    title: 'Permis de construire',
    description: 'Préparation et suivi des dossiers de permis de construire',
    icon: FileCheck
  },
  {
    title: 'Suivi de chantier',
    description: 'Suivi technique et administratif des chantiers',
    icon: ClipboardCheck
  },
  {
    title: "Architecture d'intérieur",
    description: "Design d'intérieur et aménagement d'espaces",
    icon: Sofa
  }
]
</script>

<style scoped>
.about-page {
  overflow-x: hidden;
}

img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>