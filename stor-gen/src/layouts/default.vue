<template>
  <v-app>
    <NavBar />
    <v-main>
      <router-view
        style="
          margin-bottom: 50px;
          border-radius: 8px;
          margin-top: 50px;
          background-color: #e7dfc6;
        "
      />
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
