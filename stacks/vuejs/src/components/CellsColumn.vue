<script setup lang="ts">
import { computed } from "vue";
import { Path, Line, filterLines } from "@reactivity-comparison/pivoting";
import CellWrapper from "./CellWrapper.vue";

type Props = {
  pathRows: Path[];
  lines: Line[];
  rowsDepth: number;
  columnsDepth: number;
  columnPath: Path;
};
const { lines, pathRows, columnPath } = defineProps<Props>();

const filteredLines = computed(() => filterLines(columnPath.entries, lines));
</script>

<template>
  <CellWrapper
    v-for="rowPath in pathRows"
    :key="rowPath.offset"
    :pathEntries="rowPath.entries"
    :lines="filteredLines"
    :offset-x="columnPath.offset + rowsDepth"
    :offset-y="rowPath.offset + columnsDepth"
  ></CellWrapper>
</template>

<style scoped></style>
