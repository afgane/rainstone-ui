<template>
  <div class="box-container">
    <h3 class="box-header">{{ header }}</h3>
    <p v-html="description" class="box-description"></p>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    description: {
      type: [String, Object],
      default: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    header: {
      type: String,
      default: "How to use",
    },
  },
};
</script>

<style scoped>
.box-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--r-space-space-twoandhalfunits);
  border-radius: var(--r-radius-radius-radius24);
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
}

.box-header {
  color: var(--r-c-white);
  font-size: var(--r-text-size-225);
  font-weight: 700;
  margin-bottom: var(--r-space-space-unit);
}

.box-description {
  color: var(--r-c-text-muted);
  font-size: var(--r-text-size-150);
  line-height: var(--r-space-space-twounits);
  letter-spacing: -0.48px;
  margin-bottom: var(--r-space-space-oneandhalfunits);
}

a {
  font-size: var(--r-text-size-150);
}

.em {
  color: var(--r-c-white);
  font-style: normal;
}

@media (max-width: 767px) {
  .box-container {
    padding: var(--r-space-space-oneandhalfunits);
  }

  .box-header {
    font-size: var(--r-text-size-200);
  }

  .box-description {
    font-size: var(--r-text-size-125);
    line-height: var(--r-space-space-oneandhalfunits);
  }
}
</style>
