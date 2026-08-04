<template>
  <div class="dashboard-page">
    <!-- En-tête du Dashboard -->
    <div class="mb-6 sm:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Tableau de bord
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Bienvenue dans l'espace d'administration du Cabinet Aka Sehr
          </p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full whitespace-nowrap">
            🗓️ {{ currentDate }}
          </span>
        </div>
      </div>
    </div>

    <!-- Cartes de statistiques -->
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="stat-card group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
      >
        <div class="flex items-center justify-between">
          <div class="min-w-0">
            <p class="text-xs sm:text-sm text-gray-500 font-medium truncate">{{ stat.label }}</p>
            <p class="text-xl sm:text-3xl font-bold text-gray-900 mt-1">{{ stat.value }}</p>
            <p class="text-[10px] sm:text-xs text-green-500 mt-1 sm:mt-2 flex items-center gap-1">
              <TrendingUp class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {{ stat.change }}
            </p>
          </div>
          <div class="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0" :class="stat.iconBg">
            <component :is="stat.icon" class="w-5 h-5 sm:w-7 sm:h-7" :class="stat.iconColor" />
          </div>
        </div>
      </div>
    </div>

    <!-- Graphiques -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <!-- Graphique des projets -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Projets par type</h3>
            <p class="text-xs sm:text-sm text-gray-500">Répartition des projets par catégorie</p>
          </div>
          <select class="text-xs sm:text-sm border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none w-full sm:w-auto">
            <option>Cette année</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
        <div class="h-48 sm:h-72">
          <Bar :data="barChartData" :options="barChartOptions" />
        </div>
      </div>

      <!-- Graphique des visites -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Évolution des projets</h3>
            <p class="text-xs sm:text-sm text-gray-500">Projets ajoutés par mois</p>
          </div>
          <select class="text-xs sm:text-sm border border-gray-200 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none w-full sm:w-auto">
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
        <div class="h-48 sm:h-72">
          <Line :data="lineChartData" :options="lineChartOptions" />
        </div>
      </div>
    </div>

    <!-- Graphiques supplémentaires -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <!-- Graphique donut -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Statut des projets</h3>
            <p class="text-xs sm:text-sm text-gray-500">État d'avancement</p>
          </div>
        </div>
        <div class="h-48 sm:h-64 flex items-center justify-center">
          <Doughnut :data="doughnutChartData" :options="doughnutChartOptions" />
        </div>
        <div class="flex justify-center gap-3 sm:gap-6 mt-3 sm:mt-4 flex-wrap">
          <div v-for="(item, index) in doughnutLabels" :key="index" class="flex items-center gap-1.5 sm:gap-2">
            <span class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" :style="{ backgroundColor: item.color }"></span>
            <span class="text-[10px] sm:text-xs text-gray-600">{{ item.label }}</span>
          </div>
        </div>
      </div>

      <!-- Graphique radar -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Performance</h3>
            <p class="text-xs sm:text-sm text-gray-500">Taux de satisfaction</p>
          </div>
        </div>
        <div class="h-48 sm:h-64 flex items-center justify-center">
          <Radar :data="radarChartData" :options="radarChartOptions" />
        </div>
      </div>

      <!-- Activité récente -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div class="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Activité récente</h3>
            <p class="text-xs sm:text-sm text-gray-500">Dernières interactions</p>
          </div>
          <RouterLink to="/admin/messages" class="text-xs sm:text-sm text-amber-500 hover:text-amber-600 font-medium whitespace-nowrap">
            Voir tout
          </RouterLink>
        </div>
        <div class="space-y-3 sm:space-y-4">
          <div v-for="(message, index) in recentMessages" :key="index" class="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
            <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
              <span class="text-amber-600 font-semibold text-xs sm:text-sm">{{ message.initials }}</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs sm:text-sm font-medium text-gray-900 truncate">{{ message.name }}</p>
              <p class="text-[10px] sm:text-xs text-gray-500 truncate">{{ message.message }}</p>
              <p class="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">{{ message.time }}</p>
            </div>
            <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 shrink-0 mt-1"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Projets récents -->
    <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900">Projets récents</h3>
          <p class="text-xs sm:text-sm text-gray-500">Derniers projets ajoutés ou modifiés</p>
        </div>
        <div class="flex items-center gap-2 sm:gap-3">
          <button class="text-xs sm:text-sm text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap">
            Voir tous
          </button>
          <RouterLink 
            to="/admin/projets/ajouter"
            class="inline-flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
          >
            <Plus class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Nouveau projet
          </RouterLink>
        </div>
      </div>

      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="w-full min-w-600px sm:min-w-full">
          <thead>
            <tr class="text-left text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th class="pb-2 sm:pb-3 font-medium pl-4 sm:pl-0">Projet</th>
              <th class="pb-2 sm:pb-3 font-medium hidden sm:table-cell">Type</th>
              <th class="pb-2 sm:pb-3 font-medium">Statut</th>
              <th class="pb-2 sm:pb-3 font-medium hidden sm:table-cell">Date</th>
              <th class="pb-2 sm:pb-3 font-medium text-right pr-4 sm:pr-0">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(project, index) in recentProjects" :key="index" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="py-3 sm:py-4 pl-4 sm:pl-0">
                <div class="flex items-center gap-2 sm:gap-3">
                  <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                    <Building2 class="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
                  </div>
                  <div class="min-w-0">
                    <p class="text-xs sm:text-sm font-medium text-gray-900 truncate">{{ project.name }}</p>
                    <p class="text-[10px] sm:text-xs text-gray-500 truncate">{{ project.location }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 sm:py-4 hidden sm:table-cell">
                <span class="text-xs sm:text-sm text-gray-600">{{ project.type }}</span>
              </td>
              <td class="py-3 sm:py-4">
                <span class="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap" :class="project.statusClass">
                  <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1 sm:mr-1.5" :class="project.statusDot"></span>
                  {{ project.status }}
                </span>
              </td>
              <td class="py-3 sm:py-4 hidden sm:table-cell">
                <span class="text-xs sm:text-sm text-gray-500">{{ project.date }}</span>
              </td>
              <td class="py-3 sm:py-4 text-right pr-4 sm:pr-0">
                <div class="flex items-center justify-end gap-1 sm:gap-2">
                  <button class="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <Eye class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                  <button class="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <Pencil class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-600" />
                  </button>
                  <button class="p-1 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 class="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { 
  LayoutDashboard,
  Church,
  Building2,
  Users,
  TrendingUp,
  Plus,
  Eye,
  Pencil,
  Trash2
} from 'lucide-vue-next'

// Chart.js imports
import { Bar, Line, Doughnut, Radar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler
} from 'chart.js'

// Enregistrement des composants Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  RadialLinearScale,
  Filler
)

