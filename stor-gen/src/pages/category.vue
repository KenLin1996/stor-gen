<template>
  <v-container>
    <v-responsive class="my-5">
      <v-text-field
        v-model="searchQuery"
        label="搜尋"
        prepend-inner-icon="mdi-magnify"
        density="compact"
        hide-details
        single-line
        variant="solo"
        clearable
        color="black"
      ></v-text-field>
    </v-responsive>

    <h2>作品分類</h2>
    <v-divider class="custom-mb-5"></v-divider>
    <v-row class="custom-mb-5" no-gutters>
      <v-col v-for="category in categories" :key="category" cols="auto">
        <v-btn
          :class="{
            'custom-btn': true,
            selected: selectedCategory === category,
          }"
          @click="selectCategory(category)"
          class="my-1 mr-1"
          >{{ category }}</v-btn
        >
      </v-col>
    </v-row>

    <h2>作品字數</h2>
    <v-divider class="custom-mb-5"></v-divider>
    <v-row class="custom-mb-5" no-gutters>
      <v-col v-for="wordCount in wordCounts" :key="wordCount" cols="auto">
        <v-btn
          class="mr-1"
          :class="{
            'custom-btn': true,
            selected: selectedWordCount === wordCount,
          }"
          @click="selectWordCount(wordCount)"
          >{{ wordCount }}</v-btn
        >
      </v-col>
    </v-row>

    <div class="d-flex align-center justify-space-between mb-2">
      <h2>標籤選擇</h2>
      <v-btn dense @click="resetLabels" class="custom-reset-btn"
        >重設標籤</v-btn
      >
    </div>

    <v-divider class="custom-mb-5"></v-divider>
    <v-row class="custom-mb-5" no-gutters>
      <v-chip-group
        column
        selected-class="text-primary"
        multiple
        v-model="selectedLabels"
      >
        <v-chip
          v-for="label in chapterLabels"
          :key="label"
          :text="label"
          class="custom-chip d-flex align-center justify-center"
          elevation="2"
          :value="label"
        ></v-chip>
      </v-chip-group>
    </v-row>

    <template v-for="story in filteredStories" :key="story.id">
      <router-link :to="'/stories/' + story._id" style="text-decoration: none">
        <v-card
          style="border: 1px solid black; margin: 15px"
          @click="navigateToDetail"
        >
          <v-row no-gutters>
            <v-col cols="2" class="pt-4 pb-4 pl-4">
              <v-img
                :src="story.image"
                width="200px"
                height="150px"
                cover
              ></v-img>
            </v-col>
            <v-col cols="10">
              <v-row no-gutters>
                <v-col class="mt-4">
                  <v-card-title class="d-flex justify-space-between pt-0">
                    <span>{{ story.title }}</span>
                    <v-chip
                      style="
                        border-radius: 4px;
                        padding: 0px 12px;
                        border: 1px solid black;
                        background-color: rgba(151, 216, 196, 0.4);
                        color: black;
                        font-weight: bold;
                      "
                      >{{ story.category }}</v-chip
                    >
                  </v-card-title>
                </v-col>
              </v-row>
              <v-card-subtitle>
                <div>
                  <span class="mr-4" style="font-weight: bolder; color: black"
                    >初創者：{{ story.mainAuthor }}</span
                  >
                  <span style="font-weight: bolder; color: black"
                    >最新延續者：{{ story.latestAuthor }}</span
                  >
                </div>
                <p class="mb-2" style="font-weight: bolder; color: black">
                  作品字數：{{ story.totalWordCount }}
                </p>
                <p style="font-weight: bolder; color: black">最新內容：</p>
              </v-card-subtitle>
              <v-card-text class="text py-1" style="font-weight: 500">
                {{
                  story.latestContent.length === 0
                    ? story.content[0]?.content
                    : story.latestContent
                }}
              </v-card-text>
            </v-col>
          </v-row>
          <v-divider style="color: black"></v-divider>
          <v-card-actions class="px-4 py-1">
            <v-icon class="mr-2">mdi-label-outline</v-icon>
            <template v-for="label in story.chapterLabels">
              <v-chip class="mr-2" style="border-radius: 4px"
                >#{{ label }}</v-chip
              >
            </template>
          </v-card-actions>
        </v-card>
      </router-link>
    </template>
  </v-container>
