<template>
  <div class="temoignages-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Témoignages
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez les témoignages des clients du cabinet
          </p>
        </div>
        <button 
          @click="openAddModal"
          class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus class="w-4 h-4" />
          Ajouter un témoignage
        </button>
      </div>
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-amber-500">{{ temoignages.length }}</p>
        <p class="text-xs text-gray-500">Total</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-green-500">{{ publishedCount }}</p>
        <p class="text-xs text-gray-500">Publiés</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-amber-500">{{ pendingCount }}</p>
        <p class="text-xs text-gray-500">En attente</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-blue-500">{{ ratingAverage }}</p>
        <p class="text-xs text-gray-500">Note moyenne</p>
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
        @click="filter = 'published'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        :class="filter === 'published' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        Publiés
      </button>
      <button 
        @click="filter = 'pending'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        :class="filter === 'pending' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        En attente
      </button>
      <div class="flex-1"></div>
      <input 
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher..."
        class="text-sm border border-gray-200 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none w-full sm:w-48"
      />
    </div>

    <!-- Liste des témoignages -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div v-if="filteredTemoignages.length > 0" class="divide-y divide-gray-100">
        <div 
          v-for="(temoignage) in filteredTemoignages" 
          :key="temoignage.id"
          class="p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div class="flex items-start gap-4 flex-1 min-w-0">
              <!-- Avatar -->
              <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" :style="{ backgroundColor: temoignage.color }">
                <span class="text-white font-semibold text-sm">{{ temoignage.initials }}</span>
              </div>
              
              <!-- Contenu -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-base font-semibold text-gray-900">{{ temoignage.name }}</p>
                  <span class="text-xs text-gray-400">{{ temoignage.date }}</span>
                </div>
                
                <!-- Étoiles -->
                <div class="flex items-center gap-1 my-1">
                  <Star v-for="i in 5" :key="i" 
                    class="w-4 h-4" 
                    :class="i <= temoignage.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'"
                  />
                  <span class="text-xs text-gray-500 ml-1">({{ temoignage.rating }}/5)</span>
                </div>
                
                <p class="text-sm text-gray-600 line-clamp-2">{{ temoignage.text }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ temoignage.role }}</p>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center gap-2 shrink-0 self-end sm:self-start">
              <button 
                @click="toggleStatus(temoignage)"
                class="px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300"
                :class="temoignage.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200'"
              >
                {{ temoignage.status === 'published' ? 'Publié' : 'En attente' }}
              </button>
              <button 
                @click="openEditModal(temoignage)"
                class="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Pencil class="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
              <button 
                @click="deleteTemoignage(temoignage.id)"
                class="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 class="w-4 h-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Message vide -->
      <div v-else class="p-12 text-center">
        <Star class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-700">Aucun témoignage</h3>
        <p class="text-gray-400 text-sm mt-1">
          {{ searchQuery ? 'Aucun résultat pour votre recherche' : 'Ajoutez votre premier témoignage' }}
        </p>
      </div>
    </div>

    <!-- Modal Ajouter/Modifier -->
    <div 
      v-if="showModal"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4"
      @click="showModal = false"
    >
      <div 
        class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ editingTemoignage ? 'Modifier le témoignage' : 'Ajouter un témoignage' }}
          </h2>
          <button @click="showModal = false" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form @submit.prevent="saveTemoignage" class="space-y-4">
          <!-- Nom -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Nom complet <span class="text-red-500">*</span>
            </label>
            <input 
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: Jean Dupont"
            />
          </div>

          <!-- Rôle -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
              Rôle / Profession <span class="text-red-500">*</span>
            </label>
            <input 
              id="role"
              v-model="form.role"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: Promoteur immobilier"
            />
          </div>

          <!-- Témoignage -->
          <div>
            <label for="text" class="block text-sm font-medium text-gray-700 mb-2">
              Témoignage <span class="text-red-500">*</span>
            </label>
            <textarea 
              id="text"
              v-model="form.text"
              rows="4"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
              placeholder="Rédigez le témoignage du client..."
            ></textarea>
          </div>

          <!-- Note -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Note <span class="text-red-500">*</span>
            </label>
            <div class="flex items-center gap-2">
              <button 
                v-for="i in 5" 
                :key="i"
                type="button"
                @click="form.rating = i"
                class="p-1 hover:scale-110 transition-transform"
              >
                <Star 
                  class="w-8 h-8" 
                  :class="i <= form.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'"
                />
              </button>
              <span class="text-sm text-gray-500 ml-2">{{ form.rating }}/5</span>
            </div>
          </div>

          <!-- Statut -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select 
              id="status"
              v-model="form.status"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none appearance-none"
            >
              <option value="published">Publié</option>
              <option value="pending">En attente</option>
            </select>
          </div>

          <!-- Image (optionnel) -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Photo du client (optionnel)
            </label>
            <div 
              class="relative border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-amber-400 transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gray-100"
              @click="triggerAvatarInput"
            >
              <input 
                ref="avatarInput"
                type="file"
                accept="image/*"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                @change="handleAvatarUpload"
              />
              <div class="flex flex-col items-center gap-1">
                <Upload class="w-8 h-8 text-gray-400" />
                <p class="text-sm text-gray-600">
                  <span class="font-medium text-amber-500">Cliquez</span> pour ajouter une photo
                </p>
                <p class="text-xs text-gray-400">PNG, JPG (Max 2Mo)</p>
              </div>
            </div>
            <!-- Aperçu -->
            <div v-if="form.avatarPreview" class="mt-3 flex items-center gap-3">
              <img 
                :src="form.avatarPreview" 
                alt="Avatar"
                class="w-12 h-12 rounded-full object-cover"
              />
              <button 
                type="button"
                @click="removeAvatar"
                class="text-sm text-red-500 hover:text-red-600 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button 
              type="submit"
              class="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Save class="w-5 h-5" />
              {{ editingTemoignage ? 'Mettre à jour' : 'Ajouter' }}
            </button>
            <button 
              type="button"
              @click="showModal = false"
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
import { ref, computed } from 'vue'
import { 
  Plus, 
  Star, 
  Pencil, 
  Trash2, 
  X, 
  Save,
  Upload
} from 'lucide-vue-next'

