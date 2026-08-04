<template>
  <div class="messages-page">
    <!-- En-tête -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-light text-gray-900">
            Messages
          </h1>
          <p class="text-sm sm:text-base text-gray-500 mt-1">
            Gérez tous les messages reçus depuis le formulaire de contact
          </p>
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
            {{ unreadCount }} non lus
          </span>
          <button 
            @click="markAllAsRead"
            class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Tout marquer comme lu
          </button>
        </div>
      </div>
    </div>

    <!-- Statistiques -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-amber-500">{{ messages.length }}</p>
        <p class="text-xs text-gray-500">Total</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-red-500">{{ unreadCount }}</p>
        <p class="text-xs text-gray-500">Non lus</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-green-500">{{ readCount }}</p>
        <p class="text-xs text-gray-500">Lus</p>
      </div>
      <div class="bg-white rounded-xl p-4 shadow-lg border border-gray-100 text-center">
        <p class="text-2xl font-bold text-blue-500">{{ todayCount }}</p>
        <p class="text-xs text-gray-500">Aujourd'hui</p>
      </div>
    </div>

    <!-- Filtres -->
    <div class="flex flex-wrap items-center gap-3 mb-6">
      <button 
        @click="filter = 'all'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        :class="filter === 'all' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        Tous
      </button>
      <button 
        @click="filter = 'unread'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        :class="filter === 'unread' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        Non lus
      </button>
      <button 
        @click="filter = 'read'"
        class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300"
        :class="filter === 'read' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        Lus
      </button>
      <div class="flex-1"></div>
      <input 
        type="text"
        v-model="searchQuery"
        placeholder="Rechercher..."
        class="text-sm border border-gray-200 rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none w-full sm:w-48"
      />
    </div>

    <!-- Liste des messages -->
    <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div v-if="filteredMessages.length > 0" class="divide-y divide-gray-100">
        <div 
          v-for="(message, index) in filteredMessages" 
          :key="message.id"
          class="p-4 sm:p-6 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
          :class="{ 'bg-amber-50/50 hover:bg-amber-50': !message.read }"
          @click="openMessage(index)"
        >
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div class="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
              <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0" :class="!message.read ? 'bg-amber-100' : 'bg-gray-100'">
                <span class="font-semibold text-sm" :class="!message.read ? 'text-amber-600' : 'text-gray-500'">
                  {{ message.initials }}
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <p class="text-sm font-medium text-gray-900">{{ message.name }}</p>
                  <span v-if="!message.read" class="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                  <span class="text-xs text-gray-400">{{ message.date }}</span>
                </div>
                <p class="text-xs text-gray-500">{{ message.email }}</p>
                <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ message.message }}</p>
                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium mt-2" :class="getSubjectClass(message.subject)">
                  {{ message.subject }}
                </span>
              </div>
            </div>
            <div class="flex items-center gap-2 shrink-0 self-end sm:self-start">
              <button 
                @click.stop="toggleRead(message)"
                class="p-1.5 hover:bg-gray-200 rounded-lg transition-colors"
                :title="message.read ? 'Marquer comme non lu' : 'Marquer comme lu'"
              >
                <CheckCircle v-if="message.read" class="w-4 h-4 text-green-500" />
                <Circle v-else class="w-4 h-4 text-gray-400" />
              </button>
              <button 
                @click.stop="deleteMessage(message.id)"
                class="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 class="w-4 h-4 text-gray-400 hover:text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Message vide -->
      <div v-else class="p-12 text-center">
        <MessageSquare class="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-700">Aucun message</h3>
        <p class="text-gray-400 text-sm mt-1">
          {{ searchQuery ? 'Aucun résultat pour votre recherche' : 'Aucun message reçu pour le moment' }}
        </p>
      </div>
    </div>

    <!-- Modal de détail -->
    <div 
      v-if="selectedMessage !== null"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4"
      @click="selectedMessage = null"
    >
      <div 
        class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">Détail du message</h2>
          <button @click="selectedMessage = null" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X class="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div v-if="selectedMessageData" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs text-gray-500">Nom</p>
              <p class="text-sm font-medium text-gray-900">{{ selectedMessageData.name }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Email</p>
              <p class="text-sm font-medium text-gray-900">{{ selectedMessageData.email }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Téléphone</p>
              <p class="text-sm font-medium text-gray-900">{{ selectedMessageData.phone || 'Non renseigné' }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Sujet</p>
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getSubjectClass(selectedMessageData.subject)">
                {{ selectedMessageData.subject }}
              </span>
            </div>
          </div>

          <div>
            <p class="text-xs text-gray-500">Date</p>
            <p class="text-sm text-gray-900">{{ selectedMessageData.date }}</p>
          </div>

          <div>
            <p class="text-xs text-gray-500">Message</p>
            <div class="mt-2 p-4 bg-gray-50 rounded-xl text-gray-700 whitespace-pre-wrap">
              {{ selectedMessageData.message }}
            </div>
          </div>

          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button 
              @click="toggleRead(selectedMessageData)"
              class="flex-1 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-all duration-300"
            >
              {{ selectedMessageData.read ? 'Marquer comme non lu' : 'Marquer comme lu' }}
            </button>
            <button 
              @click="replyToMessage"
              class="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all duration-300"
            >
              <Mail class="w-4 h-4 inline mr-2" />
              Répondre
            </button>
            <button 
              @click="deleteMessage(selectedMessageData.id)"
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all duration-300"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  MessageSquare,
  CheckCircle,
  Circle,
  Trash2,
  X,
  Mail
} from 'lucide-vue-next'

// Types
interface Message {
  id: number
  name: string
  initials: string
  email: string
  phone?: string
  subject: string
  message: string
  date: string
  read: boolean
}

// Données de test
const messages = ref<Message[]>([
  {
    id: 1,
    name: 'Jean Dupont',
    initials: 'JD',
    email: 'jean.dupont@email.com',
    phone: '+225 01 23 45 67 89',
    subject: 'Architecture',
    message: 'Bonjour, je souhaite avoir des informations sur vos services d\'architecture pour un projet de maison individuelle. Pouvez-vous me contacter pour discuter des modalités ?',
    date: 'Aujourd\'hui, 14:30',
    read: false
  },
  {
    id: 2,
    name: 'Marie Kouadio',
    initials: 'MK',
    email: 'marie.kouadio@email.com',
    phone: '+225 05 67 89 01 23',
    subject: 'Promotion immobilière',
    message: 'Je suis intéressée par la promotion Cité des Grâces. Pourriez-vous me donner plus d\'informations sur les villas disponibles et les prix ?',
    date: 'Aujourd\'hui, 10:15',
    read: false
  },
  {
    id: 3,
    name: 'Paul Assi',
    initials: 'PA',
    email: 'paul.assi@email.com',
    subject: 'Projet résidentiel',
    message: 'Merci pour votre réponse rapide concernant le projet résidentiel. Je souhaiterais prendre rendez-vous pour discuter plus en détail de notre projet.',
    date: 'Hier, 16:45',
    read: true
  },
  {
    id: 4,
    name: 'Sophie N\'Guessan',
    initials: 'SN',
    email: 'sophie.nguessan@email.com',
    phone: '+225 07 89 01 23 45',
    subject: 'Édifice religieux',
    message: 'Bonjour, nous représentons une paroisse et souhaitons faire construire une nouvelle église. Nous avons entendu parler de votre travail sur la Cathédrale Saint-Esprit et nous sommes très intéressés.',
    date: 'Hier, 09:20',
    read: false
  },
  {
    id: 5,
    name: 'David Koné',
    initials: 'DK',
    email: 'david.kone@email.com',
    subject: 'Rénovation',
    message: 'Je souhaite faire rénover ma villa. Pouvez-vous me faire un devis pour une rénovation complète ?',
    date: '02/07/2026, 11:30',
    read: true
  }
])

const filter = ref('all')
const searchQuery = ref('')
const selectedMessage = ref<number | null>(null)

// Messages filtrés
const filteredMessages = computed(() => {
  let filtered = messages.value

  if (filter.value === 'unread') {
    filtered = filtered.filter(m => !m.read)
  } else if (filter.value === 'read') {
    filtered = filtered.filter(m => m.read)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(m => 
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.message.toLowerCase().includes(query) ||
      m.subject.toLowerCase().includes(query)
    )
  }

  return filtered
})

// Statistiques
const unreadCount = computed(() => messages.value.filter(m => !m.read).length)
const readCount = computed(() => messages.value.filter(m => m.read).length)
const todayCount = computed(() => messages.value.filter(m => m.date.includes('Aujourd\'hui')).length)

// Message sélectionné
const selectedMessageData = computed(() => {
  if (selectedMessage.value !== null) {
    return messages.value.find(m => m.id === selectedMessage.value)
  }
  return null
})

// Ouvrir un message
const openMessage = (index: number) => {
  const message = filteredMessages.value[index]
  if (message) {
    selectedMessage.value = message.id
    if (!message.read) {
      message.read = true
    }
  }
}

// Marquer comme lu/non lu
const toggleRead = (message: Message) => {
  message.read = !message.read
}

// Marquer tout comme lu
const markAllAsRead = () => {
  messages.value.forEach(m => m.read = true)
}

// Supprimer un message
const deleteMessage = (id: number) => {
  if (confirm('Voulez-vous vraiment supprimer ce message ?')) {
    messages.value = messages.value.filter(m => m.id !== id)
    if (selectedMessage.value === id) {
      selectedMessage.value = null
    }
  }
}

// Répondre
const replyToMessage = () => {
  if (selectedMessageData.value) {
    window.location.href = `mailto:${selectedMessageData.value.email}?subject=Re: ${selectedMessageData.value.subject}`
  }
}

// Classe du sujet
const getSubjectClass = (subject: string) => {
  const classes: Record<string, string> = {
    'Architecture': 'bg-blue-50 text-blue-700',
    'Édifice religieux': 'bg-purple-50 text-purple-700',
    'Promotion immobilière': 'bg-green-50 text-green-700',
    'Projet résidentiel': 'bg-amber-50 text-amber-700',
    'Rénovation': 'bg-red-50 text-red-700'
  }
  return classes[subject] || 'bg-gray-100 text-gray-600'
}
</script>

<style scoped>
.messages-page {
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>