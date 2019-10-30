<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
  font-family: "微软雅黑", Arial;
}

.text-html-details {
  text-indent: 2em;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    padding-bottom: 0.8em;
    margin: 0px;
    align-self: flex-start;
    line-height: 1.8em;
  }

  .details-image {
    text-indent: 0em;

    width: 50%;
    height: auto;
    max-height: 100%;
  }
}
</style>
