import { mix, transparentize } from 'polished'

import loginBackground from '../images/light-login-background.png'

const PRIMARY = '#0D8EFC' // mix(0.5, '#2FF6F5', '#0470FE') // '#4A90E2'

const palette = {
  primary: { main: PRIMARY },
  secondary: { main: '#FFAA6E' },
}

const colors = {
  primary: PRIMARY,
  background: '#FCFDFF',
  transparentBackground: 'rgb(248, 248, 248, 0.6)',
  mainBackground: 'linear-gradient(180deg, #FCFDFF 60px, #F7F7FF 100%)',
  borderColor: PRIMARY,
  text: '#4A4A4A',
  icon: PRIMARY,
  activeText: '#FFFFFF',
  disabled: '#ababab',
  spinner: 'url(#light-spinner-gradient)',
  shadow: 'rgba(190, 180, 185, 0.2)',

  active: '#FFAA6E',
  activeSecondary: '#FF5F99',
}

const controls = {
  color: `${transparentize(0.7, colors.primary)}`,
  gradient: 'linear-gradient(0deg, #EDECEC, #EDECEC), linear-gradient(90deg, #FF5F99 0%, #FFAA6E 101.56%)',
  activeColor: colors.primary,
  activeGradient: `linear-gradient(90deg, ${colors.activeSecondary} 0%, ${colors.active} 100%)`,
  secondaryActiveColor: '#fff',
  shadow: transparentize(0.5, colors.primary),
}

const card = {
  background: 'rgba(255,255,255, 0.7)',
  shadow: colors.shadow,
  borderRadius: '10px',
  borderColor: '#FFFFFF',
}

const dataCard = {
  secondaryBackground: colors.primary,
  axis: '#9A9DAD',
  secondaryAxis: transparentize(0.3, colors.activeText),
  lines: mix(0.5, colors.active, colors.activeSecondary),
  linesSecondary: mix(0.5, '#2FF6F5', '#0470FE'),
  svgLines: 'url(#lightLine)',
  svgLinesSecondary: 'url(#lightLineSecondary)',
  lineFilter: 'url(#lightLineShadow)',
  secondaryLines: colors.activeText,
  tooltipBackground: '#FFFFFF',
  secondaryTooltipBackground: '#0E0B20',
  cartesianGrid: '#EDF0F2',
}

const input = {
  background: '#F3F4F5',
  color: '#4a4a4a',
  iconColor: '#9A9DAD',
  border: colors.borderColor,
  placeholder: transparentize(0.3, '#9A9DAD'),
}

const buttons = {
  borderRadius: '45px',
  primary: {
    background: transparentize(0.2, colors.primary),
    color: '#FFFFFF',
    disabled: 'rgba(171, 171, 171, 0.1)',
    borderDisabled: 'transparent',
    disabledText: '#ababab',
    boxShadow: '0 6px 12px rgba(54, 176, 245, 0.16), 0 16px 24px rgba(54, 123, 245, 0.16)',
  },
  icon: {
    background: '#FFFFFF',
  },
}

const tabs = {
  background: '#FFFFFF',
  active: colors.primary,
  text: '#FFFFFF',
  activeText: '#4A4A4A',
  borderLeft: '10px 0 0 0',
  borderRight: '0 10px 0 0',
  gradient: 'linear-gradient(90deg, #2FF6F5 0%, #0470FE 100%)',
}

const select = {
  color: colors.text,
  listBackground: colors.background,
  focusedListBackground: transparentize(0.7, colors.primary),
  selectedListBackground: transparentize(0.4, colors.primary),
  shadow: colors.shadow,
  borderColor: PRIMARY,
}

const login = {
  treesOpacity: 0,
  particlesColor: colors.primary,
  background: loginBackground,
  headerColor: '#333333',
}

const dashboard = {
  background: '#E4E4EB url(/light-dashboard.svg) center center no-repeat',
  header: colors.text,
  hr: '#FFFFFF',
}

const drawer = {
  background: 'linear-gradient(180deg, #0970D4 60px, #1DC9D7 100%)',
}

export default {
  name: 'light',
  favicon: 'light-favicon.png',
  font: 'Quicksand',
  drawer,
  palette,
  colors,
  controls,
  card,
  dataCard,
  input,
  buttons,
  tabs,
  select,
  login,
  dashboard,
}
