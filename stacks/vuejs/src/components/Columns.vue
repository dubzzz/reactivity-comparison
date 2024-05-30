<script setup lang="ts">
import { HeaderTree } from "@reactivity-comparison/pivoting";
import Header from "./Header.vue";

type Props = {
  columns: HeaderTree[];
  offset: number;
  rowsDepth: number;
};
const { columns, offset, rowsDepth } = defineProps<Props>();
</script>

<template>
  <Header
    v-for="column in columns"
    :key="column.offset"
    :offset-x="column.offset + rowsDepth"
    :offset-y="offset"
    :size-x="column.size"
    :size-y="1"
    :value="column.value"
  ></Header>
  <Columns
    v-for="column in columns"
    :key="column.offset"
    :columns="column.children"
    :offset="offset + 1"
    :rows-depth="rowsDepth"
  ></Columns>
</template>

<style scoped></style>
