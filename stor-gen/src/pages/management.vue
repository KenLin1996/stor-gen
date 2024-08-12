<template>
  <v-container style="padding: 32px">
    <v-breadcrumbs :items="items" style="padding: 0px 12px 16px 12px">
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
              ></v-tab>
              <v-tab
                class="my-1"
                prepend-icon="mdi-vote"
                text="已投票的故事"
                value="option-4"
              ></v-tab>
              <v-divider class="my-6"></v-divider>
              <h3 class="mb-1">角色管理</h3>
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
        <v-tabs-window v-model="tab">
          <!-- 我的故事/延續 -->
          <v-tabs-window-item value="option-1">
            <div class="d-flex align-center justify-space-between mb-4">
              <h3>我的故事</h3>
              <v-btn prepend-icon="mdi-plus" size="small" to="/createStory"
                >新增故事</v-btn
              >
            </div>
            <v-divider></v-divider>
            <v-card flat>
              <v-card-text>
                <v-data-table
                  v-model:items-per-page="tableItemsPerPage"
                  v-model:sort-by="tableSortBy"
                  v-model:page="tablePage"
                  :headers="myStoryHeaders"
                  :items="myStoryItems"
                  :items-length="tableItemsLength"
                  @update:items-per-page="tableLoadMyStoryItems(false)"
                  @update:sort-by="tableLoadMyStoryItems(false)"
                  @update:page="tableLoadMyStoryItems(false)"
                  density="comfortable"
                  item-key="name"
                >
                  <template #[`item.image`]="{ value }">
                    <!-- <v-img :src="item.image"></v-img> -->
                    <v-img :src="value" max-height="100px" class="py-1"></v-img>
                  </template>
                  <template #[`item.state`]="{ item }">
                    <span>{{ item.state ? "完結" : "連載" }}</span>
                  </template>

                  <!-- 顯示 -->
                  <template #[`item.show`]="{ item }">
                    <span>{{ item.show ? "公開" : "隱藏" }}</span>
                  </template>
                  <template #[`item.actions`]="{ item }">
                    <v-btn
                      text
                      to=""
                      :active="false"
                      :ripple="false"
                      variant="tonal"
                      @click="openDialog(item)"
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
              ></v-select>
              <v-select
                dense
                density="comfortable"
                label="性別"
                hide-details
                max-width="150px"
                :items="genderItems"
              ></v-select>
              <v-select
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
              ></v-select>
              <v-select
                dense
                density="comfortable"
                label="性別"
                hide-details
                max-width="150px"
                :items="genderItems"
              ></v-select>
              <v-select
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
                      移除
                    </v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </div>
  </v-container>
  <v-dialog v-model="dialog.open" persistent width="500">
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-card>
        <v-card-title>編輯</v-card-title>
        <v-card-text>
          <v-text-field
            label="書名"
            v-model="title.value.value"
            :error-messages="title.errorMessage.value"
          ></v-text-field>

          <v-label class="me-4 mb-0">故事狀態</v-label>
          <v-radio-group
            class="d-flex align-center"
            row
            hide-details
            v-model="state.value.value"
            :error-messages="state.errorMessage.value"
          >
            <div class="d-flex align-center">
              <v-radio label="完結" :value="true" class="me-4"></v-radio>
              <v-radio
                label="連載中"
                :value="false"
                style="flex: none"
              ></v-radio>
            </div>
          </v-radio-group>

          <v-label class="me-4 mb-0">顯示方式</v-label>
          <v-radio-group
            class="d-flex align-center"
            row
            hide-details
            v-model="show.value.value"
            :error-messages="show.errorMessage.value"
          >
            <div class="d-flex align-center">
              <v-radio label="公開" :value="true" class="me-4"></v-radio>
              <v-radio label="隱藏" :value="false"></v-radio>
            </div>
          </v-radio-group>

          <vue-file-agent
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="image/jpeg,image/png"
            deletable
            max-size="1MB"
            help-text="選擇檔案或拖曳到這裡"
            :error-text="{
              type: '檔案格式不支援',
              size: '檔案大小不能超過 1MB',
            }"
            ref="fileAgent"
          ></vue-file-agent>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red" :loading="isSubmitting" @click="closeDialog"
            >取消</v-btn
          >
          <v-btn color="green" type="submit" :loading="isSubmitting"
            >送出</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useApi } from "@/composables/axios";
