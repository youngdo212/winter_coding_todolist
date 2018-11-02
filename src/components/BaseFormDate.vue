<template>
  <div class="date-form">
    <div class="date-form__date-wrap">
      <label class="date-form__label" for="date">Date</label>
      <input id="date-form__input" type="text" placeholder="0000/00/00" v-model="date">
    </div>
    <div class="date-form__time-wrap">
      <label class="date-form__label" for="time">Time</label>
      <input id="date-form__input" type="text" placeholder="00:00" v-model="time">
    </div>
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
.date-form {
  width: 100%;
  overflow: hidden;
}

.date-form__date-wrap {
  float: left;
  width: 45%;
}

.date-form__time-wrap {
  float: right;
  width: 45%;
}

.date-form__label {
  font-size: 0.9rem;
}

#date-form__input {
  box-sizing: border-box;
  width: 100%;
  outline: 0px;
  border: 0px; padding: 5px;
  font-size: 1rem;
  margin-top: 2px;
}
</style>
