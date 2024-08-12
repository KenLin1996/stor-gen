<template>
  <v-card class="pa-3" max-width="200">
    <router-link :to="'/story/' + _id">
      <v-img
        class="cursor-pointer"
        height="150px"
        src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
        cover
        @click="navigateTo('/123')"
      >
      </v-img>
    </router-link>
    <div class="d-flex justify-space-between align-center">
      <v-card-title
        class="px-0 py-1 text-subtitle-1 cursor-pointer"
        @click="navigateTo('/123')"
        >{{ title }}</v-card-title
      >
      <v-chip density="compact" color="primary" label>{{ category }}</v-chip>
    </div>
    <v-card-text
      class="pa-0 cursor-pointer"
      style="font-size: 12px"
      @click="navigateTo('/1234')"
      >{{ author }}</v-card-text
    >

    <v-card-text class="pa-0">
      I'm a thing. But, like most politicians, he promised more than he could
      deliver.
    </v-card-text>
  </v-card>
</template>

<script setup>
import Category from "@/pages/category.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const navigateTo = (path) => {
  router.push(path);
};
</script>
