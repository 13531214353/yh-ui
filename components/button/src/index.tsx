import { defineComponent } from 'vue'

import { makeStringProp } from '../../../utils/props'

import './index.less'

const buttonType = {
  text: makeStringProp<String>('button'),
  type: makeStringProp<String>('default'),
}

const Button = defineComponent({
  name: 'YhButton',
  emits: ['click'],
  props: buttonType,
  setup(props) {
    return () => (
      <div class={['yh-button', `yh-button-${props.type}`]}>
        <div>{props.text}</div>
      </div>
    )
  },
})

export default Button
