<template>
  <v-footer
    class="mt-5 text-center d-flex flex-column"
    color="#4E9194"
    density="comfortable"
  >
    <div class="d-flex justify-space-between px-16">
      <div class="d-flex flex-column align-start pt-0 w-66">
        <p style="color: black; font-size: 16px">關於我們</p>
        <p class="text-left" style="color: black; font-size: 14px">
          『界筆』是指世界之筆，我們期望構築一個筆、文字的世界！起頭的『界』也取同音的『借』的概念，每個故事的後續都是借鑑、借用最初的故事。而『界』的世界概念也彰顯著『界筆』有著遍佈全世界的野望！
        </p>
      </div>
      <div>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon.name"
          class="mx-4"
          variant="text"
          @click="navigateToLink(icon.link)"
        ></v-btn>
      </div>
    </div>

    <div class="my-2">
      {{ new Date().getFullYear() }} — <strong>界筆</strong>
    </div>
  </v-footer>
</template>
<script setup>
import { ref } from "vue";

const icons = ref([
  { name: "mdi-instagram", link: "https://www.example.com/instagram" },
  { name: "mdi-facebook", link: "https://www.example.com/facebook" },
  { name: "mdi-linkedin", link: "https://www.example.com/linkedin" },
]);

const navigateToLink = (link) => {
  window.open(link, "_blank");
};
</script>
