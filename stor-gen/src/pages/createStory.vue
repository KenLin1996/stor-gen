<template>
  <v-container style="padding: 32px">
    <h2>我的故事</h2>
    <v-divider class="mb-5"></v-divider>
    <v-form @submit.prevent="submit" :disabled="isSubmitting">
      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-2" v-if="requiredFields.includes('totalWordCount')"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">總字數</v-label>
          <v-text-field
            class="flex-grow-1"
            style="background-color: white"
            v-model="totalWordCount.value.value"
            :error-messages="totalWordCount.errorMessage.value"
            required
          ></v-text-field>

          <v-tooltip location="bottom">
            <template v-slot:activator="{ props }">
              <v-icon class="mdi mdi-lightbulb-outline" v-bind="props"></v-icon>
            </template>
            <div class="tooltip-content">
              <p><strong>詩</strong></p>
              <ul>
                <li>短詩：50字以内</li>
                <li>長詩：數百到數千字</li>
              </ul>
              <p><strong>小說</strong></p>
              <ul>
                <li>短篇小說：1,000到20,000字（通常3,000到7,500字之間）</li>
                <li>中篇小說：20,000到50,000字</li>
                <li>長篇小說：超過50,000字（通常80,000到120,000字之間）</li>
              </ul>
              <p><strong>短品（散文、隨筆等）</strong></p>
              <ul>
                <li>短篇散文：500到2,000字</li>
                <li>隨筆：1,000到5,000字</li>
              </ul>
            </div>
          </v-tooltip>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-2" v-if="requiredFields.includes('title')"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">故事名</v-label>
          <v-text-field
            class="flex-grow-1"
            style="background-color: white"
            v-model="title.value.value"
            :error-messages="title.errorMessage.value"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-2" v-if="requiredFields.includes('chapterName')"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">章節名稱</v-label>
          <v-text-field
            class="flex-grow-1"
            style="background-color: white"
            v-model="chapterName.value.value"
            :error-messages="chapterName.errorMessage.value"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon
            v-if="requiredFields.includes('content')"
            class="me-2"
            style="color: red"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">起始故事</v-label>
          <v-textarea
            class="flex-grow-1"
            :counter="500"
            v-model="content.value.value"
            :error-messages="content.errorMessage.value"
            required
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-2" v-if="requiredFields.includes('category')"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">投票時間</v-label>
          <v-select
            class="flex-grow-1"
            hide-details
            v-model="voteTime.value.value"
            :error-messages="voteTime.errorMessage.value"
            :items="voteTimeOptions"
            required
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-2" v-if="requiredFields.includes('category')"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">作品分類</v-label>
          <v-select
            class="flex-grow-1"
            hide-details
            v-model="category.value.value"
            :error-messages="category.errorMessage.value"
            :items="categoryOptions"
            required
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-2" v-if="requiredFields.includes('chapterLabels')"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">作品標籤</v-label>
          <v-combobox
            class="flex-grow-1"
            multiple
            chips
            hide-details
            v-model="chapterLabels.value.value"
            :error-messages="chapterLabels.errorMessage.value"
            :items="labelOptions"
            required
          ></v-combobox>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-2" v-if="requiredFields.includes('state')"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">故事狀態</v-label>
          <v-radio-group
            class="d-flex align-center flex-grow-2"
            row
            hide-details
            v-model="state.value.value"
            :error-messages="state.errorMessage.value"
          >
            <div class="d-flex align-center">
              <!-- <v-radio label="完結" :value="true" class="me-4"></v-radio> -->
              <v-radio label="連載中" :value="false"></v-radio>
            </div>
          </v-radio-group>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-2" v-if="requiredFields.includes('show')"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">顯示方式</v-label>
          <v-radio-group
            class="d-flex align-center flex-grow-1"
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
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex align-center">
          <v-icon class="me-2" v-if="requiredFields.includes('fileRecords')"
            >mdi-asterisk</v-icon
          >
          <v-label class="me-4 mb-0">封面圖片</v-label>
          <!-- <v-file-input
            class="flex-grow-1"
            v-model="image.value.value"
            :error-messages="image.errorMessage.value"
          ></v-file-input> -->
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
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="d-flex justify-center">
          <v-btn
            type="submit"
            :loading="isSubmitting"
            style="background-color: #4e9194; color: #ffffff"
            >發布</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useApi } from "../composables/axios.js";
