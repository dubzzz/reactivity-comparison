<script setup lang="ts">
import { HeaderTree } from "@reactivity-comparison/pivoting";
import Header from "./Header.vue";

type Props = {
  rows: HeaderTree[];
  offset: number;
  columnsDepth: number;
};
const { rows, offset, columnsDepth } = defineProps<Props>();
</script>

<template>
  <Header
    v-for="row in rows"
    :key="row.offset"
    :offset-x="offset"
    :offset-y="row.offset + columnsDepth"
    :size-x="1"
    :size-y="row.size"
    :value="row.value"
  ></Header>
  <Rows
    v-for="row in rows"
    :key="row.offset"
    :rows="row.children"
    :offset="offset + 1"
    :columns-depth="columnsDepth"
  ></Rows>
</template>

<style scoped></style>
