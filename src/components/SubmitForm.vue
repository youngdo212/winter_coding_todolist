<template>
  <div>
    <div>
      <label for="todo-title">title</label>
      <input id="todo-title" v-model="title">
    </div>
    <div>
      <label for="todo-decription">decription</label>
      <textarea id="todo-decription" v-model="description"/>
    </div>
    <button
      @click="submit"
    />
  </div>
</template>

<script>
export default {
  name: 'SubmitForm',

  data() {
    return {
      title: '',
      description: '',
    }
  },

  methods: {
    submit() {
      if(this.title === '') return;

      const todo = {
        title: this.title,
        description: this.description,
      };

      this.$emit('form-submitted', todo);
      this.title = '';
      this.description= '';
    }
  }
}
</script>

<style scoped>

</style>
