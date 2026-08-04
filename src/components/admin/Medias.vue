<template>
  <div class="medias-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Bibliothèque de médias
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez tous vos fichiers : images, PDF, vidéos et plans
          </p>
        </div>
        <button 
          @click="openUploadModal"
          class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Upload class="w-4 h-4" />
          Ajouter des fichiers
        </button>
      </div>
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <Image class="w-6 h-6 text-amber-500 mx-auto mb-1" />
        <p class="text-2xl font-bold text-gray-900">{{ imageCount }}</p>
        <p class="text-xs text-gray-500">Images</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <FileText class="w-6 h-6 text-blue-500 mx-auto mb-1" />
        <p class="text-2xl font-bold text-gray-900">{{ pdfCount }}</p>
        <p class="text-xs text-gray-500">PDF</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <Video class="w-6 h-6 text-purple-500 mx-auto mb-1" />
        <p class="text-2xl font-bold text-gray-900">{{ videoCount }}</p>
        <p class="text-xs text-gray-500">Vidéos</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <Layers class="w-6 h-6 text-green-500 mx-auto mb-1" />
        <p class="text-2xl font-bold text-gray-900">{{ planCount }}</p>
        <p class="text-xs text-gray-500">Plans</p>
      </div>
    </div>

    <!-- Filtres -->
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button 
        @click="filter = 'all'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        :class="filter === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        Tous
      </button>
      <button 
        @click="filter = 'image'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5"
        :class="filter === 'image' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        <Image class="w-4 h-4" /> Images
      </button>
      <button 
        @click="filter = 'pdf'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5"
        :class="filter === 'pdf' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        <FileText class="w-4 h-4" /> PDF
      </button>
      <button 
        @click="filter = 'video'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5"
        :class="filter === 'video' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        <Video class="w-4 h-4" /> Vidéos
      </button>
      <button 
        @click="filter = 'plan'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1.5"
        :class="filter === 'plan' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        <Layers class="w-4 h-4" /> Plans
      </button>
      <div class="flex-1"></div>
      <input 
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher..."
        class="text-sm border border-gray-200 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none w-full sm:w-48"
      />
    </div>

    <!-- Grille de médias -->
    <div v-if="filteredMedias.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <div 
        v-for="(media, index) in filteredMedias" 
        :key="media.id"
        class="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        @click="openMediaPreview(index)"
      >
        <!-- Aperçu -->
        <div class="relative h-40 overflow-hidden bg-gray-100">
          <!-- Image -->
          <img 
            v-if="media.type === 'image'"
            :src="media.url" 
            :alt="media.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <!-- PDF -->
          <div v-else-if="media.type === 'pdf'" class="flex items-center justify-center h-full">
            <FileText class="w-16 h-16 text-red-400" />
          </div>
          <!-- Vidéo -->
          <div v-else-if="media.type === 'video'" class="flex items-center justify-center h-full">
            <Video class="w-16 h-16 text-purple-400" />
          </div>
          <!-- Plan -->
          <div v-else class="flex items-center justify-center h-full">
            <Layers class="w-16 h-16 text-green-400" />
          </div>
          
          <!-- Badge de type -->
          <div class="absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-medium" :class="getTypeBadgeClass(media.type)">
            {{ getTypeLabel(media.type) }}
          </div>
          
          <!-- Actions au survol -->
          <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <button 
              @click.stop="openMediaPreview(index)"
              class="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
            >
              <Eye class="w-5 h-5" />
            </button>
            <button 
              @click.stop="downloadMedia(media)"
              class="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors"
            >
              <Download class="w-5 h-5" />
            </button>
            <button 
              @click.stop="deleteMedia(media.id)"
              class="p-2 bg-red-500/50 hover:bg-red-500 rounded-lg text-white transition-colors"
            >
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <!-- Infos -->
        <div class="p-3">
          <p class="text-sm font-medium text-gray-900 truncate">{{ media.name }}</p>
          <div class="flex items-center justify-between mt-1">
            <p class="text-xs text-gray-500">{{ formatFileSize(media.size) }}</p>
            <p class="text-xs text-gray-400">{{ media.date }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Message vide -->
    <div v-else class="bg-white rounded-2xl p-12 text-center shadow-lg border border-gray-100">
      <FolderArchive class="w-20 h-20 text-gray-300 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-700">Aucun fichier trouvé</h3>
      <p class="text-gray-400 text-sm mt-1">
        {{ searchQuery ? 'Aucun résultat pour votre recherche' : 'Commencez par ajouter des fichiers à la bibliothèque' }}
      </p>
      <button 
        @click="openUploadModal"
        class="mt-4 inline-flex items-center gap-2 px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
      >
        <Upload class="w-4 h-4" />
        Ajouter des fichiers
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
          <h2 class="text-xl font-semibold text-gray-900">Ajouter des fichiers</h2>
          <button @click="showUploadModal = false" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form @submit.prevent="uploadFiles" class="space-y-4">
          <!-- Type de fichier -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Type de fichier <span class="text-red-500">*</span>
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <button 
                v-for="type in fileTypes" 
                :key="type.value"
                type="button"
                @click="uploadForm.type = type.value"
                class="p-3 rounded-xl border-2 transition-all duration-300 text-center"
                :class="uploadForm.type === type.value ? 'border-amber-500 bg-amber-50' : 'border-gray-200 hover:border-amber-300'"
              >
                <component :is="type.icon" class="w-6 h-6 mx-auto mb-1" :class="uploadForm.type === type.value ? 'text-amber-500' : 'text-gray-400'" />
                <span class="text-xs font-medium" :class="uploadForm.type === type.value ? 'text-amber-500' : 'text-gray-600'">
                  {{ type.label }}
                </span>
              </button>
            </div>
          </div>

          <!-- Upload fichiers -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Fichiers <span class="text-red-500">*</span>
            </label>
            <div 
              class="relative border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-amber-400 transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gray-100"
              @click="triggerUploadInput"
              @dragover.prevent
              @drop.prevent="handleUploadDrop"
            >
              <input 
                ref="uploadInput"
                type="file"
                multiple
                :accept="getAcceptTypes()"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                @change="handleUploadFiles"
              />
              <div class="flex flex-col items-center gap-2">
                <Upload class="w-12 h-12 text-gray-400" />
                <p class="text-sm text-gray-600">
                  <span class="font-medium text-amber-500">Cliquez pour uploader</span> ou glissez-déposez
                </p>
                <p class="text-xs text-gray-400">{{ getAcceptTypesLabel() }}</p>
              </div>
            </div>
          </div>

          <!-- Prévisualisation -->
          <div v-if="uploadForm.files.length > 0" class="space-y-2">
            <p class="text-sm font-medium text-gray-700">{{ uploadForm.files.length }} fichier(s) sélectionné(s)</p>
            <div class="max-h-40 overflow-y-auto space-y-1">
              <div v-for="(file, index) in uploadForm.files" :key="index" class="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                <div class="flex items-center gap-2">
                  <FileText v-if="file.type === 'pdf'" class="w-4 h-4 text-red-400" />
                  <FileImage v-else-if="file.type === 'image'" class="w-4 h-4 text-amber-400" />
                  <FileVideo v-else-if="file.type === 'video'" class="w-4 h-4 text-purple-400" />
                  <FileArchive v-else class="w-4 h-4 text-green-400" />
                  <span class="text-sm text-gray-700 truncate max-w-200px">{{ file.name }}</span>
                  <span class="text-xs text-gray-400">{{ formatFileSize(file.size) }}</span>
                </div>
                <button 
                  type="button"
                  @click="removeUploadFile(index)"
                  class="p-1 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X class="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button 
              type="submit"
              class="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
              :disabled="uploading"
            >
              <Loader2 v-if="uploading" class="w-5 h-5 animate-spin" />
              <Upload v-else class="w-5 h-5" />
              {{ uploading ? 'Upload en cours...' : 'Uploader les fichiers' }}
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
        
        <!-- Contenu selon le type -->
        <div v-if="previewMedia" class="flex flex-col items-center">
          <!-- Image -->
          <img 
            v-if="previewMedia.type === 'image'"
            :src="previewMedia.url" 
            :alt="previewMedia.name"
            class="w-full max-h-[80vh] object-contain rounded-lg"
          />
          <!-- PDF -->
          <div v-else-if="previewMedia.type === 'pdf'" class="bg-white rounded-lg p-12 text-center max-w-lg w-full">
            <FileText class="w-24 h-24 text-red-400 mx-auto mb-4" />
            <p class="text-lg font-medium text-gray-900">{{ previewMedia.name }}</p>
            <p class="text-sm text-gray-500">{{ formatFileSize(previewMedia.size) }}</p>
            <a 
              :href="previewMedia.url" 
              target="_blank"
              class="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-300"
            >
              <Download class="w-5 h-5" />
              Télécharger le PDF
            </a>
          </div>
          <!-- Vidéo -->
          <div v-else-if="previewMedia.type === 'video'" class="w-full max-w-4xl">
            <video 
              controls 
              class="w-full rounded-lg"
              :src="previewMedia.url"
            >
              Votre navigateur ne supporte pas la lecture de vidéo.
            </video>
          </div>
          <!-- Plan -->
          <div v-else class="bg-white rounded-lg p-12 text-center max-w-lg w-full">
            <Layers class="w-24 h-24 text-green-400 mx-auto mb-4" />
            <p class="text-lg font-medium text-gray-900">{{ previewMedia.name }}</p>
            <p class="text-sm text-gray-500">{{ formatFileSize(previewMedia.size) }}</p>
            <a 
              :href="previewMedia.url" 
              target="_blank"
              class="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-300"
            >
              <Download class="w-5 h-5" />
              Télécharger le plan
            </a>
          </div>
          
          <!-- Navigation -->
          <div class="flex items-center justify-between w-full mt-4 text-white">
            <button 
              v-if="previewIndex > 0"
              @click="previewIndex--"
              class="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft class="w-8 h-8" />
            </button>
            <span class="text-sm">{{ previewIndex + 1 }} / {{ filteredMedias.length }}</span>
            <button 
              v-if="previewIndex < filteredMedias.length - 1"
              @click="previewIndex++"
              class="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight class="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Upload, 
  X, 
  Image, 
  FileText, 
  Video, 
  Layers,
  FolderArchive,
  FileImage,
  FileVideo,
  FileArchive,
  Eye,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-vue-next'

// Types
interface Media {
  id: number
  name: string
  type: 'image' | 'pdf' | 'video' | 'plan'
  url: string
  size: number
  date: string
}

// Données de test
const medias = ref<Media[]>([
  {
    id: 1,
    name: 'Cathédrale Saint-Esprit - Vue aérienne',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=800&h=600&fit=crop',
    size: 2450000,
    date: '15/07/2026'
  },
  {
    id: 2,
    name: 'Plan de masse - Cité des Grâces',
    type: 'plan',
    url: '#',
    size: 1200000,
    date: '10/07/2026'
  },
  {
    id: 3,
    name: 'Présentation projet Ambassade Gabon',
    type: 'pdf',
    url: '#',
    size: 4500000,
    date: '05/07/2026'
  },
  {
    id: 4,
    name: 'Video 3D - Projet Cathédrale',
    type: 'video',
    url: '#',
    size: 15000000,
    date: '01/07/2026'
  },
  {
    id: 5,
    name: 'Villa moderne - Extérieur',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    size: 3200000,
    date: '28/06/2026'
  },
  {
    id: 6,
    name: 'Plan d\'étage - Immeuble B',
    type: 'plan',
    url: '#',
    size: 980000,
    date: '25/06/2026'
  },
  {
    id: 7,
    name: 'Intérieur design',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=600&fit=crop',
    size: 2800000,
    date: '20/06/2026'
  }
])

const filter = ref('all')
const searchQuery = ref('')
const showUploadModal = ref(false)
const uploading = ref(false)
const previewIndex = ref<number | null>(null)

// Upload form
const uploadInput = ref<HTMLInputElement | null>(null)
const uploadForm = ref({
  type: 'image' as 'image' | 'pdf' | 'video' | 'plan',
  files: [] as { file: File; name: string; size: number; type: string }[]
})

// Types de fichiers
const fileTypes = [
  { value: 'image' as const, label: 'Images', icon: Image },
  { value: 'pdf' as const, label: 'PDF', icon: FileText },
  { value: 'video' as const, label: 'Vidéos', icon: Video },
  { value: 'plan' as const, label: 'Plans', icon: Layers }
]

// Statistiques
const imageCount = computed(() => medias.value.filter(m => m.type === 'image').length)
const pdfCount = computed(() => medias.value.filter(m => m.type === 'pdf').length)
const videoCount = computed(() => medias.value.filter(m => m.type === 'video').length)
const planCount = computed(() => medias.value.filter(m => m.type === 'plan').length)

// Médias filtrés
const filteredMedias = computed(() => {
  let filtered = medias.value

  if (filter.value !== 'all') {
    filtered = filtered.filter(m => m.type === filter.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Média prévisualisé
const previewMedia = computed(() => {
  if (previewIndex.value !== null && filteredMedias.value[previewIndex.value]) {
    return filteredMedias.value[previewIndex.value]
  }
  return null
})

// Ouvrir le modal d'upload
const openUploadModal = () => {
  uploadForm.value = { type: 'image', files: [] }
  showUploadModal.value = true
}

// Gestion des types acceptés
const getAcceptTypes = () => {
  switch (uploadForm.value.type) {
    case 'image': return 'image/*'
    case 'pdf': return '.pdf'
    case 'video': return 'video/*'
    case 'plan': return '.pdf,.dwg,.dxf'
    default: return '*/*'
  }
}

const getAcceptTypesLabel = () => {
  switch (uploadForm.value.type) {
    case 'image': return 'PNG, JPG, WEBP (Max 5Mo)'
    case 'pdf': return 'PDF uniquement (Max 10Mo)'
    case 'video': return 'MP4, WEBM (Max 50Mo)'
    case 'plan': return 'PDF, DWG, DXF (Max 10Mo)'
    default: return 'Tous les types de fichiers'
  }
}

// Gestion des fichiers
const triggerUploadInput = () => {
  uploadInput.value?.click()
}

const handleUploadFiles = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    Array.from(target.files).forEach(file => {
      uploadForm.value.files.push({
        file,
        name: file.name,
        size: file.size,
        type: file.type
      })
    })
  }
  target.value = ''
}

const handleUploadDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files) {
    Array.from(files).forEach(file => {
      uploadForm.value.files.push({
        file,
        name: file.name,
        size: file.size,
        type: file.type
      })
    })
  }
}

const removeUploadFile = (index: number) => {
  uploadForm.value.files.splice(index, 1)
}

// Upload des fichiers
const uploadFiles = async () => {
  if (uploadForm.value.files.length === 0) {
    alert('Veuillez sélectionner au moins un fichier.')
    return
  }

  uploading.value = true

  await new Promise(resolve => setTimeout(resolve, 1500))

  uploadForm.value.files.forEach((file, index) => {
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    let type: 'image' | 'pdf' | 'video' | 'plan' = uploadForm.value.type
    
    // Déterminer le type automatiquement si besoin
    if (type === 'image' && !file.type.startsWith('image/')) {
      if (['pdf'].includes(ext)) type = 'pdf'
      else if (['mp4', 'webm', 'mov'].includes(ext)) type = 'video'
    }

    medias.value.push({
      id: Date.now() + index,
      name: file.name,
      type: type,
      url: URL.createObjectURL(file.file),
      size: file.size,
      date: new Date().toLocaleDateString('fr-FR')
    })
  })

  uploading.value = false
  showUploadModal.value = false
  alert('✅ Fichiers ajoutés avec succès !')
}

// Ouvrir la prévisualisation
const openMediaPreview = (index: number) => {
  previewIndex.value = index
}

// Télécharger un média
const downloadMedia = (media: Media) => {
  // Simuler un téléchargement
  alert(`📥 Téléchargement de "${media.name}" en cours...`)
}

// Supprimer un média
const deleteMedia = (id: number) => {
  if (confirm('Voulez-vous vraiment supprimer ce fichier ?')) {
    medias.value = medias.value.filter(m => m.id !== id)
    alert('✅ Fichier supprimé avec succès !')
  }
}

// Formater la taille
const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// Badge de type
const getTypeBadgeClass = (type: string) => {
  const classes: Record<string, string> = {
    image: 'bg-amber-100 text-amber-700',
    pdf: 'bg-red-100 text-red-700',
    video: 'bg-purple-100 text-purple-700',
    plan: 'bg-green-100 text-green-700'
  }
  return classes[type] || 'bg-gray-100 text-gray-700'
}

const getTypeLabel = (type: string) => {
  const labels: Record<string, string> = {
    image: 'Image',
    pdf: 'PDF',
    video: 'Vidéo',
    plan: 'Plan'
  }
  return labels[type] || type
}
</script>

<style scoped>
.medias-page {
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