<script setup lang="ts">
import { HeaderSpanLevel } from "@reactivity-comparison/pivoting";
import Header from "./Header.vue";

type Props = {
  rowsSpans: HeaderSpanLevel[];
  columnsDepth: number;
};
const { rowsSpans, columnsDepth } = defineProps<Props>();
</script>

<template>
  <template v-for="(spanLevel, index) in rowsSpans" :key="index"
    ><Header
      v-for="span in spanLevel"
      :key="span.backingTree.offset"
      :offset-x="index"
      :offset-y="span.backingTree.offset + columnsDepth"
      :size-x="1"
      :size-y="span.backingTree.size"
      :value="span.backingTree.value"
    ></Header
  ></template>
</template>

<style scoped></style>
