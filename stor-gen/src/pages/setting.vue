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
              <v-form @submit.prevent="submit" :disabled="isSubmitting">
                <v-card-text>
                  <div
                    id="profile"
                    class="b-1 w-50 text-center mx-auto rounded-lg"
                  >
                    <vue-file-agent
                      class="d-flex justify-center mb-5"
                      accept="image/jpeg,image/png"
                      deletable
                      max-size="1MB"
                      help-text="上傳大頭照"
                      :error-text="{
                        type: '檔案格式不支援',
                        size: '檔案大小不能超過 1MB',
                      }"
                    ></vue-file-agent>

                    <v-row class="text-center" style="padding: 8px">
                      <v-col cols="2" class="my-auto pa-0">
                        <label class="form-label" style="font-size: 18px">
                          暱稱
                        </label>
                      </v-col>
                      <template v-for="item in users" :key="item.id">
                        <v-col cols="8" class="my-auto">
                          <p v-if="!item.isEditing" style="font-size: 18px">
                            {{ item.username }}
                          </p>
                          <v-text-field
                            v-else
                            class="form-label"
                            style="font-size: 18px"
                            variant="outlined"
                            hide-details
                            single-line
                            density="comfortable"
                            clearable
                            dense
                            v-model="item.newUsername"
                            :error-messages="usernameError"
                            @keydown.enter="saveChanges(item)"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="2" class="my-auto pa-0">
                          <v-btn
                            @click="toggleEdit(item)"
                            label="編輯"
                            variant="flat"
                            color="#4E9194"
                            class="pa-0"
                            >編輯</v-btn
                          >
                        </v-col>
                      </template>
                    </v-row>

                    <v-divider class="text-center my-3"></v-divider>

                    <v-row class="text-center" style="padding: 8px">
                      <v-col cols="2" class="my-auto pa-0">
                        <label class="form-label" style="font-size: 18px">
                          電子信箱
                        </label>
                      </v-col>
                      <template v-for="item in users" :key="item.id">
                        <v-col cols="8" class="my-auto">
                          <p
                            v-if="!item.isEmailToggleEditing"
                            style="font-size: 18px"
                          >
                            {{ item.email }}
                          </p>

                          <v-text-field
                            v-else
                            class="form-label"
                            style="font-size: 18px"
                            variant="outlined"
                            hide-details
                            single-line
                            density="comfortable"
                            clearable
                            dense
                            v-model="item.newEmail"
                            :error-messages="newEmailError"
                            @keydown.enter="saveChanges(item)"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="2" class="my-auto pa-0">
                          <v-btn
                            label="編輯"
                            variant="flat"
                            color="#4E9194"
                            @click="emailToggleEdit(item)"
                            >編輯</v-btn
                          >
                        </v-col>
                      </template>
                    </v-row>
                    <v-divider class="text-center my-3"></v-divider
                    ><v-row class="text-center" style="padding: 8px">
                      <template v-for="item in users" :key="item.id">
                        <template v-if="!item.passwordisEditing">
                          <v-col cols="2" class="my-auto pa-0">
                            <label class="form-label" style="font-size: 18px">
                              密碼
                            </label>
                          </v-col>
                          <v-col cols="8" class="my-auto">
                            <p style="font-size: 18px">
                              {{ item.password }}
                            </p>
                          </v-col>
                        </template>
                        <template v-else>
                          <v-col cols="2" class="my-auto pa-0">
                            <label class="form-label" style="font-size: 18px">
                              新密碼
                            </label>
                          </v-col>
                          <v-col cols="8" class="my-auto">
                            <v-text-field
                              class="form-label"
                              style="font-size: 18px"
                              variant="outlined"
                              hide-details
                              single-line
                              density="comfortable"
                              clearable
                              dense
                              v-model="item.newPassword"
                              :error-messages="passwordError"
                              @keydown.enter="saveChanges(item)"
                            ></v-text-field>
                          </v-col>
                        </template>
                        <v-col cols="2" class="my-auto pa-0">
                          <v-btn
                            label="編輯"
                            variant="flat"
                            color="#4E9194"
                            @click="passwordToggleEdit(item)"
                            >編輯</v-btn
                          >
                        </v-col>
                      </template>
                    </v-row>
                    <v-divider class="text-center my-3"></v-divider>
                  </div>
                </v-card-text>
              </v-form>
            </v-card>
          </v-tabs-window-item>

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
import { ref } from "vue";
import { definePage } from "vue-router/auto";
import { useSnackbar } from "vuetify-use-dialog";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useApi } from "@/composables/axios";
import { useRouter } from "vue-router";

definePage({
  meta: {
    title: "界筆 ｜ 設定",
    login: false,
    admin: false,
  },
});

const router = useRouter();
const { apiAuth } = useApi();
const createSnackbar = useSnackbar();

// 後端傳來的基本資料
const users = ref([]);
const loadUser = async () => {
  try {
    const { data } = await apiAuth.get("/user/profile");
    users.value = [data.result]; // 將獲取的資料賦值給 users
    users.value[0].password = "********";
    users.value[0].newUsername = users.value[0].username; // 設置新用戶名為現有用戶名
    users.value[0].newEmail = users.value[0].email;
    users.value[0].newPassword = ""; // 用於存儲新密碼
    console.log(users.value);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

loadUser();

const toggleEdit = (item) => {
  item.isEditing = !item.isEditing;
};
const emailToggleEdit = (item) => {
  item.isEmailToggleEditing = !item.isEmailToggleEditing;
};

const passwordToggleEdit = (item) => {
  item.passwordisEditing = !item.passwordisEditing;
};

const tab = ref("option-1");

// 編輯表單
const schema = yup.object({
  username: yup.string().required("請輸入暱稱"),
});
const {
  handleSubmit,
  errors,
  resetForm,
  setFieldValue,
  setFieldError,
  setErrors,
} = useForm({
  validationSchema: schema,
});

const submit = handleSubmit(async (values) => {
  const user = users.value[0];
  try {
    await apiAuth.put(`/user/profile/${user.id}`, values);
    createSnackbar({
      text: "修改成功",
      color: "success",
    });
  } catch (err) {
    if (err.response?.data?.errors) {
      const errors = err.response.data.errors.reduce(
        (acc, err) => ({ ...acc, [err.field]: err.message }),
        {}
      );
      setErrors(errors);
    } else {
      createSnackbar({
        text: "修改失敗",
        color: "error",
      });
    }
  }
});
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
