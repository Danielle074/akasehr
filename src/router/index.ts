import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import Layout from '@/layouts/Layout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'

// Pages publiques
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import EdificesReligieux from '@/views/EdificesReligieux.vue'
import PromotionImmobiliere from '@/views/PromotionImmobiliere.vue'
import ResidentialProjects from '@/views/ResidentialProjects.vue'
import Contact from '@/views/Contact.vue'
import Login from '@/views/Login.vue'

// Pages Admin
import Dashboard from '@/components/admin/Dashboard.vue'
import Statisques from '@/components/admin/Statisques.vue'
import EdificesAdmin from '@/components/admin/Edifices.vue'  
import EdificesAjouter from '@/components/admin/EdificesAjouter.vue'
import PromotionsAdmin from '@/components/admin/Promotions.vue'
import PromotionsAjouter from '@/components/admin/PromotionsAjouter.vue'
import Projets from '@/components/admin/Projets.vue'
import ProjetsAjouter from '@/components/admin/ProjetsAjouter.vue'
import GalerieAdmin from '@/components/admin/Galerie.vue'
import GalerieAlbums from '@/components/admin/GalerieAlbums.vue'
import ContactAdmin from '@/components/admin/Contact.vue'
import Messages from '@/components/admin/Messages.vue'
import Temoignages from '@/components/admin/Temoignages.vue'
import Medias from '@/components/admin/Medias.vue'
import Parametres from '@/components/admin/Parametres.vue'
import Administrateurs from '@/components/admin/Administrateurs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    // =========================
    // SITE PUBLIC
    // =========================
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
        },
        {
          path: 'about',
          name: 'About',
          component: About,
        },
        {
          path: 'edifices-religieux',
          name: 'EdificesReligieux',
          component: EdificesReligieux,
        },
        {
          path: 'promotion-immobiliere',
          name: 'PromotionImmobiliere',
          component: PromotionImmobiliere,
        },
        {
          path: 'residential-projects',
          name: 'ResidentialProjects',
          component: ResidentialProjects,
        },
        {
          path: 'contact',
          name: 'Contact',
          component: Contact,
        },
      ],
    },

    // =========================
    // AUTHENTIFICATION
    // =========================
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    // =========================
    // ADMINISTRATION
    // =========================
    {
      path: '/admin',
      component: AdminLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          redirect: '/admin/dashboard',
        },
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: Dashboard,
        },
        {
          path: 'edifices',
          component: EdificesAdmin
        },
        {
          path: 'edifices/ajouter',
          component: EdificesAjouter
        },
        {
          path: 'projets',
          component: Projets
        },
        {
          path: 'projets/ajouter',
          component: ProjetsAjouter
        },
        {
          path: 'promotions/ajouter',
          component: PromotionsAjouter
        },
        {
          path: 'promotions',
          component: PromotionsAdmin
        },
        {
          path: 'statistiques',
          name: 'AdminStatisques',
          component: Statisques,
        },
        {
          path: 'galerie',
          component: GalerieAdmin
        },
        {
          path: 'galerie/albums',
          component: GalerieAlbums
        },
        {
          path: 'contact',
          component: ContactAdmin
        },
        {
          path: 'messages',
          component: Messages
        },
        {
          path: 'temoignages',
          component: Temoignages
        },
        {
          path: 'medias',
          component: Medias
        },
        {
          path: 'parametres',
          component: Parametres
        },
        {
          path: 'administrateurs',
          component: Administrateurs
        }
      ],
    },

    // =========================
    // 404
    // =========================
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth) {
    const isAuthenticated =
      localStorage.getItem('isAuthenticated') === 'true'

    if (!isAuthenticated) {
      return next('/login')
    }
  }

  next()
})

export default router