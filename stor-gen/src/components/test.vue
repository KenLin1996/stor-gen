<template>
  <v-container>
    <v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <div class="d-flex">
      <div class="sidebar" style="margin-right: 12px; background-color: white">
        <v-list class="py-0" dense>
          <h3 class="mb-1">故事管理</h3>
          <v-list-item class="d-flex">
            <v-tabs v-model="tab" color="primary" direction="vertical">
              <v-tab
                class="my-1"
                prepend-icon="mdi-book"
                text="我的故事/延續"
                value="option-1"
              ></v-tab>
              <v-tab
                class="my-1"
                prepend-icon="mdi-bookmark"
                text="收藏的故事"
                value="option-2"
              ></v-tab>
              <v-tab
                class="my-1"
                prepend-icon="mdi-heart"
                text="追蹤的故事"
                value="option-3"
              ></v-tab
              ><v-tab
                class="my-1"
                prepend-icon="mdi-vote"
                text="已投票的故事"
                value="option-4"
              ></v-tab>
            </v-tabs>
          </v-list-item>

          <v-divider class="my-6"></v-divider>

          <h3 class="mb-1">角色管理</h3>

          <v-list-item>
            <v-tabs v-model="tab" color="primary" direction="vertical">
              <v-tab
                class="my-1"
                prepend-icon="mdi-account-plus"
                text="建立的角色"
                value="option-5"
              ></v-tab>
              <v-tab
                class="my-1"
                prepend-icon="mdi-account-multiple"
                text="收藏的角色"
                value="option-6"
              ></v-tab>
            </v-tabs>
          </v-list-item>
        </v-list>
      </div>

      <div class="content" style="background-color: white">
        <div>
          <v-tabs-window v-model="tab">
            <!-- 我的故事/延續 -->
            <v-tabs-window-item value="option-1">
              <div class="d-flex align-center justify-space-between mb-4">
                <h3>我的故事</h3>
                <v-btn prepend-icon="mdi-plus" size="small">新增故事</v-btn>
              </div>
              <v-divider></v-divider>
              <v-card flat>
                <v-card-text>
                  <v-data-table
                    :headers="myStoryHeaders"
                    :items="myStoryItems"
                    density="comfortable"
                    item-key="name"
                  >
                    <template #[`item.img`]="{ item }">
                      <v-img :src="item.img"></v-img>
                    </template>
                    <template #[`item.actions`]="{ item }">
                      <v-btn
                        text
                        to=""
                        :active="false"
                        :ripple="false"
                        variant="tonal"
                      >
                        編輯
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
              <div class="d-flex align-center justify-space-between mt-4 mb-4">
                <h3>我的延續</h3>
              </div>
              <v-divider></v-divider>
              <v-card flat>
                <v-card-text>
                  <v-data-table
                    :headers="continuationHeaders"
                    :items="continuationStories"
                    density="comfortable"
                    item-key="name"
                  >
                    <template #[`item.actions`]="{ item }">
                      <v-btn
                        text
                        to=""
                        :active="false"
                        :ripple="false"
                        variant="tonal"
                      >
                        刪除紀錄
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>

            <!-- 收藏的故事 -->
            <v-tabs-window-item value="option-2">
              <div class="d-flex align-center justify-space-between mb-4">
                <h3>收藏的故事</h3>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center justify-space-between py-2">
                <v-btn size="small">移除</v-btn>

                <v-select
                  dense
                  density="comfortable"
                  label="故事分類"
                  hide-details
                  max-width="150px"
                  :items="selectItems"
                ></v-select>
              </div>

              <v-data-table
                v-model="selected"
                :headers="headers2"
                :items="collectionStories"
                show-select
                item-value="title"
              ></v-data-table>
            </v-tabs-window-item>

            <!-- 追蹤的故事 -->
            <v-tabs-window-item value="option-3">
              <div class="d-flex align-center justify-space-between mb-4">
                <h3>追蹤的故事</h3>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center justify-space-between py-2">
                <v-btn size="small">移除</v-btn>

                <v-select
                  dense
                  density="comfortable"
                  label="故事分類"
                  hide-details
                  max-width="150px"
                  :items="selectItems"
                ></v-select>
              </div>

              <v-data-table
                v-model="selected"
                :headers="followHeaders"
                :items="followStories"
                show-select
                item-value="title"
              ></v-data-table>
            </v-tabs-window-item>

            <!-- 已投票的故事 -->
            <v-tabs-window-item value="option-4">
              <div class="d-flex align-center justify-space-between mb-4">
                <h3>已投票的故事</h3>
              </div>
              <v-divider></v-divider>
              <v-data-table
                density="comfortable"
                item-key="name"
                :headers="voteStoryHeaders"
                :items="voteStories"
              >
                <template #[`item.actions`]="{ item }">
                  <v-btn
                    text
                    to=""
                    :active="false"
                    :ripple="false"
                    variant="tonal"
                  >
                    刪除紀錄
                  </v-btn>
                </template>
              </v-data-table>
            </v-tabs-window-item>

            <!-- 建立的角色 -->
            <v-tabs-window-item value="option-5">
              <div class="d-flex align-center justify-space-between mb-4">
                <h3>建立的角色</h3>
                <v-btn prepend-icon="mdi-plus" size="small">新增角色</v-btn>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center justify-space-between py-2">
                <v-responsive max-width="300">
                  <v-text-field
                    label="角色搜尋"
                    density="compact"
                    hide-details
                    single-line
                    variant="outlined"
                    color="black"
                  ></v-text-field>
                </v-responsive>

                <v-select
                  dense
                  density="comfortable"
                  label="種族"
                  hide-details
                  max-width="150px"
                  :items="raceItems"
                ></v-select
                ><v-select
                  dense
                  density="comfortable"
                  label="性別"
                  hide-details
                  max-width="150px"
                  :items="genderItems"
                ></v-select
                ><v-select
                  dense
                  density="comfortable"
                  label="出現故事"
                  hide-details
                  max-width="150px"
                  :items="storyItems"
                ></v-select>
              </div>
              <v-card flat>
                <v-card-text>
                  <v-data-table
                    :headers="createCharactersHeaders"
                    :items="createCharactersItems"
                    density="comfortable"
                    item-key="name"
                  >
                    <template #[`item.actions`]="{ item }">
                      <v-btn
                        text
                        to=""
                        :active="false"
                        :ripple="false"
                        variant="tonal"
                      >
                        刪除
                      </v-btn>
                      <v-btn
                        text
                        to=""
                        :active="false"
                        :ripple="false"
                        variant="tonal"
                      >
                        編輯
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>

            <!-- 收藏的角色 -->
            <v-tabs-window-item value="option-6">
              <div class="d-flex align-center justify-space-between mb-4">
                <h3>收藏的角色</h3>
              </div>
              <v-divider></v-divider>
              <div class="d-flex align-center justify-space-between py-2">
                <v-responsive max-width="300">
                  <v-text-field
                    label="角色搜尋"
                    density="compact"
                    hide-details
                    single-line
                    variant="outlined"
                    color="black"
                  ></v-text-field>
                </v-responsive>

                <v-select
                  dense
                  density="comfortable"
                  label="種族"
                  hide-details
                  max-width="150px"
                  :items="raceItems"
                ></v-select
                ><v-select
                  dense
                  density="comfortable"
                  label="性別"
                  hide-details
                  max-width="150px"
                  :items="genderItems"
                ></v-select
                ><v-select
                  dense
                  density="comfortable"
                  label="出現故事"
                  hide-details
                  max-width="150px"
                  :items="storyItems"
                ></v-select>
              </div>
              <v-card flat>
                <v-card-text>
                  <v-data-table
                    :headers="collectionCharactersHeaders"
                    :items="collectionCharactersItems"
                    density="comfortable"
                    item-key="name"
                  >
                    <template #[`item.actions`]="{ item }">
                      <v-btn
                        text
                        to=""
                        :active="false"
                        :ripple="false"
                        variant="tonal"
                      >
                        取消收藏
                      </v-btn>
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-tabs-window-item>
          </v-tabs-window>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";

