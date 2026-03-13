<template>
  <div>
    <div class="upload-container">
      <div
        class="drop-zone"
        @drop.prevent="onDrop"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @click="handleDropZoneClick"
        :class="{
          'file-mode': inputMode === 'file',
          'url-mode': inputMode === 'url',
          dragging: isDragging && inputMode === 'file',
          'file-selected': hasWorkflowSource,
          'drop-zone-file-selected': isUploaded,
        }"
      >
        <div class="source-mode-toggle" @click.stop>
          <button
            type="button"
            class="mode-toggle-button"
            :class="{ active: inputMode === 'file' }"
            @click="setInputMode('file')"
          >
            Upload file
          </button>
          <button
            type="button"
            class="mode-toggle-button"
            :class="{ active: inputMode === 'url' }"
            @click="setInputMode('url')"
          >
            Use URL
          </button>
        </div>
        <input
          type="file"
          @change="onFileSelected"
          ref="fileInput"
          class="file-input"
          accept=".ga,application/json"
        />
        <div v-if="!isUploaded && inputMode === 'file'" class="drop-zone-content">
          <p>
            Drag and drop your Galaxy workflow file here <br />
            or click to select one
          </p>
        </div>
        <form
          v-else-if="!isUploaded && inputMode === 'url'"
          class="url-form"
          @submit.prevent="loadWorkflowFromUrl"
          @click.stop
        >
          <label class="url-label" for="workflow-url">
            Paste a direct link to a Galaxy workflow `.ga` file
          </label>
          <input
            id="workflow-url"
            v-model.trim="workflowUrl"
            type="url"
            class="url-input"
            placeholder="https://raw.githubusercontent.com/.../workflow.ga"
            spellcheck="false"
            autocomplete="off"
          />
          <p class="url-help">
            Use a direct URL to the workflow file, such as a raw GitHub link.
          </p>
          <button
            type="submit"
            class="load-url-button"
            :disabled="!workflowUrl || loading"
          >
            Load workflow
          </button>
        </form>
        <div v-else class="drop-zone-status">
          <p>{{ selectedSourceLabel }}</p>
        </div>
      </div>
      <div class="button-group">
        <button
          @click="clearSelection"
          v-if="hasWorkflowSource"
          class="clear-button"
        >
          Clear Selection
        </button>
        <button
          v-if="costEstimate"
          @click="generatePDF"
          class="generate-pdf-button"
        >
          Generate PDF
        </button>
      </div>
    </div>
    <div class="estimate-container">
      <div v-if="loading">Processing...</div>
      <div v-else-if="costEstimate">
        <h2>Workflow run cost estimates</h2>
        <div>
          <HorizontalBarPlot :costEstimate="costEstimate" />
        </div>
        <hr />
        <div class="estimate-heading">
          <h3 style="padding-top: 2em">Tools used to derive the estimate</h3>
          <p>
            The number in parentheses (if shown) indicates the number of times
            the tool is used in the workflow. The values in the table represent
            the aggregate cost for the tool.
          </p>
        </div>
        <table>
          <thead>
            <tr>
              <th style="text-align: left" @click="sortTable('toolId')">
                Tool ID
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'toolId' }"
                />
              </th>
              <th class="numeric" @click="sortTable('averageCostPerJob')">
                Avg. job cost
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'averageCostPerJob' }"
                />
              </th>
              <th class="numeric" @click="sortTable('avgCostContribution')">
                Avg. contribution
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'avgCostContribution' }"
                />
              </th>
              <th class="numeric" @click="sortTable('medianCostPerJob')">
                Median job cost
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'medianCostPerJob' }"
                />
              </th>
              <th class="numeric" @click="sortTable('medianCostContribution')">
                Median contribution
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'medianCostContribution' }"
                />
              </th>
              <th class="numeric" @click="sortTable('p95CostPerJob')">
                p95 job cost
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'p95CostPerJob' }"
                />
              </th>
              <th class="numeric" @click="sortTable('p95CostContribution')">
                p95 contribution
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'p95CostContribution' }"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(tool, index) in sortedGroupedTools" :key="index">
              <td style="text-align: left">
                {{ tool.toolId }}
                <span v-if="tool.count > 1">({{ tool.count }}x)</span>
              </td>
              <td class="numeric">${{ tool.averageCostPerJob.toFixed(4) }}</td>
              <td class="numeric">
                {{ tool.avgCostContribution.toFixed(2) }}%
              </td>
              <td class="numeric">${{ tool.medianCostPerJob.toFixed(4) }}</td>
              <td class="numeric">
                {{ tool.medianCostContribution.toFixed(2) }}%
              </td>
              <td class="numeric">${{ tool.p95CostPerJob.toFixed(4) }}</td>
              <td class="numeric">
                {{ tool.p95CostContribution.toFixed(2) }}%
              </td>
            </tr>
            <tr class="visualization-row">
              <td></td>
              <td colspan="2">
                <StackedBarPlot
                  :data="sortedGroupedTools"
                  title="Avg. Cost Contribution"
                  valueProperty="avgCostContribution"
                />
              </td>
              <td colspan="2">
                <StackedBarPlot
                  :data="sortedGroupedTools"
                  title="Median Cost Contribution"
                  valueProperty="medianCostContribution"
                />
              </td>
              <td colspan="2">
                <StackedBarPlot
                  :data="sortedGroupedTools"
                  title="95th Percentile Cost Contribution"
                  valueProperty="p95CostContribution"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="costEstimate.missingTools.length">
          <div class="estimate-heading">
            <h3>
              Tools that are part of the workflow but for which cost estimate is
              not available
            </h3>
            <p>
              The cost estimate for these tools is not available because they
              were not part of the usage data used to derive the cost estimates.
            </p>
          </div>
          <ul>
            <li
              v-for="(count, tool) in getMissingToolCounts(
                costEstimate.missingTools
              )"
              :key="tool"
            >
              {{ tool }} <span v-if="count > 1">({{ count }}x)</span>
            </li>
          </ul>
        </div>
      </div>
      <div v-else-if="error">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import html2pdf from "html2pdf.js";
