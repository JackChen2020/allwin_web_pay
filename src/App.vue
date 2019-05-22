<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
  var _html = document.getElementsByTagName('html')[0];
  view_width>640?_html.style.fontSize=640/16 +'px':_html.style.fontSize =view_width/16+'px';
</script>

<style>
body {
  font-size: 16px;
  background-color: #f8f8f8;
  -webkit-font-smoothing: antialiased;
}
</style>