definePage({
  meta: {
    title: "界筆 ｜ 故事/角色管理",
    login: false,
    admin: false,
  },
});

const tab = ref("option-1");

const items = ref([
  { title: "首頁", disabled: false, href: "/" },
  { title: "故事/角色管理", disabled: true, href: "/management" },
]);

const myStoryHeaders = [
  {
    title: "書封",
    align: "start",
    width: "160px",
    sortable: false,
    key: "img",
  },
  { title: "書名", align: "start", width: "130px", key: "title" },
  { title: "狀態", align: "center", key: "state" },
  { title: "顯示", align: "center", key: "show", sortable: false },
  { title: "收藏數", align: "center", key: "collectionNum" },
  { title: "追蹤數", align: "center", key: "followNum" },
  { title: "總票數", align: "center", key: "totalVotes" },
  { title: "編輯", align: "center", key: "actions", sortable: false },
];

const myStoryItems = [
  {
    img: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzKYSIrA6-OO6TAY2mG-OT--cpO_HsVOGpbw&s`,
    title:
      "想要讓人因此試著鍛煉成一個跟學生成員長很像的女生，結果我卻變成了她的僕人",
    state: `連載中(100%)`,
    show: "公開",
    collectionNum: 1000,
    followNum: 1000,
    totalVotes: 2300203,
  },
];

const continuationHeaders = [
  { title: "書名", align: "start", width: "130px", key: "title" },
  { title: "狀態", align: "center", key: "state" },
  { title: "我的延續內容", align: "center", key: "content" },
  { title: "總票數", align: "center", key: "totalVotes" },
  { title: "編輯", align: "center", key: "actions", sortable: false },
];

const continuationStories = [
  {
    img: "link_to_image",
    title:
      "想要讓人因此試著鍛煉成一個跟學生成員長很像的女生，結果我卻變成了她的僕人",
    state: `連載中(100%)`,
    show: "公開",
    content:
      "鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生",
    collectionNum: 1000,
    followNum: 1000,
    totalVotes: 23000203,
  },
];

const selectItems = ["文學小說", "奇幻"];
const raceItems = ["人族", "魔族"];
const genderItems = ["男", "女"];
const storyItems = ["學員"];

const selected = ref([]);

const headers2 = [
  {
    title: "類別",
    align: "start",
    sortable: false,
    key: "category",
  },
  { title: "書名", key: "title", align: "start", sortable: false },
  { title: "最新章節", key: "chapterName", align: "center", sortable: false },
  { title: "最初作者", key: "author", align: "center", sortable: false },
  { title: "總字數", key: "totalVotes", align: "center" },
  { title: "收藏數", key: "collectionNum", align: "center" },
];

const collectionStories = ref([
  {
    category: "文學小說",
    title:
      "想要讓人因此試著鍛煉成一個跟學生成員長很像的女生，結果我卻變成了她的僕人",
    chapterName: "後記——善良不需要很聰明",
    author: "新北工程師",
    totalWordCount: 4.0,
    collectionNum: "1%",
  },
  {
    category: "奇幻",
    title: 237,
    chapterName: 9.0,
    author: 37,
    totalWordCount: 4333,
    collectionNum: "1%",
  },
]);

const followHeaders = [
  {
    title: "類別",
    align: "start",
    sortable: false,
    key: "category",
  },
  { title: "書名", key: "title", align: "start", sortable: false },
  { title: "狀態", key: "state", align: "center", sortable: false },
  { title: "最新章節", key: "chapterName", align: "center", sortable: false },
  { title: "最初作者", key: "author", align: "center", sortable: false },
  { title: "追蹤數", key: "followNum", align: "center" },
];

const followStories = [
  {
    category: "奇幻",
    title: "想要讓人因此試著鍛煉成一個跟學生",
    state: "連載中(100%)",
    chapterName: "後記——善良不需要很聰明",
    author: "新北工程師",
    followNum: 1000,
  },
];

const voteStoryHeaders = [
  { title: "書名", key: "title", align: "start", sortable: false },
  { title: "投票記錄內容", key: "content", align: "center", sortable: false },
  { title: "延續者", key: "supportAuthor", align: "center", sortable: false },
  { title: "總票數", key: "totalVotes", align: "center" },
  { title: "編輯", align: "center", key: "actions", sortable: false },
];

const voteStories = [
  {
    title: "想要讓人因此試著鍛煉成一個跟學生",
    content: "想要讓人因此試著鍛煉成一個跟學生想要讓人因此試著鍛煉成一個跟學生",
    supportAuthor: "阿北工程師",
    totalVotes: 20,
    followNum: 1000,
  },
];

const createCharactersHeaders = [
  { title: "角色", key: "name", align: "start", sortable: false },
  { title: "種族", key: "race", align: "center", sortable: false },
  { title: "性別", key: "gender", align: "center", sortable: false },
  { title: "角色描述", key: "roleDescription", align: "center" },
  { title: "出現故事", key: "emergeStory", align: "center", sortable: false },
  { title: "收藏數", key: "collectionNum", align: "center" },
  { title: "編輯", key: "actions", align: "center", sortable: false },
];

const createCharactersItems = [
  {
    name: "煉學生",
    race: "人族",
    gender: "男",
    roleDescription:
      "想要讓人因此試著鍛煉成一個跟學生想要讓人因此試著鍛煉成一個跟學生",
    emergeStory: "學員學員",
    collectionNum: 43,
  },
];

const collectionCharactersHeaders = [
  { title: "角色", key: "name", align: "start", sortable: false },
  { title: "種族", key: "race", align: "center", sortable: false },
  { title: "性別", key: "gender", align: "center", sortable: false },
  { title: "角色描述", key: "roleDescription", align: "center" },
  { title: "出現故事", key: "emergeStory", align: "center", sortable: false },
  { title: "作者", key: "author", align: "center" },
  { title: "編輯", key: "actions", align: "center", sortable: false },
];

const collectionCharactersItems = [
  {
    name: "煉學生",
    race: "人族",
    gender: "男",
    roleDescription:
      "想要讓人因此試著鍛煉成一個跟學生想要讓人因此試著鍛煉成一個跟學生",
    emergeStory: "學員學員",
    author: "新北工程師",
  },
];
</script>

<style scoped>
.sidebar {
  width: 20%;
  padding: 16px;
}

.content {
  width: 80%;
  padding: 16px;
}
</style>
