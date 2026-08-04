<template>
  <div class="promotions-form-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            <span v-if="isEditing">Modifier</span>
            <span v-else>Ajouter</span> une promotion immobilière
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            <span v-if="isEditing">Modifiez les informations de la promotion</span>
            <span v-else>Remplissez le formulaire pour ajouter une nouvelle promotion immobilière</span>
          </p>
        </div>
        <RouterLink 
          to="/admin/promotions"
          class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-all duration-300"
        >
          <ArrowLeft class="w-4 h-4" />
          Retour à la liste
        </RouterLink>
      </div>
    </div>

    <!-- Formulaire -->
    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Colonne gauche -->
        <div class="space-y-6">
          <!-- Nom -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
              Nom de la promotion <span class="text-red-500">*</span>
            </label>
            <input 
              id="name"
              v-model="form.name"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: Cité des Grâces"
            />
          </div>

          <!-- Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description <span class="text-red-500">*</span>
            </label>
            <textarea 
              id="description"
              v-model="form.description"
              rows="4"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
              placeholder="Décrivez la promotion immobilière..."
            ></textarea>
          </div>

          <!-- Localisation -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
              Localisation <span class="text-red-500">*</span>
            </label>
            <input 
              id="location"
              v-model="form.location"
              type="text"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: Bingerville, Côte d'Ivoire"
            />
          </div>

          <!-- Prix -->
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
              Prix (FCFA)
            </label>
            <input 
              id="price"
              v-model="form.price"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: 250 000 000"
            />
          </div>
        </div>

        <!-- Colonne droite -->
        <div class="space-y-6">
          <!-- Nombre de villas -->
          <div>
            <label for="villas" class="block text-sm font-medium text-gray-700 mb-2">
              Nombre de villas <span class="text-red-500">*</span>
            </label>
            <input 
              id="villas"
              v-model="form.villas"
              type="number"
              required
              min="1"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: 33"
            />
          </div>

          <!-- Superficie -->
          <div>
            <label for="surface" class="block text-sm font-medium text-gray-700 mb-2">
              Superficie (m²) <span class="text-red-500">*</span>
            </label>
            <input 
              id="surface"
              v-model="form.surface"
              type="number"
              required
              min="1"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: 300"
            />
          </div>

          <!-- Nombre de pièces -->
          <div>
            <label for="pieces" class="block text-sm font-medium text-gray-700 mb-2">
              Nombre de pièces <span class="text-red-500">*</span>
            </label>
            <input 
              id="pieces"
              v-model="form.pieces"
              type="number"
              required
              min="1"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: 5"
            />
          </div>

          <!-- Statut -->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
              Statut <span class="text-red-500">*</span>
            </label>
            <select 
              id="status"
              v-model="form.status"
              required
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none appearance-none"
            >
              <option value="disponible">Disponible</option>
              <option value="en-cours">En cours</option>
              <option value="termine">Terminé</option>
              <option value="a-venir">À venir</option>
            </select>
          </div>

          <!-- Disponibilité -->
          <div>
            <label for="disponibility" class="block text-sm font-medium text-gray-700 mb-2">
              Disponibilité
            </label>
            <input 
              id="disponibility"
              v-model="form.disponibility"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Ex: 5 villas disponibles"
            />
          </div>
        </div>
      </div>

      <!-- Section Images -->
      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <div 
          class="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gray-100"
          @click="triggerFileInput"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <input 
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            @change="handleFileUpload"
          />
          <div class="flex flex-col items-center gap-2">
            <Upload class="w-10 h-10 text-gray-400" />
            <p class="text-sm text-gray-600">
              <span class="font-medium text-amber-500">Cliquez pour uploader</span> ou glissez-déposez
            </p>
            <p class="text-xs text-gray-400">PNG, JPG, WEBP (Max 5Mo)</p>
          </div>
        </div>

        <!-- Aperçu des images -->
        <div v-if="form.images.length > 0" class="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
          <div v-for="(image, index) in form.images" :key="index" class="relative group">
            <img 
              :src="image.preview" 
              :alt="'Image ' + (index + 1)"
              class="w-full h-24 sm:h-28 object-cover rounded-lg"
            />
            <button 
              type="button"
              @click="removeImage(index)"
              class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-300 opacity-0 group-hover:opacity-100"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Section Plans -->
      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Plans (PDF)
        </label>
        <div 
          class="relative border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-amber-400 transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gray-100"
          @click="triggerPlanInput"
          @dragover.prevent
          @drop.prevent="handlePlanDrop"
        >
          <input 
            ref="planInput"
            type="file"
            accept=".pdf"
            multiple
            class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            @change="handlePlanUpload"
          />
          <div class="flex flex-col items-center gap-2">
            <FileText class="w-10 h-10 text-gray-400" />
            <p class="text-sm text-gray-600">
              <span class="font-medium text-amber-500">Cliquez pour uploader</span> ou glissez-déposez vos plans
            </p>
            <p class="text-xs text-gray-400">PDF uniquement</p>
          </div>
        </div>

        <!-- Liste des plans -->
        <div v-if="form.plans.length > 0" class="mt-4 space-y-2">
          <div v-for="(plan, index) in form.plans" :key="index" class="flex items-center justify-between bg-gray-50 rounded-lg p-3">
            <div class="flex items-center gap-3">
              <FileText class="w-5 h-5 text-amber-500" />
              <span class="text-sm text-gray-700">{{ plan.name }}</span>
            </div>
            <button 
              type="button"
              @click="removePlan(index)"
              class="p-1 hover:bg-red-50 rounded-lg transition-colors"
            >
              <X class="w-4 h-4 text-gray-400 hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <!-- Section Caractéristiques -->
      <div class="mt-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Caractéristiques
        </label>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <input 
              type="text"
              v-model="newFeature"
              placeholder="Ajouter une caractéristique..."
              class="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              @keyup.enter="addFeature"
            />
            <button 
              type="button"
              @click="addFeature"
              class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-medium transition-all duration-300"
            >
              <Plus class="w-5 h-5" />
            </button>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="(feature, index) in form.features" 
              :key="index"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full text-sm"
            >
              {{ feature }}
              <button 
                type="button"
                @click="removeFeature(index)"
                class="hover:text-amber-900 transition-colors"
              >
                <X class="w-3.5 h-3.5" />
              </button>
            </span>
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-100">
        <button 
          type="submit"
          class="flex-1 px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          <Save class="w-5 h-5" />
          <span v-if="isEditing">Mettre à jour</span>
          <span v-else>Enregistrer la promotion</span>
        </button>
        
        <RouterLink 
          to="/admin/promotions"
          class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
          <X class="w-5 h-5" />
          Annuler
        </RouterLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { 
  ArrowLeft, 
  Upload, 
  Plus, 
  X, 
  Save,
  FileText
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const isEditing = ref(false)

// Références pour les inputs
const fileInput = ref<HTMLInputElement | null>(null)
const planInput = ref<HTMLInputElement | null>(null)

// Nouvelle caractéristique
const newFeature = ref('')

// Formulaire
const form = reactive({
  name: '',
  description: '',
  location: '',
  price: '',
  villas: '',
  surface: '',
  pieces: '',
  status: 'disponible',
  disponibility: '',
  images: [] as { file: File; preview: string }[],
  plans: [] as { file: File; name: string }[],
  features: [] as string[]
})

// Ajouter une caractéristique
const addFeature = () => {
  if (newFeature.value.trim()) {
    form.features.push(newFeature.value.trim())
    newFeature.value = ''
  }
}

// Supprimer une caractéristique
const removeFeature = (index: number) => {
  form.features.splice(index, 1)
}

// Gestion des images
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    Array.from(target.files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          form.images.push({
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

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files) {
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          form.images.push({
            file,
            preview: e.target?.result as string
          })
        }
        reader.readAsDataURL(file)
      }
    })
  }
}