import { getApiUrl } from "@/config/api";
import { ChevronsUpDown } from "lucide-vue-next";
import HorizontalBarPlot from "../components/HorizontalBarPlot.vue";
import StackedBarPlot from "../components/StackedBarPlot.vue";

export default {
  name: "Workflow",
  components: {
    ChevronsUpDown,
    HorizontalBarPlot,
    StackedBarPlot,
  },
  data() {
    return {
      inputMode: "file",
      selectedFile: null,
      workflowUrl: "",
      costEstimate: null,
      loading: false,
      error: null,
      sortKey: "toolId", // Default sort key
      sortOrder: 1, // 1 for ascending, -1 for descending
      isDragging: false,
      isUploaded: false,
    };
  },
  computed: {
    hasWorkflowSource() {
      return Boolean(this.selectedFile || this.workflowUrl);
    },
    selectedWorkflowName() {
      if (this.selectedFile?.name) return this.selectedFile.name;
      if (!this.workflowUrl) return "";

      try {
        const parsedUrl = new URL(this.workflowUrl);
        return decodeURIComponent(parsedUrl.pathname.split("/").pop()) || this.workflowUrl;
      } catch {
        return this.workflowUrl;
      }
    },
    selectedSourceLabel() {
      if (!this.selectedWorkflowName) return "";
      return this.inputMode === "url"
        ? `Workflow URL loaded: ${this.selectedWorkflowName}`
        : `Selected file: ${this.selectedWorkflowName}`;
    },
    sortedGroupedTools() {
      if (!this.costEstimate || !this.costEstimate.tools) return [];

      const groupedTools = this.costEstimate.tools.reduce((acc, tool) => {
        if (!acc[tool.toolId]) {
          acc[tool.toolId] = { ...tool, count: 1 };
        } else {
          acc[tool.toolId].count += 1;
          acc[tool.toolId].averageCostPerJob += tool.averageCostPerJob;
          acc[tool.toolId].medianCostPerJob += tool.medianCostPerJob;
          acc[tool.toolId].p95CostPerJob += tool.p95CostPerJob;
        }
        return acc;
      }, {});

      const toolsArray = Object.values(groupedTools).map((tool) => ({
        ...tool,
        averageCostPerJob: tool.averageCostPerJob / tool.count,
        medianCostPerJob: tool.medianCostPerJob / tool.count,
        p95CostPerJob: tool.p95CostPerJob / tool.count,
        avgCostContribution: this.getToolCostPercentage(
          tool,
          "averageCostPerJob",
          this.costEstimate.avgCostEst
        ),
        medianCostContribution: this.getToolCostPercentage(
          tool,
          "medianCostPerJob",
          this.costEstimate.medianCostEst
        ),
        p95CostContribution: this.getToolCostPercentage(
          tool,
          "p95CostPerJob",
          this.costEstimate.p95CostEst
        ),
      }));

      return toolsArray.sort((a, b) => {
        if (a[this.sortKey] > b[this.sortKey]) return this.sortOrder;
        if (a[this.sortKey] < b[this.sortKey]) return -this.sortOrder;
        return 0;
      });
    },
  },
  methods: {
    setInputMode(mode) {
      if (this.inputMode === mode) return;

      this.inputMode = mode;
      this.clearSelection();
    },
    handleDropZoneClick() {
      if (this.inputMode !== "file") return;
      this.openFileDialog();
    },
    openFileDialog() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      if (!file) return;

      this.costEstimate = null;
      this.isUploaded = false;
      this.workflowUrl = "";
      this.selectedFile = file;
      this.submitWorkflowFile(file);
    },
    onDrop(event) {
      if (this.inputMode !== "file") return;

      const file = event.dataTransfer.files[0];
      if (!file) return;

      this.isDragging = false;
      this.costEstimate = null;
      this.workflowUrl = "";
      this.selectedFile = file;
      this.submitWorkflowFile(file);
    },
    onDragOver() {
      if (this.inputMode !== "file") return;
      this.isDragging = true;
    },
    onDragLeave() {
      if (this.inputMode !== "file") return;
      this.isDragging = false;
    },
    clearSelection() {
      this.selectedFile = null;
      this.workflowUrl = "";
      this.costEstimate = null;
      this.error = null;
      this.isDragging = false;
      if (this.$refs.fileInput) this.$refs.fileInput.value = "";
      this.isUploaded = false;
    },
    async loadWorkflowFromUrl() {
      if (!this.workflowUrl) return;

      this.costEstimate = null;
      this.error = null;
      this.selectedFile = null;
      this.isUploaded = false;

      let parsedUrl;
      try {
        parsedUrl = new URL(this.workflowUrl);
      } catch {
        this.error = "Enter a valid workflow URL.";
        return;
      }

      if (!parsedUrl.pathname.toLowerCase().endsWith(".ga")) {
        this.error = "Use a direct link to a .ga workflow file.";
        return;
      }

      this.loading = true;

      try {
        const response = await axios.get(parsedUrl.toString(), {
          responseType: "blob",
        });
        const fileName =
          decodeURIComponent(parsedUrl.pathname.split("/").pop()) ||
          "workflow.ga";
        const workflowBlob =
          response.data instanceof Blob
            ? response.data
            : new Blob([response.data], { type: "application/json" });
        const workflowFile = new File([workflowBlob], fileName, {
          type: workflowBlob.type || "application/json",
        });

        this.selectedFile = workflowFile;
        await this.submitWorkflowFile(workflowFile);
      } catch (error) {
        console.error("Error loading workflow from URL:", error);
        this.error =
          "Unable to fetch the workflow URL. Make sure it is public and points directly to a .ga file.";
        this.costEstimate = null;
        this.isUploaded = false;
      } finally {
        this.loading = false;
      }
    },
    async submitWorkflowFile(file) {
      if (!file) return;

      this.loading = true;
      this.isUploaded = true;
      this.error = null;
      const formData = new FormData();
      formData.append("galaxyWorkflow", file);

      try {
        const response = await axios.post(getApiUrl("/workflow"), formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        this.costEstimate = response.data;
      } catch (error) {
        console.error("Error uploading workflow:", error);
        this.error = "Error processing workflow";
        this.costEstimate = null;
        this.isUploaded = false;
      } finally {
        this.loading = false;
      }
    },
    getToolCostPercentage(tool, costField, totalCost) {
      return (tool[costField] / totalCost) * 100;
    },
    getMissingToolCounts(missingTools) {
      const toolCounts = {};
      missingTools.forEach((tool) => {
        toolCounts[tool.toolId] = (toolCounts[tool.toolId] || 0) + 1;
      });
      return toolCounts;
    },
    sortTable(key) {
      if (this.sortKey === key) {
        this.sortOrder *= -1;
      } else {
        this.sortKey = key;
        this.sortOrder = 1;
      }
    },
    generatePDF() {
      const element = document.querySelector(".estimate-container");
      // Create a clone of the element to modify
      const clonedElement = element.cloneNode(true);
      clonedElement.title =
        (this.selectedWorkflowName || "workflow") + " Workflow Cost Estimate";
      // Adjust styles for better visibility in PDF
      clonedElement.style.color = "black";
      const styles = `
        <style>
          table, th, td {
            font-size: 10px;
            border-color: black;
            color: black;
          }
          .sort-icon {
            display: none;
          }
        </style>
      `;
      clonedElement.innerHTML = styles + clonedElement.innerHTML;

      const opt = {
        margin: 5,
        filename: "workflow-cost-estimate.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { format: "letter", orientation: "landscape" },
        pagebreak: { before: ".visualization-row" },
      };

      // html2pdf().from(clonedElement).set(opt).save();
      html2pdf()
        .from(clonedElement)
        .set(opt)
        .toPdf()
        .get("pdf")
        .then(function (pdf) {
          window.open(pdf.output("bloburl"), "_blank");
        });
    },
  },
};
</script>