</template>

<script setup>
import { ref, computed } from "vue";
import { definePage } from "vue-router/auto";
import { useApi } from "@/composables/axios";

definePage({
  meta: {
    title: `界筆 ｜ 故事分類`,
    login: false,
    admin: false,
  },
});

const selectedLabels = ref([]);
const searchQuery = ref("");
const selectedCategory = ref("");
const selectedWordCount = ref("");

const { api } = useApi();
const stories = ref([]);

const categories = [
  "文藝評論",
  "商業理財",
  "藝術設計",
  "人文科普",
  "心靈養生",
  "生活風格",
  "親子共享",
  "傳記/文學史",
  "羅曼史",
  "校園愛情",
  "武俠仙俠",
  "歷史",
  "驚悚推理",
  "奇幻",
  "恐怖靈異",
  "影視",
  "軍事戰爭/災難冒險",
  "溫馨勵志/成長療癒",
  "幽默/諷喻",
  "同志",
  "漫畫",
  "同人",
  "都市",
  "玄幻",
  "科幻",
  "網遊",
  "都會愛情",
  "古代愛情",
  "百合",
  "其他",
];

const wordCounts = [
  "不限",
  "50字以下",
  "1000字以下",
  "2萬字以內",
  "2萬-5萬字",
  "5萬字以上",
];

const chapterLabels = [
  "不限",
  "爽文",
  "心情抒發",
  "療癒",
  "青梅竹馬",
  "戰鬥",
  "異界",
  "戀愛",
  "日常",
  "校園",
  "搞笑",
  "後宮",
  "異能",
  "妖怪",
  "妹控",
  "節操",
  "二創",
  "百合",
  "虐心",
  "甜文",
  "悲劇",
  "喜劇",
  "輕鬆",
  "暗黑",
  "清水",
  "穿越",
  "重生",
  "靈異神怪",
  "異國",
  "冒險",
  "女性向",
  "男性向",
  "輕小說",
  "同志",
  "恐怖",
];

const loadStories = async () => {
  try {
    const { data } = await api.get("/story");
    stories.value = data.result.data;
  } catch (error) {
    console.error(error);
  }
};
loadStories();

const selectCategory = (category) => {
  selectedCategory.value = selectedCategory.value === category ? "" : category;
};

const selectWordCount = (wordCount) => {
  selectedWordCount.value =
    selectedWordCount.value === wordCount ? "" : wordCount;
};

const resetLabels = () => {
  selectedLabels.value = [];
};

const parseWordCount = (wordCount) => {
  switch (wordCount) {
    case "50字以下":
      return 50;
    case "1000字以下":
      return 1000;
    case "2萬字以內":
      return 20000;
    case "2萬-5萬字":
      return 50000;
    case "5萬字以上":
      return Infinity;
    default:
      return Infinity;
  }
};

const filteredStories = computed(() => {
  return stories.value.filter((story) => {
    const matchesSearch = story.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    const matchesCategory = selectedCategory.value
      ? story.category === selectedCategory.value
      : true;
    const matchesWordCount = selectedWordCount.value
      ? story.totalWordCount <= parseWordCount(selectedWordCount.value)
      : true;
    const matchesLabels = selectedLabels.value.length
      ? selectedLabels.value.every((label) =>
          story.chapterLabels.includes(label)
        )
      : true;

    return (
      matchesSearch && matchesCategory && matchesWordCount && matchesLabels
    );
  });
});
</script>
<style scoped>
.custom-btn {
  border-radius: 30px;
  background-color: white;
  font-weight: bold;
  border: 2px solid black;
  color: black;
}
.custom-btn:hover {
  background-color: #67accf !important;
  color: black !important;
}
.selected {
  background-color: #67accf;
  color: black;
}

.custom-chip {
  margin: 5px;
  padding: 2px 10px;
  cursor: pointer;
  background-color: rgba(151, 216, 196, 0.4);
  border: 1px solid black;
  font-weight: bold;
}
.custom-chip.selected {
  background-color: #67accf;
  color: black;
}

.custom-mb-5 {
  margin-bottom: 30px;
}

.custom-reset-btn {
  border: 2px solid black;
  color: black;
  font-weight: bold;
}
.custom-reset-btn:hover {
  background-color: #67accf !important;
  color: black !important;
}
</style>
