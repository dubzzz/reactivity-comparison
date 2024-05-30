<script setup lang="ts">
import { computed } from "vue";
import {
  computePaths,
  Line,
  HeaderTree,
} from "@reactivity-comparison/pivoting";
import CellsColumn from "./CellsColumn.vue";

type Props = {
  columns: HeaderTree[];
  rows: HeaderTree[];
  lines: Line[];
  rowsDepth: number;
  columnsDepth: number;
};
const { columns, rows, lines, rowsDepth, columnsDepth } = defineProps<Props>();

const pathColumns = computed(() => computePaths(columns));
const pathRows = computed(() => computePaths(rows));
</script>

<template>
  <CellsColumn
    v-for="columnPath in pathColumns"
    :key="columnPath.offset"
    :path-rows="pathRows"
    :column-path="columnPath"
    :lines="lines"
    :rows-depth="rowsDepth"
    :columns-depth="columnsDepth"
  ></CellsColumn>
</template>

<style scoped></style>
