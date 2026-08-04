<template>
  <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Nos Projets</span>
        <h2 class="text-4xl md:text-5xl font-light text-gray-900 mt-4 mb-6">
          Des réalisations qui <span class="text-amber-500 font-bold">vous inspirent</span>
        </h2>
        <p class="text-gray-600 text-lg font-light">
          Découvrez notre portfolio de projets d'exception
        </p>
      </div>

      <!-- Projets en cascade -->
      <div class="projects-grid">
        <div 
          v-for="(project, index) in projects" 
          :key="index"
          class="project-item group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
          :class="[
            index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : '',
            'animate-fade-in'
          ]"
          :style="{ animationDelay: index * 0.1 + 's' }"
          @click="openProject(index)"
        >
          <img 
            :src="project.image" 
            :alt="project.title"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          <!-- Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 class="text-xl font-semibold mb-1">{{ project.title }}</h3>
              <p class="text-white/80 text-sm">{{ project.category }}</p>
              
              <!-- Bouton de zoom -->
              <div class="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-amber-400/20 backdrop-blur-sm rounded-full border border-white/20 hover:bg-amber-400/30 transition-colors">
                <Maximize2 class="w-4 h-4" />
                <span class="text-sm">Voir le projet</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bouton Voir plus -->
      <div class="text-center mt-12">
        <RouterLink 
          to="/projects"
          class="inline-flex items-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Voir tous nos projets
          <ArrowRight class="w-5 h-5" />
        </RouterLink>
      </div>
    </div>

    <!-- Modal de projet -->
    <div 
      v-if="selectedProject !== null"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      @click="selectedProject = null"
    >
      <div 
        class="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
        @click.stop
      >
        <button 
          @click="selectedProject = null"
          class="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
        >
          <X class="w-6 h-6" />
        </button>

        <img 
          :src="selectedProjectData?.image" 
          :alt="selectedProjectData?.title"
          class="w-full max-h-[60vh] object-cover"
        />
        
        <div class="p-8">
          <h3 class="text-2xl font-semibold text-gray-900 mb-2">
            {{ selectedProjectData?.title }}
          </h3>
          <p class="text-amber-500 text-sm font-medium mb-4">
            {{ selectedProjectData?.category }}
          </p>
          <p class="text-gray-600 leading-relaxed">
            {{ selectedProjectData?.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ArrowRight, Maximize2, X } from 'lucide-vue-next'

// Import des images
import project1 from '@/assets/images/project1.jpg'
import project2 from '@/assets/images/project2.jpg'
import project3 from '@/assets/images/project3.jpg'
import project4 from '@/assets/images/project4.jpg'
import project5 from '@/assets/images/project5.jpg'
import project6 from '@/assets/images/project6.jpg'

const projects = [
  {
    title: 'Villa Royale',
    category: 'Architecture résidentielle',
    description: 'Une villa contemporaine alliant élégance et confort moderne',
    image: project1
  },
  {
    title: 'Édifice Sacré Coeur',
    category: 'Édifices religieux',
    description: 'Restoration et modernisation d\'un lieu de culte historique',
    image: project2
  },
  {
    title: 'Promotion Immobilière',
    category: 'Promotions immobilières',
    description: 'Projet résidentiel de 50 logements haut de gamme',
    image: project3
  },
  {
    title: 'Résidence Les Jardins',
    category: 'Projets résidentiels',
    description: 'Un havre de paix au cœur de la ville',
    image: project4
  },
  {
    title: 'Chapelle Sainte-Marie',
    category: 'Édifices religieux',
    description: 'Architecture sacrée contemporaine',
    image: project5
  },
  {
    title: 'Immeuble Concorde',
    category: 'Promotions immobilières',
    description: 'Immeuble de standing avec espaces verts privatifs',
    image: project6
  }
]

const selectedProject = ref<number | null>(null)
const selectedProjectData = ref<any>(null)

const openProject = (index: number) => {
  selectedProject.value = index
  selectedProjectData.value = projects[index]
}
</script>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  grid-auto-rows: 200px;
}

.project-item {
  min-height: 100%;
  grid-auto-rows: 200px;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 150px;
  }
}

@media (max-width: 480px) {
  .projects-grid {
    grid-template-columns: 1fr;
    grid-auto-rows: 200px;
  }
}
</style>