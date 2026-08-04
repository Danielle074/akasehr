<template>
  <div class="statistiques-page">
    <!-- En-tête -->
    <div class="mb-6 sm:mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Statistiques
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Analyse détaillée des performances du cabinet
          </p>
        </div>
        <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-xl text-xs sm:text-sm text-gray-600 hover:bg-gray-50 transition-colors whitespace-nowrap">
            <Download class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Exporter
          </button>
          <select class="text-xs sm:text-sm border border-gray-200 rounded-xl px-2 sm:px-4 py-1.5 sm:py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none">
            <option>2026</option>
            <option>2025</option>
            <option>2024</option>
          </select>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
      <div v-for="(kpi, index) in kpis" :key="index" class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div class="flex items-start justify-between">
          <div class="min-w-0">
            <p class="text-[10px] sm:text-sm text-gray-500 font-medium truncate">{{ kpi.label }}</p>
            <p class="text-xl sm:text-3xl font-bold text-gray-900 mt-1">{{ kpi.value }}</p>
            <p class="text-[10px] sm:text-xs mt-1 sm:mt-2 flex items-center gap-1" :class="kpi.trend > 0 ? 'text-green-500' : 'text-red-500'">
              <TrendingUp v-if="kpi.trend > 0" class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <TrendingDown v-else class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              {{ kpi.trend > 0 ? '+' : '' }}{{ kpi.trend }}%
            </p>
          </div>
          <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0" :class="kpi.bgColor">
            <component :is="kpi.icon" class="w-4 h-4 sm:w-6 sm:h-6" :class="kpi.iconColor" />
          </div>
        </div>
        <div class="mt-3 sm:mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-1000" :class="kpi.progressColor" :style="{ width: kpi.progress + '%' }"></div>
        </div>
        <p class="text-[10px] sm:text-xs text-gray-400 mt-1.5 sm:mt-2">Objectif: {{ kpi.target }}</p>
      </div>
    </div>

    <!-- Graphiques principaux -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <!-- Graphique des projets -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Projets par catégorie</h3>
            <p class="text-xs sm:text-sm text-gray-500">Répartition annuelle</p>
          </div>
          <div class="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <button class="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-amber-500 text-white rounded-lg">2026</button>
            <button class="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">2025</button>
            <button class="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">2024</button>
          </div>
        </div>
        <div class="h-48 sm:h-80">
          <Bar :data="barChartData" :options="barChartOptions" />
        </div>
      </div>

      <!-- Graphique des tendances -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-gray-900">Tendance des projets</h3>
            <p class="text-xs sm:text-sm text-gray-500">Évolution mensuelle</p>
          </div>
          <div class="flex items-center gap-2 sm:gap-3">
            <span class="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
              <span class="w-2 h-0.5 sm:w-3 bg-amber-400"></span> Ajoutés
            </span>
            <span class="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
              <span class="w-2 h-0.5 sm:w-3 bg-green-400"></span> Terminés
            </span>
          </div>
        </div>
        <div class="h-48 sm:h-80">
          <Line :data="lineChartData" :options="lineChartOptions" />
        </div>
      </div>
    </div>

    <!-- Statistiques détaillées -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
      <!-- Répartition des types -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Répartition des types</h3>
        <div class="space-y-3 sm:space-y-4">
          <div v-for="(item, index) in typeDistribution" :key="index">
            <div class="flex items-center justify-between text-xs sm:text-sm mb-0.5 sm:mb-1">
              <span class="text-gray-600">{{ item.label }}</span>
              <span class="font-medium text-gray-900">{{ item.value }}</span>
            </div>
            <div class="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-1000" :style="{ width: item.percentage + '%', backgroundColor: item.color }"></div>
            </div>
          </div>
        </div>
        <div class="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100">
          <div class="flex items-center justify-between text-xs sm:text-sm">
            <span class="text-gray-500">Total</span>
            <span class="font-bold text-gray-900">48</span>
          </div>
        </div>
      </div>

      <!-- Performance par région -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Performance par région</h3>
        <div class="space-y-3 sm:space-y-4">
          <div v-for="(region, index) in regionPerformance" :key="index">
            <div class="flex items-center justify-between text-xs sm:text-sm mb-0.5 sm:mb-1">
              <span class="text-gray-600">{{ region.name }}</span>
              <span class="font-medium text-gray-900">{{ region.value }}%</span>
            </div>
            <div class="h-1.5 sm:h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-1000" :style="{ width: region.value + '%', backgroundColor: region.color }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Satisfaction clients -->
      <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
        <h3 class="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Satisfaction clients</h3>
        <div class="flex flex-col items-center justify-center h-40 sm:h-48">
          <div class="relative w-32 h-32 sm:w-48 sm:h-48">
            <Doughnut :data="satisfactionChartData" :options="satisfactionChartOptions" />
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <p class="text-2xl sm:text-3xl font-bold text-gray-900">92%</p>
                <p class="text-[10px] sm:text-xs text-gray-500">Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center gap-2 sm:gap-4 mt-3 sm:mt-4 flex-wrap">
          <div v-for="(item, index) in satisfactionLabels" :key="index" class="flex items-center gap-1">
            <span class="w-2 h-2 sm:w-3 sm:h-3 rounded-full" :style="{ backgroundColor: item.color }"></span>
            <span class="text-[10px] sm:text-xs text-gray-600">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Tableau des performances -->
    <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h3 class="text-base sm:text-lg font-semibold text-gray-900">Détail des performances</h3>
          <p class="text-xs sm:text-sm text-gray-500">Indicateurs clés par projet</p>
        </div>
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <input 
            type="text" 
            placeholder="Rechercher..."
            class="text-xs sm:text-sm border border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none w-full sm:w-auto"
          />
          <select class="text-xs sm:text-sm border border-gray-200 rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none w-full sm:w-auto">
            <option>Tous les types</option>
            <option>Édifices religieux</option>
            <option>Promotions</option>
            <option>Projets résidentiels</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto -mx-4 sm:mx-0">
        <table class="w-full min-w-700px sm:min-w-full">
          <thead>
            <tr class="text-left text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider border-b border-gray-100">
              <th class="pb-2 sm:pb-3 font-medium pl-4 sm:pl-0">Projet</th>
              <th class="pb-2 sm:pb-3 font-medium hidden sm:table-cell">Type</th>
              <th class="pb-2 sm:pb-3 font-medium">Avancement</th>
              <th class="pb-2 sm:pb-3 font-medium hidden lg:table-cell">Budget</th>
              <th class="pb-2 sm:pb-3 font-medium hidden md:table-cell">Délai</th>
              <th class="pb-2 sm:pb-3 font-medium hidden sm:table-cell">Satisfaction</th>
              <th class="pb-2 sm:pb-3 font-medium text-right pr-4 sm:pr-0">Statut</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="(project, index) in performanceData" :key="index" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="py-3 sm:py-4 pl-4 sm:pl-0">
                <div class="flex items-center gap-2 sm:gap-3">
                  <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg" :style="{ backgroundColor: project.color }"></div>
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
                <div class="flex items-center gap-1.5 sm:gap-2">
                  <div class="w-12 sm:w-20 h-1 sm:h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full rounded-full" :style="{ width: project.progress + '%', backgroundColor: project.progressColor }"></div>
                  </div>
                  <span class="text-[10px] sm:text-xs font-medium text-gray-600">{{ project.progress }}%</span>
                </div>
              </td>
              <td class="py-3 sm:py-4 hidden lg:table-cell">
                <span class="text-xs sm:text-sm text-gray-600">{{ project.budget }}</span>
              </td>
              <td class="py-3 sm:py-4 hidden md:table-cell">
                <span class="text-xs sm:text-sm" :class="project.delayStatus === 'on-time' ? 'text-green-600' : project.delayStatus === 'delayed' ? 'text-red-600' : 'text-amber-600'">
                  {{ project.delay }}
                </span>
              </td>
              <td class="py-3 sm:py-4 hidden sm:table-cell">
                <div class="flex">
                  <Star v-for="i in 5" :key="i" class="w-3 h-3 sm:w-3.5 sm:h-3.5" :class="i <= project.satisfaction ? 'text-amber-400 fill-amber-400' : 'text-gray-300'" />
                </div>
              </td>
              <td class="py-3 sm:py-4 text-right pr-4 sm:pr-0">
                <span class="inline-flex items-center px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-xs font-medium whitespace-nowrap" :class="project.statusClass">
                  <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full mr-1 sm:mr-1.5" :class="project.statusDot"></span>
                  {{ project.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  TrendingUp, 
  TrendingDown, 
  Download,
  LayoutDashboard,
  Building2,
  Home,
  Star
} from 'lucide-vue-next'

// Chart.js imports
import { Bar, Line, Doughnut } from 'vue-chartjs'
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
  Filler
} from 'chart.js'

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
  Filler
)

