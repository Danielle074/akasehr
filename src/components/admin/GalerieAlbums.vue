<template>
  <div class="albums-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Albums
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez vos albums photos
          </p>
        </div>
        <div class="flex gap-3">
          <RouterLink 
            to="/admin/galerie"
            class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-300"
          >
            <Image class="w-4 h-4" />
            Photos
          </RouterLink>
          <button 
            @click="openCreateAlbumModal"
            class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus class="w-4 h-4" />
            Nouvel album
          </button>
        </div>
      </div>
    </div>

    <!-- Grille d'albums -->
    <div v-if="albums.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="album in albums" 
        :key="album.id"
        class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
      >
        <div class="relative h-48 overflow-hidden">
          <img 
            :src="album.cover || 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=400&fit=crop'"
            :alt="album.name"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div class="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div class="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 class="text-lg font-semibold">{{ album.name }}</h3>
            <p class="text-sm text-white/70">{{ album.count }} photos</p>
          </div>
        </div>
        <div class="p-4 flex items-center justify-between">
          <span class="text-xs text-gray-500">Créé le {{ album.date }}</span>
          <div class="flex gap-2">
            <button 
              @click="editAlbum(album)"
              class="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Pencil class="w-4 h-4 text-gray-400 hover:text-gray-600" />
            </button>
            <button 
              @click="deleteAlbum(album.id)"
              class="p-1 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 class="w-4 h-4 text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Message vide -->
    <div v-else class="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
      <FolderOpen class="w-20 h-20 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-700">Aucun album</h3>
      <p class="text-gray-400 text-sm mt-1">Créez votre premier album pour organiser vos photos</p>
      <button 
        @click="openCreateAlbumModal"
        class="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
      >
        <Plus class="w-4 h-4" />
        Créer un album
      </button>
    </div>

    <!-- Modal de création d'album -->
    <div 
      v-if="showAlbumModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4"
      @click="showAlbumModal = false"
    >
      <div 
        class="bg-white rounded-2xl w-full max-w-md p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ editingAlbum ? 'Modifier l\'album' : 'Nouvel album' }}
          </h2>
          <button @click="showAlbumModal = false" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form @submit.prevent="saveAlbum">
          <div class="mb-4">
            <label for="albumName" class="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'album <span class="text-red-500">*</span>
            </label>
            <input 
              id="albumName"
              v-model="albumForm.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: Cathédrale Saint-Esprit"
            />
          </div>

          <div class="flex gap-3">
            <button 
              type="submit"
              class="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all duration-300"
            >
              {{ editingAlbum ? 'Mettre à jour' : 'Créer' }}
            </button>
            <button 
              type="button"
              @click="showAlbumModal = false"
              class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  Plus, 
  X, 
  Image, 
  FolderOpen, 
  Pencil, 
  Trash2 
} from 'lucide-vue-next'

// Albums
const albums = ref([
  { id: 1, name: 'Cathédrale Saint-Esprit', count: 12, date: '15/07/2026', cover: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800&h=400&fit=crop' },
  { id: 2, name: 'Villas de luxe', count: 8, date: '10/07/2026', cover: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop' },
  { id: 3, name: 'Chantiers', count: 5, date: '05/07/2026', cover: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=400&fit=crop' },
  { id: 4, name: 'Intérieurs', count: 10, date: '01/07/2026', cover: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=400&fit=crop' }
])

const showAlbumModal = ref(false)
const editingAlbum = ref<any>(null)
const albumForm = ref({ name: '' })

// Ouvrir le modal de création
const openCreateAlbumModal = () => {
  editingAlbum.value = null
  albumForm.value = { name: '' }
  showAlbumModal.value = true
}

// Modifier un album
const editAlbum = (album: any) => {
  editingAlbum.value = album
  albumForm.value = { name: album.name }
  showAlbumModal.value = true
}

// Sauvegarder l'album
const saveAlbum = () => {
  if (!albumForm.value.name.trim()) {
    alert('Veuillez entrer un nom pour l\'album.')
    return
  }

  if (editingAlbum.value) {
    // Modifier
    const index = albums.value.findIndex(a => a.id === editingAlbum.value.id)
    if (index !== -1) {
      albums.value[index].name = albumForm.value.name
    }
    alert('✅ Album modifié avec succès !')
  } else {
    // Créer
    albums.value.push({
      id: Date.now(),
      name: albumForm.value.name,
      count: 0,
      date: new Date().toLocaleDateString('fr-FR'),
      cover: ''
    })
    alert('✅ Album créé avec succès !')
  }

  showAlbumModal.value = false
  albumForm.value = { name: '' }
}

// Supprimer un album
const deleteAlbum = (id: number) => {
  if (confirm('Voulez-vous vraiment supprimer cet album ? Toutes les photos qu\'il contient seront également supprimées.')) {
    albums.value = albums.value.filter(a => a.id !== id)
    alert('✅ Album supprimé avec succès !')
  }
}
</script>

<style scoped>
.albums-page {
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
</style>