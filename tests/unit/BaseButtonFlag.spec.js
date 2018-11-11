import { mount } from '@vue/test-utils'
import BaseButtonFlag from '@/components/BaseButtonFlag.vue'

describe('BaseButtonFlag renders', () => {
  test('the currect textContent', () => {
    const textContent = 'hello';
    const wrapper = mount(BaseButtonFlag, {
      propsData: {
        name: textContent,
        active: false,
      }
    })

    expect(wrapper.text()).toBe(textContent);
  })

  describe('the currect class', () => {
    test('when being activated', () => {
      const wrapper = mount(BaseButtonFlag, {
        propsData: {
          name: 'first',
          active: true,
        }
      });

      expect(wrapper.classes().length).toBe(2);
      expect(wrapper.classes()).toContain('button--active');
      expect(wrapper.classes()).toContain('button');
    });

    test('when not being activated', () => {
      const wrapper = mount(BaseButtonFlag, {
        propsData: {
          name: 'first',
          active: false,
        }
      });

      expect(wrapper.classes().length).toBe(1);
      expect(wrapper.classes()).not.toContain('button--active');
      expect(wrapper.classes()).toContain('button');
    })
  })
});

describe('Clicking BaseButtonFlag emits', () => {
  const eventArgument = 'hello';
  const wrapper = mount(BaseButtonFlag, {
    propsData: {
      name: eventArgument,
      active: true,
    }
  })

  wrapper.trigger('click');

  test('the currect event', () => {
    expect(wrapper.emitted()['button-clicked'].length).toBe(1);
  })

  test('the currect event argument', () => {
    expect(wrapper.emitted()['button-clicked'][0]).toEqual([eventArgument]);
  })
})