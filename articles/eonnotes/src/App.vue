<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
:root {
  --bg-primary: rgb(243, 243, 243);
  --bg-secondary: rgb(255, 255, 255);

  --content-primary: #000000;

  -glass: rgba(255, 255, 255, 0.85);
  -glass2: rgba(255, 255, 255);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: rgb(8, 8, 8);
    --bg-secondary: rgb(27, 27, 27);

    --content-primary: #ffffff;

    -glass: rgba(32, 32, 32, 0.85);
    -glass2: rgba(54, 54, 54);
  }
}

body {
  font-family: Ubuntu;
  background-color: var(--bg-primary);
  color: var(--content-primary);
}
.vs-card {
  background-color: var(--bg-secondary) !important;
  color: var(--content-primary) !important;
}
.fullNote {
  background-color: var(--glass) !important;
}
.nav {
  background-color: var(--glass2) !important;
}
</style>

<script>
  export default {
    name: "App",
    components: {}
  };
</script>