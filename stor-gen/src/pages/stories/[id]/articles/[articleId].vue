<template>
  <v-container
    style="padding: 32px; min-height: 480px"
    class="d-flex flex-column justify-space-between"
  >
    <div>
      <!-- <h2>{{第一章節}}</h2> -->
      <h2>{{ story.chapterName }}</h2>
      <!-- <p class="my-4" style="white-space: pre-line; word-wrap: break-word">
        fbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusdfbdgnjsdfngjksdkljvkuhifjsdkjvfsdklfvkshiljdkucghlidjfvhlkjjlvusd
      </p> -->
      <p class="my-4" style="white-space: pre-line; word-wrap: break-word">
        {{ story.content[0]?.content }}
      </p>
    </div>
    <div class="text-center">
      <v-btn class="mx-2">上一章</v-btn>
      <v-btn
        class="mx-2"
        :to="'/stories/' + story._id"
        style="background-color: rgb(40, 131, 211); color: white"
        >回故事頁</v-btn
      >
      <v-btn class="mx-2">下一章</v-btn>
    </div>
  </v-container>
</template>
<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "@/composables/axios";

// const pageTitle = story.title;
definePage({
  meta: {
    title: `界筆 | 故事`,
    login: false,
    admin: false,
  },
});

const { api } = useApi();
const route = useRoute();

const story = ref({
  _id: "",
  chapterName: "",
  content: [],
});

const load = async () => {
  try {
    const { data } = await api.get("/story/" + route.params.id);
    story.value._id = data.result._id;
    story.value.chapterName = data.result.chapterName;
    story.value.content = data.result.content;

    document.title = "界筆 | " + story.value.chapterName;
  } catch (error) {
    console.log(error);
  }
};
load();
</script>
