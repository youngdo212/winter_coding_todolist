<template>
  <div>
    <Todo
      v-for="(todo, index) in filteredTodos"
      :key="index"
      :todo="todo"
      @remove-button-clicked="removeTodo"
    />
  </div>
</template>

<script>
import Todo from './Todo.vue';

export default {
  name: 'todolist',

  components: {
    Todo,
  },

  props: {
    todos: {
      type: Array,
      default() {
        return [];
      }
    },

    flag: {
      validator(value) {
        return ['all', 'uncompleted', 'completed'].indexOf(value) !== -1;
      }
    }
  },

  methods: {
    removeTodo(todo) {
      this.$emit('todo-removed', todo)
    }
  },

  computed: {
    filteredTodos() {
      switch(this.flag) {
        case 'all': {
          return this.todos;
        }
        
        case 'uncompleted': {
          return this.todos.filter((todo) => {
            return todo.done === false;
          });
        }
        
        case 'completed': {
          return this.todos.filter((todo) => {
            return todo.done === true;
          });
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
