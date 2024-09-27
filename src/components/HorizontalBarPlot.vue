<template>
  <div class="chart-container">
    <div v-for="key in chartProperties" :key="key" class="bar-container">
      <div class="label">{{ formatLabel(key) }}:</div>
      <div class="bar-wrapper">
        <div
          class="bar"
          :style="{
            width: calculateWidth(costEstimate[key]),
            backgroundColor: getColor(key),
          }"
        >
          <span class="value">{{ formatValue(costEstimate[key]) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "HorizontalBarPlot",
  props: {
    costEstimate: {
      type: Object,
      required: true,
      default: () => ({
        medianCostEst: 0,
        avgCostEst: 0,
        p95CostEst: 0,
      }),
    },
    decimals: {
      type: Number,
      required: false,
      default: 2,
    },
  },
  setup(props) {
    const chartProperties = ["avgCostEst", "medianCostEst", "p95CostEst"];

    const maxValue = computed(() => {
      return Math.max(
        props.costEstimate.medianCostEst,
        props.costEstimate.avgCostEst,
        props.costEstimate.p95CostEst
      );
    });

    const calculateWidth = (value) => {
      return `${(value / maxValue.value) * 100}%`;
    };

    const getColor = (key) => {
      const colors = {
        medianCostEst: "#2196F3", // Blue
        avgCostEst: "#4CAF50", // Green
        p95CostEst: "#FFC107", // Yellow
      };
      return colors[key] || "#000000";
    };

    const formatLabel = (key) => {
      const labels = {
        medianCostEst: "Median",
        avgCostEst: "Average",
        p95CostEst: "95th Percentile",
      };
      return labels[key] || key;
    };

    const formatValue = (value) => {
      return typeof value === "number"
        ? `$${value.toFixed(props.decimals)}`
        : "N/A";
    };

    return {
      chartProperties,
      calculateWidth,
      getColor,
      formatLabel,
      formatValue,
    };
  },
});
</script>

<style scoped>
.chart-container {
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: var(--r-space-space-unit) auto;
}

.bar-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  width: 120px;
  text-align: right;
  margin-right: 10px;
  font-weight: bold;
}

.bar-wrapper {
  flex-grow: 1;
}

.bar {
  height: 30px;
  transition: width 0.5s ease-out;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-right: 10px;
  box-sizing: border-box;
}

.value {
  color: white;
  font-weight: bold;
}
</style>
