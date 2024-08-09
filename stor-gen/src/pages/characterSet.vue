<template>
  <v-container style="padding: 32px">
    <h2>人物設定</h2>
    <v-divider class="custom-mb-5"></v-divider>
    <v-responsive class="my-5">
      <v-row>
        <v-col cols="1" class="d-flex align-center justify-center">
          <p>角色搜尋</p>
        </v-col>
        <v-col cols="11">
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
        </v-col>
      </v-row>
    </v-responsive>

    <v-btn color="primary" class="my-5" @click="openDialog"> 新增角色 </v-btn>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="d-flex headline" style="background-color: #97d8c4">
          <v-icon class="mr-2">mdi-account</v-icon>
          <span class="title">角色資料</span>
          <v-spacer></v-spacer>
          <v-icon @click="dialog = false">mdi-close</v-icon>
        </v-card-title>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text class="pb-0">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <vue-file-agent
                    class="mb-5"
                    accept="image/jpeg,image/png"
                    deletable
                    max-size="1MB"
                    help-text="上傳大頭照"
                    :error-text="{
                      type: '檔案格式不支援',
                      size: '檔案大小不能超過 1MB',
                    }"
                    v-model="avatar"
                  ></vue-file-agent>
                </v-col>
                <v-col cols="12" v-for="(field, index) in fields" :key="index">
                  <v-text-field
                    v-model="field.value"
                    :label="field.label"
                    :rules="field.rules"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="d-flex justify-center pt-0 pb-3">
            <!-- <v-spacer></v-spacer> -->
            <v-btn
              :disabled="!valid"
              color="primary"
              class="mb-2"
              style="background-color: #f4b942"
              @click="createCharacter"
              >建立</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <v-row>
      <v-col cols="1" class="d-flex align-center justify-center my-4">
        <p>角色列表</p>
      </v-col>
      <v-col cols="11"> </v-col>
    </v-row>

    <v-expansion-panels>
      <v-expansion-panel v-for="user in users" :key="user.name" class="my-2">
        <v-expansion-panel-title>
          <v-row class="align-center" style="flex: none">
            <v-avatar class="mr-3">
              <v-img :src="user.img"></v-img>
              <!-- <v-icon width="200px">{{ user.avatar }}</v-icon> -->
            </v-avatar>
            <v-spacer></v-spacer>
            <span>{{ user.name }}</span>
            <v-spacer></v-spacer>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="2">
              <v-img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzmjnVtLwYIG3FlXx0NSuE0bFlGX1enrUT7w&s"
              ></v-img>
            </v-col>
            <v-col cols="10">
              <v-card>
                <v-card-text class="pt-0">
                  <v-list dense>
                    <v-list-item
                      v-for="(value, key) in userDetails"
                      :key="key"
                      class="mt-2"
                      style="background-color: lightgray"
                    >
                      <div class="d-flex align-center">
                        <v-list-item-title class="mr-3"
                          >{{ key }}：</v-list-item-title
                        >
                        <v-list-item-text>{{ value }}</v-list-item-text>
                      </div>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script setup>
import { definePage } from "vue-router/auto";
import { ref, reactive } from "vue";

definePage({
  meta: {
    title: `界筆 ｜ 人物設定`,
    login: false,
    admin: false,
  },
});

const dialog = ref(false);
const valid = ref(false);
const avatar = ref(null);

const requiredRule = (value) => !!value || "此欄位為必填";
const numberRule = (value) => !isNaN(value) || "此欄位必須為數字";
const dateRule = (value) => {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/;
  return datePattern.test(value) || "請輸入有效日期 (YYYY-MM-DD)";
};

const fields = reactive([
  { label: "姓名", value: "", rules: [requiredRule] },
  { label: "性別", value: "", rules: [requiredRule] },
  { label: "種族", value: "", rules: [requiredRule] },
  { label: "職業", value: "", rules: [requiredRule] },
  { label: "國家", value: "", rules: [requiredRule] },
  { label: "地區", value: "", rules: [requiredRule] },
  { label: "生日", value: "", rules: [requiredRule, dateRule] },
  { label: "身高", value: "", rules: [requiredRule, numberRule] },
  { label: "體重", value: "", rules: [requiredRule, numberRule] },
  { label: "血型", value: "", rules: [requiredRule] },
  { label: "髮色", value: "", rules: [requiredRule] },
  { label: "瞳色", value: "", rules: [requiredRule] },
  { label: "口頭禪", value: "", rules: [requiredRule] },
  { label: "感情狀態", value: "", rules: [requiredRule] },
  { label: "角色描述", value: "", rules: [requiredRule] },
  { label: "興趣", value: "", rules: [requiredRule] },
  { label: "技能", value: "", rules: [requiredRule] },
  { label: "夢想", value: "", rules: [requiredRule] },
  { label: "弱點", value: "", rules: [requiredRule] },
  { label: "最大的秘密", value: "", rules: [requiredRule] },
  { label: "出現故事", value: "", rules: [requiredRule] },
]);

const createCharacter = () => {
  // 表單驗證
  const form = ref(null);
  if (form.value.validate()) {
    // 表單數據處理邏輯
    console.log(fields);
    dialog.value = false;
  }
};

const openDialog = () => {
  dialog.value = true;
};

const users = ref([
  {
    name: "沃豪內",
    avatar: "mdi-account-circle",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzmjnVtLwYIG3FlXx0NSuE0bFlGX1enrUT7w&s",
  },
  {
    name: "沃內",
    avatar: "mdi-account-circle",
  },
  {
    name: "豪內",
    avatar: "mdi-account-circle",
  },
  {
    name: "豪內內",
    avatar: "mdi-account-circle",
  },
  {
    name: "沃內豪內",
    avatar: "mdi-account-circle",
  },
  {
    name: "內豪內沃",
    avatar: "mdi-account-circle",
  },
]);

const userDetails = ref({
  種族: "人族",
  性別: "男",
  職業: "上班族",
  國家: "雅特紅提",
  地區: "西斯里",
  生日: "日元紀340年04月03日",
  身高: "185 cm",
  體重: "80kg",
  血型: "B型",
  髮色: "黑色",
  瞳色: "雙瞳 左紅 右黑",
  口頭禪: "要中風了",
  感情狀態: "單身",
  角色描述: "認真魔人，不知變通",
  興趣: "在家耍廢",
  技能: "很會說服別人",
  夢想: "成為世界首富",
  弱點: "害怕昆蟲",
  最大的秘密: "小時候是個雕小鬼",
  出現故事: "《無情轉職》",
});

const toggleBookmark = () => {
  console.log("Bookmark icon clicked!");
};
</script>

<style>
.v-expansion-panel-header {
  cursor: pointer;
}
.custom-mb-5 {
  margin-bottom: 20px;
}
.v-responsive__content {
  display: flex;
  align-items: center;
}
.v-expansion-panel-text__wrapper {
  padding: 8px 24px 24px;
}

/* ::v-deep .file-preview-wrapper {
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #7a7a7a;
}
::v-deep .vue-file-agent.file-input-wrapper {
  border: none;
}
::v-deep .grid-block-wrapper .grid-block {
  min-width: 125px;
} */
</style>
