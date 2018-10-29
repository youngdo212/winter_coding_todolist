<template>
  <div
    class="todo"
    :class="{'todo--complete': todo.done}"
  >
    <div>{{todo.name}}</div>
    <button
      @click="clickRemove"
    >
      REMOVE
    </button>
    <button
      @click="toggleCompleteButton"
    >
      COMPLETE
    </button>
  </div>
</template>

<script>
export default {
  name: 'todo',

  props: {
    todo: {
      type: Object,
      default() {
        return {name: ''};
      }
    }
  },

  methods: {
    clickRemove() {
      this.$emit('remove-button-clicked', this.todo);
    },

    toggleCompleteButton() {
      this.todo.done = !this.todo.done;
    }
  }
}
</script>

<style scoped>

.todo {
  width: 200px; height: 50px;
  background: #eee;
}

.todo--complete {
  background: #bbb;
  text-decoration: line-through;
}

</style>
