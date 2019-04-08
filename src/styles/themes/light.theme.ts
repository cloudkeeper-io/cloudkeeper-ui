import { mix, tint, transparentize } from 'polished'

const PRIMARY = mix(0.5, '#2FF6F5', '#0470FE') // '#4A90E2'

const colors = {
  primary: PRIMARY,
  background: '#F5F7FA',
  transparentBackground: 'rgb(248, 248, 248, 0.6)',
  backgroundGradient: 'linear-gradient(180deg, #F8F8F8 60px, #F7F7F7 100%)',
  borderColor: PRIMARY,
  text: '#4A4A4A',
  icon: PRIMARY,
  activeText: '#FFFFFF',
  disabled: '#ababab',
  spinner: 'url(#light-spinner-gradient)',
  shadow: 'rgba(190, 180, 185, 0.2)',

  active: '#2FF6F5',
  activeSecondary: '#0470FE',
}

const controls = {
  color: `${transparentize(0.7, colors.primary)}`,
  gradient: 'linear-gradient(0deg, #EDECEC, #EDECEC), linear-gradient(90deg, #FF5F99 0%, #FFAA6E 101.56%)',
  activeColor: `${mix(0.5, colors.activeSecondary, colors.active)}`,
  activeGradient: `linear-gradient(90deg, ${colors.activeSecondary} 0%, ${colors.active} 100%)`,
  secondaryActiveColor: '#fff',
  shadow: transparentize(0.5, colors.active),
}

const card = {
  background: '#FFFFFF',
  clipPath: 'none',
  shadow: colors.shadow,
  borderRadius: '10px',
  showBorder: false,
  borderColor: '#FFFFFF',
}

const dataCard = {
  background: 'linear-gradient(180deg, #FFFFFF 0%, #F7FCFF 100%)',
  secondaryBackground: colors.primary,
  axis: '#9A9DAD',
  secondaryAxis: transparentize(0.3, colors.activeText),
  lines: mix(0.5, colors.active, colors.activeSecondary),
  linesSecondary: mix(0.5, '#FFAA6E', '#FF5F99'),
  svgLines: 'url(#lightLine)',
  svgLinesSecondary: 'url(#lightLineSecondary)',
  lineFilter: 'url(#lightLineShadow)',
  secondaryLines: colors.activeText,
  tooltipBackground: '#FFFFFF',
  secondaryTooltipBackground: '#0E0B20',
  primaryTab: colors.primary,
  secondaryTab: '#FFFFFF',
  cartesianGrid: '#EDF0F2',
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
    background: colors.primary,
  },
  primary: {
    background: colors.primary,
    active: tint(0.15, colors.primary),
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
  active: colors.primary,
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
  font: 'Roboto',
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
