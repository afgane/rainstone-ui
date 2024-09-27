<template>
  <section class="hero">
    <div class="hero-container">
      <div class="hero-text">
        <h1 class="hero-text-header">Reduce guesswork around cloud costs</h1>
        <p class="hero-text-caption">
          Get a quick estimate of the computational cloud costs for your
          bioinformatics workloads.
        </p>
      </div>
      <div class="hero-button-container">
        <router-link to="/tools">
          <button class="left-pill">Estimate Tool Cost</button>
        </router-link>
        <router-link to="/workflow">
          <button class="right-pill">Estimate Workflow Cost</button>
        </router-link>
      </div>
    </div>
    <div class="hero-features">
      <div class="features-content">
        <app-feature
          :borderHighlight="true"
          header="How to use"
          description="Look up a <a href='/tools'>tool</a> or upload a Galaxy <a href='/workflow'>workflow</a> to get an instant cost estimate."
          link="/#how-to-use"
          linkText="Discover more"
        ></app-feature>
        <app-feature
          :borderHighlight="true"
          header="How it works"
          description="Available estimates are drawn from hundreds of thounsands of jobs from <a href='https://usegalaxy.org/' target='_blank'>usegalaxy.org</a>, encompasing a range of use cases."
          link="/#how-it-works"
          linkText="Technical details"
        ></app-feature>
        <app-feature
          :borderHighlight="true"
          header="Keep in mind"
          description="These are estimates! The numbers often vary widely and the actual results will differ."
          link="/#keep-in-mind"
          linkText="Reality check"
        ></app-feature>
      </div>
    </div>
  </section>

  <section id="how-to-use" class="how-to-use">
    <div class="home-center">
      <h2>
        Take much guesswork out of estimating cloud costs for bioinformatics.
      </h2>
      <div class="est-img-container">
        <img
          src="/wf-est.png"
          alt="Workflow estimate screenshot"
          class="est-img"
        />
      </div>
      <div class="about-container">
        <div class="info">
          <em
            >Rainstone is a free, open-source, community-supported service to
            help researchers and students in the biological sciences get a quick
            estimate of the computational cloud resources they need for their
            analytical work.</em
          >
          The cost estimates were dereived from thousands of real-world jobs run
          on
          <a href="https://usegalaxy.org/" target="_blank">usegalaxy.org</a>
          and represent a general estimate of the cost of running a job on a
          cloud platform.
        </div>
        <div class="details">
          <ul class="details-list">
            <li>
              <span style="color: var(--r-c-white)">Tools section</span> will
              help estimate the computational resources you need for a specific
              tool. You can see the full inventory of tools for which cost
              estimates are available on the
              <a href="/tools">Tools List</a> page or search for a specific tool
              on the <a href="/tool-details">Tool Details</a> page. Those pages
              show cost estimates for individual tools.
            </li>
            <li>
              <span style="color: var(--r-c-white)">Workflows section</span>
              will help estimate the computational resources you need for an
              entire workflow. You simply upload a Galaxy workflow on the
              <a href="/workflow">Workflows</a> page and the app will estimate
              the cost of running that workflow on the cloud.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="how-it-works" class="how-it-works">
    <div class="home-center">
      <h2>It's the law of large numbers</h2>
      <div class="features-content">
        <app-feature
          header="7 million jobs"
          description="Number of jobs from usegalaxy.org used to derive the cost estimates."
        ></app-feature>
        <app-feature
          header="1,500 tools"
          description="Majority of tools used via usegalaxy.org are included."
        ></app-feature>
        <app-feature
          header="Real-world jobs"
          description="Estimates are based on actual job runtimes and memory usage."
        ></app-feature>
      </div>
      <div class="box">
        <app-box
          header="How are the cost estimates calculated?"
          description="Available cost estimates are based on historic runtime characteristics of hundreds of thousands of jobs from the <a href='https://usegalaxy.org/' target='_blank'>usegalaxy.org</a> service. The cost estimates include the average, median, and 95th percentile calculation across all jobs for each tool. Only successful jobs were used when deriving the calculations. The cost values were calculated for each job, using <a href='https://cloud.google.com/compute/all-pricing#general_purpose' target='_blank'>Google Cloud pricing</a> (for n2 machine type: $0.031611/vCPU/hr + $0.004237/GB memory/hr) multiplied by the job runtime and amount of allocated memory, and then aggregated."
        ></app-box>
      </div>
    </div>
  </section>

  <section id="keep-in-mind" class="keep-in-mind">
    <div class="home-center">
      <div class="center-title">Things to keep in mind</div>
      <p>
        The cost estimates are derived from the runtime data on usegalaxy.org
        and the cost estimate is extrapolated from that data. The values are
        meant to provide a general estimate of the cost of running a job on a
        cloud platform. The actual cost of running a job on a cloud platform may
        vary depending on the specific cloud provider, the region in which the
        job is run, and the specific configuration of the job.
      </p>
      <p>
        You will likely also notice that the cost estimates often vary widely
        between the average, median, and p95 values. This is because the types
        of jobs run on usegalaxy.org vary widely. Hence, the provided costs
        estimates are intended as a guideline to get an idea if a tool is likely
        cheap, expensive, or somewhere in between.
      </p>
      <p>
        To get a more accurate estimate, you should benchmark a given tool or
        workflow on the cloud platform you intend to use using the data and
        parameters specific to your use case. This will give you a more accurate
        estimate of the cost of running that tool or workflow. We have developed
        a tool, ABM, to help you do this, which you can find on
        <a href="https://github.com/galaxyproject/gxabm">GitHub</a>.
      </p>
    </div>
    <div class="go-container">
      <h3 class="go-header">Get started?</h3>
      <div class="go-text">This part is easy and free.</div>
      <router-link class="go-button" to="/tools"
        >Estimate Tool Cost</router-link
      >
      <router-link class="go-button" to="/tools"
        >Estimate Workflow Cost</router-link
      >
    </div>
  </section>

  <section class="footer">
    <div class="footer-text">
      Rainstone is a free, open-source, community-supported service to help
      researchers and students in the biological sciences get a quick estimate
      of the computational cloud resources they need for their analytical work.
      This work is in part supported by the
      <a href="https://www.genome.gov/" target="_blank">NHGRI</a>, under the
      <a href="https://anvilproject.org/" target="_blank"
        >Analysis Visualization and Informatics Lab-space (AnVIL) project</a
      >, grant number
      <a
        href="https://reporter.nih.gov/search/I5vCwZowsUCDSdqtyrGh_w/project-details/10892285"
        target="_blank"
        >U24HG010263</a
      >.
    </div>
  </section>
