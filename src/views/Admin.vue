<template>
  <div class="admin-page p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl font-light text-gray-900 mb-8">
        Dashboard <span class="text-amber-500 font-bold">Administration</span>
      </h1>
      
      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900">Projets</h3>
          <p class="text-3xl font-bold text-amber-500 mt-2">12</p>
          <p class="text-sm text-gray-500">Projets en cours</p>
        </div>
        
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900">Messages</h3>
          <p class="text-3xl font-bold text-amber-500 mt-2">5</p>
          <p class="text-sm text-gray-500">Non lus</p>
        </div>
        
        <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h3 class="text-lg font-semibold text-gray-900">Clients</h3>
          <p class="text-3xl font-bold text-amber-500 mt-2">28</p>
          <p class="text-sm text-gray-500">Clients actifs</p>
        </div>
      </div>

      <button 
        @click="logout"
        class="mt-8 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-all duration-300"
      >
        Se déconnecter
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('rememberMe')
  router.push('/login')
}
</script>