<template>
  <div class="tools-list">
    <div class="controls">
      <button v-if="hasSelectedTools" @click="toggleFilter">
        {{ isFiltered ? "Show All Tools" : "Show Only Selected Tools" }}
      </button>
      <button v-if="hasSelectedTools" @click="clearAllSelections">
        Clear All Selections
      </button>
      <button @click="toggleExpandAll">
        {{ isExpanded ? "Collapse Columns" : "Expand All Columns" }}
      </button>
    </div>
    <div class="table-container" @scroll="handleScroll" ref="tableContainer">
      <table class="tools-table">
        <thead>
          <tr>
            <th
              @click="sort('toolId')"
              class="left-align sortable-header"
              style="min-width: 600px"
            >
              <span class="header-content">
                Tool ID
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'toolId' }"
                />
              </span>
            </th>
            <th @click="sort('averageCostPerJob')" class="sortable-header">
              <span class="header-content">
                Avg Cost/Job
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'averageCostPerJob' }"
                />
              </span>
            </th>
            <th @click="sort('medianCostPerJob')" class="sortable-header">
              <span class="header-content">
                Median Cost/Job
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'medianCostPerJob' }"
                />
              </span>
            </th>
            <th @click="sort('p95CostPerJob')" class="sortable-header">
              <span class="header-content">
                P95 Cost/Job
                <ChevronsUpDown
                  class="sort-icon"
                  :class="{ active: sortKey === 'p95CostPerJob' }"
                />
              </span>
            </th>
            <th v-if="isExpanded">Avg Runtime</th>
            <th v-if="isExpanded">Median Runtime</th>
            <th v-if="isExpanded">P95 Runtime</th>
            <th v-if="isExpanded">Avg Input Size</th>
            <th v-if="isExpanded">Median Input Size</th>
            <th v-if="isExpanded">P95 Input Size</th>
            <th v-if="isExpanded">Avg Allocated Memory</th>
            <th v-if="isExpanded">Median Allocated Memory</th>
            <th v-if="isExpanded">P95 Allocated Memory</th>
            <th v-if="isExpanded">Num jobs</th>
          </tr>
          <tr>
            <th class="left-align">
              <div class="input-wrapper">
                <input
                  v-model="filters.toolId"
                  @input="applyFilters"
                  placeholder="Filter Tool ID"
                  class="input-field"
                  type="text"
                />
                <span
                  v-if="filters.toolId"
                  @click="
                    filters.toolId = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>
            <th class="right-align">
              <div class="input-wrapper">
                <input
                  v-model="filters.averageCostPerJob"
                  @input="applyFilters"
                  placeholder="Min Avg Cost"
                  class="input-field"
                />
                <span
                  v-if="filters.averageCostPerJob"
                  @click="
                    filters.averageCostPerJob = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- Median Cost Per Job -->
            <th class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.medianCostPerJob"
                  @input="applyFilters"
                  placeholder="Min Median Cost"
                  class="input-field"
                />
                <span
                  v-if="filters.medianCostPerJob"
                  @click="
                    filters.medianCostPerJob = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- P95 Cost Per Job -->
            <th class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.p95CostPerJob"
                  @input="applyFilters"
                  placeholder="Min P95 Cost"
                  class="input-field"
                />
                <span
                  v-if="filters.p95CostPerJob"
                  @click="
                    filters.p95CostPerJob = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- Avg Job Runtime (if expanded) -->
            <th v-if="isExpanded" class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.averageJobRuntimeSec"
                  @input="applyFilters"
                  placeholder="Min Avg Runtime"
                  class="input-field"
                />
                <span
                  v-if="filters.averageJobRuntimeSec"
                  @click="
                    filters.averageJobRuntimeSec = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- Median Job Runtime (if expanded) -->
            <th v-if="isExpanded">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.medianJobRuntimeSec"
                  @input="applyFilters"
                  placeholder="Min Median Runtime"
                  class="input-field"
                />
                <span
                  v-if="filters.medianJobRuntimeSec"
                  @click="
                    filters.medianJobRuntimeSec = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- P95 Job Runtime (if expanded) -->
            <th v-if="isExpanded" class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.p95JobRuntimeSec"
                  @input="applyFilters"
                  placeholder="Min P95 Runtime"
                  class="input-field"
                />
                <span
                  v-if="filters.p95JobRuntimeSec"
                  @click="
                    filters.p95JobRuntimeSec = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- Avg Job Input Size (if expanded) -->
            <th v-if="isExpanded" class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.averageJobInputSizeMB"
                  @input="applyFilters"
                  placeholder="Min Avg Input Size"
                  class="input-field"
                />
                <span
                  v-if="filters.averageJobInputSizeMB"
                  @click="
                    filters.averageJobInputSizeMB = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- Median Job Input Size (if expanded) -->
            <th v-if="isExpanded" class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.medianJobInputSizeMB"
                  @input="applyFilters"
                  placeholder="Min Median Input Size"
                  class="input-field"
                />
                <span
                  v-if="filters.medianJobInputSizeMB"
                  @click="
                    filters.medianJobInputSizeMB = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- P95 Job Input Size (if expanded) -->
            <th v-if="isExpanded" class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.p95JobInputSizeMB"
                  @input="applyFilters"
                  placeholder="Min P95 Input Size"
                  class="input-field"
                />
                <span
                  v-if="filters.p95JobInputSizeMB"
                  @click="
                    filters.p95JobInputSizeMB = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- Avg Allocated Memory (if expanded) -->
            <th v-if="isExpanded" class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.averageAllocatedMemoryGB"
                  @input="applyFilters"
                  placeholder="Min Avg Allocated Memory"
                  class="input-field"
                />
                <span
                  v-if="filters.averageAllocatedMemoryGB"
                  @click="
                    filters.averageAllocatedMemoryGB = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- Median Allocated Memory (if expanded) -->
            <th v-if="isExpanded" class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.medianAllocatedMemoryGB"
                  @input="applyFilters"
                  placeholder="Min Median Allocated Memory"
                  class="input-field"
                />
                <span
                  v-if="filters.medianAllocatedMemoryGB"
                  @click="
                    filters.medianAllocatedMemoryGB = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- P95 Allocated Memory (if expanded) -->
            <th v-if="isExpanded" class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.p95AllocatedMemoryGB"
                  @input="applyFilters"
                  placeholder="Min P95 Allocated Memory"
                  class="input-field"
                />
                <span
                  v-if="filters.p95AllocatedMemoryGB"
                  @click="
                    filters.p95AllocatedMemoryGB = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>

            <!-- Number of Jobs (if expanded) -->
            <th v-if="isExpanded" class="right-align">
              <div class="input-wrapper right-aligned">
                <input
                  v-model="filters.numJobs"
                  @input="applyFilters"
                  placeholder="Min Num Jobs"
                  class="input-field"
                />
                <span
                  v-if="filters.numJobs"
                  @click="
                    filters.numJobs = '';
                    applyFilters();
                  "
                  class="clear-icon"
                >
                  &times;
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="tool in sortedTools"
            :key="tool.toolId"
            :class="{
              'even-row': tool.index % 2 === 0,
              'odd-row': tool.index % 2 !== 0,
              selected: tool.selected,
            }"
            @click="toggleSelect(tool)"
          >
            <td class="left-align">{{ tool.toolId }}</td>
            <td>${{ tool.averageCostPerJob.toFixed(4) }}</td>
            <td>${{ tool.medianCostPerJob.toFixed(4) }}</td>
            <td>${{ tool.p95CostPerJob.toFixed(4) }}</td>
            <td v-if="isExpanded">{{ tool.averageJobRuntimeSec }} sec</td>
            <td v-if="isExpanded">{{ tool.medianJobRuntimeSec }} sec</td>
            <td v-if="isExpanded">{{ tool.p95JobRuntimeSec }} sec</td>
            <td v-if="isExpanded">{{ tool.averageJobInputSizeMB }} MB</td>
            <td v-if="isExpanded">{{ tool.medianJobInputSizeMB }} MB</td>
            <td v-if="isExpanded">{{ tool.p95JobInputSizeMB }} MB</td>
            <td v-if="isExpanded">{{ tool.averageAllocatedMemoryGB }} GB</td>
            <td v-if="isExpanded">{{ tool.medianAllocatedMemoryGB }} GB</td>
            <td v-if="isExpanded">{{ tool.p95AllocatedMemoryGB }} GB</td>
            <td v-if="isExpanded">{{ tool.numJobs }}</td>
          </tr>
          <tr v-if="hasSelectedTools" class="total-row">
            <td class="left-align">Total</td>
            <td>${{ totalAverageCostPerJob }}</td>
            <td>${{ totalMedianCostPerJob }}</td>
            <td>${{ totalP95CostPerJob }}</td>
            <td v-if="isExpanded">{{ totalAverageJobRuntimeSec }} sec</td>
            <td v-if="isExpanded">{{ totalMedianJobRuntimeSec }} sec</td>
            <td v-if="isExpanded">{{ totalP95JobRuntimeSec }} sec</td>
            <td v-if="isExpanded">{{ totalAverageJobInputSizeMB }} MB</td>
            <td v-if="isExpanded">{{ totalMedianJobInputSizeMB }} MB</td>
            <td v-if="isExpanded">{{ totalP95JobInputSizeMB }} MB</td>
            <td v-if="isExpanded">{{ totalAverageAllocatedMemoryGB }} GB</td>
            <td v-if="isExpanded">{{ totalMedianAllocatedMemoryGB }} GB</td>
            <td v-if="isExpanded">{{ totalP95AllocatedMemoryGB }} GB</td>
            <td v-if="isExpanded">{{ totalJobs }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
    <div v-if="showBackToTop" class="back-to-top-container">
      <button @click="scrollToTop" class="back-to-top-floating">
        Back to Top
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getApiUrl } from "@/config/api";
import { ChevronsUpDown } from "lucide-vue-next";

