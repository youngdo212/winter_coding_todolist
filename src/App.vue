<template>
  <div id="app">
    <BaseForm
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
      @todo-moved="moveTodo"
    />
  </div>
</template>

<script>
import BaseForm from './components/BaseForm.vue';
import Todolist from './components/Todolist.vue';

export default {
  name: 'app',
  
  components: {
    BaseForm,
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
    addTodo(form) {
      const todo = {
        id: this.id++,
        done: false,
      }

      Object.assign(todo, form);
      this.todos.push(todo);
    },

    removeTodo({id}) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      })
    },

    setFlag(flag) {
      this.flag = flag;
    },

    // refactor
    moveTodo({sourceId, destinationId}) {
      let sourceTodo = null;

      this.todos = this.todos.filter((todo) => {
        if(todo.id !== sourceId) return true;
        sourceTodo = todo;
        return false;
      })

      this.todos = this.todos.reduce((todos, todo) => {
        if(todo.id !== destinationId) return todos.concat(todo);
        return todos.concat(todo, sourceTodo);
      }, []);
    }
  }
}
</script>

<style scoped>

</style>
