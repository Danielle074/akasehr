<template>
  <div class="promotions-list-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Promotions immobilières
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez toutes les promotions immobilières du cabinet
          </p>
        </div>
        <RouterLink 
          to="/admin/promotions/ajouter"
          class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus class="w-4 h-4" />
          Ajouter une promotion
        </RouterLink>
      </div>
    </div>

    <!-- Statistiques rapides -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-amber-500">18</p>
        <p class="text-xs text-gray-500">Total</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-green-500">8</p>
        <p class="text-xs text-gray-500">Disponibles</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-blue-500">6</p>
        <p class="text-xs text-gray-500">En cours</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-purple-500">4</p>
        <p class="text-xs text-gray-500">Terminées</p>
      </div>
    </div>

    <!-- Tableau des promotions -->
    <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="w-full min-w-700px sm:min-w-full">
          <thead>
            <tr class="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th class="pb-3 font-medium pl-4 sm:pl-0">Promotion</th>
              <th class="pb-3 font-medium hidden sm:table-cell">Localisation</th>
              <th class="pb-3 font-medium hidden md:table-cell">Villas</th>
              <th class="pb-3 font-medium hidden lg:table-cell">Prix</th>
              <th class="pb-3 font-medium">Statut</th>
              <th class="pb-3 font-medium text-right pr-4 sm:pr-0">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(promotion, index) in promotions" :key="index" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="py-3 sm:py-4 pl-4 sm:pl-0">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <Building2 class="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ promotion.name }}</p>
                    <p class="text-xs text-gray-500 sm:hidden">{{ promotion.location }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 sm:py-4 hidden sm:table-cell">
                <span class="text-sm text-gray-600">{{ promotion.location }}</span>
              </td>
              <td class="py-3 sm:py-4 hidden md:table-cell">
                <span class="text-sm text-gray-600">{{ promotion.villas }}</span>
              </td>
              <td class="py-3 sm:py-4 hidden lg:table-cell">
                <span class="text-sm text-gray-600">{{ promotion.price }}</span>
              </td>
              <td class="py-3 sm:py-4">
                <span class="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium" :class="promotion.statusClass">
                  <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1 sm:mr-1.5" :class="promotion.statusDot"></span>
                  {{ promotion.status }}
                </span>
              </td>
              <td class="py-3 sm:py-4 text-right pr-4 sm:pr-0">
                <div class="flex items-center justify-end gap-1 sm:gap-2">
                  <RouterLink 
                    :to="`/admin/promotions/${promotion.id}/modifier`"
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
import { Plus, Building2, Pencil, Trash2 } from 'lucide-vue-next'

const promotions = [
  {
    id: 1,
    name: 'Cité des Grâces',
    location: 'Bingerville',
    villas: '33',
    price: '250 M FCFA',
    status: 'Disponible',
    statusClass: 'bg-green-50 text-green-700',
    statusDot: 'bg-green-500'
  },
  {
    id: 2,
    name: 'Résidence Les Jardins',
    location: 'Abidjan',
    villas: '25',
    price: '180 M FCFA',
    status: 'En cours',
    statusClass: 'bg-amber-50 text-amber-700',
    statusDot: 'bg-amber-500'
  },
  {
    id: 3,
    name: 'Immeuble Concorde',
    location: 'Plateau',
    villas: '18',
    price: '320 M FCFA',
    status: 'Terminé',
    statusClass: 'bg-blue-50 text-blue-700',
    statusDot: 'bg-blue-500'
  }
]
</script>

<style scoped>
.promotions-list-page {
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