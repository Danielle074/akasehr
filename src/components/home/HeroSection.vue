<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- ===== VIDÉO 3D EN ARRIÈRE-PLAN ===== -->
    <div class="absolute inset-0 overflow-hidden">
      <video
        ref="videoRef"
        class="hero-video absolute inset-0 w-full h-full object-cover"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        :poster="posterImage"
      >
        <source :src="videoUrl" type="video/mp4" />
        Votre navigateur ne supporte pas la lecture de vidéo.
      </video>
      
      <!-- Overlay pour améliorer la lisibilité -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
    </div>

    <!-- ===== EFFET DE PARTICULES ===== -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        v-for="i in 20" 
        :key="i"
        class="particle absolute rounded-full bg-white/20"
        :style="{
          width: Math.random() * 4 + 2 + 'px',
          height: Math.random() * 4 + 2 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDelay: Math.random() * 5 + 's',
          animationDuration: (Math.random() * 10 + 10) + 's'
        }"
      />
    </div>

    <!-- ===== CONTENU - TOUS LES TITRES SONT CONSERVÉS ===== -->
    <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <!-- Badge -->
        <div class="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
          <span class="text-white/80 text-sm tracking-wider uppercase font-light">
            Architecture & Design
          </span>
        </div>

        <!-- Titre principal -->
        <h1 class="hero-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight">
          <span class="block">Cabinet</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 font-bold">
            Aka Sehr
          </span>
        </h1>

        <!-- Sous-titre -->
        <p class="text-xl md:text-2xl text-white/80 font-light mb-8 max-w-2xl mx-auto">
          L'art de transformer l'espace en élégance intemporelle
        </p>

        <!-- Boutons d'action -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink 
            to="/projects"
            class="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105"
          >
            <span>Découvrir nos projets</span>
            <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </RouterLink>
          
          <RouterLink 
            to="/contact"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white rounded-full font-medium transition-all duration-300 hover:scale-105"
          >
            <Phone class="w-5 h-5" />
            <span>Nous contacter</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Indicateur de chargement -->
    <div 
      v-if="isLoading"
      class="absolute inset-0 flex items-center justify-center z-5 bg-black/50"
    >
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-amber-400/30 border-t-amber-400 rounded-full animate-spin"></div>
        <span class="text-white/60 text-sm tracking-wider">Chargement...</span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Phone } from 'lucide-vue-next'

// ✅ IMPORT DE LA VIDÉO
import videoUrl from '@/assets/video/videoheader.mp4'
// ✅ IMPORT DE L'IMAGE DE SECOURS
import posterImage from '@/assets/images/hero-bg.jpg'

const videoRef = ref<HTMLVideoElement | null>(null)
const isLoading = ref(true)

// Gestion du chargement
const handleVideoLoaded = () => {
  isLoading.value = false
}

const handleVideoError = () => {
  isLoading.value = false
  console.warn('Erreur de chargement de la vidéo')
}

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.addEventListener('loadeddata', handleVideoLoaded)
    videoRef.value.addEventListener('error', handleVideoError)
    videoRef.value.play().catch(() => {})
  }
})
</script>

<style scoped>
/* ===== VIDÉO ===== */
.hero-video {
  object-fit: cover;
  will-change: transform;
  transform: scale(1.02);
  transition: transform 8s ease-out;
}

.hero-video:hover {
  transform: scale(1.05);
}

/* ===== TITRE ===== */
.hero-title {
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

/* ===== PARTICULES ===== */
.particle {
  animation: float-particle linear infinite;
}

@keyframes float-particle {
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 1;
  }
  25% {
    transform: translateY(-30px) translateX(10px) scale(0.8);
  }
  50% {
    transform: translateY(-60px) translateX(-10px) scale(0.6);
    opacity: 0.5;
  }
  75% {
    transform: translateY(-30px) translateX(15px) scale(0.8);
  }
  100% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 1;
  }
}

/* ===== LOADER ===== */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
  .particle {
    display: none;
  }
}
</style>