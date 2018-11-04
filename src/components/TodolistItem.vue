<template>
  <div
    class="todo-wrap"
    draggable="true"
    @dragstart="startDrag"
    @dragover="moveDrag"
    @drop="drop"
  >
    <TodolistItemView
      v-if="!editMode"
      :todo="todo"
      :initialState="viewState"
      @remove-button-clicked="$emit('remove-button-clicked', todo)"
      @todo-edited="edit"
    />
    <BaseForm
      v-if="editMode"
      :initialTitle="todo.title"
      :initialDescription="todo.description"
      :initialTime="todo.expireTime"
      @form-submitted="save"
      @form-closed="editMode=false"
    />
  </div>
</template>

<script>
import BaseForm from './BaseForm.vue';
import TodolistItemView from './TodolistItemView.vue';

export default {
  name: 'TodolistItem',

  components: {
    TodolistItemView,
    BaseForm,
  },

  props: {
    todo: {
      type: Object,
    }
  },

  data() {
    return {
      editMode: false,
      viewState: {expanded: false},
    }
  },

  methods: {
    edit(state) {
      this.viewState = state;
      this.editMode = true;
    },

    save({title, description, expireTime}) {
      this.todo.title = title;
      this.todo.description = description;
      this.todo.expireTime = expireTime;
      
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
  },
}
</script>

<style scoped>

.todo-wrap {
  margin-bottom: 5px;
}
</style>
