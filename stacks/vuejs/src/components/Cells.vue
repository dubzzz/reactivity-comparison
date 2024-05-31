<script setup lang="ts">
import { Line, Path } from "@reactivity-comparison/pivoting";
import CellWrapper from "./CellWrapper.vue";

type Props = {
  columnsPaths: Path[];
  rowsPaths: Path[];
  lines: Line[];
  rowsDepth: number;
  columnsDepth: number;
};
const { columnsPaths, rowsPaths, lines, rowsDepth, columnsDepth } =
  defineProps<Props>();
</script>

<template>
  <template v-for="(columnPath, columnIndex) in columnsPaths" :key="columnIndex"
    ><CellWrapper
      v-for="(rowPath, rowIndex) in rowsPaths"
      :key="rowIndex"
      :path-entries="[...columnPath.entries, ...rowPath.entries]"
      :lines="lines"
      :offset-x="columnPath.offset + rowsDepth"
      :offset-y="rowPath.offset + columnsDepth"
    ></CellWrapper
  ></template>
</template>

<style scoped></style>
