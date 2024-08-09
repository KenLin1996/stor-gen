<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-title v-slot="{ expanded }">
        <v-row no-gutters>
          <v-col
            class="d-flex align-center justify-center text--secondary"
            cols="1"
          >
            <div class="text--muted">奇幻</div>
          </v-col>
          <v-col cols="8" class="text--secondary">
            <span
              class="font-weight-black"
              style="font-size: 16px; margin-right: 4px"
              >異世界工程師</span
            >
            <br />
            <span
              v-if="expanded"
              class="text--danger my-2 d-inline-block font-weight-black"
              style="font-size: 12px"
              >投票倒數計時：</span
            >
            <br />
            <span>第一章-所謂的上班</span>
          </v-col>
          <v-col cols="3" class="text-right" style="color: #4e9194">
            <span style="color: #4e9194; margin-right: 10px; font-size: 14px">
              新北男工程師
            </span>
            <br />
            <span
              v-if="expanded"
              class="my-2 d-inline-block"
              style="color: black; margin-right: 10px"
              >2天07時15分</span
            >
            <br />
            <span style="color: black; margin-right: 10px">2024-07-15</span>
          </v-col>
        </v-row>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-row style="padding: 10px">
          <v-col cols="1" class="d-flex align-center">
            <v-btn
              text
              :ripple="false"
              variant="text"
              class="heart-button"
              @click="toggleHeart"
              :class="{ filled: isFilled }"
            >
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="11">
            <p>
              在一個遙遠的世界裡，有一位名叫艾克的軟體工程師。他每天都會在自己的辦公室裡工作，但他的工作並非一般人能夠想像的那樣。艾克的工作對象是「魔獸」，這些魔獸居住在數字世界中，並且以各種奇特的方式影響著現實世界。
            </p>
            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn color="secondary" variant="outlined" @click="openDialog">
                延續故事
              </v-btn>
            </v-card-actions>
            <v-dialog v-model="dialog" max-width="500">
              <v-card>
                <v-card-title
                  class="text-center"
                  style="background-color: #97d8c4"
                  >延續故事</v-card-title
                >
                <v-card-text class="py-4 pb-0">
                  <v-text-field
                    class="mb-4"
                    v-model="chapterName"
                    label="輸入章節名稱"
                    hide-details
                    :minlength="1"
                    :maxlength="60"
                  ></v-text-field>
                  <v-textarea
                    v-model="chapterContent"
                    :label="`故事內容（字數：${minWords} - ${maxWords} 字`"
                    rows="10"
                    :minlength="`${minWords}`"
                    :maxlength="`${maxWords}`"
                    counter
                    :rules="contentRules"
                  ></v-textarea>
                </v-card-text>
                <v-card-actions class="justify-center align-start py-0">
                  <v-btn
                    style="background-color: #4e9194; color: #000000"
                    @click="publishStory"
                    >發布</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script setup>
import { ref, computed } from "vue";

const isFilled = ref(false);
const dialog = ref(false);
const chapterName = ref("");
const chapterContent = ref("");
const minWords = ref(100);
const maxWords = ref(500);

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

const publishStory = () => {
  if (
    chapterContent.value.length >= minWords.value &&
    chapterContent.value.length <= maxWords.value
  ) {
    // 在這裡處理發布故事的邏輯
    console.log("章節名稱:", chapterName.value);
    console.log("內容:", chapterContent.value);
    dialog.value = false;
  } else {
    alert(`內容字數需在 ${minWords.value} 至 ${maxWords.value} 字之間`);
  }
};
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
</style>