// Types
interface Temoignage {
  id: number
  name: string
  initials: string
  role: string
  text: string
  rating: number
  date: string
  status: 'published' | 'pending'
  color: string
  avatar?: string
}

// Couleurs pour les avatars
const colors = [
  '#f59e0b', '#3b82f6', '#22c55e', '#a855f7', '#ec4899',
  '#14b8a6', '#f97316', '#8b5cf6', '#06b6d4', '#ef4444'
]

// Données de test
const temoignages = ref<Temoignage[]>([
  {
    id: 1,
    name: 'Marie Dupont',
    initials: 'MD',
    role: 'Promoteur immobilier',
    text: 'Un travail exceptionnel ! Le cabinet Aka Sehr a su donner vie à notre projet avec une élégance remarquable. Je recommande vivement leurs services.',
    rating: 5,
    date: '15/07/2026',
    status: 'published',
    color: colors[0]
  },
  {
    id: 2,
    name: 'Jean-Pierre Martin',
    initials: 'JM',
    role: 'Architecte indépendant',
    text: 'Une collaboration enrichissante. Leur approche allie créativité et rigueur technique. Un plaisir de travailler avec des professionnels aussi compétents.',
    rating: 4,
    date: '10/07/2026',
    status: 'published',
    color: colors[1]
  },
  {
    id: 3,
    name: 'Sophie Lambert',
    initials: 'SL',
    role: 'Propriétaire',
    text: 'Notre maison a été transformée en un véritable chef-d\'œuvre. Un grand merci à toute l\'équipe pour leur écoute et leur professionnalisme.',
    rating: 5,
    date: '05/07/2026',
    status: 'published',
    color: colors[2]
  },
  {
    id: 4,
    name: 'Kouadio N\'Guessan',
    initials: 'KN',
    role: 'Chef d\'entreprise',
    text: 'Un cabinet d\'architecture de confiance. Ils ont su comprendre nos besoins et les traduire en un projet magnifique.',
    rating: 4,
    date: '01/07/2026',
    status: 'pending',
    color: colors[3]
  },
  {
    id: 5,
    name: 'Isabelle Yao',
    initials: 'IY',
    role: 'Gestionnaire de patrimoine',
    text: 'Des professionnels à l\'écoute, créatifs et rigoureux. Le résultat final dépasse nos attentes. Nous sommes ravis de notre collaboration.',
    rating: 5,
    date: '28/06/2026',
    status: 'pending',
    color: colors[4]
  }
])

