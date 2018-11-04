<template>
  <div
    class="checkbox"
    :class="{'checkbox--disabled': disabled}"
    @click.stop="check"
  >
    <svg
      version="1.1"
      baseProfile="full"
      width="100%" height="100%" viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      v-if="checked"
    >
      <line x1="20" y1="50" x2="43" y2="75" stroke="#000" stroke-width="7"/>
      <line x1="39" y1="75" x2="80" y2="20" stroke="#000" stroke-width="7"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'BaseCheckBox',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      checked: false,
    }
  },

  methods: {
    check() {
      if(this.disabled) return;

      this.checked = !this.checked;
      this.$emit('checked', this.checked);
    }
  }
}
</script>

<style scoped>
.checkbox {
  box-sizing: border-box;
  width: 27px; height: 27px;
  border: 1px solid #888;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.checkbox--disabled {
  background: #bbb;
}
</style>