// KPI Cards
const kpis = [
  {
    label: 'Projets total',
    value: '48',
    trend: 12,
    progress: 85,
    target: '50 projets',
    icon: LayoutDashboard,
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-500',
    progressColor: 'bg-amber-500'
  },
  {
    label: 'Taux de réussite',
    value: '92%',
    trend: 5,
    progress: 92,
    target: '95%',
    icon: TrendingUp,
    bgColor: 'bg-green-50',
    iconColor: 'text-green-500',
    progressColor: 'bg-green-500'
  },
  {
    label: 'Clients satisfaits',
    value: '156',
    trend: 8,
    progress: 78,
    target: '200 clients',
    icon: Home,
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-500',
    progressColor: 'bg-blue-500'
  },
  {
    label: 'Projets en cours',
    value: '18',
    trend: -3,
    progress: 60,
    target: '30 projets',
    icon: Building2,
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-500',
    progressColor: 'bg-purple-500'
  }
]

// ===== GRAPHIQUE BARRES =====
const barChartData = {
  labels: ['Édifices religieux', 'Promotions', 'Projets résidentiels', 'Rénovations', 'Autres'],
  datasets: [
    {
      label: '2024',
      data: [8, 12, 6, 3, 2],
      backgroundColor: 'rgba(251, 191, 36, 0.6)',
      borderColor: 'rgb(251, 191, 36)',
      borderWidth: 2,
      borderRadius: 6
    },
    {
      label: '2025',
      data: [10, 15, 8, 4, 2],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 2,
      borderRadius: 6
    },
    {
      label: '2026',
      data: [12, 18, 10, 5, 3],
      backgroundColor: 'rgba(34, 197, 94, 0.6)',
      borderColor: 'rgb(34, 197, 94)',
      borderWidth: 2,
      borderRadius: 6
    }
  ]
}

const barChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        pointStyle: 'circle',
        font: { size: 10 }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0, 0, 0, 0.05)' }
    },
    x: {
      grid: { display: false }
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
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(0, 0, 0, 0.05)' }
    },
    x: {
      grid: { display: false }
    }
  }
}

// ===== RÉPARTITION DES TYPES =====
const typeDistribution = [
  { label: 'Édifices religieux', value: 12, percentage: 25, color: '#f59e0b' },
  { label: 'Promotions immobilières', value: 18, percentage: 37.5, color: '#3b82f6' },
  { label: 'Projets résidentiels', value: 10, percentage: 20.8, color: '#22c55e' },
  { label: 'Rénovations', value: 5, percentage: 10.4, color: '#a855f7' },
  { label: 'Autres', value: 3, percentage: 6.3, color: '#ec4899' }
]

// ===== PERFORMANCE PAR RÉGION =====
const regionPerformance = [
  { name: 'Abidjan', value: 92, color: '#f59e0b' },
  { name: 'Grand-Bassam', value: 85, color: '#3b82f6' },
  { name: 'Bingerville', value: 78, color: '#22c55e' },
  { name: 'Bonoumin', value: 70, color: '#a855f7' },
  { name: 'Marcory', value: 65, color: '#ec4899' }
]

