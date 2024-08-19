<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title>
        <v-row no-gutters>
          <v-col
            class="d-flex align-center justify-center text--secondary"
            style="padding-right: 24px"
            cols="1"
          >
            <div class="text--muted">{{ category }}</div>
          </v-col>
          <v-col cols="8" class="text--secondary">
            <span
              class="font-weight-black"
              style="font-size: 16px; margin-right: 4px"
              >{{ title }}</span
            >
            <br />
            <!-- <span
              v-if="expanded"
              class="text--danger my-2 d-inline-block font-weight-black"
              style="font-size: 12px"
              >投票倒數計時：</span
            > -->
            <br />
            <span>{{ chapterName }}</span>
          </v-col>
          <v-col cols="3" class="text-right" style="color: #4e9194">
            <span style="color: #4e9194; margin-right: 10px; font-size: 14px">
              {{ mainAuthor }}
            </span>
            <br />
            <!-- <span
              v-if="expanded"
              class="my-2 d-inline-block"
              style="color: black; margin-right: 10px"
              >2天07時15分</span
            > -->
            <br />
            <span style="color: black; margin-right: 10px">
              {{
                new Date(createdAt).toLocaleString("zh-TW", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </span>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row style="padding: 12px">
          <v-col cols="12" class="mt-1 pa-0" style="font-size: 8px"
            ><h1>
              {{ content[0].latestContent ? "最新內容" : "開始故事" }}
            </h1></v-col
          >
          <v-col cols="12">
            <v-row>
              <v-col cols="1" class="d-flex align-center justify-center pa-0">
                <v-btn
                  text
                  :ripple="false"
                  variant="text"
                  class="heart-button pa-0"
                  @click="toggleHeart"
                  :class="{ filled: isFilled }"
                >
                  <v-icon>{{ icon }}</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="11" class="pl-0">
                <p>
                  <!-- {{ content[0].content }} -->
                  {{
                    content[0].latestContent
                      ? content[0].latestContent
                      : content[0].content
                  }}
                </p>
                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn
                    color="secondary"
                    variant="outlined"
                    @click="openDialog"
                  >
                    延續故事
                  </v-btn>
                </v-card-actions>
                <v-dialog v-model="dialog" max-width="500">
                  <v-form @submit.prevent="submit" :disabled="isSubmitting">
                    <v-card>
                      <v-card-title
                        class="text-center"
                        style="background-color: #97d8c4"
                        >延續故事</v-card-title
                      >
                      <v-card-text class="py-4 pb-0">
                        <v-text-field
                          v-model="newchapterName.value.value"
                          class="mb-4"
                          label="輸入章節名稱"
                          hide-details
                          :minlength="1"
                          :maxlength="60"
                        ></v-text-field>
                        <v-textarea
                          v-model="newChapterContent.value.value"
                          :label="`故事內容（字數：${minWords} - ${maxWords} 字`"
                          rows="10"
                          :minlength="`${minWords}`"
                          :maxlength="`${maxWords}`"
                          counter
                          :rules="contentRules"
                          style="margin-bottom: 8px"
                        ></v-textarea>
                      </v-card-text>
                      <v-card-actions class="justify-center align-start py-0">
                        <v-btn
                          style="background-color: #4e9194; color: #000000"
                          type="submit"
                          :loading="isSubmitting"
                          >發布</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-form>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
      <v-expansion-panel-text>
        <v-col cols="12" class="mt-1 mb-3 pa-0" style="font-size: 8px"
          ><h1>故事投票</h1></v-col
        >
        <VoteItem />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, computed } from "vue";
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useApi } from "../composables/axios.js";
import { useSnackbar } from "vuetify-use-dialog";
import VoteItem from "@/components/VoteItem.vue";

const { api } = useApi();
const createSnackbar = useSnackbar();

// const newchapterName = ref("");
// const newChapterContent = ref("");
const minWords = ref(100);
const maxWords = ref(500);

const schema = yup.object({
  newChapterContent: yup
    .string()
    .required("故事內容必填")
    .min(minWords.value, `故事內容不能少於 ${minWords.value} 字`)
    .max(maxWords.value, `故事內容不能超過 ${maxWords.value} 字`),
});

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
  initialValues: {
    newChapterContent: "",
  },
});

const newchapterName = useField("newchapterName");
const newChapterContent = useField("newChapterContent");

const isFilled = ref(false);
const dialog = ref(false);

const { category, title, chapterName, mainAuthor, content, storyId } =
  defineProps([
    "category",
    "title",
    "chapterName",
    "mainAuthor",
    "content",
    "createdAt",
    "storyId",
  ]);
const toggleHeart = () => {
  isFilled.value = !isFilled.value;
};
const icon = computed(() =>
  isFilled.value ? "mdi-heart" : "mdi-heart-outline"
);

const openDialog = () => {
  dialog.value = true;
};

const contentRules = computed(() => [
  (v) =>
    (v.length >= minWords.value && v.length <= maxWords.value) ||
    `內容字數需在 ${minWords.value} 至 ${maxWords.value} 字之間`,
]);

const submit = handleSubmit(async (values) => {
  try {
    await api.post("/story/storyContent", {
      chapterName: values.newchapterName,
      content: values.newChapterContent,
      parent: storyId,
    });
    createSnackbar({
      text: "註冊成功",
      snackbarProps: {
        color: "green",
      },
    });
    dialog.value = false;
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
.text--muted {
  color: rgba(0, 0, 0, 0.4);
}
.text--danger {
  /* color: red; */
  color: #b21010;
}

/* 愛心 btn */
.heart-button .v-icon {
  color: red;
}
.heart-button:hover .v-icon {
  color: white;
}
.heart-button:hover {
  background-color: red;
}
.v-expansion-panel-title {
  border-bottom: 1px solid #e7e7e7;
}
</style>
