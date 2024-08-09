<template>
  <v-list-group style="margin: 0px 40px">
    <template v-slot:activator="{ props }">
      <v-list-item v-bind="props">
        <v-list-item-content>
          <v-list-item-title style="padding: 0px 10px">
            {{ title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-list-item v-for="subItem in subItems" :key="subItem.title">
      <v-list-item-content>
        <v-list-item-title>
          <a :href="subItem.link" target="_blank">{{ subItem.title }}</a>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list-group>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subItems: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.v-list-group__header {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
