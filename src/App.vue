<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import HeaderComponent from './components/layouts/HeaderComponent.vue'
import SidebarComponent from './components/layouts/SidebarComponent.vue'
import FooterComponent from './components/layouts/FooterComponent.vue'

const route = useRoute()
const hideLayout = computed(() => route.meta.hideLayout || false)
</script>

<template>
  <div class="main-page" :class="{ 'no-layout': hideLayout }">
    <template v-if="!hideLayout">
      <HeaderComponent />

      <div class="main-container">
        <SidebarComponent />

        <main class="content">
          <RouterView />
        </main>
      </div>
    </template>
    <RouterView v-else />
    <FooterComponent />
  </div>
</template>

<style scoped>
.main-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: Arial, sans-serif;
  color: #fff;
  background-color: #1c1c1c;
}

.main-container {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  background-color: #2d2d2d;
  padding: 20px;
  overflow-y: auto;
}

.no-layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
