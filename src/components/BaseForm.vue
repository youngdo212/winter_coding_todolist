<template>
  <div class="form">
    <div>
      <input
        id="todo-title"
        placeholder="title"
        v-model="title"
      >
    </div>
    <div>
      <textarea
        id="todo-decription"
        placeholder="description"
        v-model="description"
      />
    </div>
    <div>
      <label for="form__time-checkbox">만료기한 설정</label>
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
    <button
      @click="submit"
    >
      ADD
    </button>
  </div>
</template>

<script>
import BaseFormDate from './BaseFormDate.vue';

export default {
  name: 'BaseForm',

  components: {
    BaseFormDate
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
      timeSettingMode: false,
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

</style>
