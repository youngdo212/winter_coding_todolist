<template>
  <div id="app">
    <SubmitForm
      @form-submitted="addTodo"
    />
    <button
      @click="setFlag('all')"
    >
      All
    </button>
    <button
      @click="setFlag('uncompleted')"
    >
      Uncompleted
    </button>
    <button
      @click="setFlag('completed')"
    >
      Completed
    </button>
    <Todolist
      :todos="todos"
      :flag="flag"
      @todo-removed="removeTodo"
    />
  </div>
</template>

<script>
import SubmitForm from './components/SubmitForm.vue'
import Todolist from './components/Todolist.vue';

export default {
  name: 'app',
  
  components: {
    SubmitForm,
    Todolist,
  },

  data() {
    return {
      id: 0,
      todos: [],
      flag: 'all',
    }
  },

  methods: {
    addTodo(todo) {
      todo.id = this.id++;
      todo.done = false;

      this.todos.push(todo);
    },

    removeTodo({id}) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      })
    },

    setFlag(flag) {
      this.flag = flag;
    }
  }
}
</script>

<style scoped>

</style>
