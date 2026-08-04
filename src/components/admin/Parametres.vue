<template>
  <div class="parametres-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Paramètres du site
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez les paramètres généraux du cabinet
          </p>
        </div>
        <button 
          @click="saveAllSettings"
          class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Save class="w-4 h-4" />
          Enregistrer tout
        </button>
      </div>
    </div>

    <!-- Navigation des onglets -->
    <div class="flex flex-wrap gap-2 mb-6">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2"
        :class="activeTab === tab.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Contenu des onglets -->
    <div class="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
      <!-- Onglet Général -->
      <div v-if="activeTab === 'general'">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Informations générales</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Nom du cabinet -->
          <div>
            <label for="cabinetName" class="block text-sm font-medium text-gray-700 mb-2">
              Nom du cabinet <span class="text-red-500">*</span>
            </label>
            <input 
              id="cabinetName"
              v-model="settings.general.cabinetName"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Cabinet Aka Sehr"
            />
          </div>

          <!-- Slogan -->
          <div>
            <label for="slogan" class="block text-sm font-medium text-gray-700 mb-2">
              Slogan
            </label>
            <input 
              id="slogan"
              v-model="settings.general.slogan"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="L'art de transformer l'espace en élégance intemporelle"
            />
          </div>

          <!-- Description -->
          <div class="lg:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description du site
            </label>
            <textarea 
              id="description"
              v-model="settings.general.description"
              rows="3"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
              placeholder="Description du cabinet pour les moteurs de recherche..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Onglet Logo & Apparence -->
      <div v-if="activeTab === 'appearance'">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Logo et apparence</h3>
        <div class="space-y-6">
          <!-- Logo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Logo du cabinet
            </label>
            <div class="flex items-center gap-6">
              <div class="w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                <img 
                  v-if="settings.appearance.logoPreview" 
                  :src="settings.appearance.logoPreview" 
                  alt="Logo"
                  class="w-full h-full object-contain p-2"
                />
                <Image v-else class="w-12 h-12 text-gray-400" />
              </div>
              <div>
                <input 
                  type="file"
                  accept="image/*"
                  class="hidden"
                  ref="logoInput"
                  @change="handleLogoUpload"
                />
                <button 
                  @click="logoInput?.click()"
                  class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Changer le logo
                </button>
                <button 
                  v-if="settings.appearance.logoPreview"
                  @click="removeLogo"
                  class="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Supprimer
                </button>
                <p class="text-xs text-gray-400 mt-2">PNG, JPG (Max 2Mo)</p>
              </div>
            </div>
          </div>

          <!-- Favicon -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Favicon
            </label>
            <div class="flex items-center gap-6">
              <div class="w-16 h-16 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                <img 
                  v-if="settings.appearance.faviconPreview" 
                  :src="settings.appearance.faviconPreview" 
                  alt="Favicon"
                  class="w-full h-full object-contain p-1"
                />
                <Image v-else class="w-8 h-8 text-gray-400" />
              </div>
              <div>
                <input 
                  type="file"
                  accept="image/*"
                  class="hidden"
                  ref="faviconInput"
                  @change="handleFaviconUpload"
                />
                <button 
                  @click="faviconInput?.click()"
                  class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Changer le favicon
                </button>
                <button 
                  v-if="settings.appearance.faviconPreview"
                  @click="removeFavicon"
                  class="ml-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
                >
                  Supprimer
                </button>
                <p class="text-xs text-gray-400 mt-2">PNG, ICO (Max 500Ko)</p>
              </div>
            </div>
          </div>

          <!-- Couleur principale -->
          <div>
            <label for="primaryColor" class="block text-sm font-medium text-gray-700 mb-2">
              Couleur principale
            </label>
            <div class="flex items-center gap-4">
              <input 
                id="primaryColor"
                v-model="settings.appearance.primaryColor"
                type="color"
                class="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input 
                v-model="settings.appearance.primaryColor"
                type="text"
                class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="#f59e0b"
              />
            </div>
          </div>

          <!-- Couleur secondaire -->
          <div>
            <label for="secondaryColor" class="block text-sm font-medium text-gray-700 mb-2">
              Couleur secondaire
            </label>
            <div class="flex items-center gap-4">
              <input 
                id="secondaryColor"
                v-model="settings.appearance.secondaryColor"
                type="color"
                class="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
              />
              <input 
                v-model="settings.appearance.secondaryColor"
                type="text"
                class="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="#1a1a1a"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Onglet Footer -->
      <div v-if="activeTab === 'footer'">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Paramètres du footer</h3>
        <div class="space-y-6">
          <!-- Texte du copyright -->
          <div>
            <label for="copyright" class="block text-sm font-medium text-gray-700 mb-2">
              Texte du copyright <span class="text-red-500">*</span>
            </label>
            <input 
              id="copyright"
              v-model="settings.footer.copyright"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="© 2026 Cabinet Aka Sehr - Tous droits réservés"
            />
          </div>

          <!-- Mentions légales -->
          <div>
            <label for="legal" class="block text-sm font-medium text-gray-700 mb-2">
              Mentions légales
            </label>
            <textarea 
              id="legal"
              v-model="settings.footer.legal"
              rows="4"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
              placeholder="Mentions légales du site..."
            ></textarea>
          </div>

          <!-- Politique de confidentialité -->
          <div>
            <label for="privacy" class="block text-sm font-medium text-gray-700 mb-2">
              Politique de confidentialité
            </label>
            <textarea 
              id="privacy"
              v-model="settings.footer.privacy"
              rows="4"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
              placeholder="Politique de confidentialité..."
            ></textarea>
          </div>

          <!-- Liens du footer -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Liens du footer
            </label>
            <div class="space-y-2">
              <div v-for="(link, index) in settings.footer.links" :key="index" class="flex items-center gap-3">
                <input 
                  v-model="link.label"
                  type="text"
                  class="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="Libellé"
                />
                <input 
                  v-model="link.url"
                  type="text"
                  class="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="/contact"
                />
                <button 
                  @click="removeFooterLink(index)"
                  class="p-2 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X class="w-4 h-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
              <button 
                @click="addFooterLink"
                class="inline-flex items-center gap-2 px-4 py-2 text-sm text-amber-500 hover:text-amber-600 font-medium transition-colors"
              >
                <Plus class="w-4 h-4" />
                Ajouter un lien
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Onglet SEO -->
      <div v-if="activeTab === 'seo'">
        <h3 class="text-lg font-semibold text-gray-900 mb-6">Optimisation SEO</h3>
        <div class="space-y-6">
          <!-- Meta title -->
          <div>
            <label for="metaTitle" class="block text-sm font-medium text-gray-700 mb-2">
              Meta Title <span class="text-red-500">*</span>
            </label>
            <input 
              id="metaTitle"
              v-model="settings.seo.metaTitle"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="Cabinet Aka Sehr - Architecture & Immobilier de Luxe"
            />
            <p class="text-xs text-gray-400 mt-1">Titre affiché dans les moteurs de recherche (60 caractères max)</p>
          </div>

          <!-- Meta description -->
          <div>
            <label for="metaDescription" class="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea 
              id="metaDescription"
              v-model="settings.seo.metaDescription"
              rows="3"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
              placeholder="Cabinet d'architecture et immobilier de luxe en Côte d'Ivoire..."
            ></textarea>
            <p class="text-xs text-gray-400 mt-1">Description affichée dans les moteurs de recherche (160 caractères max)</p>
          </div>

          <!-- Mots-clés -->
          <div>
            <label for="keywords" class="block text-sm font-medium text-gray-700 mb-2">
              Mots-clés
            </label>
            <input 
              id="keywords"
              v-model="settings.seo.keywords"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="architecture, immobilier de luxe, Côte d'Ivoire, Abidjan"
            />
            <p class="text-xs text-gray-400 mt-1">Séparés par des virgules</p>
          </div>

          <!-- Google Analytics -->
          <div>
            <label for="analytics" class="block text-sm font-medium text-gray-700 mb-2">
              Code Google Analytics
            </label>
            <input 
              id="analytics"
              v-model="settings.seo.analytics"
              type="text"
              class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
              placeholder="UA-XXXXXXXXX-X"
            />
          </div>
        </div>
      </div>

      <!-- Message de succès -->
      <div v-if="successMessage" class="mt-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
        <CheckCircle class="w-5 h-5 text-green-500" />
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  Save, 
  Image, 
  X, 
  Plus,
  CheckCircle,
  Settings,
  Palette,
  FileText,
  Search
} from 'lucide-vue-next'

