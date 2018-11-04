<template>
  <div
    class="todo"
    :class="{'todo--complete': todo.done, 'todo--expired': expired}"
    @click.stop="expand"
  >
    <div class="todo__header">
      <TodolistItemViewCheckBox
        class="todo__checkbox"
        :initialChecked="todo.done"
        @checked="checkComplete"
      />
      <div class="todo__title">{{todo.title}}</div>
      <div
        class="todo__delete-button"
        @click.stop="clickRemove"
      />
    </div>
    <div
      v-show="state.expanded"
      class="todo__body"
    >
      <div class="todo__description">{{todo.description}}</div>
      <TodolistItemViewTimer
        v-if="todo.expireTime"
        ref="timer"
        class="todo__timer"
        :targetTime="todo.expireTime"
        @time-over="expire"
      />
      <div
        class="todo__edit-button"
        @click.stop="edit"
      >
        EDIT
      </div>
    </div>
  </div>
</template>

<script>
import TodolistItemViewCheckBox from './TodolistItemViewCheckBox.vue';
import TodolistItemViewTimer from './TodolistItemViewTimer.vue';

export default {
  name: 'TodolistItemView',

  components: {
    TodolistItemViewCheckBox,
    TodolistItemViewTimer,
  },

  props: {
    todo: Object,
    initialState: {
      type: Object,
      dafault() {
        return {
          expanded: false,
        }
      }
    }
  },

  data() {
    return {
      expired: false,
      state: Object.assign({}, this.initialState),
    }
  },

  mounted() {
    if(!this.todo.done) return;

    this.$refs.timer && this.$refs.timer.end();
  },

  methods: {
    expand() {
      this.state.expanded = !this.state.expanded;
    },

    checkComplete(checked) {
      this.todo.done = checked;

      if(!this.$refs.timer) return;

      checked ? this.$refs.timer.end() : this.$refs.timer.start();
    },

    clickRemove() {
      this.$emit('remove-button-clicked');
    },

    edit() {
      this.$emit('todo-edited', this.state);
    },

    expire() {
      this.expired = true;
    },
  }
}
</script>

<style scoped>
.todo {
  box-sizing: border-box;
  width: 100%;
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
