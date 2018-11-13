import { mount } from '@vue/test-utils';
import BaseFormInput from '@/components/BaseFormInput.vue';
import { wrap } from 'module';

describe('Rendering Test: ', () => {
  describe('when not taking props(default), ', () => {
    const wrapper = mount(BaseFormInput);

    test('BaseFormInput does not have label element', () => {
      expect(wrapper.contains('label')).toBe(false);
    })

    test('BaseFormInput has input element', () => {
      expect(wrapper.contains('input')).toBe(true);
    })

    test('input element does not have value', () => {
      expect(wrapper.find('input').element.value).toBe('');
    })

    test('BaseFormInput has message element', () => {
      expect(wrapper.contains('.input-form__message')).toBe(true);
    })

    test('message element is invisible', () => {
      expect(wrapper.find('.input-form__message').isVisible()).toBe(false);
    })
  });

  describe('when taking label props, ', () => {
    const label = "testLabel";
    const wrapper = mount(BaseFormInput, {
      propsData: {
        label
      }
    });

    test('BaseFormInput has label element', () => {
      expect(wrapper.contains('label')).toBe(true);
    })

    test('label element has the currect textContent', () => {
      expect(wrapper.find('label').text()).toBe(label);
    })
  })

  describe('when taking value props', () => {
    const value = 'default';
    const wrapper = mount(BaseFormInput, {
      propsData: {
        value
      }
    });

    test('input element has the currect value', () => {
      expect(wrapper.find('input').element.value).toBe(value);
    })
  })

  describe('when taking false value validity props', () => {
    const validity = false;
    const wrapper = mount(BaseFormInput, {
      propsData: {
        validity
      }
    })

    test('message element is now visible', () => {
      expect(wrapper.find('.input-form__message').isVisible()).toBe(true);
    })
  })

  describe('when taking autofocus value true', () => {
    const wrapper = mount(BaseFormInput, {
      propsData: {
        autofocus: true,
      }
    })

    test('BaseFormInput automatically is focused after mounting', () => {
      expect(wrapper.find('input:focus').exists()).toBe(true);
    })
  }),

  describe('when attributes is set on component', () => {
    const placeholder = 'test'
    const wrapper = mount(BaseFormInput, {
      attrs: {
        placeholder
      }
    })

    test('input element in component gets the attributes', () => {
      expect(wrapper.find('input').element.placeholder).toBe(placeholder)
    })
  })
})

describe('Interaction Test: ', () => {
  const mock = {
    calls: [],
    Fn() {
      const spy = (value) => {
        this.calls.push(value);
      }

      return spy;
    }
  }
  const value = 'testValue';
  const wrapper = mount(BaseFormInput, {
    propsData: {
      value,
    },
    listeners: {
      'keyup': mock.Fn(),
    }
  });

  describe('when input event is triggered on input element, ', () => {
    wrapper.find('input').trigger('input');

    test('component emits input event', () => {
      expect(wrapper.emitted().input.length).toBe(1);
    })

    test('component emits input event with currect argument', () => {
      expect(wrapper.emitted().input[0]).toEqual([value]);
    })
  });

  describe('when another event is triggered on input element', () => {
    wrapper.find('input').trigger('keyup');

    test('handler is called', () => {
      expect(mock.calls.length).toBe(1);
    })
  })
})