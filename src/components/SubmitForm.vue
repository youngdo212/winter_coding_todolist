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
    <div>
      <label for="todo-expire-year">year</label>
      <input type="text" id="todo-expire-year" v-model="year">
      <label for="todo-expire-month">month</label>
      <input type="text" id="todo-expire-month" v-model="month">
      <label for="todo-expire-date">date</label>
      <input type="text" id="todo-expire-date" v-model="date">
      <label for="todo-expire-hour">hour</label>
      <input type="text" id="todo-expire-hour" v-model="hour">
      <label for="todo-expire-minute">minute</label>
      <input type="text" id="todo-expire-minute" v-model="minute">
    </div>
    <button
      @click="submit"
    >
      ADD
    </button>
  </div>
</template>

<script>
export default {
  name: 'SubmitForm',

  data() {
    return {
      title: '',
      description: '',
      year: '2018',
      month: '10',
      date: '30',
      hour: '9',
      minute: '0',
    }
  },

  methods: {
    submit() {
      if(this.title === '') return;

      const todo = {
        title: this.title,
        description: this.description,
        expireTime: this.getTime(this.year, this.month, this.date, this.hour, this.minute),
      };

      this.$emit('form-submitted', todo);
      this.title = '';
      this.description= '';
    },

    getTime(year, month, date, hour, minute) {
      const dateObj = new Date(Number(year), Number(month)-1, Number(date), Number(hour), Number(minute));
      return dateObj.getTime();
    }
  },
}
</script>

<style scoped>

</style>