import { useSnackbar } from "vuetify-use-dialog";

definePage({
  meta: {
    title: `界筆 ｜ 創建新故事`,
    login: false,
    admin: false,
  },
});

const { apiAuth } = useApi();
const createSnackbar = useSnackbar();

const fileAgent = ref(null);
const fileRecords = ref([]);
const rawFileRecords = ref([]);
const requiredFields = [
  "totalWordCount",
  "title",
  "chapterName",
  "content",
  "category",
  "chapterLabels",
  "state",
  "show",
  "fileRecords",
];

const schema = yup.object({
  totalWordCount: yup.string().required("文章總字數必填"),
  title: yup.string().required("故事名稱必填"),
  chapterName: yup.string().required("章節名稱必填"),
  content: yup.string().required("內容必填"),
  category: yup.string().required("作品分類必填"),
  chapterLabels: yup.array().required("作品標籤必填"),
  state: yup.boolean().required("狀態必填"),
  show: yup.boolean().required("顯示方式必填"),
});

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
  initialValues: {
    totalWordCount: "",
    title: "",
    chapterName: "",
    content: "",
    voteTime: 0,
    category: "",
    chapterLabels: [],
    state: false,
    show: true,
  },
});

const totalWordCount = useField("totalWordCount");
const title = useField("title");
const chapterName = useField("chapterName");
const content = useField("content");
const voteTime = useField("voteTime");
const category = useField("category");
const chapterLabels = useField("chapterLabels");
const state = useField("state");
const show = useField("show");

const categoryOptions = ref([
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
]);
const labelOptions = ref([
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
]);

const voteTimeOptions = ref([
  { title: "5 分鐘", value: 1000 * 5 * 60 },
  { title: "10 分鐘", value: 1000 * 10 * 60 },
  { title: "30 分鐘", value: 1000 * 30 * 60 },
  { title: "1 小時", value: 1000 * 60 * 60 },
  { title: "2 小時", value: 1000 * 2 * 60 * 60 },
  { title: "4 小時", value: 1000 * 4 * 60 * 60 },
  { title: "8 小時", value: 1000 * 8 * 60 * 60 },
  { title: "12 小時", value: 1000 * 12 * 60 * 60 },
  { title: "24 小時", value: 1000 * 24 * 60 * 60 },
  { title: "36 小時", value: 1000 * 36 * 60 * 60 },
]);

const clearForm = () => {
  resetForm();
  fileAgent.value.deleteFileRecord();
};

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return;

  try {
    const fd = new FormData();
    fd.append("totalWordCount", values.totalWordCount);
    fd.append("title", values.title);
    fd.append("chapterName", values.chapterName);
    fd.append("content", values.content);
    // fd.append("voteTime", new Date().getTime() + values.voteTime);
    fd.append("voteTime", values.voteTime);
    fd.append("category", values.category);
    for (const label of values.chapterLabels) {
      fd.append("chapterLabels", label);
    }
    fd.append("state", values.state);
    fd.append("show", values.show);
    if (fileRecords.value.length > 0) {
      fd.append("image", fileRecords.value[0].file);
    }

    await apiAuth.post("/story", fd);
    createSnackbar({
      text: "新增成功",
      snackbarProps: {
        color: "green",
      },
    });
    clearForm();
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
</script>

<style scoped>
.v-label {
  font-weight: bold;
  margin-bottom: 5px;
}

.v-selection-control {
  flex: none;
}
</style>
