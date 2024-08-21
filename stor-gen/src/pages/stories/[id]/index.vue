<template>
  <v-container style="padding: 32px">
    <v-card class="mb-4">
      <v-row class="pa-4 align-center">
        <v-col cols="3">
          <v-img :src="story.image" alt="書籍封面" aspect-ratio="1"></v-img>
        </v-col>

        <v-col cols="9">
          <v-row>
            <v-col cols="12">
              <h3 class="blue--text text-h5">{{ story.title }}</h3>
            </v-col>
            <v-col cols="12">
              <p>
                <strong>作者：</strong>
                <span class="blue--text">{{ story.mainAuthor?.username }}</span>
              </p>
            </v-col>
            <v-col cols="12">
              <p><strong>類別：</strong>{{ story.category }}</p>
            </v-col>
            <v-col cols="12">
              <p>
                <strong>狀態：</strong>
                <span class="orange--text">{{
                  story.state ? "完結" : "連載"
                }}</span>
              </p>
            </v-col>
            <v-col cols="12">
              <p>
                <strong>總字數：</strong>
                <span class="grey--text">{{ story.totalWordCount }}</span>
              </p>
            </v-col>
            <v-col cols="12" class="d-flex">
              <v-chip class="mr-2 grey--text" label
                >收藏數 {{ story.collectionNum }}</v-chip
              >
              <v-chip class="grey--text" label
                >追蹤數 {{ story.followNum }}</v-chip
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <div class="my-2">
      <v-btn
        class="mr-4"
        style="background-color: #2883d3; color: white"
        :to="'/stories/' + story._id + '/articles/' + story.content[0]?._id"
        >開始閱讀</v-btn
      >
      <v-btn class="mr-4" style="background-color: #2883d3; color: white"
        >章節列表</v-btn
      >
      <v-btn style="background-color: #2883d3; color: white">收藏故事</v-btn>
    </div>

    <v-card class="pa-4" style="margin-top: 32px">
      <h3 class="">起始故事</h3>
      <v-divider class="my-2"></v-divider>
      <p class="py-4">{{ story.content[0]?.content?.[0] }}</p>
      <template v-for="chapterLabel in story.chapterLabels">
        <v-chip density="compact" color="primary" label="true" class="mr-2">
          {{ chapterLabel }}
        </v-chip>
      </template>
    </v-card>

    <v-card style="margin-top: 32px">
      <h3 class="pa-4" style="background-color: rgb(146 224 227)">留言區</h3>
      <v-row class="">
        <v-col>
          <div class="">
            <div class="pa-4">
              <v-avatar color="primary " class="me-3" size="large">
                <v-img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWAhVMz9jthsapuZL1tkdJks34QlTbXolbmg&s"
                ></v-img>
              </v-avatar>
              <span>貓界阿宅</span>
              <p class="ml-13 text-body-2">這是本喵看過最好看的喵喵喵喵書</p>
            </div>
            <div class="pa-4">
              <v-avatar color="secondary " class="me-3" size="large">
                <v-img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqnRWICFHo49O2OyVoMHrqkQmAevK654iXKw&s"
                ></v-img>
              </v-avatar>
              <span>黑嚕嚕咕嚕嚕</span>
              <p class="ml-13 text-body-2">喵喵喵可以趕快更新嗎</p>
            </div>
            <v-divider></v-divider>
            <!-- 留言發布 -->
            <div class="pa-4">
              <v-textarea
                ref="textarea"
                id="msg"
                placeholder="請輸入您的留言或提問"
                variant="outlined"
                width="600"
                maxlength="20"
                counter
              >
                <template v-slot:prepend>
                  <v-avatar color="primary " class="me-1" size="large">
                    <v-img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyKvt7MWE2LrmiZbNLMYdnwEW-OnNf1sam1g&s"
                    ></v-img>
                  </v-avatar>
                </template>
              </v-textarea>
              <v-btn
                variant="text"
                class="rounded-md bg-accent mt-2"
                density="comfortable"
                :ripple="false"
                id="submit"
                style="background-color: #f4b942"
                >送出</v-btn
              >
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
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
  image: "",
  title: "",
  mainAuthor: "",
  category: "",
  chapterLabels: "",
  state: true,
  totalWordCount: 0,
  collectionNum: 0,
  followNum: 0,
  content: [],
});

const load = async () => {
  try {
    const { data } = await api.get("/story/" + route.params.id);

    story.value._id = data.result._id;
    story.value.image = data.result.image;
    story.value.title = data.result.title;
    story.value.mainAuthor = data.result.mainAuthor;
    story.value.category = data.result.category;
    story.value.chapterLabels = data.result.chapterLabels;
    story.value.state = data.result.state;
    story.value.totalWordCount = data.result.totalWordCount;
    story.value.collectionNum = data.result.collectionNum;
    story.value.followNum = data.result.followNum;
    console.log("mainAuthor 的值：", data.result.mainAuthor);
    // (story.value.content =
    //   Array.isArray(data.result.content) && data.result.content.length > 0
    //     ? data.result.content[0].content
    //     : "內容不存在"),
    if (Array.isArray(data.result.content) && data.result.content.length > 0) {
      story.value.content = data.result.content;
    } else {
      story.value.content = "內容不存在"; // 處理空數據的情況ㄉ
    }

    document.title = "界筆 | " + story.value.title;
  } catch (error) {
    console.log(data.result);

    console.log(error);
  }
};
load();
</script>

<style scoped></style>
