<script setup lang="ts">
import { computed } from "vue";
import { cellSize } from "@reactivity-comparison/pivoting";

type Props = {
  value: number;
  offsetX: number;
  offsetY: number;
};
const { value, offsetX, offsetY } = defineProps<Props>();

const style = computed(() => ({
  top: `${offsetY * cellSize}px`,
  left: `${offsetX * cellSize}px`,
  width: `${cellSize}px`,
  height: `${cellSize}px`,
}));
</script>

<template>
  <div class="cell" :style="style">{{ value }}</div>
</template>

<style scoped>
.cell {
  position: absolute;
  border: 1px solid #aaa;
  overflow: hidden;
}
</style>