const filter = ref('all')
const searchQuery = ref('')
const showModal = ref(false)
const editingTemoignage = ref<Temoignage | null>(null)

// Référence pour l'input avatar
const avatarInput = ref<HTMLInputElement | null>(null)

// Formulaire
const form = ref({
  name: '',
  role: '',
  text: '',
  rating: 5,
  status: 'published' as 'published' | 'pending',
  avatarPreview: '',
  avatarFile: null as File | null
})

// Statistiques
const publishedCount = computed(() => temoignages.value.filter(t => t.status === 'published').length)
const pendingCount = computed(() => temoignages.value.filter(t => t.status === 'pending').length)
const ratingAverage = computed(() => {
  if (temoignages.value.length === 0) return '0/5'
  const sum = temoignages.value.reduce((acc, t) => acc + t.rating, 0)
  return (sum / temoignages.value.length).toFixed(1) + '/5'
})

// Témoignages filtrés
const filteredTemoignages = computed(() => {
  let filtered = temoignages.value

  if (filter.value === 'published') {
    filtered = filtered.filter(t => t.status === 'published')
  } else if (filter.value === 'pending') {
    filtered = filtered.filter(t => t.status === 'pending')
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(t => 
      t.name.toLowerCase().includes(query) ||
      t.text.toLowerCase().includes(query) ||
      t.role.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Ouvrir le modal d'ajout
const openAddModal = () => {
  editingTemoignage.value = null
  form.value = {
    name: '',
    role: '',
    text: '',
    rating: 5,
    status: 'published',
    avatarPreview: '',
    avatarFile: null
  }
  showModal.value = true
}

// Ouvrir le modal de modification
const openEditModal = (temoignage: Temoignage) => {
  editingTemoignage.value = temoignage
  form.value = {
    name: temoignage.name,
    role: temoignage.role,
    text: temoignage.text,
    rating: temoignage.rating,
    status: temoignage.status,
    avatarPreview: temoignage.avatar || '',
    avatarFile: null
  }
  showModal.value = true
}

// Gestion de l'avatar
const triggerAvatarInput = () => {
  avatarInput.value?.click()
}

const handleAvatarUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        form.value.avatarPreview = e.target?.result as string
        form.value.avatarFile = file
      }
      reader.readAsDataURL(file)
    }
  }
  target.value = ''
}

const removeAvatar = () => {
  form.value.avatarPreview = ''
  form.value.avatarFile = null
}

// Sauvegarder le témoignage
const saveTemoignage = () => {
  if (!form.value.name || !form.value.role || !form.value.text) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }

  if (editingTemoignage.value) {
    // Modifier
    const index = temoignages.value.findIndex(t => t.id === editingTemoignage.value!.id)
    if (index !== -1) {
      temoignages.value[index] = {
        ...temoignages.value[index],
        name: form.value.name,
        role: form.value.role,
        text: form.value.text,
        rating: form.value.rating,
        status: form.value.status
      }
    }
    alert('✅ Témoignage modifié avec succès !')
  } else {
    // Ajouter
    const colorIndex = temoignages.value.length % colors.length
    temoignages.value.push({
      id: Date.now(),
      name: form.value.name,
      initials: form.value.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      role: form.value.role,
      text: form.value.text,
      rating: form.value.rating,
      date: new Date().toLocaleDateString('fr-FR'),
      status: form.value.status,
      color: colors[colorIndex],
      avatar: form.value.avatarPreview || undefined
    })
    alert('✅ Témoignage ajouté avec succès !')
  }

  showModal.value = false
}

// Changer le statut
const toggleStatus = (temoignage: Temoignage) => {
  temoignage.status = temoignage.status === 'published' ? 'pending' : 'published'
  alert(`✅ Témoignage ${temoignage.status === 'published' ? 'publié' : 'mis en attente'} avec succès !`)
}

// Supprimer un témoignage
const deleteTemoignage = (id: number) => {
  if (confirm('Voulez-vous vraiment supprimer ce témoignage ?')) {
    temoignages.value = temoignages.value.filter(t => t.id !== id)
    alert('✅ Témoignage supprimé avec succès !')
  }
}
</script>

<style scoped>
.temoignages-page {
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

.line-clamp-2 {
  display: -webkit-box;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>