<template>
  <div
    class="todo"
    :class="{'todo--complete': todo.done}"
  >
    <div v-if="!editMode">{{todo.title}}</div>
    <input
      v-if="editMode"
      v-model="todo.title"
    >
    <div v-if="!editMode">{{todo.description}}</div>
    <textarea
      v-if="editMode"
      v-model="todo.description"
    />
    <button @click="clickRemove">REMOVE</button>
    <button @click="toggleCompleteButton">COMPLETE</button>
    <button
      v-if="!editMode"
      @click="edit"
    >
      EDIT
    </button>
    <button
      v-if="editMode"
      @click="save"
    >
      SAVE
    </button>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',

  props: {
    todo: {
      type: Object,
      default() {
        return {name: ''};
      }
    }
  },

  data() {
    return {
      editMode: false,
    }
  },

  methods: {
    clickRemove() {
      this.$emit('remove-button-clicked', this.todo);
    },

    toggleCompleteButton() {
      this.todo.done = !this.todo.done;
    },

    edit() {
      this.editMode = true;
    },

    save() {
      this.editMode = false;
    }
  },
}
</script>

<style scoped>

.todo {
  width: 300px; height: 100px;
  background: #eee;
}

.todo--complete {
  background: #bbb;
  text-decoration: line-through;
}

</style>
