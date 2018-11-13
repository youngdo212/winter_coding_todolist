<template>
  <div class="form">
    <BaseFormInput
      class="form__title"
      placeholder="Title"
      v-model="title"
      :autofocus="true"
      @keyup.enter="submit"
    />
    <BaseFormInput
      class="form__decription"
      placeholder="Description"
      v-model="description"
    />
    <div class="form__time-checkbox-wrap">
      <label for="form__time-checkbox">Set Time</label>
      <input
        id="form__time-checkbox"
        type="checkbox"
        v-model="timeSettingMode"
      >
    </div>
    <BaseFormInput
      v-if="timeSettingMode"
      class="form__Date"
      placeholder="0000/00/00"
      label="Date"
      v-model="dateFormat"
      :validity="isValidDateFormat(this.dateFormat)"
      @keyup.enter="submit"
    />
    <BaseFormInput
      v-if="timeSettingMode"
      class="form__Time"
      placeholder="00:00"
      label="Time"
      v-model="timeFormat"
      :validity="isValidTimeFormat(this.timeFormat)"
      @keyup.enter="submit"
    />
    <div
      class="form__submit-button"
      @click.stop="submit"
    >
      SUBMIT
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',

  props: {
    initialTitle: {
      type: String,
      default: '',
    },
    initialDescription: {
      type: String,
      default: '',
    },
    initialTime: Number,
  },

  data() {
    return {
      title: this.initialTitle,
      description: this.initialDescription,
      dateFormat: '',
      timeFormat: '',
      timeSettingMode: false,
    }
  },

  created() {
    const closeForm = ({target}) => {
      if(target.closest('.form')) return;

      this.$emit('form-closed');
      window.removeEventListener('click', closeForm, true);
    }
    
    window.addEventListener('click', closeForm, true);
  },

  // set timeSettingMode
  mounted() {
    if(!this.initialTime) return;

    this.timeSettingMode = true;
  },

  watch: {
    timeSettingMode(on) {
      if(!on) return;

      const {dateFormat, timeFormat} = this.format(this.initialTime || new Date().getTime());
      
      this.dateFormat = dateFormat;
      this.timeFormat = timeFormat;
    }
  },

  methods: {
    format(time) {
      const date = new Date(time);

      return {
        dateFormat: this.formatDate(date),
        timeFormat: this.formatTime(date),
      }
    },

    formatDate(date) {
      const yearFormat = date.getFullYear();
      const monthFormat = (date.getMonth()+1).toString().padStart(2, '0');
      const dateFormat = date.getDate().toString().padStart(2, '0');

      return `${yearFormat}/${monthFormat}/${dateFormat}`;
    },

    formatTime(date) {
      const hourFormat = date.getHours().toString().padStart(2, '0');
      const minuteFormat = date.getMinutes().toString().padStart(2, '0');
      
      return `${hourFormat}:${minuteFormat}`;
    },

    deformat({dateFormat, timeFormat}){
      const [, year, month, date] = dateFormat.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
      const [, hour, minute] = timeFormat.match(/^(\d{1,2}):(\d{1,2})$/);

      return new Date(year, month-1, date, hour, minute).getTime();
    },

    submit() {
      if(!this.isValidForm(this)) return;

      const form = {
        title: this.title,
        description: this.description,
        expireTime: this.timeSettingMode ? this.deformat({
          dateFormat: this.dateFormat,
          timeFormat: this.timeFormat,
        }) : undefined,
      };

      this.$emit('form-submitted', form);
    },

    // @param {vue instance} form
    isValidForm(form) {
      if(form.title === '') return false;
      
      return form.timeSettingMode ? this.isValidDateFormat(form.dateFormat) && this.isValidTimeFormat(form.timeFormat)
       : true;
    },

    isValidDateFormat(dateFormat) {
      return /^\d{4}\/\d{1,2}\/\d{1,2}$/.test(dateFormat);
    },

    isValidTimeFormat(timeFormat) {
      return /^\d{1,2}:\d{1,2}$/.test(timeFormat);
    }
  },
}
</script>

<style scoped>
.form {
  box-sizing: border-box;
  width: 100%;
  padding: 7px;
  background: #f2f2f2;
  border-radius: 5px;
  box-shadow: 1px 1px 1px #999;
  overflow: hidden;
}

.form__checkbox {
  margin-bottom: 5px;
}

.form__title, .form__decription {
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 7px;
}

.form__decription {
  resize: none;
}

.form__time-checkbox-wrap {
  margin-bottom: 10px;
}

.form__submit-button {
  width: 90px; line-height: 2rem;
  background: #555;
  border-radius: 5px;
  text-align: center;
  margin: auto;
  margin-top: 0px;
  font-size: 1rem;
  color: #fff;
  cursor: default;
  clear: left;
}

.form__Date {
  float: left;
  width: 45%; height: 80px;
}

.form__Time {
  float: right;
  width: 45%; height: 80px;
}
</style>
