<script setup lang="ts">
import { HeaderSpanLevel } from "@reactivity-comparison/pivoting";
import Header from "./Header.vue";

type Props = {
  columnsSpans: HeaderSpanLevel[];
  rowsDepth: number;
};
const { columnsSpans, rowsDepth } = defineProps<Props>();
</script>

<template>
  <template v-for="(spanLevel, index) in columnsSpans" :key="index"
    ><Header
      v-for="span in spanLevel"
      :key="span.backingTree.offset"
      :offset-x="span.backingTree.offset + rowsDepth"
      :offset-y="index"
      :size-x="span.backingTree.size"
      :size-y="1"
      :value="span.backingTree.value"
    ></Header
  ></template>
</template>

<style scoped></style>
