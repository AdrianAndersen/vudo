<template>
  <div>
    <div v-if="currentUser()">
      <p>Welcome, {{currentUser().username}}</p>
      <button @click="logout()" >Logout</button>
    </div>
    <form @submit="login($event)" v-if="!currentUser()">
      <input type="text"/>
      <input type="password"/>
      <button>Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  currentUser = () => this.$store.getters.currentUserLoginDetails;

  login(e: any) {
    e.preventDefault();
    const allowedUsers = this.$store.getters.getAllUsers;
    const username = e.target[0].value;
    const password = e.target[1].value;

    if (!allowedUsers.find((user: any) => user.username === username
      && user.password === password)) {
      this.$store.commit('createUser', { username, password, todos: [] });
    }

    this.$store.commit('setUser', username);
  }

  logout() {
    this.$store.commit('setUser', null);
  }
}
</script>

<style scoped lang="scss">
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
