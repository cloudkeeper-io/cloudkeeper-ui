/* eslint-disable */
import { mix, transparentize } from 'polished'

import { getClipPath, getBorderClipPath } from '../../utils'

const PRIMARY = '#4FFAC5'; //mix(0.5, '#48E385', '#018EFF'); //

const colors = {
  primary: PRIMARY,
  background: '#0E0B20',
  transparentBackground: 'rgb(14, 11, 32, 0.4)',
  backgroundGradient: 'linear-gradient(180deg, #0E0B20 0, #112531 100%)',
  borderColor: '#4FFAC5',
  text: '#FFFFFF',
  icon: PRIMARY,
  activeText: '#FFFFFF',
  disabled: '#ababab',
  spinner: 'url(#dark-spinner-gradient)',
  shadow: 'rgba(79, 250, 197, 0.3)',

  active: '#018EFF',
  activeSecondary: '#48E385',
}

const controls = {
  color: transparentize(0.7, colors.primary),
  gradient: 'linear-gradient(270deg, #018EFF -18.75%, #48E385 100%)',
  activeColor: `${mix(0.5, colors.activeSecondary, colors.active)}`,
  activeGradient: `linear-gradient(90deg, ${colors.activeSecondary} 0%, ${colors.active} 100%)`,
  secondaryActiveColor: colors.activeSecondary,
  shadow: transparentize(0.8, colors.primary),
}

const card = {
  background: 'transparent',
  borderColor: colors.borderColor,
  clipPath: getClipPath(40),
  borderClipPath: getBorderClipPath(41, 1),
  shadow: colors.shadow,
  showBorder: true,
  borderRadius: '0',
}

const dataCard = {
  background: 'linear-gradient(180deg, rgba(71, 203, 203, 0.1) 0%, rgba(18, 24, 50, 0.1) 100%), rgba(102, 157, 189, 0.12)',
  secondaryBackground: 'linear-gradient(180deg, #129F7C -0.31%, #6F20A0 100%)',
  axis: '#8492B9',
  secondaryAxis: colors.primary,
  lines: mix(0.5, colors.active, colors.activeSecondary),
  linesSecondary: mix(0.5, '#FFFC00', '#00B81D'),
  svgLines: 'url(#darkLine)',
  svgLinesSecondary: 'url(#darkLineSecondary)',
  lineFilter: '',
  secondaryLines: colors.primary,
  tooltipBackground: '#0E0B20',
  secondaryTooltipBackground: '#0E0B20',
  cartesianGrid: '#48587A',
}

const input = {
  background: 'transparent',
  color: colors.primary,
  border: colors.borderColor,
  placeholder: transparentize(0.4, colors.primary),
}

const buttons = {
  borderRadius: 0,
  clipPath: getClipPath(21),
  borderClipPath: getBorderClipPath(22, 1),
  login: {
    background: 'transparent',
  },
  primary: {
    background: '#142330',
    active: mix(0.85, '#142330', colors.primary),
    color: colors.text,
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
  text: colors.primary,
  activeText: colors.primary,
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
  font: 'Muli',
  colors,
  controls,
  card,
  dataCard,
  input,
  buttons,
  tabs,
  select,
  login,
}
