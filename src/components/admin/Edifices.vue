<template>
  <div class="edifices-list-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Édifices religieux
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez tous les édifices religieux du cabinet
          </p>
        </div>
        <RouterLink 
          to="/admin/edifices/ajouter"
          class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus class="w-4 h-4" />
          Ajouter un édifice
        </RouterLink>
      </div>
    </div>

    <!-- Tableau des édifices -->
    <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th class="pb-3 font-medium">Nom</th>
              <th class="pb-3 font-medium hidden sm:table-cell">Localisation</th>
              <th class="pb-3 font-medium hidden md:table-cell">Année</th>
              <th class="pb-3 font-medium">Statut</th>
              <th class="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(edifice, index) in edifices" :key="index" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="py-4">
                <p class="text-sm font-medium text-gray-900">{{ edifice.name }}</p>
              </td>
              <td class="py-4 hidden sm:table-cell">
                <span class="text-sm text-gray-600">{{ edifice.location }}</span>
              </td>
              <td class="py-4 hidden md:table-cell">
                <span class="text-sm text-gray-600">{{ edifice.year }}</span>
              </td>
              <td class="py-4">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" :class="edifice.statusClass">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="edifice.statusDot"></span>
                  {{ edifice.status }}
                </span>
              </td>
              <td class="py-4 text-right">
                <div class="flex items-center justify-end gap-2">
                  <RouterLink 
                    :to="`/admin/edifices/${edifice.id}/modifier`"
                    class="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Pencil class="w-4 h-4 text-gray-400 hover:text-gray-600" />
                  </RouterLink>
                  <button class="p-1 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 class="w-4 h-4 text-gray-400 hover:text-red-500" />
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
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'

const edifices = [
  {
    id: 1,
    name: 'Cathédrale Saint-Esprit',
    location: 'Grand-Bassam',
    year: '1996',
    status: 'En cours',
    statusClass: 'bg-amber-50 text-amber-700',
    statusDot: 'bg-amber-500'
  },
  {
    id: 2,
    name: 'Paroisse Sainte Bernadette',
    location: 'Marcory',
    year: '2025',
    status: 'À venir',
    statusClass: 'bg-blue-50 text-blue-700',
    statusDot: 'bg-blue-500'
  }
]
</script>