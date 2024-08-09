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
          <h3 class="mb-1">設定</h3>
          <v-list-item class="d-flex">
            <v-tabs v-model="tab" color="primary" direction="vertical">
              <v-tab
                class="my-1"
                prepend-icon="mdi-cog-outline"
                text="帳號設定"
                value="option-1"
              ></v-tab>
              <v-tab
                class="my-1"
                prepend-icon="mdi-bell-outline"
                text="通知設定"
                value="option-2"
              ></v-tab>
              <v-tab
                class="my-1"
                prepend-icon="mdi-theme-light-dark"
                text="閱讀模式"
                value="option-3"
              ></v-tab>
            </v-tabs>
          </v-list-item>
        </v-list>
      </div>

      <div class="content" style="background-color: white">
        <v-tabs-window v-model="tab">
          <!-- 帳號設定 -->
          <v-tabs-window-item value="option-1">
            <div class="d-flex align-center justify-space-between mb-4">
              <h3>帳號設定</h3>
            </div>
            <v-divider></v-divider>
            <v-card flat>
              <v-card-text>
                <div id="profile" class="b-1 text-center mx-auto rounded-lg">
                  <!-- <v-img :src="imageUrl" v-if="imageUrl"></v-img> -->
                  <vue-file-agent
                    class="mb-5 d-flex justify-center"
                    accept="image/jpeg,image/png"
                    deletable
                    max-size="1MB"
                    help-text="上傳大頭照"
                    :error-text="{
                      type: '檔案格式不支援',
                      size: '檔案大小不能超過 1MB',
                    }"
                  ></vue-file-agent>
                  <!-- <div>
                    <input
                      ref="fileInput"
                      type="file"
                      accept="image/jpeg,image/png"
                      @change="handleFileChange"
                      style="display: none"
                    />
                    <button class="photoBtn" @click="triggerFileInput">
                      更換照片
                    </button>
                    <p v-if="error">{{ error }}</p>
                  </div> -->

                  <v-row class="mb-5 text-center">
                    <template v-for="(item, index) in members" :key="index">
                      <v-col cols="4" class="my-auto">
                        <label class="form-label" style="font-size: 18px">{{
                          item.name
                        }}</label>
                      </v-col>
                      <v-col cols="4" class="my-auto">
                        <p style="font-size: 18px">{{ item.member }}</p>
                      </v-col>
                      <v-col cols="4" class="ps-10">
                        <v-btn label="編輯" variant="flat" color="#4E9194"
                          >編輯</v-btn
                        >
                      </v-col>
                      <v-divider class="text-center"></v-divider>
                    </template>
                  </v-row>
                </div>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>

          <!-- 通知設定 -->
          <v-tabs-window-item value="option-2" style="height: 450px">
            <div class="d-flex align-center justify-space-between mb-4">
              <h3>通知設定</h3>
            </div>
            <v-divider></v-divider>
            <div class="d-flex align-center justify-space-between py-2">
              <v-card-actions class="d-flex flex-column w-100">
                <div class="d-flex align-center justify-space-between w-100">
                  <p>投票通知</p>
                  <p>其他使用者投票給你的故事時寄送推播</p>
                  <v-switch
                    :model-value="true"
                    color="primary"
                    hide-details
                  ></v-switch>
                </div>
                <div class="d-flex align-center justify-space-between w-100">
                  <p>追蹤通知</p>
                  <p>您所追蹤的故事有更新時會寄送通知</p>
                  <v-switch
                    :model-value="true"
                    color="primary"
                    hide-details
                  ></v-switch>
                </div>
              </v-card-actions>
            </div>
          </v-tabs-window-item>

          <!-- 閱讀模式 -->
          <v-tabs-window-item value="option-3" style="height: 450px">
            <div class="d-flex align-center justify-space-between mb-4">
              <h3>閱讀模式</h3>
            </div>
            <v-divider></v-divider>
            <div class="d-flex align-center justify-space-between py-2">
              <v-card-actions class="d-flex flex-column w-100">
                <div class="d-flex align-center justify-space-between w-100">
                  <p>日間模式</p>
                  <v-switch
                    :model-value="true"
                    color="primary"
                    hide-details
                  ></v-switch>
                </div>
                <div class="d-flex align-center justify-space-between w-100">
                  <p>夜間模式</p>
                  <v-switch
                    :model-value="false"
                    color="primary"
                    hide-details
                  ></v-switch>
                </div>
              </v-card-actions>
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
      </div>
    </div>
  </v-container>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref } from "vue";

definePage({
  meta: {
    title: "界筆 ｜ 設定",
    login: false,
    admin: false,
  },
});

const items = ref([
  { title: "首頁", disabled: false, href: "/" },
  { title: "設定", disabled: true, href: "/setting" },
]);

const tab = ref("option-1");

const members = ref([
  { name: "姓名", member: "泥好泥" },
  { name: "暱稱", member: "泥泥泥" },
  { name: "電子信箱", member: "ninini@gmail.com" },
  { name: "密碼", member: "ninininiii" },
]);

// const fileInput = ref(null);
// const error = ref("");
// const imageUrl = ref("");

// const triggerFileInput = () => {
//   fileInput.value.click();
// };

// const handleFileChange = (event) => {
//   const file = event.target.files[0];
//   if (file) {
//     if (!["image/jpeg", "image/png"].includes(file.type)) {
//       error.value = "檔案格式不支援";
//       return;
//     }
//     if (file.size > 1048576) {
//       // 1MB in bytes
//       error.value = "檔案大小不能超過 1MB";
//       return;
//     }
//     error.value = "";
//     const reader = new FileReader();
//     reader.onload = () => {
//       imageUrl.value = reader.result;
//     };
//     reader.readAsDataURL(file);
//   }
// };
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

.photoBtn {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
}

.photoBtn:hover {
  background-color: #e0e0e0;
}

::v-deep .file-preview-wrapper {
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #7a7a7a;
}
::v-deep .vue-file-agent.file-input-wrapper {
  border: none;
}
::v-deep .grid-block-wrapper .grid-block {
  min-width: 125px;
}
</style>
