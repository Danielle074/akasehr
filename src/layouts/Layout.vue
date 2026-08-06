<template>
  <div class="min-h-screen flex flex-col">
    <!-- Navbar Flottante Premium -->
    <header 
      ref="navbarRef"
      class="navbar-floating fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ease-in-out"
      :class="[
        isNavbarVisible ? (isScrolled ? 'shadow-2xl bg-white/90 backdrop-blur-xl' : 'shadow-lg bg-white/75 backdrop-blur-md') : 'bg-transparent backdrop-blur-none shadow-none'
      ]"
      @mouseenter="showNavbar"
      @mouseleave="hideNavbar"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center shrink-0 group">
            <img 
              :src="logo" 
              alt="Cabinet Aka Sehr - Architecture & Immobilier de Luxe" 
              class="h-12 sm:h-12 lg:h-16 w-auto transition-all duration-500 group-hover:scale-105"
            />
          </RouterLink>

          <!-- Desktop Navigation -->
          <nav 
            class="hidden lg:flex items-center space-x-1 xl:space-x-2 transition-all duration-500 ease-in-out"
            :class="isNavbarVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'"
          >
            <RouterLink 
              to="/"
              class="nav-link"
            >
              Accueil
            </RouterLink>
            <RouterLink 
              v-for="link in navLinks" 
              :key="link.to"
              :to="link.to"
              class="nav-link"
              :class="{ 'admin-btn': link.isAdmin }"
            >
              {{ link.label }}
            </RouterLink>
          </nav>

          <!-- Mobile Menu Button -->
          <button 
            class="lg:hidden p-1.5 sm:p-2 rounded-lg transition-all duration-300"
            :class="!isNavbarVisible ? 'bg-white/20 hover:bg-white/30' : 'hover:bg-gray-100/80'"
            @click="mobileMenuOpen = true"
            aria-label="Menu"
          >
            <Menu class="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300" :class="isNavbarVisible ? 'text-gray-700' : 'text-white'" />
          </button>
        </div>
      </div>

      <!-- Bordure décorative subtile -->
      <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-200/30 to-transparent" :class="!isNavbarVisible ? 'opacity-0' : ''"></div>
    </header>

    <!-- Mobile Menu (Sheet) -->
    <Sheet :open="mobileMenuOpen" @update:open="mobileMenuOpen = $event">
      <SheetContent side="right" class="w-[280px] sm:w-[350px] bg-white/95 backdrop-blur-xl border-l border-white/20">
        <div class="flex flex-col h-full">
          <div class="flex items-center justify-between mb-6 sm:mb-8">
            <img :src="logo" alt="Cabinet Aka Sehr" class="h-8 sm:h-10 w-auto" />
            <button @click="mobileMenuOpen = false" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X class="w-5 h-5 text-gray-700" />
            </button>
          </div>
          
          <nav class="flex flex-col space-y-4 sm:space-y-5">
            <RouterLink 
              to="/"
              class="text-base sm:text-lg font-medium text-gray-700 hover:text-amber-500 transition-colors duration-300 px-4 py-2.5 rounded-lg hover:bg-amber-50 border-b border-gray-100/50"
              @click="mobileMenuOpen = false"
            >
              Accueil
            </RouterLink>
            
            <RouterLink 
              v-for="link in navLinks" 
              :key="link.to"
              :to="link.to"
              class="text-base sm:text-lg font-medium text-gray-700 hover:text-amber-500 transition-colors duration-300 px-4 py-2.5 rounded-lg hover:bg-amber-50"
              @click="mobileMenuOpen = false"
              :class="{ 'admin-btn-mobile': link.isAdmin }"
            >
              {{ link.label }}
            </RouterLink>
          </nav>
        </div>
      </SheetContent>
    </Sheet>

    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="relative w-full overflow-hidden">
      <div 
        class="relative w-full min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] bg-cover bg-center bg-no-repeat"
        :style="{ backgroundImage: `url(${footerImage})` }"
      >
        <div class="absolute inset-0 bg-black/40" />
        
        <div class="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 text-white">
            <div class="flex flex-col items-center sm:items-start">
              <img :src="logo" alt="Cabinet Aka Sehr" class="h-12 sm:h-14 w-auto mb-3 sm:mb-4 brightness-0 invert" />
              <p class="text-xs sm:text-sm text-white/70 mt-1 sm:mt-2 text-center sm:text-left">Architecture & Immobilier de Luxe</p>
            </div>

            <div class="flex flex-col items-center sm:items-start">
              <h3 class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/60 mb-3 sm:mb-4">Navigation</h3>
              <ul class="space-y-2 sm:space-y-3 text-center sm:text-left">
                <li>
                  <RouterLink 
                    to="/" 
                    class="text-white/80 hover:text-white transition-colors duration-300 text-xs sm:text-sm"
                  >
                    Accueil
                  </RouterLink>
                </li>
                <li v-for="link in footerLinks" :key="link.to">
                  <RouterLink 
                    :to="link.to" 
                    class="text-white/80 hover:text-white transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {{ link.label }}
                  </RouterLink>
                </li>
              </ul>
            </div>

            <div class="flex flex-col items-center sm:items-start">
              <h3 class="text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/60 mb-3 sm:mb-4">Contact</h3>
              <ul class="space-y-2 sm:space-y-3 text-center sm:text-left">
                <li v-for="link in contactLinks" :key="link.to">
                  <RouterLink 
                    :to="link.to" 
                    class="text-white/80 hover:text-white transition-colors duration-300 text-xs sm:text-sm"
                  >
                    {{ link.label }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </div>

          <div class="border-t border-white/10 mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8">
            <div class="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
              <p class="text-white/60 text-xs sm:text-sm text-center sm:text-left">
                &copy; 2026 Tous droits réservés.
              </p>
              <p class="text-white/40 text-[10px] sm:text-xs text-center sm:text-right">
                Architecture & Immobilier de Luxe
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-vue-next'

// ✅ IMPORT DES IMAGES
import logo from '@/assets/images/logoakasehrsansfond.png'
import footerImage from '@/assets/images/footerimage.jpg'

// États
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)
const isNavbarVisible = ref(true)

