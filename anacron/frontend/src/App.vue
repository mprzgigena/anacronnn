<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <!-- Header Navigation -->
    <header class="bg-medical-primary shadow-medical">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <!-- Logo -->
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-white">
                ANACRON
              </h1>
              <span class="ml-2 text-sm text-blue-100">Sistema Médico</span>
            </div>
            
            <!-- Navigation Links -->
            <nav class="hidden md:ml-8 md:flex md:space-x-8">
              <router-link 
                to="/turnos" 
                class="nav-link"
                :class="{ 'nav-link-active': $route.path.startsWith('/turnos') }"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Turnos
              </router-link>
              
              <router-link 
                to="/pacientes" 
                class="nav-link"
                :class="{ 'nav-link-active': $route.path.startsWith('/pacientes') }"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
                Pacientes
              </router-link>
              
              <router-link 
                to="/profesionales" 
                class="nav-link"
                :class="{ 'nav-link-active': $route.path.startsWith('/profesionales') }"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Profesionales
              </router-link>
            </nav>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-white hover:text-blue-200 focus:outline-none focus:text-blue-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-medical-primary border-t border-blue-700">
          <router-link to="/turnos" class="nav-link-mobile" @click="mobileMenuOpen = false">
            Turnos
          </router-link>
          <router-link to="/pacientes" class="nav-link-mobile" @click="mobileMenuOpen = false">
            Pacientes  
          </router-link>
          <router-link to="/profesionales" class="nav-link-mobile" @click="mobileMenuOpen = false">
            Profesionales
          </router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <router-view />
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-medical-dark text-white mt-auto">
      <div class="max-w-7xl mx-auto py-4 px-4 text-center text-sm">
        <p>ANACRON - Sistema de Gestión Médica &copy; {{ currentYear }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'App',
  setup() {
    const mobileMenuOpen = ref(false)
    const currentYear = computed(() => new Date().getFullYear())

    return {
      mobileMenuOpen,
      currentYear
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply inline-flex items-center px-1 pt-1 text-sm font-medium text-blue-100 hover:text-white transition-colors duration-200;
}

.nav-link-active {
  @apply text-white border-b-2 border-blue-200;
}

.nav-link-mobile {
  @apply block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:text-white hover:bg-blue-700 transition-colors duration-200;
}
</style>