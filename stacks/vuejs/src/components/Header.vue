<script setup lang="ts">
import { computed } from "vue";
import { cellSize } from "@reactivity-comparison/pivoting";

type Props = {
  value: string;
  offsetX: number;
  offsetY: number;
  sizeX: number;
  sizeY: number;
};
const { value, offsetX, offsetY, sizeX, sizeY } = defineProps<Props>();

const style = computed(() => ({
  top: `${offsetY * cellSize}px`,
  left: `${offsetX * cellSize}px`,
  width: `${sizeX * cellSize}px`,
  height: `${sizeY * cellSize}px`,
}));
</script>

<template>
  <div class="header" :style="style">{{ value }}</div>
</template>

<style scoped>
.header {
  position: absolute;
  border: 1px solid #aaa;
  background-color: #eee;
  overflow: hidden;
}
</style>
