<template>
  <div id="app">
      <thunder></thunder>
  </div>
</template>

<script>
  import Thunder from "./pages/Thunder";
  export default {
    name: 'App',
    components: {
      Thunder
    }
  }
</script>

<style>
#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