export default {
  name: "ToolsList",
  components: {
    ChevronsUpDown,
  },
  data() {
    return {
      tools: [],
      loading: false,
      page: 0,
      limit: 500,
      sortKey: "averageCostPerJob",
      sortOrder: "desc",
      isFiltered: false,
      isExpanded: false,
      hasMore: true,
      showBackToTop: false,
      filters: {
        toolId: "",
        averageCostPerJob: "",
        medianCostPerJob: "",
        p95CostPerJob: "",
        averageJobRuntimeSec: "",
        medianJobRuntimeSec: "",
        p95JobRuntimeSec: "",
        averageJobInputSizeMB: "",
        medianJobInputSizeMB: "",
        p95JobInputSizeMB: "",
        averageAllocatedMemoryGB: "",
        medianAllocatedMemoryGB: "",
        p95AllocatedMemoryGB: "",
        numJobs: "",
      },
    };
  },
  computed: {
    filteredTools() {
      let filtered = this.tools.filter((tool) => {
        return Object.keys(this.filters).every((key) => {
          const filterValue = this.filters[key];
          if (filterValue === "") return true; // If no filter is set, include all

          if (key === "toolId") {
            // Keep toolId filtering as before
            return tool[key].toLowerCase().includes(filterValue.toLowerCase());
          } else {
            // For all other columns, filter based on maximum value
            const numericFilterValue = parseFloat(filterValue);
            const toolValue = parseFloat(tool[key]);

            if (isNaN(numericFilterValue) || isNaN(toolValue)) {
              return true; // If either value is not a number, include it
            }

            return toolValue >= numericFilterValue;
          }
        });
      });

      // Apply the selection filter if isFiltered is true
      if (this.isFiltered) {
        filtered = filtered.filter((tool) => tool.selected);
      }

      return filtered;
    },
    sortedTools() {
      return this.filteredTools
        .map((tool, index) => ({ ...tool, index }))
        .sort((a, b) => {
          let modifier = this.sortOrder === "asc" ? 1 : -1;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          return a.index - b.index; // Stable sort
        });
    },
    displayedTools() {
      return this.filteredTools;
    },
    hasSelectedTools() {
      return this.tools.some((tool) => tool.selected);
    },
    totalAverageCostPerJob() {
      return this.sumProperty("averageCostPerJob");
    },
    totalMedianCostPerJob() {
      return this.sumProperty("medianCostPerJob");
    },
    totalP95CostPerJob() {
      return this.sumProperty("p95CostPerJob");
    },
    totalAverageJobRuntimeSec() {
      return parseInt(this.sumProperty("averageJobRuntimeSec"));
    },
    totalMedianJobRuntimeSec() {
      return parseInt(this.sumProperty("medianJobRuntimeSec"));
    },
    totalP95JobRuntimeSec() {
      return parseInt(this.sumProperty("p95JobRuntimeSec"));
    },
    totalAverageJobInputSizeMB() {
      return this.sumProperty("averageJobInputSizeMB");
    },
    totalMedianJobInputSizeMB() {
      return this.sumProperty("medianJobInputSizeMB");
    },
    totalP95JobInputSizeMB() {
      return this.sumProperty("p95JobInputSizeMB");
    },
    totalAverageAllocatedMemoryGB() {
      return this.sumProperty("averageAllocatedMemoryGB");
    },
    totalMedianAllocatedMemoryGB() {
      return this.sumProperty("medianAllocatedMemoryGB");
    },
    totalP95AllocatedMemoryGB() {
      return this.sumProperty("p95AllocatedMemoryGB");
    },
    totalJobs() {
      return parseInt(this.sumProperty("numJobs"));
    },
  },
  methods: {
    async fetchTools() {
      if (this.loading || !this.hasMore) return;

      this.loading = true;
      try {
        console.log("Fetching tools from ", getApiUrl("/tools"));
        const response = await axios.get(getApiUrl("/tools"), {
          params: {
            skip: this.page * this.limit,
            limit: this.limit,
            sort_by: this.sortKey,
            sort_order: this.sortOrder,
          },
        });
        const newTools = response.data.map((tool) => ({
          ...tool,
          selected: false,
        }));
        this.tools = [...this.tools, ...newTools];
        this.page++;
        this.hasMore = newTools.length === this.limit;
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
      this.loading = false;
    },
    handleScroll() {
      const container = this.$refs.tableContainer;
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 200
      ) {
        this.fetchTools();
      }

      // Show/hide the Back to Top button
      this.showBackToTop = container.scrollTop > 200;
    },
    toggleExpandAll() {
      this.isExpanded = !this.isExpanded;
    },
    sort(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
      } else {
        this.sortKey = key;
        this.sortOrder = "asc";
      }
      //   this.resetList();
    },
    toggleSelect(tool) {
      tool.selected = !tool.selected;
    },
    toggleFilter() {
      this.isFiltered = !this.isFiltered;
    },
    sumProperty(property) {
      return this.displayedTools
        .reduce((sum, tool) => sum + parseFloat(tool[property] || 0), 0)
        .toFixed(2);
    },
    clearAllSelections() {
      this.tools.forEach((tool) => (tool.selected = false));
      this.isFiltered = false;
    },
    resetList() {
      this.tools = [];
      this.page = 0;
      this.hasMore = true;
      this.fetchTools();
    },
    scrollToTop() {
      this.$refs.tableContainer.scrollTop = 0;
    },
    applyFilters() {
      // This method is called every time a filter input changes
      // The filtering is handled by the computed property 'filteredTools'
    },
  },
  mounted() {
    this.fetchTools();
    // Add scroll event listener
    this.$refs.tableContainer.addEventListener("scroll", this.handleScroll);
  },
  beforeUnmount() {
    // Remove scroll event listener to prevent memory leaks
    this.$refs.tableContainer.removeEventListener("scroll", this.handleScroll);
  },
};
</script>

