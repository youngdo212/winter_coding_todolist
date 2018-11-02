<template>
  <div>
    <label for="date">Date</label>
    <input type="text" id="date" v-model="date">
    <label for="time">Time</label>
    <input type="text" id="time" v-model="time">
  </div>
</template>

<script>
export default {
  name: 'BaseFormDate',

  props: {
    initialDate: {
      type: String,
      default() {
        const today = new Date();
        const todayYear = today.getFullYear();
        const todayMonth = today.getMonth()+1;
        const todayDate = today.getDate();

        return `${todayYear}/${todayMonth}/${todayDate}`;
      }
    },
    initialTime: {
      type: String,
      default: '00:00',
    }
  },

  data() {
    return {
      date: this.initialDate,
      time: this.initialTime,
    }
  },

  methods: {
    getTime() {
      const {year, month, date} = this.deformatDate(this.date);
      const {hour, minute} = this.deformatTime(this.time);

      return new Date(year, month-1, date, hour, minute).getTime();
    }, 

    deformatDate(formattedDate) {
      const [, year, month, date] = formattedDate.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);

      return {
        year: Number(year),
        month: Number(month),
        date: Number(date),
      }
    },

    deformatTime(formattedTime) {
      const [, hour, minute] = formattedTime.match(/^(\d{1,2}):(\d{1,2})$/);

      return {
        hour: Number(hour),
        minute: Number(minute),
      }
    },
  }
}
</script>

<style scoped>

</style>
