<template>
  <div class="sidebar-wrapper">
    <!-- Bouton hamburger mobile -->
    <button 
      @click="toggleSidebar"
      class="lg:hidden fixed top-4 left-4 z-60 p-3 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl"
      aria-label="Menu"
    >
      <Menu v-if="!isMobileOpen" class="w-6 h-6" />
      <X v-else class="w-6 h-6" />
    </button>

    <!-- Overlay mobile -->
    <div 
      v-if="isMobileOpen"
      class="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
      @click="closeSidebar"
    ></div>

    <!-- Sidebar -->
    <aside 
      class="sidebar fixed top-0 left-0 h-full bg-gray-900 text-white transition-all duration-300 z-50 shadow-2xl"
      :class="[
        isCollapsed ? 'w-20' : 'w-72',
        isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      ]"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <!-- Logo -->
      <div class="flex items-center justify-center h-20 border-b border-gray-800 px-4">
        <RouterLink to="/admin/dashboard" class="block" @click="closeSidebar">
          <img 
            v-if="!isCollapsed" 
            :src="logo" 
            alt="Aka Sehr" 
            class="h-12 w-auto brightness-0 invert transition-transform duration-300 hover:scale-105"
          />
          <img 
            v-else 
            :src="logo" 
            alt="Aka Sehr" 
            class="h-10 w-auto brightness-0 invert transition-transform duration-300 hover:scale-105"
          />
        </RouterLink>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 px-3">
        <ul class="space-y-1">
          <!-- Tableau de bord -->
          <li>
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <LayoutDashboard class="w-3 h-3" />
              Tableau de bord
            </p>
            <RouterLink 
              to="/admin/dashboard"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <LayoutDashboard class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Dashboard</span>
            </RouterLink>

            <RouterLink 
              to="/admin/statistiques"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <BarChart3 class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Statistiques</span>
            </RouterLink>
          </li>

          <!-- Édifices religieux -->
          <li class="mt-4">
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <Church class="w-3 h-3" />
              Édifices religieux
            </p>
            <RouterLink 
              to="/admin/edifices/ajouter"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <PlusCircle class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Ajouter un édifice</span>
            </RouterLink>

            <RouterLink 
              to="/admin/edifices"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <Church class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Liste des édifices</span>
            </RouterLink>
          </li>

          <!-- Promotions immobilières -->
          <li class="mt-4">
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <Building2 class="w-3 h-3" />
              Promotions immobilières
            </p>
            <RouterLink 
              to="/admin/promotions/ajouter"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <PlusCircle class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Ajouter une promotion</span>
            </RouterLink>

            <RouterLink 
              to="/admin/promotions"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <Building2 class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Toutes les promotions</span>
            </RouterLink>
          </li>

          <!-- Projets résidentiels -->
          <li class="mt-4">
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <Home class="w-3 h-3" />
              Projets résidentiels
            </p>
            <RouterLink 
              to="/admin/projets/ajouter"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <PlusCircle class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Ajouter un projet</span>
            </RouterLink>

            <RouterLink 
              to="/admin/projets"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <Home class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Liste des projets</span>
            </RouterLink>
          </li>

          <!-- Galerie -->
          <li class="mt-4">
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <Image class="w-3 h-3" />
              Galerie
            </p>
            <RouterLink 
              to="/admin/galerie"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <Image class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Photos</span>
            </RouterLink>

            <RouterLink 
              to="/admin/galerie/albums"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <FolderOpen class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Albums</span>
            </RouterLink>
          </li>

          <!-- Contact -->
          <li class="mt-4">
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <Phone class="w-3 h-3" />
              Contact
            </p>
            <RouterLink 
              to="/admin/contact"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <Settings class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Modifier les infos</span>
            </RouterLink>

            <RouterLink 
              to="/admin/messages"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <MessageSquare class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Messages</span>
              <span v-if="!isCollapsed" class="ml-auto bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full relative z-10 group-hover:scale-110 transition-all duration-300">5</span>
            </RouterLink>
          </li>

          <!-- Témoignages -->
          <li class="mt-4">
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <Star class="w-3 h-3" />
              Témoignages
            </p>
            <RouterLink 
              to="/admin/temoignages"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <Star class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Tous les témoignages</span>
            </RouterLink>
          </li>

          <!-- Médias -->
          <li class="mt-4">
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <FolderArchive class="w-3 h-3" />
              Médias
            </p>
            <RouterLink 
              to="/admin/medias"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <FolderArchive class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Bibliothèque</span>
            </RouterLink>
          </li>

          <!-- Paramètres -->
          <li class="mt-4">
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <Settings class="w-3 h-3" />
              Paramètres
            </p>
            <RouterLink 
              to="/admin/parametres"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <Settings class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Paramètres du site</span>
            </RouterLink>
          </li>

          <!-- Administrateurs -->
          <li class="mt-4">
            <p v-if="!isCollapsed" class="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 py-2 flex items-center gap-2">
              <Users class="w-3 h-3" />
              Administrateurs
            </p>
            <RouterLink 
              to="/admin/administrateurs"
              class="sidebar-link group relative flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 transition-all duration-300 overflow-hidden"
              :class="isCollapsed ? 'justify-center' : ''"
              active-class="bg-gray-800 text-white"
              @click="closeSidebar"
            >
              <Users class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-amber-400 transition-all duration-300" />
              <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">Gestion des admins</span>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <!-- Footer avec déconnexion -->
      <div class="border-t border-gray-800 p-4">
        <button 
          @click="handleLogout"
          class="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-300 transition-all duration-300 group relative overflow-hidden"
          :class="isCollapsed ? 'justify-center' : ''"
        >
          <LogOut class="w-5 h-5 shrink-0 relative z-10 group-hover:scale-110 group-hover:text-red-400 transition-all duration-300" />
          <span v-if="!isCollapsed" class="text-sm font-medium relative z-10 group-hover:text-red-400 transition-all duration-300">Déconnexion</span>
        </button>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { 
  LayoutDashboard,
  BarChart3,
  PlusCircle,
  Church,
  Building2,
  Home,
  Image,
  FolderOpen,
  Settings,
  Phone,
  MessageSquare,
  Star,
  FolderArchive,
  Users,
  LogOut,
  Menu,
  X
} from 'lucide-vue-next'

