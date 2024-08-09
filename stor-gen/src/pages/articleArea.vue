<template>
  <v-container>
    <!-- 創作指引 -->
    <v-card class="pa-3 mb-4">
      <v-card-title>創作指引</v-card-title>
      <v-divider></v-divider>

      <!-- 創作流程指導 -->
      <v-card-subtitle class="mt-4">創作流程指導</v-card-subtitle>
      <v-list dense>
        <ListGroup
          v-for="item in creativeProcessGuidance"
          :key="item.title"
          :title="item.title"
          :subItems="item.subItems"
        />
      </v-list>

      <!-- 創作技巧 -->
      <v-card-subtitle class="mt-4">創作技巧</v-card-subtitle>
      <v-list dense>
        <ListGroup
          v-for="item in creativeSkills"
          :key="item.title"
          :title="item.title"
          :subItems="item.subItems"
        />
      </v-list>

      <!-- 常見問題與解答 -->
      <v-card-subtitle class="mt-4">常見問題與解答</v-card-subtitle>
      <v-list dense>
        <ListGroup
          v-for="item in faq"
          :key="item.title"
          :title="item.title"
          :subItems="item.subItems"
        />
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import ListGroup from "../components/ListGroup.vue";

definePage({
  meta: {
    title: `界筆 ｜ 創作指引`,
    login: false,
    admin: false,
  },
});

const creativeProcessGuidance = ref([
  {
    title: "選題與構思",
    subItems: [
      { title: "內容1", link: "https://example.com/1" },
      { title: "內容2", link: "https://example.com/2" },
      { title: "內容3", link: "https://example.com/3" },
    ],
  },
  {
    title: "故事架構",
    subItems: [
      { title: "內容1", link: "https://example.com/1" },
      { title: "內容2", link: "https://example.com/2" },
      { title: "內容3", link: "https://example.com/3" },
    ],
  },
  {
    title: "角色塑造",
    subItems: [
      { title: "內容1", link: "https://example.com/1" },
      { title: "內容2", link: "https://example.com/2" },
      { title: "內容3", link: "https://example.com/3" },
    ],
  },
]);

const creativeSkills = ref([
  {
    title: "寫作技巧",
    subItems: [
      { title: "內容1", link: "https://example.com/1" },
      { title: "內容2", link: "https://example.com/2" },
      { title: "內容3", link: "https://example.com/3" },
    ],
  },
  {
    title: "修辭和語言",
    subItems: [
      { title: "內容1", link: "https://example.com/1" },
      { title: "內容2", link: "https://example.com/2" },
      { title: "內容3", link: "https://example.com/3" },
    ],
  },
]);

const faq = ref([
  {
    title: "創作困境",
    subItems: [
      { title: "內容1", link: "https://example.com/1" },
      { title: "內容2", link: "https://example.com/2" },
      { title: "內容3", link: "https://example.com/3" },
    ],
  },
]);
</script>

<style scoped>
.v-list-group__header {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
