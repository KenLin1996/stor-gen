<template>
  <v-row>
    <v-col cols="12">
      <v-card
        class="rounded-0 px-10 py-auto"
        height="200px"
        color="surface-variant"
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        cover
        elevation="5"
      >
        <v-col>
          <v-card-title class="text-h4 font-weight-bold">
            歡迎來到界筆！
          </v-card-title>
          <v-card-text
            class="font-weight-bold pa-0 py-2 px-4 mb-2"
            style="font-size: 24px; letter-spacing: 12px"
          >
            探索和創作無限可能的故事
          </v-card-text>
          <div class="pa-0 px-4">
            <v-btn
              class="font-weight-black mr-3 px-4"
              variant="elevated"
              color="#CCB78E"
              to="/createStory"
            >
              立即創作
            </v-btn>
            <v-btn
              class="font-weight-black px-4"
              outlined
              border
              variant="elevated"
              style="
                color: #ccb78e;
                border: 1px solid #ccb78e;
                background-color: rgba(0, 0, 0, 0.47);
              "
              to="/category"
            >
              探索故事
            </v-btn>
          </div>
        </v-col>
      </v-card>
    </v-col>
  </v-row>

  <v-container style="padding: 32px">
    <v-row class="justify-space-between">
      <v-col cols="12" class="pb-0">
        <h2>追蹤故事</h2>
      </v-col>
      <v-divider class="mb-3"></v-divider>
      <v-col cols="12" class="d-flex flex-row justify-space-between">
        <StoryItem />
      </v-col>
      <v-col class="d-flex justify-center">
        <VoteItem />
      </v-col>
    </v-row>
  </v-container>

  <v-container style="padding: 32px">
    <v-row class="justify-space-between">
      <v-col cols="12" class="pb-0">
        <h2>熱門故事</h2>
      </v-col>
      <v-divider class="mb-3"></v-divider>
      <v-col cols="12" class="d-flex flex-row justify-space-between">
        <template v-for="story in stories" :key="story._id">
          <BookCard v-bind="story" />
        </template>
      </v-col>
    </v-row>
  </v-container>
  <v-container style="padding: 32px">
    <v-row class="justify-space-between">
      <v-col cols="12" class="pb-0">
        <h2>最新故事區</h2>
      </v-col>
      <v-divider class="mb-3"></v-divider>
      <v-col cols="12" class="d-flex flex-row justify-space-between">
        <BookCard />
        <BookCard />
        <BookCard />
        <BookCard />
      </v-col>
    </v-row>
  </v-container>
  <v-container style="padding: 32px">
    <v-row class="justify-space-between">
      <v-col cols="12" class="pb-0">
        <h2>創作資源區</h2>
      </v-col>
      <v-divider class="mb-3"></v-divider>
      <v-col cols="12" class="d-flex flex-row justify-space-between py-0">
        <!-- icon -->
        <v-list
          class="d-flex justify-space-between w-100 py-0"
          style="background-color: transparent"
        >
          <v-list-item
            v-for="(item, i) in resources"
            :key="i"
            :to="item.to"
            link
          >
            <template v-slot:prepend>
              <v-icon size="80" :color="item.color">
                {{ item.icon }}
              </v-icon>
            </template>
            <v-list-item-title
              style="font-size: 20px; font-weight: bold"
              v-text="item.title"
            ></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { definePage } from "vue-router/auto";
import { useApi } from "@/composables/axios";
import BookCard from "../components/BookCard.vue";
import StoryItem from "@/components/StoryItem.vue";
import VoteItem from "@/components/VoteItem.vue";

definePage({
  meta: {
    title: "界筆",
    login: false,
    admin: false,
  },
});

const { api } = useApi();
const stories = ref([]);
const loadStories = async () => {
  try {
    const { data } = await api.get("/story");
    // console.log(data.result.data);
    stories.value.splice(0, stories.value.length, ...data.result.data);
  } catch (error) {
    console.log(error);
  }
};

const resources = [
  {
    to: "/articleArea",
    icon: "mdi-lightbulb-on-outline",
    title: "創作指引",
    color: "#F9A825",
  },
  {
    to: "/characterSet",
    icon: "mdi-account-box-outline",
    title: "人物設定",
    color: "#000000",
  },
];
loadStories();
</script>
