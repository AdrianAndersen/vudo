import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
Vue.config.devtools = true;

export default new Vuex.Store({
  state: {
    currentUser: null,
    users: [{
      username: 'adrian',
      password: 'adrian',
      todos: [{ title: 'Go for a run', id: '1' }, { title: 'Shop groceries', id: '2' }],
    }],
  },
  mutations: {
    setUser(state, currentUser) {
      state.currentUser = currentUser;
    },
    createUser(state, payload) {
      state.users.push(payload);
    },
    addTodo: (state, newTodo) => state.users.find(
      (user) => user.username === state.currentUser,
    )?.todos.push(newTodo),
    completeTodo: (state, todoId) => {
      const currentUserIndex = state.users.findIndex(
        (user) => user.username === state.currentUser,
      );
      if (currentUserIndex !== undefined) {
        state.users[currentUserIndex].todos = state.users[currentUserIndex].todos.filter(
          (todo) => todo.id !== todoId,
        );
      }
    },
  },
  actions: {
    addRandomTodo: async (context) => {
      const todo = await fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((response) => response.json());
      context.commit('addTodo', { title: todo.title, id: Math.random().toString(36).substring(7) });
    },
  },
  modules: {
  },
  getters: {
    getAllUsers: (state) => state.users,
    currentUserLoginDetails: (state) => {
      const userDetails = state.users.find(
        (user) => user.username === state.currentUser,
      );
      if (userDetails) {
        return { username: userDetails.username, password: userDetails.password };
      }
      return null;
    },
    currentUserTodos: (state) => {
      const userDetails = state.users.find(
        (user) => user.username === state.currentUser,
      );
      if (userDetails) {
        return userDetails.todos;
      }
      return [];
    },
  },
});
