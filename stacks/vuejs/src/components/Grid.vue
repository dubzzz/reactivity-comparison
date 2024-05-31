<script setup lang="ts">
import { computed } from "vue";
import {
  buildHeaders,
  Line,
  HeaderId,
  extractHeaderSpans,
  extractPathsFromSpans,
} from "@reactivity-comparison/pivoting";
import Cells from "./Cells.vue";
import Columns from "./Columns.vue";
import Rows from "./Rows.vue";

type Props = {
  lines: Line[];
  columnHeaderIds: HeaderId[];
  rowHeaderIds: HeaderId[];
};
const { lines, rowHeaderIds, columnHeaderIds } = defineProps<Props>();

const columnsHeaders = computed(() => buildHeaders(lines, columnHeaderIds, 0));
const columnsSpans = computed(() => extractHeaderSpans(columnsHeaders.value));
const columnsPaths = computed(() => extractPathsFromSpans(columnsSpans.value));

const rowsHeaders = computed(() => buildHeaders(lines, rowHeaderIds, 0));
const rowsSpans = computed(() => extractHeaderSpans(rowsHeaders.value));
const rowsPaths = computed(() => extractPathsFromSpans(rowsSpans.value));
</script>

<template>
  <Rows :rows-spans="rowsSpans" :columns-depth="columnsSpans.length" />
  <Columns :columns-spans="columnsSpans" :rows-depth="rowsSpans.length" />
  <Cells
    :rows-paths="rowsPaths"
    :columns-paths="columnsPaths"
    :lines="lines"
    :rows-depth="rowsSpans.length"
    :columns-depth="columnsSpans.length"
  />
</template>

<style scoped></style>