const removeImage = (index: number) => {
  form.images.splice(index, 1)
}

// Gestion des plans
const triggerPlanInput = () => {
  planInput.value?.click()
}

const handlePlanUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    Array.from(target.files).forEach(file => {
      if (file.type === 'application/pdf') {
        form.plans.push({
          file,
          name: file.name
        })
      }
    })
  }
  target.value = ''
}

const handlePlanDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files) {
    Array.from(files).forEach(file => {
      if (file.type === 'application/pdf') {
        form.plans.push({
          file,
          name: file.name
        })
      }
    })
  }
}

const removePlan = (index: number) => {
  form.plans.splice(index, 1)
}

// Soumission du formulaire
const handleSubmit = async () => {
  if (!form.name || !form.description || !form.location || !form.villas || !form.surface || !form.pieces) {
    alert('Veuillez remplir tous les champs obligatoires.')
    return
  }

  console.log('Données du formulaire:', form)
  
  alert(isEditing.value ? '✅ Promotion mise à jour avec succès !' : '✅ Promotion ajoutée avec succès !')
  router.push('/admin/promotions')
}

// Charger les données pour la modification
onMounted(() => {
  const id = route.params.id
  if (id) {
    isEditing.value = true
    form.name = 'Cité des Grâces'
    form.description = 'Une cité moderne et élégante...'
    form.location = 'Bingerville, Côte d\'Ivoire'
    form.price = '250 000 000'
    form.villas = '33'
    form.surface = '300'
    form.pieces = '5'
    form.status = 'disponible'
    form.disponibility = '5 villas disponibles'
    form.features = ['Piscine', 'Jardin paysager', 'Parking sécurisé']
  }
})
</script>

<style scoped>
.promotions-form-page {
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

input:focus, textarea:focus, select:focus {
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

.border-dashed {
  transition: all 0.3s ease;
}

.border-dashed:hover {
  border-color: #f59e0b;
  background-color: #fef3c7;
}

@media (max-width: 640px) {
  .promotions-form-page .text-2xl {
    font-size: 1.25rem;
  }
}
</style>