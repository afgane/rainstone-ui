<template>
  <div>
    <h2>Tool Details</h2>
    <div class="input-container">
      <input
        v-model="toolId"
        ref="toolIdInput"
        placeholder="Enter Tool ID"
        @keyup.enter="fetchToolDetails"
        class="input-field"
      />
      <span v-if="toolId" class="clear-icon" @click="clearInput()"
        >&times;</span
      >
      <div class="button-group">
        <button @click="fetchToolDetails">Get Tool Details</button>
        <button @click="surpriseMe" class="subtle-button">Surprise Me</button>
      </div>
    </div>
    <div class="tool-details-container">
      <div v-if="loading">Loading...</div>
      <div v-else-if="tool">
        <h2>Cost estimate for a single {{ tool.toolId }} job</h2>
        <div>
          <HorizontalBarPlot :costEstimate="costEstimate" :decimals="5" />
        </div>
        <div class="tool-details-container">
          <p>
            The cost estimates are based on the following data, from
            {{ formatNumber(tool.numJobs) }} jobs:
          </p>
          <div class="tool-details">
            <h3>Runtime</h3>
            <p>
              Average: {{ formatNumber(tool.averageJobRuntimeSec) }} seconds
            </p>
            <p>Median: {{ formatNumber(tool.medianJobRuntimeSec) }} seconds</p>
            <p>p95: {{ formatNumber(tool.p95JobRuntimeSec) }} seconds</p>
          </div>
          <div class="tool-details">
            <h3>Total Input Size</h3>
            <p>
              Average:
              {{ formatNumber((tool.averageJobInputSizeMB / 1000).toFixed(1)) }}
              GB
            </p>
            <p>
              Median:
              {{ formatNumber((tool.medianJobInputSizeMB / 1000).toFixed(1)) }}
              GB
            </p>
            <p>
              p95:
              {{ formatNumber((tool.p95JobInputSizeMB / 1000).toFixed(1)) }} GB
            </p>
          </div>
          <div class="tool-details">
            <h3>Allocated Memory</h3>
            <p>Average: {{ formatNumber(tool.averageAllocatedMemoryGB) }} GB</p>
            <p>Median: {{ formatNumber(tool.medianAllocatedMemoryGB) }} GB</p>
            <p>p95: {{ formatNumber(tool.p95AllocatedMemoryGB) }} GB</p>
          </div>
        </div>
      </div>
      <div v-else-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getApiUrl } from "@/config/api";
import HorizontalBarPlot from "../components/HorizontalBarPlot.vue";

export default {
  name: "ToolDetails",
  components: {
    HorizontalBarPlot,
  },
  data() {
    return {
      toolId: "",
      tool: null,
      costEstimate: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async fetchToolDetails() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get(getApiUrl("/tools/" + this.toolId));
        this.tool = response.data;
        this.costEstimate = {
          avgCostEst: this.tool.averageCostPerJob,
          medianCostEst: this.tool.medianCostPerJob,
          p95CostEst: this.tool.p95CostPerJob,
        };
      } catch (error) {
        console.error("Error fetching tool details:", error);
        this.error = "Tool not found or error occurred";
        this.tool = null;
      }
      this.loading = false;
    },
    clearInput() {
      this.toolId = "";
      this.tool = null;
      this.$refs.toolIdInput.focus();
    },
    surpriseMe() {
      const demoTools = [
        "align_families",
        "ncbi_blastp_wrapper",
        "clustalw",
        "trinity",
        "music_compare",
        "tp_head_tool",
      ];
      const randomToolId =
        demoTools[Math.floor(Math.random() * demoTools.length)];
      console.log("Random tool ID:", randomToolId);
      this.toolId = randomToolId.toString();
      this.fetchToolDetails();
    },
    formatNumber(value) {
      return value.toLocaleString();
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: var(--r-text-size-250);
  font-weight: 900;
  text-align: center;
  line-height: normal;
  letter-spacing: -0.03em;
}

h3 {
  font-size: var(--r-text-size-150);
  font-weight: 700;
  margin-top: var(--r-space-space-halfunit);
}

.input-container {
  position: relative;
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: var(--r-space-space-unit);
  width: var(--r-content-caption-maxwidth);
  margin: 0 auto;
}

.input-field {
  border-radius: var(--r-radius-radius-radius8);
  border: 2px solid var(--r-c-gray-700);
  background-color: var(--r-c-black-rich);
  color: var(--r-c-white);
  height: var(--r-space-space-threeunits);
  width: 66%;
  font-size: var(--r-text-size-150);
  padding: var(--r-space-space-halfunit);
}

.input-field:focus {
  outline: none;
  border: 2px solid transparent; /* Make sure the border is transparent to show the gradient */
  background: linear-gradient(var(--r-c-black-rich), var(--r-c-black-rich))
      padding-box,
    linear-gradient(
        103.55deg,
        var(--r-c-border-highlight-1) 16.12%,
        var(--r-c-border-highlight-2) 41.87%,
        var(--r-c-primary-300) 84.45%
      )
      border-box;
}

.clear-icon {
  position: absolute;
  top: 34%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: var(--r-text-size-150);
  color: var(--r-c-gray-900);
  right: 115px;
}

.clear-icon:hover {
  color: var(--r-c-white-soft);
}

.button-group {
  display: flex;
  gap: var(--r-space-space-halfunit);
  flex-direction: row;
}

button {
  font-size: var(--r-text-size-150);
  height: var(--r-space-space-threeunits);
  padding: var(--r-space-space-halfunit) var(--r-space-space-twounits);
}

.subtle-button {
  background-color: transparent;
  border: 2px solid var(--r-c-gray-700);
  color: var(--r-c-gray-900);
}

.subtle-button:hover {
  background-color: var(--r-c-primary-300);
  border: 2px solid var(--r-c-primary-300);
  color: var(--r-c-white);
}
</style>
