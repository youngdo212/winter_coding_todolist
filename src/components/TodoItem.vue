<template>
  <div
    class="todo-wrap"
    draggable="true"
    @dragstart="startDrag"
    @dragover="moveDrag"
    @drop="drop"
  >
    <div
      v-show="!editMode"
      class="todo"
      :class="{'todo--complete': todo.done, 'todo--expired': expired}"
      @click="expand"
    >
      <div class="todo__header">
        <BaseCheckBox
          class="todo__checkbox"
          @checked="checkComplete"
        />
        <div
          class="todo__title"
        >
          {{todo.title}}
        </div>
        <div
          class="todo__delete-button"
          @click.stop="clickRemove"
        />
      </div>
      <div
        v-show="expanded"
        class="todo__body"
      >
        <div class="todo__description">{{todo.description}}</div>
        <TodoItemTimer
          v-if="todo.expireTime"
          ref="timer"
          class="todo__timer"
          :targetTime="todo.expireTime"
          @time-over="expireTodo"
        />
        <div class="todo__edit-button" @click.stop="edit">EDIT</div>
      </div>
    </div>
    <BaseForm
      v-if="editMode"
      :initialTitle="todo.title"
      :initialDescription="todo.description"
      :initialTime="todo.expireTime"
      @form-submitted="save"
    />
  </div>
</template>

<script>
import BaseForm from './BaseForm.vue';
import BaseCheckBox from './BaseCheckBox.vue';
import TodoItemTimer from './TodoItemTimer.vue';

export default {
  name: 'TodoItem',

  components: {
    BaseForm,
    BaseCheckBox,
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
      expanded: false,
    }
  },

  methods: {
    clickRemove() {
      this.$refs.timer && this.$refs.timer.end();
      this.$emit('remove-button-clicked', this.todo);
    },

    checkComplete(checked) {
      this.todo.done = checked;

      if(!this.$refs.timer) return;

      checked ? this.$refs.timer.end() : this.$refs.timer.start();
    },

    edit() {
      this.editMode = true;
    },

    save({title, description, expireTime}) {
      this.todo.title = title;
      this.todo.description = description;
      this.todo.expireTime = expireTime;
      
      this.editMode = false;
      this.expired = false;
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
    },

    expand() {
      this.expanded = !this.expanded;
    },
  },
}
</script>

<style scoped>

.todo-wrap {
  margin-bottom: 5px;
}

.todo {
  box-sizing: border-box;
  width: 300px;
  padding: 7px;
  background: #aaa;
  border-radius: 5px;
  cursor: pointer;
}

.todo--complete .todo__title{
  text-decoration: line-through;
}

.todo--complete .todo__description, .todo--complete .todo__timer {
  color: rgba(0,0,0,0.3);
}

.todo--expired {
  background: red;
}

.todo__header {
  height: 27px;
  overflow: hidden;
  background: yellow;
}

.todo__checkbox {
  float: left;
}

.todo__title {
  float: left;
  line-height: 27px;
  box-sizing: border-box;
  font-size: 1rem;
  margin-left: 5px;
}

.todo__delete-button {
  float: right;
  width: 27px; height: 27px;
  background: green;
}

.todo__body {
  background: orange;
  margin-top: 7px;
}

.todo__description {
  font-size: 1rem;
  padding: 5px;
}

.todo__edit-button {
  width: 30px;
  padding: 10px;
  margin: auto;
  border-radius: 5px;
  background: blue;
}
</style>
