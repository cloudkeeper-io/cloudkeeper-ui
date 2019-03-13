import { getClipPath, getBorderClipPath } from '../../utils'

const colors = {
  primary: '#349884',
  background: '#0E0B20',
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
  clipPath: getClipPath(34),
  borderClipPath: getBorderClipPath(35, 1),
  shadow: 'rgba(79, 250, 197, 0.3)',
}

const dataCard = {
  background: 'linear-gradient(180deg, #129F7C -0.31%, #6F20A0 100%)',
}

const input = {
  background: 'transparent',
  color: '#B9FFEC',
  border: '#B9FFEC',
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
    active: '#293b53',
    color: '#B9FFEC',
    disabled: '#374856',
    borderDisabled: '#374856',
    disabledText: '#ababab',
    borderColor: '#4FFAC5',
  },
}

const tabs = {
  clipPath: getClipPath(34),
  borderClipPath: getBorderClipPath(35, 1),
  background: '#0F1222',
  active: '#142330',
  text: '#B9FFEC',
  activeText: '#B9FFEC',
  tabListRight: '50px',
}

export default {
  colors,
  card,
  dataCard,
  input,
  buttons,
  tabs,
}
