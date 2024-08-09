<template>
  <v-card class="w-100 px-6 py-2 rounded-lg">
    <v-card-title class="pa-0">
      <div class="title-row">
        <div class="title-text">
          <h1 class="card-title my-1">臺北男工程師</h1>
        </div>
        <div class="vote-section">
          <v-icon class="vote-icon" size="20">mdi-vote</v-icon>
          <span class="vote-count text-body-2">{{ voteCount }}</span>
          <v-menu location="end">
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
                class="menu-btn"
                style="width: 30px; height: 30px; padding: auto"
                variant="plain"
              >
                <v-icon size="20">mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list class="pa-0">
              <v-list-item v-for="(item, i) in items" :key="i" class="">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </div>
    </v-card-title>
    <v-card-text class="pa-0 mx-7 py-1">
      艾瑞克的日常工作包括解決這些魔獸引起的問題。有時，這些問題可能只是一個簡單的錯誤，如一個程式碼中的逻辑錯誤；有時，它們可能更為複雜，需要艾瑞克深入研究才能找到解決方案。無論何時，他都會全力以赴，因為他知道，如果不及時解決這些問題，魔獸就可能破壞整個數字世界，進而影響到現實世界。
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        :disabled="voteButtonDisabled"
        style="background-color: #f24e1e; color: white"
        @click="vote"
        >投票</v-btn
      >
      <v-btn
        :disabled="cancelButtonDisabled"
        style="background-color: #f4b942; color: black; margin-right: 24px"
        @click="cancel"
        >取消</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const items = ref([{ title: "檢舉" }, { title: "刪除" }]);
const voteCount = ref(0);
const voteButtonDisabled = ref(false);
const cancelButtonDisabled = ref(true);

const vote = () => {
  voteCount.value += 1;
  voteButtonDisabled.value = true;
  cancelButtonDisabled.value = false;
};

const cancel = () => {
  voteCount.value -= 1;
  voteButtonDisabled.value = false;
  cancelButtonDisabled.value = true;
};
</script>

<style scoped>
.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 28px;
}

.title-text,
.vote-section {
  display: flex;
  align-items: center;
}

.card-title {
  font-size: 14px;
  color: #4e9194;
}

.vote-icon {
  margin-right: 4px;
}

.vote-count {
  margin-right: 4px;
}

.menu-btn {
  display: flex;
  align-items: center;
}
.v-list-item--density-default.v-list-item--one-line {
  min-height: 0px;
}
</style>