// Date actuelle
const currentDate = ref('')

// Statistiques
const stats = [
  {
    label: 'Projets total',
    value: '48',
    change: '+12% depuis le mois dernier',
    icon: LayoutDashboard,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-500'
  },
  {
    label: 'Édifices religieux',
    value: '12',
    change: '+3 nouveaux',
    icon: Church,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500'
  },
  {
    label: 'Promotions',
    value: '18',
    change: '+5 en cours',
    icon: Building2,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-500'
  },
  {
    label: 'Clients',
    value: '156',
    change: '+8 ce mois',
    icon: Users,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-500'
  }
]

// ===== GRAPHIQUE BARRES =====
const barChartData = {
  labels: ['Édifices religieux', 'Promotions', 'Projets résidentiels', 'Rénovations', 'Autres'],
  datasets: [
    {
      label: 'Projets 2026',
      data: [12, 18, 10, 5, 3],
      backgroundColor: [
        'rgba(251, 191, 36, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(168, 85, 247, 0.8)',
        'rgba(236, 72, 153, 0.8)'
      ],
      borderColor: [
        'rgb(251, 191, 36)',
        'rgb(59, 130, 246)',
        'rgb(34, 197, 94)',
        'rgb(168, 85, 247)',
        'rgb(236, 72, 153)'
      ],
      borderWidth: 2,
      borderRadius: 8
    }
  ]
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

// ===== GRAPHIQUE LIGNE =====
const lineChartData = {
  labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
  datasets: [
    {
      label: 'Projets ajoutés',
      data: [2, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 15],
      borderColor: 'rgb(251, 191, 36)',
      backgroundColor: 'rgba(251, 191, 36, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgb(251, 191, 36)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      pointRadius: 4
    },
    {
      label: 'Projets terminés',
      data: [1, 2, 2, 4, 3, 5, 4, 7, 6, 8, 7, 10],
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgb(34, 197, 94)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      pointRadius: 4
    }
  ]
}

const lineChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 10
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}

