<template>
  <div class="form">
    <BaseFormInput
      class="form__title"
      placeholder="Title"
      v-model="title"
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
      :label="'Date'"
      v-model="date"
      placeholder="0000/00/00"
      pattern="^(\d{4})\/(\d{1,2})\/(\d{1,2})$"
      required
      @keyup.enter="submit"
    />
    <BaseFormInput
      v-if="timeSettingMode"
      class="form__Time"
      :label="'Time'"
      v-model="time"
      placeholder="00:00"
      pattern="^(\d{1,2}):(\d{1,2})$"
      required
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
      date: '',
      time: '',
      timeSettingMode: this.initialTime ? true : false,
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

  mounted() {
    // this.$refs.titleInput.focus();

    if(!this.initialTime) return;

    this.setFormattedTime(this.initialTime);
  },

  watch: {
    timeSettingMode(on) {
      if(!on) return;

      this.setFormattedTime(this.initialTime || new Date().getTime());
    }
  },

  methods: {
    setFormattedTime(time) {
      const targetDate = new Date(time);

      const year = targetDate.getFullYear();
      const month = (targetDate.getMonth()+1).toString().padStart(2, '0');
      const date = targetDate.getDate().toString().padStart(2, '0');
      const hour = targetDate.getHours().toString().padStart(2, '0');
      const minute = targetDate.getMinutes().toString().padStart(2, '0');
      
      this.date = `${year}/${month}/${date}`;
      this.time = `${hour}:${minute}`;
    },

    deformatTime(){
      if(!this.timeSettingMode) return;

      const [, year, month, date] = this.date.match(/^(\d{4})\/(\d{1,2})\/(\d{1,2})$/);
      const [, hour, minute] = this.time.match(/^(\d{1,2}):(\d{1,2})$/);

      return new Date(year, month-1, date, hour, minute).getTime();
    },

    submit() {
      if(this.title === '') return;

      const form = {
        title: this.title,
        description: this.description,
        expireTime: this.deformatTime(),
      };

      this.$emit('form-submitted', form);
    },
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