// Onglets
const tabs = [
  { id: 'general', label: 'Général', icon: Settings },
  { id: 'appearance', label: 'Apparence', icon: Palette },
  { id: 'footer', label: 'Footer', icon: FileText },
  { id: 'seo', label: 'SEO', icon: Search }
]

const activeTab = ref('general')
const successMessage = ref('')

// Références pour les inputs de fichiers
const logoInput = ref<HTMLInputElement | null>(null)
const faviconInput = ref<HTMLInputElement | null>(null)

// Paramètres
const settings = reactive({
  general: {
    cabinetName: 'Cabinet Aka Sehr',
    slogan: "L'art de transformer l'espace en élégance intemporelle",
    description: "Cabinet d'architecture et d'immobilier de luxe basé en Côte d'Ivoire. Expertise en conception, permis de construire et suivi de chantier."
  },
  appearance: {
    logoPreview: '',
    faviconPreview: '',
    primaryColor: '#f59e0b',
    secondaryColor: '#1a1a1a'
  },
  footer: {
    copyright: '© 2026 Cabinet Aka Sehr - Tous droits réservés',
    legal: 'Mentions légales du Cabinet Aka Sehr...',
    privacy: 'Politique de confidentialité...',
    links: [
      { label: 'À propos', url: '/about' },
      { label: 'Contact', url: '/contact' },
      { label: 'Mentions légales', url: '/legal' }
    ]
  },
  seo: {
    metaTitle: 'Cabinet Aka Sehr - Architecture & Immobilier de Luxe',
    metaDescription: 'Cabinet d\'architecture et immobilier de luxe en Côte d\'Ivoire. Conception, permis de construire, suivi de chantier.',
    keywords: 'architecture, immobilier de luxe, Côte d\'Ivoire, Abidjan, construction',
    analytics: 'UA-XXXXXXXXX-X'
  }
})

// Gestion du logo
const handleLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        settings.appearance.logoPreview = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }
  target.value = ''
}

const removeLogo = () => {
  settings.appearance.logoPreview = ''
  if (logoInput.value) logoInput.value.value = ''
}

// Gestion du favicon
const handleFaviconUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        settings.appearance.faviconPreview = e.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }
  target.value = ''
}

const removeFavicon = () => {
  settings.appearance.faviconPreview = ''
  if (faviconInput.value) faviconInput.value.value = ''
}

// Gestion des liens du footer
const addFooterLink = () => {
  settings.footer.links.push({ label: '', url: '' })
}

const removeFooterLink = (index: number) => {
  settings.footer.links.splice(index, 1)
}

// Sauvegarder tout
const saveAllSettings = async () => {
  // Simuler l'envoi
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  successMessage.value = '✅ Tous les paramètres ont été enregistrés avec succès !'
  
  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
}
</script>

<style scoped>
.parametres-page {
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

input:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

/* Transition des onglets */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>