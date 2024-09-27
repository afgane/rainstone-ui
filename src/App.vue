<template>
  <header class="masthead">
    <header class="navbar">
      <div class="logo">
        <router-link to="/">
          <img
            src="/rainstone-logo.png"
            alt="Rainstone logo"
            class="logo-img"
          />
          <span class="logo-text">Rainstone</span>
          <span class="logo-desc">- a cloud cost estimator</span>
        </router-link>
      </div>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/tools">Tools List</router-link> |
        <router-link to="/tool-details">Tool Details</router-link> |
        <router-link to="/workflow">Workflow Cost Estimate</router-link>
      </nav>
    </header>
  </header>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.masthead {
  margin: 0 auto;
}

.navbar {
  width: 100%;
  max-width: var(--r-content-maxwidth);
  display: inline-flex;
  position: relative;
  align-items: center;
  padding: var(--r-space-space-unit) 0;
  justify-content: space-between;
}

.logo:hover a::after {
  text-decoration: none;
  content: none;
}

.logo-img {
  height: 32px;
  margin-right: 8px;
}

.logo-text {
  color: var(--r-c-white);
  font-size: var(--r-text-size-150);
  font-weight: bold;
}

.logo-desc {
  color: var(--r-c-text-muted);
  font-size: var(--r-text-size-75);
  padding-left: 8px;
}
</style>
