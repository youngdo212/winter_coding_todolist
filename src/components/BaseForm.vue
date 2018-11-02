<template>
  <div class="form">
    <BaseCheckBox
      class="form__checkbox"
      :disabled="true"
    />
    <input
      id="form__title"
      placeholder="Title"
      v-model="title"
    >
    <textarea
      id="form__decription"
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
    <BaseFormDate
      ref="dateFrom"
      v-if="timeSettingMode"
      :initialDate="initialDate"
      :initialTime="initialTime"
    />
    <div
      class="form__submit-button"
      @click="submit"
    >
      ADD
    </div>
  </div>
</template>

<script>
import BaseCheckBox from './BaseCheckBox.vue';
import BaseFormDate from './BaseFormDate.vue';

export default {
  name: 'BaseForm',

  components: {
    BaseCheckBox,
    BaseFormDate,
  },

  props: {
    initialTitle: {
      type: String,
      default: '',
    },
    initialDescription: {
      type: String,
      default: '',
    },
    initialDate: String,
    initialTime: String,
  },

  data() {
    return {
      title: this.initialTitle,
      description: this.initialDescription,
      timeSettingMode: this.initialDate && this.initialTime ? true : false,
    }
  },

  methods: {
    submit() {
      if(this.title === '') return;

      const form = {
        title: this.title,
        description: this.description,
        expireTime: this.timeSettingMode ? this.$refs.dateFrom.getTime() : null,
      };

      this.$emit('form-submitted', form);
      this.title = '';
      this.description= '';
      this.timeSettingMode = false;
    },
  },
}
</script>

<style scoped>
.form {
  box-sizing: border-box;
  width: 300px;
  padding: 7px;
  background: #aaa;
  border-radius: 5px;
}

.form__checkbox {
  margin-bottom: 5px;
}

#form__title, #form__decription {
  box-sizing: border-box;
  width: 100%;
  border: 0px; padding: 5px;
  outline: 0px;
  font-size: 1rem;
  margin-bottom: 7px;
}

#form__decription {
  resize: none;
  line-height: 1.3rem;
}

.form__time-checkbox-wrap {
  margin-bottom: 10px;
}

.form__submit-button {
  width: 60px;
  background: #555;
  border-radius: 5px;
  text-align: center;
  margin: auto;
  margin-top: 10px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  padding: 5px 0px;
  cursor: default;
}
</style>