import { useSnackbar } from "vuetify-use-dialog";

definePage({
  meta: {
    title: "界筆 ｜ 故事/角色管理",
    login: false,
    admin: false,
  },
});

const items = ref([
  { title: "首頁", disabled: false, href: "/" },
  { title: "故事/角色管理", disabled: true, href: "/management" },
]);

const { apiAuth } = useApi();
const createSnackbar = useSnackbar();
const tab = ref("option-1");

const tableItemsPerPage = ref(10);
const tableSortBy = ref([{ key: "createdAt", order: "desc" }]);
const tablePage = ref(1);
const tableItemsLength = ref(0);

const fileRecords = ref([]);
const rawFileRecords = ref([]);

const fileAgent = ref(null);

const dialog = ref({
  // 編輯對話框的狀態
  open: false,
  // 紀錄編輯中的 id，沒有就是新增，有就是編輯
  id: "",
});

const openDialog = (item) => {
  dialog.value.id = item._id;
  title.value.value = item.title;
  state.value.value = item.state;
  show.value.value = item.show;

  dialog.value.open = true;
};

const closeDialog = () => {
  dialog.value.open = false;
  resetForm();
};

const schema = yup.object({
  title: yup.string().required("故事名稱必填"),
  state: yup.boolean(),
  show: yup.boolean(),
});

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    title: "",
    state: true,
    show: true,
  },
});

const title = useField("title");
const state = useField("state");
const show = useField("show");

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return;
  if (dialog.value.id.length === 0 && fileRecords.value.length < 1) return;
  try {
    const fd = new FormData();
    fd.append("title", values.title);
    fd.append("state", values.state);
    fd.append("show", values.show);
    if (fileRecords.value.length > 0) {
      fd.append("image", fileRecords.value[0].file);
    }

    await apiAuth.patch("/story/" + dialog.value.id, fd);

    createSnackbar({
      text: "新增成功",
      snackbarProps: {
        color: "green",
      },
    });
    closeDialog();
    tableLoadMyStoryItems(true);
  } catch (error) {
    console.log(error);
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: {
        color: "red",
      },
    });
  }
});

const myStoryHeaders = [
  {
    title: "書封",
    align: "center",
    width: "160px",
    sortable: false,
    key: "image",
  },
  { title: "書名", align: "start", width: "130px", key: "title" },
  { title: "狀態", align: "center", key: "state" },
  { title: "顯示", align: "center", key: "show", sortable: false },
  { title: "收藏數", align: "center", key: "collectionNum" },
  { title: "追蹤數", align: "center", key: "followNum" },
  { title: "總票數", align: "center", key: "totalVotes" },
  { title: "編輯", align: "center", key: "actions", sortable: false },
];

const myStoryItems = ref([]);
// const myStoryItems = [
//   {
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzKYSIrA6-OO6TAY2mG-OT--cpO_HsVOGpbw&s",
//     title:
//       "想要讓人因此試著鍛煉成一個跟學生成員長很像的女生，結果我卻變成了她的僕人",
//     state: "連載中(100%)",
//     show: "公開",
//     collectionNum: 1000,
//     followNum: 1000,
//     totalVotes: 2300203,
//   },
// ];

const tableLoadMyStoryItems = async () => {
  try {
    const { data } = await apiAuth.get("/story/all", {
      params: {
        page: tablePage.value,
        itemsPerPage: tableItemsPerPage.value,
        sortBy: tableSortBy.value[0]?.key || "createdAt",
        sortOrder: tableSortBy.value[0]?.order || "desc",
      },
    });
    console.log(data);
    myStoryItems.value.splice(
      0,
      myStoryItems.value.length,
      ...data.result.data
    );
    console.log(myStoryItems.value);
    tableItemsLength.value = data.result.total;
  } catch (error) {
    console.log(error);
    createSnackbar({
      text: error?.response?.data?.message || "發生錯誤",
      snackbarProps: {
        color: "red",
      },
    });
  }
};
tableLoadMyStoryItems();

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
    state: "連載中(100%)",
    show: "公開",
    content:
      "鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生鍛煉成一個跟學生",
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
  { title: "收藏數", key: "collectionNum", align: "center" },
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
    collectionNum: 43,
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