import logo from '@/assets/images/logoakasehrsansfond.png'

const router = useRouter()
const isCollapsed = ref(true)
const isMobileOpen = ref(false)
const isMobile = ref(window.innerWidth < 1024)

// Gestion du redimensionnement
const handleResize = () => {
  isMobile.value = window.innerWidth < 1024
  if (!isMobile.value) {
    isMobileOpen.value = false
    isCollapsed.value = true
  }
}

// Toggle sidebar mobile
const toggleSidebar = () => {
  isMobileOpen.value = !isMobileOpen.value
}

// Fermer la sidebar
const closeSidebar = () => {
  if (isMobile.value) {
    isMobileOpen.value = false
  }
}

// Gestion du hover sur desktop
const handleMouseEnter = () => {
  if (!isMobile.value) {
    isCollapsed.value = false
  }
}

const handleMouseLeave = () => {
  if (!isMobile.value) {
    isCollapsed.value = true
  }
}

// Déconnexion
const handleLogout = () => {
  localStorage.removeItem('isAuthenticated')
  localStorage.removeItem('rememberMe')
  router.push('/login')
}

// Watch pour fermer la sidebar quand on clique sur un lien
watch(() => router.currentRoute.value.path, () => {
  closeSidebar()
})

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Styles de la sidebar */
.sidebar {
  overflow: hidden;
  box-shadow: 4px 0 30px rgba(0, 0, 0, 0.3);
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar::-webkit-scrollbar {
  width: 4px;
}

.sidebar::-webkit-scrollbar-track {
  background: #1a1a1a;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #4a4a4a;
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #6a6a6a;
}

.sidebar * {
  transition: all 0.2s ease;
}

/* Styles des liens */
.sidebar-link {
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.sidebar-link::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(251, 191, 36, 0.1));
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 0.5rem;
}

.sidebar-link:hover::before {
  opacity: 1;
}

.sidebar-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  transition: all 0.3s ease;
  transform: translateX(-50%);
  border-radius: 2px;
}

.sidebar-link:hover::after {
  width: 80%;
}

.sidebar-link:hover .w-5.h-5 {
  animation: iconPulse 0.6s ease;
}

@keyframes iconPulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.1);
  }
}

.sidebar-link:hover span.text-sm {
  text-shadow: 0 0 20px rgba(251, 191, 36, 0.2);
}

/* Active state */
.sidebar-link.router-link-active {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}

.sidebar-link.router-link-active .w-5.h-5 {
  color: #fbbf24;
}

.sidebar-link.router-link-active::after {
  width: 80%;
}

/* Mobile styles */
@media (max-width: 1023px) {
  .sidebar {
    width: 280px !important;
    transform: translateX(-100%);
  }
  
  .sidebar.translate-x-0 {
    transform: translateX(0);
  }
}

/* Bouton hamburger animation */
button {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover {
  transform: scale(1.05);
}

button:active {
  transform: scale(0.95);
}
</style>