<template>
  <div class="login-page min-h-screen flex">
    <!-- Image à gauche -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${loginImage})` }"
      >
        <div class="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
      </div>
      
      <!-- Contenu overlay sur l'image -->
      <div class="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
        <div class="max-w-md text-center">
          <Building2 class="w-20 h-20 text-amber-400 mx-auto mb-6" />
          <h2 class="text-4xl font-light mb-4">
            Cabinet <span class="text-amber-400 font-bold">Aka Sehr</span>
          </h2>
          <p class="text-white/70 text-lg font-light">
            Architecture & Immobilier de Luxe
          </p>
          <div class="mt-8 flex justify-center gap-6">
            <div class="text-center">
              <span class="block text-2xl font-bold text-amber-400">30+</span>
              <span class="text-sm text-white/60">Ans d'expérience</span>
            </div>
            <div class="text-center">
              <span class="block text-2xl font-bold text-amber-400">150+</span>
              <span class="text-sm text-white/60">Projets réalisés</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Formulaire à droite -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
      <div class="w-full max-w-md">
        <!-- Bouton Retour à l'accueil (mobile) -->
        <div class="lg:hidden mb-4">
          <RouterLink 
            to="/"
            class="inline-flex items-center gap-2 text-gray-600 hover:text-amber-500 transition-colors duration-300"
          >
            <ArrowLeft class="w-5 h-5" />
            <span>Retour à l'accueil</span>
          </RouterLink>
        </div>

        <!-- Logo mobile -->
        <div class="text-center lg:hidden mb-8">
          <Building2 class="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 class="text-2xl font-light text-gray-900">
            Cabinet <span class="text-amber-500 font-bold">Aka Sehr</span>
          </h2>
        </div>

        <!-- En-tête du formulaire -->
        <div class="mb-8">
          <h1 class="text-3xl font-light text-gray-900">
            Connexion <span class="text-amber-500 font-bold">Administrateur</span>
          </h1>
          <p class="text-gray-500 mt-2">
            Connectez-vous pour accéder à l'espace d'administration
          </p>
        </div>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="space-y-6">
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
                placeholder="admin@akasehr.ci"
              />
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock class="h-5 w-5 text-gray-400" />
              </div>
              <input 
                :id="'password'"
                :type="showPassword ? 'text' : 'password'"
                v-model="form.password"
                required
                class="w-full pl-10 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                placeholder="••••••••"
              />
              <button 
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <Eye v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                <EyeOff v-else class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
              </button>
            </div>
          </div>

          <!-- Options -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                v-model="rememberMe"
                class="w-4 h-4 text-amber-500 border-gray-300 rounded focus:ring-amber-500"
              />
              <span class="text-sm text-gray-600">Se souvenir de moi</span>
            </label>
            <a href="#" class="text-sm text-amber-500 hover:text-amber-600 transition-colors font-medium">
              Mot de passe oublié ?
            </a>
          </div>

          <!-- Bouton de connexion -->
          <button 
            type="submit"
            class="w-full px-8 py-4 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            :disabled="isLoading"
          >
            <Loader2 v-if="isLoading" class="w-5 h-5 animate-spin" />
            <LogIn v-else class="w-5 h-5" />
            {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
          </button>

          <!-- Message d'erreur -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {{ errorMessage }}
          </div>
        </form>

        <!-- Bouton Retour à l'accueil (desktop) -->
        <div class="mt-6 text-center">
          <RouterLink 
            to="/"
            class="inline-flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors duration-300 text-sm"
          >
            <ArrowLeft class="w-4 h-4" />
            Retour à l'accueil
          </RouterLink>
        </div>

        <!-- Footer du formulaire -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500">
            Espace réservé aux administrateurs du cabinet
          </p>
          <p class="text-xs text-gray-400 mt-2">
            © 2026 Cabinet Aka Sehr - Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  Loader2,
  Building2,
  ArrowLeft
} from 'lucide-vue-next'

// ✅ IMPORT DE L'IMAGE
import loginImage from '@/assets/images/promotions-hero.png'

const router = useRouter()

// État du formulaire
const form = ref({
  email: '',
  password: ''
})

const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// Gestion de la connexion
const handleLogin = async () => {
  // Réinitialiser le message d'erreur
  errorMessage.value = ''
  isLoading.value = true

  // Simulation d'appel API
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Validation simple (à remplacer par une vraie authentification)
  if (form.value.email === 'admin@akasehr.ci' && form.value.password === 'admin123') {
    // Connexion réussie
    localStorage.setItem('isAuthenticated', 'true')
    if (rememberMe.value) {
      localStorage.setItem('rememberMe', 'true')
    }
    router.push('/admin')
  } else {
    // Échec de la connexion
    errorMessage.value = 'Email ou mot de passe incorrect. Veuillez réessayer.'
  }

  isLoading.value = false
}
</script>

<style scoped>
.login-page {
  background: #ffffff;
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

/* Transition pour les inputs */
input:focus {
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}
</style>