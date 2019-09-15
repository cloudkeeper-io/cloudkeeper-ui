/* eslint-disable max-len */
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
  seriesColors: ['#0D8EFC', '#395d9a', '#3896C6', '#72CCD4', '#93A1DC'],

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
  background: 'linear-gradient(180deg, #FFFFFF 51.56%, #F7FCFF 100%), #FFFFFF',
  shadow: '0 10px 20px rgba(148, 188, 224, 0.16), 0 30px 50px rgba(152, 210, 251, 0.2)',
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
  areaColor: 'url(#lightAreaChart)',
  areaTrend: 'url(#lightLine)',
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
  gradient: 'linear-gradient(90deg, #2FF6F5 0%, #0470FE 100%)',
  borderRadius: '10px 10px 0px 0px',
  backgroundColor: '#F0F7FF',
  selected: {
    backgroundColor: '#FFFFFF',
    color: '#0D8EFC',
  },
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

const icon = {
  background: 'white',
  color: '#333333',
  hoverColor: '#f2f2f2',
  border: 'none',
}

const dashboard = {
  background: '#E4E4EB url(/light-dashboard.svg) center center no-repeat',
  header: colors.text,
  hr: '#FFFFFF',
}

const drawer = {
  background: 'linear-gradient(180deg, #0970D4 60px, #1DC9D7 100%)',
}

const calendar = {
  circleBackground: `linear-gradient(146.18deg, ${mix(0.3, '#fff', palette.primary.main)} -1.97%, ${palette.primary.main} 109.73%);`,
}

const table = {
  header: {
    color: '#333333',
  },
  status: {
    completed: {
      color: '#FFAB70',
    },
    notCompleted: {
      color: '#FF5E99',
    },
  },
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
  icon,
  calendar,
  table,
}
