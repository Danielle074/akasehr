<template>
  <div class="home-page">
    <!-- Hero Section -->
    <HeroSection />
    
    <!-- Stats Section -->
    <StatsSection />
    
    <!-- Services Section -->
    <ServicesSection />
    
    <!-- Projects Section -->
    <ProjectsSection />
    
    <!-- Testimonials Section -->
    <TestimonialsSection />
    
    <!-- Contact Section -->
    <ContactSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from '@/components/home/HeroSection.vue'
import StatsSection from '@/components/home/StatsSection.vue'
import ServicesSection from '@/components/home/ServicesSection.vue'
import ProjectsSection from '@/components/home/ProjectsSection.vue'
import TestimonialsSection from '@/components/home/TestimonialsSection.vue'
import ContactSection from '@/components/home/ContactSection.vue'
</script>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>