// ===== GRAPHIQUE DONUT =====
const doughnutChartData = {
  labels: ['En cours', 'Terminés', 'À venir'],
  datasets: [
    {
      data: [18, 22, 8],
      backgroundColor: [
        'rgba(251, 191, 36, 0.8)',
        'rgba(34, 197, 94, 0.8)',
        'rgba(59, 130, 246, 0.8)'
      ],
      borderColor: [
        'rgb(251, 191, 36)',
        'rgb(34, 197, 94)',
        'rgb(59, 130, 246)'
      ],
      borderWidth: 2
    }
  ]
}

const doughnutLabels = [
  { label: 'En cours', color: 'rgba(251, 191, 36, 0.8)' },
  { label: 'Terminés', color: 'rgba(34, 197, 94, 0.8)' },
  { label: 'À venir', color: 'rgba(59, 130, 246, 0.8)' }
]

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '70%',
  plugins: {
    legend: {
      display: false
    }
  }
}

// ===== GRAPHIQUE RADAR =====
const radarChartData = {
  labels: ['Qualité', 'Délais', 'Budget', 'Satisfaction', 'Innovation', 'Durabilité'],
  datasets: [
    {
      label: 'Performance 2026',
      data: [95, 85, 78, 92, 88, 90],
      backgroundColor: 'rgba(251, 191, 36, 0.2)',
      borderColor: 'rgb(251, 191, 36)',
      pointBackgroundColor: 'rgb(251, 191, 36)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      pointRadius: 5
    },
    {
      label: 'Objectif 2027',
      data: [98, 92, 85, 95, 92, 95],
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgb(59, 130, 246)',
      pointBackgroundColor: 'rgb(59, 130, 246)',
      pointBorderColor: 'white',
      pointBorderWidth: 2,
      pointRadius: 5
    }
  ]
}

const radarChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        font: {
          size: 9
        }
      }
    }
  },
  scales: {
    r: {
      beginAtZero: true,
      max: 100,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      },
      pointLabels: {
        font: {
          size: 9
        }
      }
    }
  }
}

// Derniers messages
const recentMessages = [
  {
    name: 'Jean Dupont',
    initials: 'JD',
    message: 'Bonjour, je souhaite avoir des informations...',
    time: 'Il y a 5 min'
  },
  {
    name: 'Marie Kouadio',
    initials: 'MK',
    message: 'Merci pour votre réponse rapide...',
    time: 'Il y a 2 heures'
  },
  {
    name: 'Paul Assi',
    initials: 'PA',
    message: 'Je suis intéressé par la promotion...',
    time: 'Il y a 3 heures'
  }
]

// Projets récents
const recentProjects = [
  {
    name: 'Cathédrale Saint-Esprit',
    location: 'Grand-Bassam',
    type: 'Édifice religieux',
    status: 'En cours',
    statusClass: 'bg-amber-50 text-amber-700',
    statusDot: 'bg-amber-500',
    date: '15/07/2026'
  },
  {
    name: 'Cité des Grâces',
    location: 'Bingerville',
    type: 'Promotion immobilière',
    status: 'Terminé',
    statusClass: 'bg-green-50 text-green-700',
    statusDot: 'bg-green-500',
    date: '10/07/2026'
  },
  {
    name: 'Résidence Ambassade du Gabon',
    location: 'Cocody',
    type: 'Projet résidentiel',
    status: 'En cours',
    statusClass: 'bg-amber-50 text-amber-700',
    statusDot: 'bg-amber-500',
    date: '05/07/2026'
  },
  {
    name: 'Paroisse Sainte Bernadette',
    location: 'Marcory',
    type: 'Édifice religieux',
    status: 'À venir',
    statusClass: 'bg-blue-50 text-blue-700',
    statusDot: 'bg-blue-500',
    date: '01/07/2026'
  }
]

onMounted(() => {
  const now = new Date()
  currentDate.value = now.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})
</script>

<style scoped>
.dashboard-page {
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

.stat-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}

/* Scrollbar de la table */
.overflow-x-auto::-webkit-scrollbar {
  height: 4px;
}

.overflow-x-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}

/* Responsive mobile */
@media (max-width: 480px) {
  .stat-card .text-xl {
    font-size: 1.25rem;
  }
}
</style>