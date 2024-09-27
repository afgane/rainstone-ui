<template>
  <div class="stacked-bar-plot">
    <h2>{{ title }}</h2>
    <div class="bar-container">
      <div
        v-for="(item, index) in sortedData"
        :key="item.toolId"
        class="bar-segment"
        :style="{
          width: `${item.percentage}%`,
          backgroundColor: getColor(index),
        }"
      >
        <span class="tooltip">
          {{ item.toolId }} ({{ item.percentage.toFixed(2) }}%)
        </span>
      </div>
    </div>
    <div class="legend">
      <div
        v-for="(item, index) in sortedData"
        :key="item.toolId"
        class="legend-item"
      >
        <div
          class="color-box"
          :style="{ backgroundColor: getColor(index) }"
        ></div>
        <span>{{ item.toolId }} ({{ item.percentage.toFixed(2) }}%) </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "StackedBarPlot",
  props: {
    data: {
      type: Array,
      required: true,
    },
    valueProperty: {
      type: String,
      default: "avgCostContribution",
    },
    title: {
      type: String,
      default: "Stacked Bar Plot",
    },
    width: {
      type: Number,
      default: 600,
    },
  },
  setup(props) {
    const sortedData = computed(() => {
      const total = props.data.reduce(
        (sum, item) => sum + item[props.valueProperty],
        0
      );
      return props.data
        .map((item) => ({
          ...item,
          percentage: (item[props.valueProperty] / total) * 100,
        }))
        .sort((a, b) => b.percentage - a.percentage);
    });

    const getColor = (index) => {
      const colors = [
        "#4e79a7",
        "#f28e2c",
        "#e15759",
        "#76b7b2",
        "#59a14f",
        "#edc949",
        "#af7aa1",
        "#ff9da7",
        "#9c755f",
        "#bab0ab",
      ];
      return colors[index % colors.length];
    };

    return {
      sortedData,
      getColor,
    };
  },
};
</script>

<style scoped>
.stacked-bar-plot {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.bar-container {
  height: 32px;
  display: flex;
  margin: 0 10px 20px 10px;
  width: 100%;
}

.bar-segment {
  height: 100%;
  transition: width 0.3s ease;
  position: relative;
}

.bar-segment:hover {
  opacity: 0.8;
}

.bar-segment:hover .tooltip {
  display: block;
}

.tooltip {
  display: none;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  z-index: 10;
}

.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 10px;
}

.legend-item {
  display: flex;
  align-items: center;
}

.color-box {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
</style>
