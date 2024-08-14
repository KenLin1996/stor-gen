<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view :key="$route.fullPath" />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import Footer from "@/components/Footer.vue";
</script>
<style lang="scss">
@import "../styles/_variable.scss";
</style>
