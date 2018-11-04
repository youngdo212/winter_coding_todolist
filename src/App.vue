<template>
  <div id="app">
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
    <div
      v-if="!formActive"
      class="create-button"
      @click="formActive = true;"
    >
      + Add Todo
    </div>
    <BaseForm
      v-if="formActive"
      @form-submitted="addTodo"
      @form-closed="formActive = false"
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
      formActive: false,
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
      this.formActive = false;
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
#app {
  display: inline-block;
  width: 350px;
  border-radius: 10px;
  background: rgb(84, 233, 158);
  padding: 10px;
}

.create-button {
  width: 100%; line-height: 40px;
  border-radius: 5px;
  background: rgb(72, 199, 135);
  color: #fff;
  font-size: 1.2rem;
  cursor: default;
  text-align: center;
}

.create-button:hover {
  background: rgb(62, 172, 117);
}
</style>
