<template>
  <div
    :class="borderHighlight ? 'feature-border-highlight' : 'feature-feature'"
  >
    <div class="feature-heading">
      <h3 class="feature-header">{{ header }}</h3>
    </div>
    <div v-html="description" class="feature-description"></div>
    <div class="more-link" v-if="link">
      <a :href="link">{{ linkText }} ></a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Feature",
  props: {
    description: {
      type: [String, Object],
      default: "Feature description",
    },
    header: {
      type: String,
      default: "Feature header",
    },
    link: {
      type: String,
      default: "",
    },
    linkText: {
      type: String,
      default: "Learn more",
    },
    borderHighlight: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.feature-feature {
  gap: var(--r-space-space-unit);
  width: 100%;
  display: flex;
  position: relative;
  max-width: 420px;
  align-items: center;
  flex-direction: column;
  padding: 40px;
  border-radius: var(--r-radius-radius-radius24);
  background-color: rgba(0, 0, 0, 0.4);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
}

.feature-border-highlight {
  gap: var(--r-space-space-unit);
  width: 100%;
  display: flex;
  position: relative;
  max-width: 420px;
  align-items: stretch;
  flex-direction: column;
  padding: 40px;
  border-radius: var(--r-radius-radius-radius24);
  border: 1.5px solid rgba(255, 255, 255, 0.2);
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

.feature-heading {
  gap: var(--r-space-space-unit);
  display: flex;
  align-self: center;
  flex-direction: row;
}

.feature-header {
  color: var(--r-c-white);
  font-size: var(--r-text-size-225);
  font-style: normal;
  font-weight: 700;
}

.feature-description {
  color: var(--r-c-text-muted);
  font-size: var(--r-text-size-150);
  line-height: var(--r-text-size-200);
  letter-spacing: -0.48px;
}

.feature-description::after,
.feature-description a,
.feature-description a::after {
  font-size: var(--r-text-size-150);
}

.more-link {
  margin-top: auto;
  font-size: var(--r-text-size-125);
  align-self: flex-start;
}
@media (max-width: 767px) {
  .feature-feature {
    max-width: 100%;
  }
}
</style>
