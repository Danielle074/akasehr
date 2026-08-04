<template>
  <div class="projets-list-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Projets résidentiels
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez tous les projets résidentiels du cabinet
          </p>
        </div>
        <RouterLink 
          to="/admin/projets/ajouter"
          class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus class="w-4 h-4" />
          Ajouter un projet
        </RouterLink>
      </div>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-amber-500">10</p>
        <p class="text-xs text-gray-500">Total</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-amber-500">6</p>
        <p class="text-xs text-gray-500">En cours</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-green-500">3</p>
        <p class="text-xs text-gray-500">Terminés</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-blue-500">1</p>
        <p class="text-xs text-gray-500">À venir</p>
      </div>
    </div>

    <!-- Tableau des projets -->
    <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="w-full min-w-700px sm:min-w-full">
          <thead>
            <tr class="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th class="pb-3 font-medium pl-4 sm:pl-0">Projet</th>
              <th class="pb-3 font-medium hidden sm:table-cell">Localisation</th>
              <th class="pb-3 font-medium hidden md:table-cell">Type</th>
              <th class="pb-3 font-medium hidden lg:table-cell">Pièces</th>
              <th class="pb-3 font-medium">Statut</th>
              <th class="pb-3 font-medium text-right pr-4 sm:pr-0">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(project, index) in projects" :key="index" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="py-3 sm:py-4 pl-4 sm:pl-0">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <Home class="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ project.name }}</p>
                    <p class="text-xs text-gray-500 sm:hidden">{{ project.location }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 sm:py-4 hidden sm:table-cell">
                <span class="text-sm text-gray-600">{{ project.location }}</span>
              </td>
              <td class="py-3 sm:py-4 hidden md:table-cell">
                <span class="text-sm text-gray-600">{{ project.type }}</span>
              </td>
              <td class="py-3 sm:py-4 hidden lg:table-cell">
                <span class="text-sm text-gray-600">{{ project.pieces }}</span>
              </td>
              <td class="py-3 sm:py-4">
                <span class="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium" :class="project.statusClass">
                  <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1 sm:mr-1.5" :class="project.statusDot"></span>
                  {{ project.status }}
                </span>
              </td>
              <td class="py-3 sm:py-4 text-right pr-4 sm:pr-0">
                <div class="flex items-center justify-end gap-1 sm:gap-2">
                  <RouterLink 
                    :to="`/admin/projets/${project.id}/modifier`"
                    class="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600" />
                  </RouterLink>
                  <button class="p-1 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Plus, Home, Pencil, Trash2 } from 'lucide-vue-next'

const projects = [
  {
    id: 1,
    name: 'Résidence Ambassade du Gabon',
    location: 'Cocody',
    type: 'Résidence',
    pieces: '30',
    status: 'En cours',
    statusClass: 'bg-amber-50 text-amber-700',
    statusDot: 'bg-amber-500'
  },
  {
    id: 2,
    name: 'Immeuble B',
    location: 'Bonoumin',
    type: 'Immeuble',
    pieces: '3-4',
    status: 'Terminé',
    statusClass: 'bg-green-50 text-green-700',
    statusDot: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Villa Atheba',
    location: 'Abidjan',
    type: 'Villa',
    pieces: '4',
    status: 'À venir',
    statusClass: 'bg-blue-50 text-blue-700',
    statusDot: 'bg-blue-500'
  }
]
</script>

<style scoped>
.projets-list-page {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
</style>