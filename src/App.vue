<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <Login />
    <TodoList v-if="this.$store.getters.currentUserLoginDetails" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import TodoList from './components/TodoList.vue';
import Login from './components/Login.vue';

@Component({
  components: {
    TodoList,
    Login,
  },
})
export default class App extends Vue {
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
