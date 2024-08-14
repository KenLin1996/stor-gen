<template>
  <v-container>
    <!-- 搜尋欄 -->
    <v-responsive class="my-5">
      <v-text-field
        v-model="search"
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

    <!-- 作品分類 -->
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
          >{{ category }}</v-btn
        >
      </v-col>
    </v-row>

    <!-- 作品字數 -->
    <h2>作品字數</h2>
    <v-divider class="custom-mb-5"></v-divider>
    <v-row class="custom-mb-5" no-gutters>
      <v-col v-for="wordCount in wordCounts" :key="wordCount" cols="auto">
        <v-btn
          :class="{
            'custom-btn': true,
            selected: selectedWordCount === wordCount,
          }"
          @click="selectWordCount(wordCount)"
          >{{ wordCount }}</v-btn
        >
      </v-col>
    </v-row>

    <!-- 標籤選擇 -->
    <h2>標籤選擇</h2>
    <v-divider class="custom-mb-5"></v-divider>
    <v-row class="custom-mb-5" no-gutters>
      <v-chip-group column selected-class="text-primary" multiple>
        <v-chip
          v-for="chapterLabel in chapterLabels"
          :key="chapterLabel"
          :text="chapterLabel"
          class="custom-chip d-flex align-center justify-center"
          elevation="2"
        ></v-chip>
      </v-chip-group>
    </v-row>

    <!-- 作品展示範例 -->
    <v-card style="border: 1px solid black" @click="navigateToDetail">
      <v-row no-gutters>
        <v-col cols="2" class="pt-4 pb-4 pl-4">
          <v-img
            src="https://via.placeholder.com/50"
            class=""
            width="200px"
            height="150px"
            cover
          ></v-img>
        </v-col>
        <v-col cols="10">
          <v-row no-gutters>
            <v-col class="mt-4">
              <v-card-title
                class="example-title d-flex justify-space-between pt-0"
              >
                <span>生活中的一支湯匙</span>
                <v-chip
                  class="example-chip"
                  style="
                    border-radius: 4px;
                    padding: 0px 12px;
                    border: 1px solid black;
                    background-color: rgba(151, 216, 196, 0.4);
                    color: black;
                    font-weight: bold;
                  "
                  >奇幻/玄幻</v-chip
                >
              </v-card-title>
            </v-col>
          </v-row>
          <v-card-subtitle class="example-subtitle">
            <div>
              <span class="mr-4">
                初創者：<span class="example-author">地方的吃貨大叔</span>
              </span>
              <span>
                最新延續者：<span class="-author">你的吃貨女士</span>
              </span>
            </div>

            <p class="example-author mb-2">作品字數：兩萬字</p>
            <p>最新內容：</p>
          </v-card-subtitle>

          <v-card-text class="example-text py-1">
            在一個充滿奇幻元素的世界裡，有一個名叫阿瑞斯的年輕冒險者...
          </v-card-text>
        </v-col>
      </v-row>
      <v-divider
        class="border-opacity-100"
        :thickness="1"
        style="color: black"
      ></v-divider>
      <v-card-actions class="px-4 py-1">
        <v-icon class="mr-2">mdi-label-outline</v-icon>
        <v-chip class="example-chip">#<span>爽文</span></v-chip>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { definePage } from "vue-router/auto";

definePage({
  meta: {
    title: `界筆 ｜ 故事分類`,
    login: false,
    admin: false,
  },
});

const search = ref("");
const selectedCategory = ref("");
const selectedWordCount = ref("");

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

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const selectWordCount = (wordCount) => {
  selectedWordCount.value = wordCount;
};
</script>

<style scoped>
/* Margin Bottom Customization */
.custom-mb-5 {
  margin-bottom: 20px;
}

/* Custom Button Styles */
.custom-btn {
  display: flex;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  margin: 5px;
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

.custom-btn.selected {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #fff;
}

/* Custom Chip Styles */
.custom-chip {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;
  margin: 5px;
  min-width: 100px;
}

.custom-chip .v-chip__content {
  white-space: nowrap;
}

::v-deep.v-chip--variant-tonal .v-chip__underlay {
  background: none;
}
.v-card-actions {
  min-height: 0px;
  background-color: #97d8c4;
}
.v-chip.v-chip--size-default {
  padding: 0;
}
</style>
