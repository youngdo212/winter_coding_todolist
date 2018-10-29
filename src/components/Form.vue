<template>
  <div>
    <input v-model="todoName">
    <button
      @click="submit"
    />
  </div>
</template>

<script>
export default {
  name: 'form',

  data() {
    return {
      todoName: '',
    }
  },

  methods: {
    submit() {
      if(this.todoName === '') return;

      const todo = {
        name: this.todoName,
      };

      this.$emit('form-submitted', todo);
      this.todoName = '';
    }
  }
}
</script>

<style scoped>

</style>
