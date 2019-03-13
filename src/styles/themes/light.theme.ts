import { darken } from 'polished'

const colors = {
  primary: '#4A90E2',
  background: '#F8F8F8',
  text: '#4A4A4A',
  icon: '#4A90E2',
  activeText: '#FFFFFF',
  disabled: '#ababab',
  spinner: '#4A90E2',
  shadow: 'rgba(210, 210, 210, 0.5)',
}

const card = {
  background: '#FFFFFF',
  clipPath: 'none',
  shadow: 'rgba(74, 144, 226, 0.3)',
  borderRadius: '6px',
}

const dataCard = {
  background: '#4A90E2',
}

const input = {
  background: '#FFFFFF',
  color: '#4A90E2',
  border: '#4A90E2',
}

const buttons = {
  borderRadius: '20px',
  login: {
    background: '#4A90E2',
  },
  primary: {
    background: '#4A90E2',
    active: darken(0.15, '#4A90E2'),
    color: '#FFFFFF',
    disabled: 'rgba(171, 171, 171, 0.1)',
    borderDisabled: 'transparent',
    disabledText: '#ababab',
  },
}

const tabs = {
  background: '#FFFFFF',
  active: '#4A90E2',
  text: '#FFFFFF',
  activeText: '#4A4A4A',
}

export default {
  colors,
  card,
  dataCard,
  input,
  buttons,
  tabs,
}
