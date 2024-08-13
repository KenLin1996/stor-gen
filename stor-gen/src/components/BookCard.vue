<template>
  <v-card class="pa-3" max-width="200">
    <router-link :to="'/stories/' + _id">
      <v-img class="cursor-pointer" height="150px" :src="image" cover> </v-img>
    </router-link>
    <div class="d-flex justify-space-between align-center">
      <v-card-title
        class="px-0 py-1 text-subtitle-1 cursor-pointer"
        @click="navigateTo('/123')"
      >
        {{ title }}
      </v-card-title>
      <v-chip
        density="compact"
        color="primary"
        label="true"
        style="font-size: 12px; padding: 2px 6px;"
      >
        {{ category }}
      </v-chip>
    </div>
    <v-card-text
      class="pa-0 cursor-pointer"
      style="font-size: 12px"
      @click="navigateTo('/1234')"
    >
      {{ author }}
    </v-card-text>

    <v-card-text class="pa-0"
      >I'm a thing. But, like most politicians, he promised more than
    </v-card-text>
  </v-card>
</template>

<script setup>
// import Category from "@/pages/category.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { _id, image, title, category, author } = defineProps([
  "_id",
  "image",
  "title",
  "category",
  "author",
]);

console.log(category);

const navigateTo = (path) => {
  router.push(path);
};
</script>
