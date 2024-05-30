<script setup lang="ts">
import { computed } from "vue";
import {
  buildHeaders,
  computeGridDimensions,
  Line,
  HeaderId,
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

const columns = computed(() => buildHeaders(lines, columnHeaderIds, 0));
const rows = computed(() => buildHeaders(lines, rowHeaderIds, 0));
const dimensions = computed(() =>
  computeGridDimensions(columns.value, rows.value)
);
</script>

<template>
  <Rows :rows="rows" :offset="0" :columns-depth="dimensions.columnsDepth" />
  <Columns :columns="columns" :offset="0" :rows-depth="dimensions.rowsDepth" />
  <Cells
    :rows="rows"
    :columns="columns"
    :lines="lines"
    :rows-depth="dimensions.rowsDepth"
    :columns-depth="dimensions.columnsDepth"
  />
</template>

<style scoped></style>
