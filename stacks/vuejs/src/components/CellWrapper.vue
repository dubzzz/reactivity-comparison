<script setup lang="ts">
import { computeValue, Line, Path } from "@reactivity-comparison/pivoting";
import Cell from "./Cell.vue";

type Props = {
  pathEntries: Path["entries"];
  lines: Line[];
  offsetX: number;
  offsetY: number;
};
const { pathEntries, lines, offsetX, offsetY } = defineProps<Props>();
</script>

<template>
  <Cell
    :value="computeValue(pathEntries, lines)"
    :offset-x="offsetX"
    :offset-y="offsetY"
  ></Cell>
</template>

<style scoped></style>
