<template>
  <div
    class="todo"
    :class="{'todo--complete': todo.done, 'todo--expired': expired}"
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
    <TodoItemTimer
      v-if="todo.expireTime && !todo.done"
      ref="timer"
      :targetTime="todo.expireTime"
      @time-over="expireTodo"
    />
    <div
      v-if="todo.done"
    >
      useless time
    </div>
  </div>
</template>

<script>
import TodoItemTimer from './TodoItemTimer.vue';

export default {
  name: 'TodoItem',

  components: {
    TodoItemTimer,
  },

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
      expired: false,
    }
  },

  methods: {
    clickRemove() {
      this.$refs.timer.end();
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
    },

    expireTodo() {
      this.expired = true;
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

.todo--expired {
  color: red;
}

</style>
