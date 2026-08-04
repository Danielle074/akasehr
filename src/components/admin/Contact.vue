<template>
  <div class="contact-admin-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Informations de contact
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Modifiez les informations de contact du cabinet
          </p>
        </div>
      </div>
    </div>

    <!-- Formulaire -->
    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-100">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Colonne gauche -->
        <div class="space-y-6">
          <!-- Téléphone -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
              Téléphone <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="+225 01 23 45 67 89"
              />
            </div>
          </div>

          <!-- Téléphone secondaire -->
          <div>
            <label for="phone_secondary" class="block text-sm font-medium text-gray-700 mb-2">
              Téléphone secondaire
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="phone_secondary"
                v-model="form.phoneSecondary"
                type="tel"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="+225 01 23 45 67 89"
              />
            </div>
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
              Email <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="contact@akasehr.ci"
              />
            </div>
          </div>

          <!-- Email secondaire -->
          <div>
            <label for="email_secondary" class="block text-sm font-medium text-gray-700 mb-2">
              Email secondaire
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="email_secondary"
                v-model="form.emailSecondary"
                type="email"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="info@akasehr.ci"
              />
            </div>
          </div>
        </div>

        <!-- Colonne droite -->
        <div class="space-y-6">
          <!-- Adresse -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 mb-2">
              Adresse <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="address"
                v-model="form.address"
                type="text"
                required
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="Abidjan, Angré 8ème Tranche"
              />
            </div>
          </div>

          <!-- Adresse complément -->
          <div>
            <label for="address_complement" class="block text-sm font-medium text-gray-700 mb-2">
              Complément d'adresse
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="address_complement"
                v-model="form.addressComplement"
                type="text"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="Carrefour Pri, A15"
              />
            </div>
          </div>

          <!-- Google Maps -->
          <div>
            <label for="google_maps" class="block text-sm font-medium text-gray-700 mb-2">
              Lien Google Maps
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Map class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="google_maps"
                v-model="form.googleMaps"
                type="url"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="https://goo.gl/maps/..."
              />
            </div>
          </div>

          <!-- Horaires -->
          <div>
            <label for="hours" class="block text-sm font-medium text-gray-700 mb-2">
              Horaires d'ouverture
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="hours"
                v-model="form.hours"
                type="text"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="Lun-Ven: 8h-18h, Sam: 9h-13h"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Section Réseaux sociaux -->
      <div class="mt-8 pt-6 border-t border-gray-100">
        <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Share2 class="w-5 h-5 text-amber-500" />
          Réseaux sociaux
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label for="facebook" class="block text-sm font-medium text-gray-700 mb-2">
              Facebook
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Facebook class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="facebook"
                v-model="form.facebook"
                type="url"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="https://facebook.com/akasehr"
              />
            </div>
          </div>
          <div>
            <label for="instagram" class="block text-sm font-medium text-gray-700 mb-2">
              Instagram
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Instagram class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="instagram"
                v-model="form.instagram"
                type="url"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="https://instagram.com/akasehr"
              />
            </div>
          </div>
          <div>
            <label for="linkedin" class="block text-sm font-medium text-gray-700 mb-2">
              LinkedIn
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Linkedin class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="linkedin"
                v-model="form.linkedin"
                type="url"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="https://linkedin.com/company/akasehr"
              />
            </div>
          </div>
          <div>
            <label for="twitter" class="block text-sm font-medium text-gray-700 mb-2">
              Twitter / X
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Twitter class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                id="twitter"
                v-model="form.twitter"
                type="url"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="https://twitter.com/akasehr"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Boutons d'action -->
      <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-100">
        <button 
          type="submit"
          class="flex-1 px-6 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          :disabled="isLoading"
        >
          <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
          <Save v-else class="w-5 h-5" />
          {{ isLoading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
        </button>
        
        <button 
          type="button"
          @click="resetForm"
          class="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
          <RotateCcw class="w-5 h-5" />
          Réinitialiser
        </button>
      </div>

      <!-- Message de succès -->
      <div v-if="successMessage" class="mt-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm flex items-center gap-2">
        <CheckCircle class="w-5 h-5 text-green-500" />
        {{ successMessage }}
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Map,
  Clock, 
  Share2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Save,
  RotateCcw,
  Loader2,
  CheckCircle
} from 'lucide-vue-next'

const isLoading = ref(false)
const successMessage = ref('')

// Formulaire
const form = reactive({
  phone: '+225 01 23 45 67 89',
  phoneSecondary: '+225 05 67 89 01 23',
  email: 'contact@akasehr.ci',
  emailSecondary: 'info@akasehr.ci',
  address: 'Abidjan, Angré 8ème Tranche',
  addressComplement: 'Carrefour Pri, A15',
  googleMaps: 'https://goo.gl/maps/example',
  hours: 'Lun-Ven: 8h-18h, Sam: 9h-13h',
  facebook: 'https://facebook.com/akasehr',
  instagram: 'https://instagram.com/akasehr',
  linkedin: 'https://linkedin.com/company/akasehr',
  twitter: 'https://twitter.com/akasehr'
})

// Formulaire original pour la réinitialisation
const originalForm = { ...form }

// Soumission
const handleSubmit = async () => {
  isLoading.value = true
  successMessage.value = ''

  // Simuler l'envoi
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Copier les valeurs dans originalForm
  Object.assign(originalForm, form)

  isLoading.value = false
  successMessage.value = '✅ Informations de contact mises à jour avec succès !'

  setTimeout(() => {
    successMessage.value = ''
  }, 5000)
}

// Réinitialisation
const resetForm = () => {
  if (confirm('Voulez-vous vraiment réinitialiser les modifications ?')) {
    Object.assign(form, originalForm)
  }
}
</script>

<style scoped>
.contact-admin-page {
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

input:focus {
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}
</style>