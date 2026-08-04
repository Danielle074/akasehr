<template>
  <div class="galerie-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Galerie
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez toutes les photos et albums du cabinet
          </p>
        </div>
        <div class="flex flex-col sm:flex-row gap-3">
          <RouterLink 
            to="/admin/galerie/albums"
            class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-300"
          >
            <FolderOpen class="w-4 h-4" />
            Albums
          </RouterLink>
          <button 
            @click="openUploadModal"
            class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Upload class="w-4 h-4" />
            Ajouter des photos
          </button>
        </div>
      </div>
    </div>

    <!-- Filtres -->
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button 
        @click="filter = 'all'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        :class="filter === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        Toutes
      </button>
      <button 
        v-for="album in albums" 
        :key="album.id"
        @click="filter = album.id"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        :class="filter === album.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        {{ album.name }}
      </button>
    </div>

    <!-- Grille de photos -->
    <div v-if="filteredPhotos.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      <div 
        v-for="(photo, index) in filteredPhotos" 
        :key="index"
        class="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
        @click="openPhotoPreview(index)"
      >
        <img 
          :src="photo.url" 
          :alt="photo.title"
          class="w-full h-40 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div class="absolute bottom-0 left-0 right-0 p-3 text-white">
            <p class="text-sm font-medium truncate">{{ photo.title }}</p>
            <p class="text-xs text-white/70">{{ photo.album }}</p>
          </div>
        </div>
        <button 
          @click.stop="deletePhoto(index)"
          class="absolute top-2 right-2 w-8 h-8 bg-red-500/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <X class="w-4 h-4" />
        </button>
        <div class="absolute top-2 left-2 px-2 py-1 bg-amber-500/80 backdrop-blur-sm rounded-lg text-white text-xs">
          {{ photo.album }}
        </div>
      </div>
    </div>

    <!-- Message vide -->
    <div v-else class="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
      <Image class="w-20 h-20 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-700">Aucune photo trouvée</h3>
      <p class="text-gray-400 text-sm mt-1">Commencez par ajouter des photos à la galerie</p>
      <button 
        @click="openUploadModal"
        class="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
      >
        <Upload class="w-4 h-4" />
        Ajouter des photos
      </button>
    </div>

    <!-- Modal d'upload -->
    <div 
      v-if="showUploadModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4"
      @click="showUploadModal = false"
    >
      <div 
        class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Ajouter des photos</h2>
          <button @click="showUploadModal = false" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form @submit.prevent="uploadPhotos">
          <!-- Sélection de l'album -->
          <div class="mb-4">
            <label for="albumSelect" class="block text-sm font-medium text-gray-700 mb-2">
              Album <span class="text-red-500">*</span>
            </label>
            <select 
              id="albumSelect"
              v-model="uploadForm.album"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
            >
              <option value="">Sélectionner un album</option>
              <option v-for="album in albums" :key="album.id" :value="album.id">
                {{ album.name }}
              </option>
            </select>
          </div>

          <!-- Titre -->
          <div class="mb-4">
            <label for="photoTitle" class="block text-sm font-medium text-gray-700 mb-2">
              Titre (optionnel)
            </label>
            <input 
              id="photoTitle"
              v-model="uploadForm.title"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: Vue aérienne de la cathédrale"
            />
          </div>

          <!-- Upload fichiers -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Fichiers <span class="text-red-500">*</span>
            </label>
            <div 
              class="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gray-100"
              @click="triggerFileInput"
              @dragover.prevent
              @drop.prevent="handleUploadDrop"
            >
              <input 
                ref="uploadFileInput"
                type="file"
                accept="image/*"
                multiple
                required
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                @change="handleUploadFiles"
              />
              <div class="flex flex-col items-center gap-2">
                <Upload class="w-12 h-12 text-gray-400" />
                <p class="text-sm text-gray-600">
                  <span class="font-medium text-amber-500">Cliquez pour uploader</span> ou glissez-déposez
                </p>
                <p class="text-xs text-gray-400">PNG, JPG, WEBP (Max 5Mo)</p>
              </div>
            </div>
          </div>

          <!-- Prévisualisation -->
          <div v-if="uploadForm.files.length > 0" class="mb-4">
            <p class="text-sm font-medium text-gray-700 mb-2">{{ uploadForm.files.length }} fichier(s) sélectionné(s)</p>
            <div class="grid grid-cols-4 gap-2">
              <div v-for="(file, index) in uploadForm.files" :key="index" class="relative">
                <img 
                  :src="file.preview" 
                  alt="Preview"
                  class="w-full h-20 object-cover rounded-lg"
                />
                <button 
                  type="button"
                  @click="removeUploadFile(index)"
                  class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div class="flex gap-3">
            <button 
              type="submit"
              class="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
              :disabled="uploading"
            >
              <Loader2 v-if="uploading" class="w-5 h-5 animate-spin" />
              <Upload v-else class="w-5 h-5" />
              {{ uploading ? 'Upload en cours...' : 'Uploader les photos' }}
            </button>
            <button 
              type="button"
              @click="showUploadModal = false"
              class="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal de prévisualisation -->
    <div 
      v-if="previewIndex !== null"
      class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-9999 p-4"
      @click="previewIndex = null"
    >
      <div class="relative max-w-5xl w-full" @click.stop>
        <button 
          @click="previewIndex = null"
          class="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X class="w-8 h-8" />
        </button>
        <img 
          :src="filteredPhotos[previewIndex].url" 
          :alt="filteredPhotos[previewIndex].title"
          class="w-full max-h-[80vh] object-contain rounded-lg"
        />
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-center">
          <p class="text-lg font-medium">{{ filteredPhotos[previewIndex].title }}</p>
          <p class="text-sm text-white/70">{{ filteredPhotos[previewIndex].album }}</p>
        </div>
        <button 
          v-if="previewIndex > 0"
          @click="previewIndex--"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronLeft class="w-12 h-12" />
        </button>
        <button 
          v-if="previewIndex < filteredPhotos.length - 1"
          @click="previewIndex++"
          class="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
        >
          <ChevronRight class="w-12 h-12" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  Upload, 
  X, 
  Image, 
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-vue-next'

