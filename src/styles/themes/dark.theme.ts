/* eslint-disable implicit-arrow-linebreak */

const getClipPath = (x: number) =>
  `polygon(${x}px 0, 100% 0, 100% calc(100% - ${x}px), calc(100% - ${x}px) 100%, 0 100%, 0 ${x}px)`

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
  background: '#0E0B20',
  borderColor: '#4FFAC5',
  clipPath: getClipPath(34),
  borderClipPath: getClipPath(35),
  shadow: 'rgba(79, 250, 197, 0.3)',
}

const dataCard = {
  background: 'linear-gradient(180deg, #129F7C -0.31%, #6F20A0 100%)',
}

const input = {
  background: '#0E0B20',
  color: '#B9FFEC',
  border: '#B9FFEC',
}

const buttons = {
  borderRadius: 0,
  clipPath: getClipPath(22),
  borderClipPath: getClipPath(23),
  primary: {
    background: '#142330',
    active: '#293b53',
    color: '#B9FFEC',
    disabled: '#374856',
    disabledText: '#ababab',
    borderColor: '#4FFAC5',
  },
}

export default {
  colors,
  card,
  dataCard,
  input,
  buttons,
}
