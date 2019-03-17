import { mix, transparentize } from 'polished'

import { getClipPath, getBorderClipPath } from '../../utils'

const colors = {
  primary: '#B9FFEC',
  background: '#0E0B20',
  backgroundGradient: 'linear-gradient(180deg, #0E0B20 0, #112531 100%)',
  borderColor: '#4FFAC5',
  text: '#B9FFEC',
  icon: '#B9FFEC',
  activeText: '#B9FFEC',
  disabled: '#ababab',
  spinner: 'url(#spinner-gradient)',
  shadow: 'rgba(79, 250, 197, 0.3)',
}

const card = {
  background: 'transparent',
  borderColor: '#4FFAC5',
  clipPath: getClipPath(40),
  borderClipPath: getBorderClipPath(41, 1),
  shadow: colors.shadow,
  showBorder: true,
}

const dataCard = {
  background: 'linear-gradient(180deg, #129F7C -0.31%, #6F20A0 100%)',
}

const input = {
  background: 'transparent',
  color: colors.primary,
  border: colors.borderColor,
  placeholder: transparentize(0.4, colors.primary),
}

const buttons = {
  borderRadius: 0,
  clipPath: getClipPath(22),
  borderClipPath: getBorderClipPath(23, 1),
  login: {
    background: 'transparent',
  },
  primary: {
    background: '#142330',
    active: mix(0.85, '#142330', '#B9FFEC'),
    color: '#B9FFEC',
    disabled: '#374856',
    borderDisabled: '#374856',
    disabledText: '#ababab',
    borderColor: '#4FFAC5',
  },
  icon: {
    background: '#142330',
  },
}

const tabs = {
  clipPath: getClipPath(40),
  borderClipPath: getBorderClipPath(41, 1),
  background: '#0F1222',
  active: '#142330',
  text: '#B9FFEC',
  activeText: '#B9FFEC',
  tabListRight: '60px',
}

const select = {
  color: colors.primary,
  listBackground: '#142330',
  focusedListBackground: transparentize(0.7, colors.primary),
  selectedListBackground: transparentize(0.4, colors.primary),
}

const login = {
  treesOpacity: 1,
  particlesColor: '#FFFFFF',
}

export default {
  name: 'dark',
  favicon: 'dark-favicon.png',
  colors,
  card,
  dataCard,
  input,
  buttons,
  tabs,
  select,
  login,
}