</template>

<script>
import Feature from "../components/Feature.vue";
import Box from "../components/Box.vue";

export default {
  name: "Home",
  components: {
    appFeature: Feature,
    appBox: Box,
  },
};
</script>

<style scoped>
.hero {
  width: 100%;
  height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: var(--r-space-space-fiveunits);
}

.hero-container {
  gap: var(--r-space-space-threeunits);
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 100;
  max-width: var(--r-content-heading-maxwidth);
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.hero-text {
  gap: var(--r-space-space-oneandhalfunits);
  width: 100%;
  display: flex;
  max-width: var(--r-content-heading-maxwidth);
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.hero-text-header {
  color: var(--r-c-white);
  font-size: var(--r-text-size-450);
  font-style: normal;
  text-align: center;
  font-family: Verdana;
  font-weight: 700;
  line-height: var(--r-text-size-550);
}

.hero-text-caption {
  color: var(--r-c-white);
  max-width: var(--r-content-caption-maxwidth);
  text-align: center;
  font-family: Verdana;
  line-height: var(--r-text-size-175);
}

.hero-features {
  display: block;
}

.features-content {
  gap: var(--r-space-space-twounits);
  width: 100%;
  display: flex;
  max-width: var(--r-content-maxwidth);
  flex-direction: row;
}

.hero-button-container {
  display: inline-flex; /* Align buttons side-by-side */
  border-radius: 50px;
  overflow: hidden; /* Ensures buttons stay within the pill shape */
}

.hero-button-container a {
  padding: 0;
}

.router-link button,
button {
  background-color: var(--r-c-white);
  color: var(--r-c-galaxy);
  border: none;
  padding: 15px 25px;
  font-size: 22px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
  outline: none; /* Removes focus outline */
}

.left-pill {
  border-right: 1px solid var(--r-c-galaxy); /* Vertical line between buttons */
  border-radius: 50px 0 0 50px;
}

.right-pill {
  border-radius: 0 50px 50px 0;
}

button:hover {
  background-color: var(--r-c-galaxy);
  color: var(--r-c-white);
}

p {
  font-size: var(--r-text-size-150);
  padding: 0.5em 0 0.5em 0;
  width: 60%;
  margin: auto;
}

h3 {
  margin-bottom: 0;
}

h2 {
  font-size: var(--r-text-size-350);
  font-weight: 900;
  width: 66%;
  text-align: left;
  align-self: flex-start;
  line-height: normal;
  letter-spacing: -0.03em;
}

.home-center {
  display: flex;
  gap: var(--r-space-space-threeunits);
  width: 100%;
  height: 100%;
  z-index: 100;
  max-width: var(--r-content-content-maxwidth);
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.how-to-use {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: var(--r-space-space-fiveunits);
  background: linear-gradient(to bottom, #0d1117, #21252c);
}

.about-container {
  display: grid;
  gap: 3rem;
  grid-template-areas:
    "text trailingComponent"
    "cta trailingComponent";
  grid-template-columns: 5fr 3fr;
}

.est-img-container {
  width: var(--r-content-content-maxwidth);
  border-radius: var(--r-radius-radius-radius16);
  padding: var(--r-space-space-fourunits) var(--r-space-space-threeunits);
  background: linear-gradient(
      103.55deg,
      var(--r-c-border-highlight-1) 16.12%,
      var(--r-c-border-highlight-2) 41.87%,
      var(--r-c-primary-300) 94.45%
    )
    padding-box;
}

.est-img {
  width: 100%;
  border-radius: var(--r-radius-radius-radius16);
}

.info {
  color: var(--r-c-text-muted);
  font-size: var(--r-text-size-150);
  font-weight: 700;
  text-align: left;
}

.info a {
  font-size: var(--r-text-size-150);
}

em {
  color: var(--r-c-white);
  font-style: normal;
  font-size: var(--r-text-size-150);
}

.details {
  color: var(--r-c-text-muted);
  font-size: var(--r-text-size-100);
  font-weight: 300;
  text-align: left;
}

.details-list li {
  list-style-type: circle;
  padding-left: var(--r-space-space-unit);
  padding-bottom: var(--r-space-space-oneandhalfunits);
}

.how-it-works {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: var(--r-space-space-sevenunits) 0;
  background-image: url("/gradient-bg.png");
  background-size: cover;
  background-color: #2c3143;
}

.keep-in-mind {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: var(--r-space-space-fiveunits) 0;
}

.go-container {
  width: 60%;
  margin-top: var(--r-space-space-fiveunits);
  padding: 40px;
  border-radius: 24px;
  box-sizing: border-box;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  background: linear-gradient(var(--r-c-black-soft), var(--r-c-black-soft))
      padding-box,
    linear-gradient(
        103.55deg,
        var(--r-c-border-highlight-1) 16.12%,
        var(--r-c-border-highlight-2) 41.87%,
        var(--r-c-primary-300) 84.45%
      )
      border-box;
}

.go-header {
  color: var(--r-c-white);
  font-size: var(--r-text-size-225);
  font-weight: 700;
}

.go-text {
  color: var(--r-c-text-muted);
  padding: 20px 0;
  margin-bottom: 20px;
  font-size: var(--r-text-size-125);
}

.go-button {
  height: 20px;
  padding: 10px 20px;
  border: solid 2px var(--r-c-black-mute);
  border-radius: 0.5rem;
  margin: 15px;
  font-size: var(--r-text-size-150);
}

.go-button:hover {
  border: solid 2px var(--r-c-black-soft);
  transition: border 0.3s;
}
.center-title {
  color: var(--r-c-white);
  font-size: var(--r-text-size-350);
  font-weight: 900;
  line-height: normal;
  letter-spacing: -0.03em;
}

.footer {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: var(--r-space-space-threeunits) 0;
  background-color: var(--r-c-black-soft);
}

.footer-text {
  max-width: var(--r-content-content-maxwidth);
  font-size: var(--r-text-size-75);
  color: var(--r-c-text-muted);
}

.footer-text a {
  font-size: var(--r-text-size-75);
}
</style>