// ===== SATISFACTION CLIENTS =====
const satisfactionChartData = {
  labels: ['Très satisfait', 'Satisfait', 'Neutre'],
  datasets: [
    {
      data: [65, 27, 8],
      backgroundColor: ['rgba(251, 191, 36, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(156, 163, 175, 0.6)'],
      borderColor: ['rgb(251, 191, 36)', 'rgb(59, 130, 246)', 'rgb(156, 163, 175)'],
      borderWidth: 2
    }
  ]
}

const satisfactionLabels = [
  { label: 'Très satisfait', color: 'rgba(251, 191, 36, 0.8)' },
  { label: 'Satisfait', color: 'rgba(59, 130, 246, 0.8)' },
  { label: 'Neutre', color: 'rgba(156, 163, 175, 0.6)' }
]

const satisfactionChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: {
      display: false
    }
  }
}

// ===== PERFORMANCE DATA =====
const performanceData = [
  {
    name: 'Cathédrale Saint-Esprit',
    location: 'Grand-Bassam',
    type: 'Édifice religieux',
    progress: 75,
    progressColor: '#f59e0b',
    budget: '850 M FCFA',
    delay: 'En avance',
    delayStatus: 'on-time',
    satisfaction: 5,
    status: 'En cours',
    statusClass: 'bg-amber-50 text-amber-700',
    statusDot: 'bg-amber-500',
    color: '#f59e0b'
  },
  {
    name: 'Cité des Grâces',
    location: 'Bingerville',
    type: 'Promotion immobilière',
    progress: 100,
    progressColor: '#22c55e',
    budget: '1.2 Mds FCFA',
    delay: 'Livré',
    delayStatus: 'on-time',
    satisfaction: 5,
    status: 'Terminé',
    statusClass: 'bg-green-50 text-green-700',
    statusDot: 'bg-green-500',
    color: '#22c55e'
  },
  {
    name: 'Résidence Ambassade du Gabon',
    location: 'Cocody',
    type: 'Projet résidentiel',
    progress: 60,
    progressColor: '#3b82f6',
    budget: '950 M FCFA',
    delay: 'Retard 2 semaines',
    delayStatus: 'delayed',
    satisfaction: 4,
    status: 'En cours',
    statusClass: 'bg-amber-50 text-amber-700',
    statusDot: 'bg-amber-500',
    color: '#3b82f6'
  },
  {
    name: 'Paroisse Sainte Bernadette',
    location: 'Marcory',
    type: 'Édifice religieux',
    progress: 30,
    progressColor: '#a855f7',
    budget: '600 M FCFA',
    delay: 'À venir',
    delayStatus: 'pending',
    satisfaction: 0,
    status: 'À venir',
    statusClass: 'bg-blue-50 text-blue-700',
    statusDot: 'bg-blue-500',
    color: '#a855f7'
  },
  {
    name: 'Promotion Les Jardins',
    location: 'Abidjan',
    type: 'Promotion immobilière',
    progress: 90,
    progressColor: '#22c55e',
    budget: '1.5 Mds FCFA',
    delay: 'En avance',
    delayStatus: 'on-time',
    satisfaction: 5,
    status: 'Terminé',
    statusClass: 'bg-green-50 text-green-700',
    statusDot: 'bg-green-500',
    color: '#22c55e'
  }
]
</script>

<style scoped>
.statistiques-page {
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
  .statistiques-page .text-xl {
    font-size: 1.1rem;
  }
}
</style>