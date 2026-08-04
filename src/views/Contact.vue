<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
      <div 
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${contactHero})` }"
      >
        <div class="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-black/40" />
      </div>
      
      <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-4">
          <span class="text-amber-400 font-bold">Contact</span>
        </h1>
        <p class="text-xl text-white/70 font-light max-w-3xl mx-auto">
          Parlons de votre projet, nous sommes à votre écoute
        </p>
      </div>
    </section>

    <!-- Informations de contact -->
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Téléphone -->
          <div class="group bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition-colors duration-300">
              <Phone class="w-8 h-8 text-amber-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Téléphone</h3>
            <p class="text-gray-600">+225 01 23 45 67 89</p>
            <p class="text-gray-500 text-sm">Lun-Ven, 8h-18h</p>
          </div>

          <!-- Email -->
          <div class="group bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition-colors duration-300">
              <Mail class="w-8 h-8 text-amber-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p class="text-gray-600">contact@akasehr.ci</p>
            <p class="text-gray-500 text-sm">Réponse sous 24h</p>
          </div>

          <!-- Adresse -->
          <div class="group bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-500 transition-colors duration-300">
              <MapPin class="w-8 h-8 text-amber-500 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Adresse</h3>
            <p class="text-gray-600">Abidjan, Angré 8ème Tranche</p>
            <p class="text-gray-500 text-sm">Carrefour Pri, A15</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulaire de contact + Carte -->
    <section class="py-20 bg-linear-to-b from-gray-50 to-white">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Formulaire -->
          <div>
            <span class="text-amber-500 text-sm font-semibold tracking-wider uppercase">Envoyez-nous un message</span>
            <h2 class="text-3xl md:text-4xl font-light text-gray-900 mt-4 mb-6">
              Parlons de votre <span class="text-amber-500 font-bold">projet</span>
            </h2>
            <p class="text-gray-600 mb-8">
              Remplissez le formulaire ci-dessous et nous vous recontacterons dans les plus brefs délais.
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet <span class="text-red-500">*</span>
                  </label>
                  <input 
                    id="name"
                    v-model="form.name"
                    type="text"
                    required
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input 
                    id="email"
                    v-model="form.email"
                    type="email"
                    required
                    class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <input 
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none"
                  placeholder="+225 01 23 45 67 89"
                />
              </div>

              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  Sujet <span class="text-red-500">*</span>
                </label>
                <select 
                  id="subject"
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none appearance-none"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="architecture">Architecture</option>
                  <option value="edifices-religieux">Édifices religieux</option>
                  <option value="promotion-immobiliere">Promotion immobilière</option>
                  <option value="projet-residentiel">Projet résidentiel</option>
                  <option value="renovation">Rénovation</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  Message <span class="text-red-500">*</span>
                </label>
                <textarea 
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 outline-none resize-none"
                  placeholder="Décrivez votre projet..."
                ></textarea>
              </div>

              <button 
                type="submit"
                class="w-full px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
                :disabled="isSubmitting"
              >
                <Send class="w-5 h-5" />
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
              </button>
            </form>
          </div>

          <!-- Carte et informations -->
          <div class="space-y-8">
            <!-- Carte -->
            <div class="relative rounded-2xl overflow-hidden shadow-2xl h-400px bg-linear-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center border border-gray-200">
              <div class="text-center">
                <Building2 class="w-24 h-24 text-amber-400/50 mx-auto mb-4" />
                <p class="text-gray-700 text-lg font-light">Cabinet Aka Sehr</p>
                <p class="text-amber-500 text-sm font-medium mt-2">Abidjan, Angré 8ème Tranche</p>
                <div class="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-amber-100 rounded-full">
                  <MapPin class="w-4 h-4 text-amber-500" />
                  <span class="text-gray-700 text-sm">📍 Carrefour Pri, A15</span>
                </div>
                <div class="mt-6 flex justify-center gap-4">
                  <a href="#" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                    <Phone class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </a>
                  <a href="#" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                    <Mail class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </a>
                  <a href="#" class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                    <MapPin class="w-4 h-4 text-gray-600 group-hover:text-white transition-colors duration-300" />
                  </a>
                </div>
              </div>
            </div>

            <!-- Horaires -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock class="w-5 h-5 text-amber-500" />
                Horaires d'ouverture
              </h4>
              <div class="space-y-2 text-gray-600">
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span>Lundi - Vendredi</span>
                  <span class="font-medium">8h00 - 18h00</span>
                </div>
                <div class="flex justify-between py-2 border-b border-gray-100">
                  <span>Samedi</span>
                  <span class="font-medium">9h00 - 13h00</span>
                </div>
                <div class="flex justify-between py-2">
                  <span>Dimanche</span>
                  <span class="font-medium text-gray-400">Fermé</span>
                </div>
              </div>
            </div>

            <!-- Réseaux sociaux -->
            <div class="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <h4 class="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Share2 class="w-5 h-5 text-amber-500" />
                Suivez-nous
              </h4>
              <div class="flex gap-4">
                <a href="#" class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                  <Facebook class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                  <Instagram class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                  <Linkedin class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </a>
                <a href="#" class="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors duration-300 group">
                  <Twitter class="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-16 bg-linear-to-r from-amber-500 to-amber-600">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-light text-white mb-4">
          Prêt à concrétiser votre <span class="font-bold">projet</span> ?
        </h2>
        <p class="text-white/80 text-lg mb-6">
          Contactez-nous dès maintenant pour un premier échange
        </p>
        <a 
          href="tel:+2250123456789"
          class="inline-flex items-center gap-2 px-8 py-4 bg-white text-amber-500 hover:bg-gray-100 rounded-full font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <Phone class="w-5 h-5" />
          Appelez-nous
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Building2, 
  Clock, 
  Share2,
  Facebook,
  Instagram,
  Linkedin,
  Twitter
} from 'lucide-vue-next'

// ✅ IMPORT DE L'IMAGE HERO
// Use direct public-relative path to avoid TypeScript "import.meta" module issues
const contactHero = '/src/assets/images/hero-bg.jpg'

// État du formulaire
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

// Soumission du formulaire
const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simuler l'envoi
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Réinitialiser le formulaire
  form.value = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  }
  
  isSubmitting.value = false
  
  // Afficher un message de succès
  alert('✅ Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.')
}
</script>

<style scoped>
.contact-page {
  overflow-x: hidden;
}

input, select, textarea {
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
}

/* Animation des cartes */
.group {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>