<style scoped>
.drop-zone {
  height: 50vh;
  border: 2px dashed var(--r-c-gray-900);
  border-radius: var(--r-radius-radius-radius8);
  transition: background-color 0.3s, height 0.4s ease;
  width: min(100%, var(--r-content-content-maxwidth));
  margin: 0 auto;
  padding: var(--r-space-space-twounits);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.drop-zone.file-mode {
  cursor: pointer;
}

.drop-zone p {
  font-size: var(--r-text-size-200);
  font-weight: bold;
}

.drop-zone-content,
.drop-zone-status {
  width: min(100%, 760px);
  margin: 0 auto;
}

.source-mode-toggle {
  position: absolute;
  top: var(--r-space-space-twounits);
  left: 50%;
  display: inline-flex;
  transform: translateX(-50%);
  padding: 4px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background-color: rgba(13, 17, 23, 0.65);
  backdrop-filter: blur(10px);
}

.mode-toggle-button {
  padding: 10px 18px;
  border-radius: 999px;
  background: transparent;
  color: var(--r-c-text-muted);
  font-size: var(--r-text-size-100);
  font-weight: 700;
}

.mode-toggle-button:hover {
  background-color: transparent;
  color: var(--r-c-white);
}

.mode-toggle-button.active {
  background-color: var(--r-c-white);
  color: var(--r-c-galaxy);
}

.mode-toggle-button.active:hover {
  background-color: var(--r-c-white);
  color: var(--r-c-galaxy);
}

.url-form {
  width: min(100%, 760px);
  display: flex;
  flex-direction: column;
  gap: var(--r-space-space-unit);
  align-items: center;
}

.url-label {
  font-size: var(--r-text-size-150);
  font-weight: 700;
}

.url-input {
  width: 100%;
  padding: 18px 22px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: var(--r-radius-radius-radius8);
  background-color: rgba(13, 17, 23, 0.9);
  color: var(--r-c-white);
  font-size: var(--r-text-size-100);
}

.url-input:focus {
  outline: 2px solid var(--r-c-primary-900);
  outline-offset: 2px;
}

.url-help {
  width: 100%;
  font-size: var(--r-text-size-100) !important;
  font-weight: 400 !important;
  color: var(--r-c-text-muted);
}

.load-url-button {
  min-width: 180px;
}

.drop-zone-file-selected {
  min-height: 140px;
  height: auto !important;
  padding-top: 88px;
  padding-bottom: var(--r-space-space-unit);
}

.drop-zone-file-selected p {
  font-size: var(--r-text-size-100);
  font-weight: normal;
}

.drop-zone:hover,
.drop-zone.dragging {
  background-color: var(--r-c-delft);
}

.drop-zone.file-selected {
  border-color: var(--r-c-cadet);
  background-color: var(--r-c-delft);
}

.button-group {
  margin: var(--r-space-space-unit);
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.button-group button {
  margin: 0;
}

.clear-button {
  background-color: var(--r-c-cadet);
  color: white;
  border: none;
}

.clear-button:hover {
  background-color: var(--r-c-cadet-dark);
}

.file-input {
  display: none;
}

.estimate-heading {
  margin: 2em 0;
}

h2 {
  font-size: var(--r-text-size-250);
  font-weight: 900;
  text-align: center;
  line-height: normal;
  letter-spacing: -0.03em;
}

h3 {
  font-size: var(--r-text-size-150);
  font-weight: 900;
  text-align: center;
  line-height: normal;
  letter-spacing: -0.03em;
}

.sort-icon {
  width: 16px;
  height: 16px;
  margin-left: 4px;
  opacity: 0.5;
  transition: opacity 0.2s ease;
  flex-shrink: 0;
}

.sort-icon.active {
  opacity: 1;
}

table {
  width: 99%;
  border-collapse: collapse;
  margin: 0 auto;
}

tr {
  border-bottom: 1px solid var(--r-c-gray-900);
}

tr,
td {
  padding: 4px 0;
}

.numeric {
  text-align: right;
}

th {
  cursor: pointer;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

@media (max-width: 900px) {
  .drop-zone {
    min-height: 420px;
    height: auto;
    padding: 120px var(--r-space-space-unit) var(--r-space-space-twounits);
  }

  .drop-zone-file-selected {
    min-height: 140px;
  }

  .source-mode-toggle {
    width: calc(100% - (var(--r-space-space-unit) * 2));
    justify-content: center;
  }

  .mode-toggle-button {
    flex: 1;
  }

  .url-label,
  .drop-zone p {
    font-size: var(--r-text-size-150);
  }
}
</style>
