<template>
  <div
    class="todo"
    :class="{'todo--complete': todo.done, 'todo--expired': expired}"
    @click.stop="expand"
  >
    <div class="todo__header">
      <input
        class="todo__check-box"
        type="checkbox"
        v-model="todo.done"
        @click.stop="completeTodo"
      >
      <div class="todo__title">{{todo.title}}</div>
      <div
        class="todo__remove-button"
        @click="clickRemove"
      />
    </div>
    <div
      v-show="state.expanded"
      class="todo__body"
    >
      <div
        v-if="todo.description"
        class="todo__description"
      >
        {{todo.description}}
      </div>
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
import TodolistItemViewTimer from './TodolistItemViewTimer.vue';

export default {
  name: 'TodolistItemView',

  components: {
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

    completeTodo({target: {checked}}) {
      if(!this.$refs.timer) return;

      checked? this.$refs.timer.end() : this.$refs.timer.start();
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
  background: #f2f2f2;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #999;
}

.todo--complete .todo__title{
  text-decoration: line-through;
  background: no-repeat url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSIyNyIgaGVpZ2h0PSIyNyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgdmlld0JveD0iMCAwIDEwMCAxMDAiCj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0OCIgc3Ryb2tlPSIjY2NjIiBmaWxsPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8bGluZSB4MT0iMjUiIHkxPSI1MyIgeDI9IjQ0IiB5Mj0iNzUiIHN0cm9rZT0icmdiKDEsIDEzNCwgODYpIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8bGluZSB4MT0iNzMiIHkxPSIyOSIgeDI9IjQyIiB5Mj0iNzUiIHN0cm9rZT0icmdiKDEsIDEzNCwgODYpIiBzdHJva2Utd2lkdGg9IjQiLz4KPC9zdmc+);
}

.todo--complete .todo__description, .todo--complete .todo__timer {
  color: rgba(0,0,0,0.3);
}

.todo:hover .todo__remove-button {
  display: block;
}

.todo--expired {
  background: rgb(250, 93, 93);
}

.todo__header {
  position: relative;
  height: 27px;
}

.todo__check-box {
  width: 27px; height: 27px;
  position: absolute;
  top: 0px; left: 0px;
  margin: 0px;
  outline: 0px;
  appearance: none;
}

.todo__title {
  line-height: 27px;
  box-sizing: border-box;
  font-size: 1rem;
  background: no-repeat url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSIyNyIgaGVpZ2h0PSIyNyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgdmlld0JveD0iMCAwIDEwMCAxMDAiCj4KICA8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0OCIgc3Ryb2tlPSIjY2NjIiBmaWxsPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KPC9zdmc+);
  padding-left: 35px;
}

.todo__remove-button {
  display: none;
  position: absolute;
  top: 0px; right: 0px;
  width: 27px; height: 27px;
  cursor: default;
  background: no-repeat center url(data:image/svg+xml;base64,PHN2ZwogIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgdmlld0JveD0iMCAwIDEwMCAxMDAiCj4KICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIxMDAiIHkyPSIxMDAiIHN0cm9rZT0iIzZmMDIwNiIgc3Ryb2tlLXdpZHRoPSIxMCIvPgogIDxsaW5lIHgxPSIwIiB5MT0iMTAwIiB4Mj0iMTAwIiB5Mj0iMCIgc3Ryb2tlPSIjNmYwMjA2IiBzdHJva2Utd2lkdGg9IjEwIi8+Cjwvc3ZnPg==);
}

.todo__body {
  margin-top: 7px;
}

.todo__description {
  font-size: 1rem;
  padding: 5px;
  overflow: scroll;
}

.todo__edit-button {
  width: 60px; line-height: 2rem;
  margin: auto;
  border-radius: 5px;
  background: #555;
  text-align: center;
  color: #fff;
  cursor: default;
}
</style>