// Timer pour cacher la navbar
let hideTimeout: ReturnType<typeof setTimeout> | null = null

// Navigation links (sans Accueil car il est séparé)
const navLinks = [
  { label: 'À propos', to: '/about' },
  { label: 'Édifices religieux', to: '/edifices-religieux' },
  { label: 'Promotions immobilières', to: '/promotion-immobiliere' },
  { label: 'Projets résidentiels', to: '/residential-projects' },
  { label: 'Contact', to: '/contact' },
  { label: 'Administration', to: '/login', isAdmin: true },
]

const footerLinks = [
  { label: 'À propos', to: '/about' },
  { label: 'Édifices religieux', to: '/edifices-religieux' },
  { label: 'Promotions immobilières', to: '/promotion-immobiliere' },
  { label: 'Projets résidentiels', to: '/residential-projects' },
]

const contactLinks = [
  { label: 'Contact', to: '/contact' },
  { label: 'Administration', to: '/login' },
]

// Gestion du scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

// Afficher la navbar
const showNavbar = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  isNavbarVisible.value = true
}

// Cacher la navbar après un délai
const hideNavbar = () => {
  // Ne pas cacher si le menu mobile est ouvert
  if (mobileMenuOpen.value) return
  
  hideTimeout = setTimeout(() => {
    isNavbarVisible.value = false
  }, 1500) // Délai de 1.5s avant de cacher
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  isNavbarVisible.value = true
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
})
</script>

<style scoped>
/* ===== NAVBAR ===== */
.navbar-floating {
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

/* Survol - effet de brillance */
.navbar-floating:hover {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

/* ===== NAVIGATION LINKS ===== */
.nav-link {
  position: relative;
  padding: 0.5rem 1.2rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  letter-spacing: 0.04em;
  border-radius: 9999px;
}

/* Couleurs des liens en mode visible (fond blanc) */
.navbar-floating:not(.bg-transparent) .nav-link {
  color: #374151;
}

.navbar-floating:not(.bg-transparent) .nav-link:hover {
  color: #000000;
  background: rgba(245, 158, 11, 0.08);
}

/* Couleurs des liens en mode transparent (fond transparent) */
.navbar-floating.bg-transparent .nav-link {
  color: #ffffff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.navbar-floating.bg-transparent .nav-link:hover {
  color: #fbbf24;
  background: rgba(255, 255, 255, 0.15);
}

/* Soulignement animé */
.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(-50%);
  border-radius: 2px;
}

.nav-link:hover::after {
  width: 60%;
}

/* ===== ADMIN BUTTON ===== */
.admin-btn {
  padding: 0.5rem 1.8rem;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  margin-left: 0.5rem;
  letter-spacing: 0.05em;
}

/* Mode visible (fond blanc) */
.navbar-floating:not(.bg-transparent) .admin-btn {
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  color: white !important;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.navbar-floating:not(.bg-transparent) .admin-btn:hover {
  background: linear-gradient(135deg, #000000, #1a1a1a);
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
}

/* Mode transparent */
.navbar-floating.bg-transparent .admin-btn {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white !important;
  box-shadow: none;
}

.navbar-floating.bg-transparent .admin-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px) scale(1.02);
}

.admin-btn::after {
  display: none !important;
}

/* ===== MOBILE ADMIN BUTTON ===== */
.admin-btn-mobile {
  display: inline-block;
  background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
  color: white !important;
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.admin-btn-mobile:hover {
  background: linear-gradient(135deg, #000000, #1a1a1a);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

/* ===== SCROLLBAR ===== */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* ===== FOOTER ANIMATION ===== */
footer {
  opacity: 0;
  animation: footerFadeIn 1s ease forwards;
  animation-delay: 0.5s;
}

@keyframes footerFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== BOUTON MOBILE ===== */
button:focus-visible {
  outline: 2px solid #1a1a1a;
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .nav-link {
    font-size: 0.8125rem;
    padding: 0.4rem 0.8rem;
  }
}
</style>