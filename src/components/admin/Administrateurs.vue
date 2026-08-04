<template>
  <div class="administrateurs-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Administrateurs
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez les administrateurs du cabinet et leurs permissions
          </p>
        </div>
        <button 
          @click="openAddModal"
          class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Plus class="w-4 h-4" />
          Ajouter un administrateur
        </button>
      </div>
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-amber-500">{{ administrateurs.length }}</p>
        <p class="text-xs text-gray-500">Total</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-purple-500">{{ superAdminCount }}</p>
        <p class="text-xs text-gray-500">Super Admins</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-blue-500">{{ architecteCount }}</p>
        <p class="text-xs text-gray-500">Architectes</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-green-500">{{ actifCount }}</p>
        <p class="text-xs text-gray-500">Actifs</p>
      </div>
    </div>

    <!-- Liste des administrateurs -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div v-if="administrateurs.length > 0" class="divide-y divide-gray-100">
        <div 
          v-for="admin in administrateurs" 
          :key="admin.id"
          class="p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200"
        >
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex items-start gap-4 flex-1 min-w-0">
              <!-- Avatar -->
              <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" :style="{ backgroundColor: admin.color }">
                <span class="text-white font-semibold text-sm">{{ admin.initials }}</span>
              </div>
              
              <!-- Infos -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-base font-semibold text-gray-900">{{ admin.name }}</p>
                  <span class="text-xs text-gray-500">{{ admin.email }}</span>
                </div>
                <div class="flex flex-wrap items-center gap-2 mt-1">
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getRoleClass(admin.role)">
                    {{ getRoleLabel(admin.role) }}
                  </span>
                  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="admin.status === 'actif' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">
                    {{ admin.status === 'actif' ? 'Actif' : 'Inactif' }}
                  </span>
                  <span class="text-xs text-gray-400">Dernière connexion: {{ admin.lastLogin }}</span>
                </div>
              </div>
            </div>
            
            <!-- Actions -->
            <div class="flex items-center gap-2 shrink-0 self-end sm:self-start">
              <button 
                @click="toggleStatus(admin)"
                class="px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300"
                :class="admin.status === 'actif' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
              >
                {{ admin.status === 'actif' ? 'Actif' : 'Inactif' }}
              </button>
              <button 
                @click="openEditModal(admin)"
                class="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Pencil class="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
              <button 
                @click="deleteAdmin(admin.id)"
                class="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                :disabled="admin.role === 'super_admin' && admin.id === 1"
              >
                <Trash2 class="w-4 h-4" :class="admin.role === 'super_admin' && admin.id === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-400 hover:text-red-500'" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Message vide -->
      <div v-else class="p-12 text-center">
        <Users class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-700">Aucun administrateur</h3>
        <p class="text-gray-400 text-sm mt-1">Ajoutez votre premier administrateur</p>
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
            {{ editingAdmin ? 'Modifier l\'administrateur' : 'Ajouter un administrateur' }}
          </h2>
          <button @click="showModal = false" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form @submit.prevent="saveAdmin" class="space-y-4">
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

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <input 
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="admin@akasehr.ci"
            />
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              {{ editingAdmin ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe' }} <span v-if="!editingAdmin" class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input 
                id="password"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                :required="!editingAdmin"
                minlength="6"
                class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none pr-12"
                placeholder="••••••••"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Eye v-if="!showPassword" class="w-5 h-5 text-gray-400" />
                <EyeOff v-else class="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <p v-if="editingAdmin" class="text-xs text-gray-400 mt-1">Laissez vide pour conserver le mot de passe actuel</p>
          </div>

          <!-- Rôle -->
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-2">
              Rôle <span class="text-red-500">*</span>
            </label>
            <select 
              id="role"
              v-model="form.role"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none appearance-none"
            >
              <option value="super_admin">Super Admin</option>
              <option value="architecte">Architecte</option>
              <option value="secretaire">Secrétaire</option>
              <option value="editeur">Éditeur</option>
            </select>
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
              <option value="actif">Actif</option>
              <option value="inactif">Inactif</option>
            </select>
          </div>

          <!-- Description du rôle -->
          <div class="bg-gray-50 rounded-xl p-4">
            <p class="text-sm font-medium text-gray-700 mb-1">Permissions du rôle:</p>
            <ul class="text-xs text-gray-600 space-y-1">
              <li v-for="(perm, index) in getRolePermissions(form.role)" :key="index" class="flex items-center gap-2">
                <Check class="w-3.5 h-3.5 text-green-500" />
                {{ perm }}
              </li>
            </ul>
          </div>

          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button 
              type="submit"
              class="flex-1 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Save class="w-5 h-5" />
              {{ editingAdmin ? 'Mettre à jour' : 'Ajouter' }}
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
  Pencil, 
  Trash2, 
  X, 
  Save,
  Users,
  Eye,
  EyeOff,
  Check
} from 'lucide-vue-next'

// Types
interface Administrateur {
  id: number
  name: string
  initials: string
  email: string
  role: 'super_admin' | 'architecte' | 'secretaire' | 'editeur'
  status: 'actif' | 'inactif'
  lastLogin: string
  color: string
}

// Couleurs pour les avatars
const colors = [
  '#f59e0b', '#3b82f6', '#22c55e', '#a855f7', '#ec4899',
  '#14b8a6', '#f97316', '#8b5cf6', '#06b6d4', '#ef4444'
]

// Données de test
const administrateurs = ref<Administrateur[]>([
  {
    id: 1,
    name: 'Aka Sehr Ernest',
    initials: 'AS',
    email: 'ernest@akasehr.ci',
    role: 'super_admin',
    status: 'actif',
    lastLogin: 'Aujourd\'hui, 14:30',
    color: colors[0]
  },
  {
    id: 2,
    name: 'Marie Kouadio',
    initials: 'MK',
    email: 'marie@akasehr.ci',
    role: 'architecte',
    status: 'actif',
    lastLogin: 'Aujourd\'hui, 10:15',
    color: colors[1]
  },
  {
    id: 3,
    name: 'Jean Dupont',
    initials: 'JD',
    email: 'jean@akasehr.ci',
    role: 'secretaire',
    status: 'actif',
    lastLogin: 'Hier, 16:45',
    color: colors[2]
  },
  {
    id: 4,
    name: 'Sophie N\'Guessan',
    initials: 'SN',
    email: 'sophie@akasehr.ci',
    role: 'editeur',
    status: 'inactif',
    lastLogin: '02/07/2026, 09:20',
    color: colors[3]
  }
])

const showModal = ref(false)
const editingAdmin = ref<Administrateur | null>(null)
const showPassword = ref(false)

// Formulaire
const form = ref({
  name: '',
  email: '',
  password: '',
  role: 'architecte' as 'super_admin' | 'architecte' | 'secretaire' | 'editeur',
  status: 'actif' as 'actif' | 'inactif'
})

// Statistiques
const superAdminCount = computed(() => administrateurs.value.filter(a => a.role === 'super_admin').length)
const architecteCount = computed(() => administrateurs.value.filter(a => a.role === 'architecte').length)
const actifCount = computed(() => administrateurs.value.filter(a => a.status === 'actif').length)

// Rôle label
const getRoleLabel = (role: string) => {
  const labels: Record<string, string> = {
    super_admin: 'Super Admin',
    architecte: 'Architecte',
    secretaire: 'Secrétaire',
    editeur: 'Éditeur'
  }
  return labels[role] || role
}

// Rôle class
const getRoleClass = (role: string) => {
  const classes: Record<string, string> = {
    super_admin: 'bg-purple-100 text-purple-700',
    architecte: 'bg-blue-100 text-blue-700',
    secretaire: 'bg-amber-100 text-amber-700',
    editeur: 'bg-green-100 text-green-700'
  }
  return classes[role] || 'bg-gray-100 text-gray-700'
}

// Permissions par rôle
const getRolePermissions = (role: string) => {
  const permissions: Record<string, string[]> = {
    super_admin: [
      'Accès complet à toutes les fonctionnalités',
      'Gestion des administrateurs',
      'Modification des paramètres',
      'Suppression des données'
    ],
    architecte: [
      'Gestion des projets (CRUD)',
      'Gestion des édifices religieux',
      'Gestion des promotions immobilières',
      'Accès à la galerie'
    ],
    secretaire: [
      'Gestion des contacts',
      'Gestion des messages',
      'Gestion des témoignages',
      'Accès à la galerie'
    ],
    editeur: [
      'Gestion du contenu (pages, articles)',
      'Gestion de la galerie',
      'Gestion des témoignages'
    ]
  }
  return permissions[role] || []
}

// Ouvrir le modal d'ajout
const openAddModal = () => {
  editingAdmin.value = null
  form.value = {
    name: '',
    email: '',
    password: '',
    role: 'architecte',
    status: 'actif'
  }
  showModal.value = true
  showPassword.value = false
}

// Ouvrir le modal de modification
const openEditModal = (admin: Administrateur) => {
  editingAdmin.value = admin
  form.value = {
    name: admin.name,
    email: admin.email,
    password: '',
    role: admin.role,
    status: admin.status
  }
  showModal.value = true
  showPassword.value = false
}

// Sauvegarder l'administrateur
const saveAdmin = () => {
  if (!form.value.name || !form.value.email) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }

  if (!editingAdmin.value && !form.value.password) {
    alert('Veuillez saisir un mot de passe.')
    return
  }

  if (editingAdmin.value) {
    // Modifier
    const index = administrateurs.value.findIndex(a => a.id === editingAdmin.value!.id)
    if (index !== -1) {
      administrateurs.value[index] = {
        ...administrateurs.value[index],
        name: form.value.name,
        email: form.value.email,
        role: form.value.role,
        status: form.value.status
      }
    }
    alert('✅ Administrateur modifié avec succès !')
  } else {
    // Ajouter
    const colorIndex = administrateurs.value.length % colors.length
    administrateurs.value.push({
      id: Date.now(),
      name: form.value.name,
      initials: form.value.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      email: form.value.email,
      role: form.value.role,
      status: form.value.status,
      lastLogin: 'Jamais',
      color: colors[colorIndex]
    })
    alert('✅ Administrateur ajouté avec succès !')
  }

  showModal.value = false
}

// Changer le statut
const toggleStatus = (admin: Administrateur) => {
  admin.status = admin.status === 'actif' ? 'inactif' : 'actif'
  alert(`✅ Administrateur ${admin.status === 'actif' ? 'activé' : 'désactivé'} avec succès !`)
}

// Supprimer un administrateur
const deleteAdmin = (id: number) => {
  const admin = administrateurs.value.find(a => a.id === id)
  if (admin?.role === 'super_admin' && id === 1) {
    alert('❌ Impossible de supprimer le Super Admin principal.')
    return
  }
  
  if (confirm(`Voulez-vous vraiment supprimer cet administrateur ?`)) {
    administrateurs.value = administrateurs.value.filter(a => a.id !== id)
    alert('✅ Administrateur supprimé avec succès !')
  }
}
</script>

<style scoped>
.administrateurs-page {
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

input:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

/* Scrollbar du modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
</style>