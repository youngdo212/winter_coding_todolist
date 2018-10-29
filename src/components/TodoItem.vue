<template>
  <div
    class="todo"
    :class="{'todo--complete': todo.done}"
    draggable="true"
    @dragstart="startDrag"
    @dragover="moveDrag"
    @drop="drop"
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
    },

    startDrag(e) {
      if(this.editMode) e.preventDefault();
      e.dataTransfer.setData('text/plain', this.todo.id);
    },

    moveDrag(e) {
      e.preventDefault();
    },

    drop(e) {
      const sourceId = Number(e.dataTransfer.getData('text/plain'));
      const destinationId = this.todo.id;

      if(sourceId === destinationId) return;

      this.$emit('todo-dropped', {sourceId, destinationId});
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
