<template>
  <div class="input-form">
    <label
      class="input-form__label"
      v-if="label"
    >
      {{label}}
    </label>
    <input
      ref="input"
      class="input-form__input"
      v-bind="$attrs"
      :value="value"
      v-on="inputListener"
    >
    <div class="input-form__message">형식이 올바르지 않습니다</div>
  </div>
</template>

<script>
export default {
  name: 'BaseFormInput',

  inheritAttr: false,

  props: {
    label: {
      type: String,
      dafault: '',
    },
    value: {
      type: String,
      default: '',
    },
    autofocus: {
      type: Boolean,
      default: false,
    }
  },

  mounted() {
    if(!this.autofocus) return;

    this.$refs.input.focus();
  },

  computed: {
    inputListener() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input(e) {
          vm.$emit('input', e.target.value)
        }
      });
    }
  }
}
</script>

<style scoped>

.input-form__label {
  font-size: 0.9rem;
}

.input-form__input {
  box-sizing: border-box;
  width: 100%;
  outline: 0px;
  border: 0px; padding: 5px;
  font-size: 1rem;
  margin-top: 2px;
  box-shadow: inset 1px 1px #aaa;
}

.input-form__message {
  padding: 5px;
  color: rgb(252, 107, 107);
  font-size: 0.8rem;
  display: none;
}

.input-form__input:invalid + .input-form__message {
  display: block;
}

</style>