<style scoped>
.tools-list {
  scrollbar-color: var(--r-c-white-soft) var(--r-c-galaxy);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.controls {
  /* margin-bottom: 10px; */
  align-self: end;
}

.table-container {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: auto;
}

.tools-table {
  width: 100%;
  border-collapse: collapse;
  transition: all 0.3s ease;
}

.sortable-header {
  cursor: pointer;
  user-select: none;
  padding: var(--r-space-space-halfunit);
  text-align: right;
}

.header-content {
  white-space: nowrap;
}

.left-align .header-content {
  justify-content: flex-start;
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

.tools-table td {
  padding: var(--r-space-space-halfunit);
  border-bottom: 1px solid var(--r-c-gray-900);
  text-align: right;
}

.tools-table th.left-align,
.tools-table td.left-align {
  text-align: left;
}

.tools-table th {
  cursor: pointer;
  background-color: var(--r-c-black-soft);
  position: sticky;
  top: 0;
  z-index: 1;
  padding: var(--r-space-space-halfunit);
  border: none;
  text-align: right;
}

.input-wrapper {
  position: relative;
}

.input-field {
  padding: var(--r-space-space-halfunit);
  padding-right: 24px; /* Ensure space for the 'clear filter' icon */
  border-radius: var(--r-radius-radius-radius8);
  border: 2px solid var(--r-c-gray-500);
  background-color: var(--r-c-black-soft);
  color: var(--r-c-gray-900);
}

.input-field:focus,
.input-field:not(:placeholder-shown) {
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
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: var(--r-text-size-100);
  color: var(--r-c-gray-900);
}

.clear-icon:hover {
  color: var(--r-c-white-soft);
}

.left-align .clear-icon {
  left: 175px;
}

.right-align .clear-icon {
  right: 8px;
}

.even-row {
  background-color: var(--r-c-delft);
}

.odd-row {
  background-color: var(--r-c-galaxy);
}

.selected {
  background-color: var(--r-c-cadet-dark);
}

.total-row {
  font-weight: bold;
  background-color: var(--r-c-black-soft);
}

button {
  margin: 10px 5px;
}

.back-to-top-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.back-to-top-floating {
  background-color: var(--r-c-primary-700);
  color: var(--r-c-black-soft);
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: var(--r-text-size-100);
  margin: 4px 2px;
  cursor: pointer;
  border-radius: var(--r-radius-radius-radius4);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.back-to-top-floating:hover {
  background-color: var(--r-c-primary-700-dark);
}

.loading {
  text-align: center;
  padding: 20px;
}
</style>
