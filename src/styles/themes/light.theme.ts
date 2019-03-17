import { darken, transparentize } from 'polished'

const colors = {
  primary: '#4A90E2',
  background: '#F8F8F8',
  backgroundGradient: 'linear-gradient(180deg, #F8F8F8 60px, #C8DDF6 100%)',
  borderColor: '#4A90E2',
  text: '#4A4A4A',
  icon: '#4A90E2',
  activeText: '#FFFFFF',
  disabled: '#ababab',
  spinner: '#4A90E2',
  shadow: 'rgba(74, 144, 226, 0.3)',
}

const card = {
  background: '#FFFFFF',
  clipPath: 'none',
  shadow: colors.shadow,
  borderRadius: '6px',
  showBorder: false,
  borderColor: '#FFFFFF',
}

const dataCard = {
  background: '#4A90E2',
}

const input = {
  background: '#FFFFFF',
  color: colors.primary,
  border: colors.borderColor,
  placeholder: transparentize(0.4, colors.primary),
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
  icon: {
    background: '#FFFFFF',
  },
}

const tabs = {
  background: '#FFFFFF',
  active: '#4A90E2',
  text: '#FFFFFF',
  activeText: '#4A4A4A',
}

const select = {
  color: colors.text,
  listBackground: colors.background,
  focusedListBackground: transparentize(0.7, colors.primary),
  selectedListBackground: transparentize(0.4, colors.primary),
}

const login = {
  treesOpacity: 0,
  particlesColor: colors.primary,
}

export default {
  name: 'light',
  favicon: 'light-favicon.png',
  colors,
  card,
  dataCard,
  input,
  buttons,
  tabs,
  select,
  login,
}
