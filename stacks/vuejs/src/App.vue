<script setup lang="ts">
import { reactive } from "vue";
import { cloneDeep } from "lodash";
import Grid from "./components/Grid.vue";
import { toHeaders, toHeaderId } from "@reactivity-comparison/pivoting";

const lines = reactive([
  {
    headers: toHeaders({
      Country: "France",
      Town: "Mende",
      Product: "A",
    }),
    value: 1,
  },
  {
    headers: toHeaders({
      Country: "France",
      Town: "Mende",
      Product: "B",
    }),
    value: 2,
  },
  {
    headers: toHeaders({
      Country: "France",
      Town: "Lyon",
      Product: "B",
    }),
    value: 3,
  },
  {
    headers: toHeaders({
      Country: "United-States",
      Town: "New-York",
      Product: "A",
    }),
    value: 4,
  },
  {
    headers: toHeaders({
      Country: "United-States",
      Town: "New-York",
      Product: "C",
    }),
    value: 5,
  },
]);
const rowHeaderIds = reactive([toHeaderId("Country"), toHeaderId("Town")]);
const columnHeaderIds = reactive([toHeaderId("Product")]);

const refreshData = () => {
  for (let index = 0; index !== lines.length; ++index) {
    lines[index] = cloneDeep(lines[index]);
  }
};
const updateOneCell = () => {
  lines[0].value += 1;
};
</script>

<template>
  <div>
    <div>
      <button @click="refreshData">Refresh data</button>
      <button @click="updateOneCell">Update one cell</button>
    </div>
    <div class="grid">
      <Grid
        :lines="lines"
        :rowHeaderIds="rowHeaderIds"
        :columnHeaderIds="columnHeaderIds"
      ></Grid>
    </div>
  </div>
</template>

<style scoped>
.grid {
  position: relative;
}
</style>
