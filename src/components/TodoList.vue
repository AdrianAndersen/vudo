<template>
  <div>
    <h2>Create new todo</h2>
    <form @submit="createTodo($event)">
      <label for="todoInput">Title</label>
      <input id="todoInput" type="text" />
      <button>Create TODO</button>
      <button @click="$store.dispatch('addRandomTodo')">I'm feeling lucky (fetch api)</button>
    </form>
    <h2>My todos</h2>
    <ol>
      <li :key="todo.id" v-for="todo in todos()">
        {{todo.title}}
        <button @click="completeTodo(todo.id)">Mark complete</button>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

type TodoItem = {
  title: string,
  id: string
}

@Component
export default class TodoList extends Vue {
  todos = (): Array<TodoItem> => this.$store.getters.currentUserTodos;

  completeTodo(completedTodoId: string) {
    this.$store.commit('completeTodo', completedTodoId);
  }

  createTodo(e: any) {
    e.preventDefault();
    const title = e.target[0].value;
    e.target[0].value = '';
    const id = Math.random().toString(36).substring(7);
    this.$store.commit('addTodo', { title, id });
  }
}
</script>

<style scoped lang="scss">
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ol {
    padding: 1rem;
    text-align: left;
    width: 30%
  }
  ol li {
    width: 50%;
    margin: 0 auto;
  }
  form {
    display: flex;
    flex-direction: column;
  }
}
</style>