// Données de test - Albums
const albums = [
  { id: 'cathedrale', name: 'Cathédrale Saint-Esprit' },
  { id: 'villas', name: 'Villas de luxe' },
  { id: 'chantiers', name: 'Chantiers' },
  { id: 'interieurs', name: 'Intérieurs' }
]

// Données de test - Photos
const photos = ref([
  {
    id: 1,
    title: 'Vue aérienne de la cathédrale',
    url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800&h=600&fit=crop',
    album: 'Cathédrale Saint-Esprit',
    albumId: 'cathedrale'
  },
  {
    id: 2,
    title: 'Intérieur de la cathédrale',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
    album: 'Cathédrale Saint-Esprit',
    albumId: 'cathedrale'
  },
  {
    id: 3,
    title: 'Villa moderne avec piscine',
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    album: 'Villas de luxe',
    albumId: 'villas'
  },
  {
    id: 4,
    title: 'Intérieur design',
    url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop',
    album: 'Intérieurs',
    albumId: 'interieurs'
  },
  {
    id: 5,
    title: 'Chantier en cours',
    url: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&h=600&fit=crop',
    album: 'Chantiers',
    albumId: 'chantiers'
  },
  {
    id: 6,
    title: 'Salon moderne',
    url: 'https://images.unsplash.com/photo-1616137466211-f939a420be84?w=800&h=600&fit=crop',
    album: 'Intérieurs',
    albumId: 'interieurs'
  }
])

const filter = ref('all')
const showUploadModal = ref(false)
const uploading = ref(false)
const previewIndex = ref<number | null>(null)

// Upload form
const uploadFileInput = ref<HTMLInputElement | null>(null)
const uploadForm = ref({
  album: '',
  title: '',
  files: [] as { file: File; preview: string }[]
})

// Photos filtrées
const filteredPhotos = computed(() => {
  if (filter.value === 'all') return photos.value
  return photos.value.filter(p => p.albumId === filter.value)
})

// Ouvrir le modal d'upload
const openUploadModal = () => {
  uploadForm.value = { album: '', title: '', files: [] }
  showUploadModal.value = true
}

// Gestion des fichiers upload
const triggerFileInput = () => {
  uploadFileInput.value?.click()
}

const handleUploadFiles = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    Array.from(target.files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          uploadForm.value.files.push({
            file,
            preview: e.target?.result as string
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }
  target.value = ''
}

const handleUploadDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files) {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          uploadForm.value.files.push({
            file,
            preview: e.target?.result as string
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

const removeUploadFile = (index: number) => {
  uploadForm.value.files.splice(index, 1)
}

// Upload des photos
const uploadPhotos = async () => {
  if (!uploadForm.value.album || uploadForm.value.files.length === 0) {
    alert('Veuillez sélectionner un album et au moins une photo.')
    return
  }

  uploading.value = true

  // Simuler l'upload
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Ajouter les photos à la galerie
  const albumName = albums.find(a => a.id === uploadForm.value.album)?.name || ''
  uploadForm.value.files.forEach((file, index) => {
    photos.value.push({
      id: Date.now() + index,
      title: uploadForm.value.title || `Photo ${index + 1}`,
      url: file.preview,
      album: albumName,
      albumId: uploadForm.value.album
    })
  })

  uploading.value = false
  showUploadModal.value = false
  alert('✅ Photos ajoutées avec succès !')
}

// Supprimer une photo
const deletePhoto = (index: number) => {
  if (confirm('Voulez-vous vraiment supprimer cette photo ?')) {
    const actualIndex = photos.value.indexOf(filteredPhotos.value[index])
    if (actualIndex !== -1) {
      photos.value.splice(actualIndex, 1)
    }
  }
}

// Ouvrir la prévisualisation
const openPhotoPreview = (index: number) => {
  previewIndex.value = index
}
</script>

<style scoped>
.galerie-page {
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

/* Animation du loader */
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
</style>