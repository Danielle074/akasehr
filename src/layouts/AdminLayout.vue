<template>
  <div class="admin-layout flex min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="flex-1 transition-all duration-300 lg:ml-72">
      <!-- Header Admin -->
      <header class="bg-white shadow-sm sticky top-0 z-30">
        <div class="flex items-center justify-between px-4 sm:px-8 py-4">
          <h2 class="text-lg sm:text-xl font-light text-gray-700">
            Administration - <span class="text-amber-500 font-medium">Aka Sehr</span>
          </h2>
          <div class="flex items-center gap-3 sm:gap-4">
            <span class="text-xs sm:text-sm text-gray-500 hidden sm:block">{{ currentDate }}</span>
            <div class="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <span class="text-amber-500 font-semibold text-xs sm:text-sm">A</span>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Contenu -->
      <main class="p-4 sm:p-6 lg:p-8">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/admin/Sidebar.vue'

const currentDate = ref('')

onMounted(() => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})
</script>