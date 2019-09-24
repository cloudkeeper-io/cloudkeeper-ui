/* eslint-disable max-len */
import { mix, transparentize } from 'polished'

const PRIMARY = '#00E092' // mix(0.5, '#48E385', '#018EFF'); //

const palette = {
  primary: { main: PRIMARY },
  secondary: { main: '#018EFF' },
  background: {
    default: '#102d40',
    paper: '#0E1F30',
  },
}

const colors = {
  primary: PRIMARY,
  background: '#040C2A',
  transparentBackground: 'rgb(14, 11, 32, 0.4)',
  mainBackground: 'linear-gradient(180deg, #040C2A 60px, #112531 100%)', // `url("${darkBackground}") center center / cover;`,
  borderColor: '#4FFAC5',
  text: '#FFFFFF',
  icon: PRIMARY,
  activeText: '#4FFAC5',
  disabled: '#ababab',
  spinner: 'url(#dark-spinner-gradient)',
  shadow: 'rgba(79, 250, 197, 0.3)',
  seriesColors: ['#018EFF', '#0EACFE', '#61D3FE', '#87FFDA', '#48E385'],

  active: '#018EFF',
  activeSecondary: '#48E385',
}

const controls = {
  color: transparentize(0.7, colors.primary),
  gradient: 'linear-gradient(270deg, #018EFF -18.75%, #48E385 100%)',
  activeColor: transparentize(0.7, colors.primary),
  activeGradient: `linear-gradient(90deg, ${colors.activeSecondary} 0%, ${colors.active} 100%)`,
  secondaryActiveColor: colors.activeSecondary,
  shadow: transparentize(0.8, colors.primary),
}

const card = {
  background: 'linear-gradient(180deg, rgba(0, 1, 0, 0.4) 0%, rgba(18, 24, 50, 0.4) 100%), rgba(21, 76, 108, 0.4)',
  borderColor: colors.borderColor,
  shadow: 'none',
  borderRadius: '10px 40px 10px 40px',
}

const dataCard = {
  secondaryBackground: 'linear-gradient(180deg, #129F7C -0.31%, #6F20A0 100%)',
  axis: '#8492B9',
  secondaryAxis: colors.primary,
  lines: mix(0.5, colors.active, colors.activeSecondary),
  linesSecondary: mix(0.5, '#FFFC00', '#00B81D'),
  svgLines: 'url(#darkLine)',
  svgLinesSecondary: 'url(#darkLineSecondary)',
  lineFilter: 'url(#darkLineShadow)',
  secondaryLines: colors.primary,
  tooltipBackground: '#0E0B20',
  secondaryTooltipBackground: '#0E0B20',
  cartesianGrid: '#48587A',
  areaColor: mix(0.5, colors.active, colors.activeSecondary),
  areaTrend: mix(0.5, '#FFFC00', '#00B81D'),
  svgAreaColor: 'url(#darkAreaChart)',
  svgAreaTrend: 'url(#darkLineSecondary)',
}

const input = {
  background: 'rgba(102, 157, 189, 0.14)',
  color: colors.text,
  iconColor: '#8EA4B9',
  border: colors.borderColor,
  placeholder: transparentize(0.45, colors.text),
}

const buttons = {
  borderRadius: '45px',
  primary: {
    background: transparentize(0.2, colors.primary),
    color: colors.text,
    disabled: '#374856',
    disabledText: '#ababab',
    boxShadow: '',
  },
  icon: {
    background: '#142330',
  },
}

const tabs = {
  gradient: 'linear-gradient(270deg, #018EFF -18.75%, #48E385 100%)',
  borderRadius: '10px 40px 10px 40px',
  selected: {
    backgroundColor: '#24425C',
    color: '#8499B9',
  },
}

const select = {
  color: colors.primary,
  listBackground: '#142330',
  focusedListBackground: transparentize(0.7, colors.primary),
  selectedListBackground: transparentize(0.4, colors.primary),
  shadow: colors.shadow,
  borderColor: PRIMARY,
}

const login = {
  treesOpacity: 1,
  particlesColor: '#FFFFFF',
  background: 'radial-gradient(black, transparent)',
  headerColor: PRIMARY,
}

const icon = {
  background: 'none',
  color: '#FFFFFF',
  hoverColor: 'rgba(242, 242, 242, 0.3)',
  border: '2px solid #FFFFFF',
}

const dashboard = {
  background: '#0F1D3D url(/dark-dashboard.svg) 100% 100% no-repeat',
  header: colors.primary,
  hr: colors.primary,
}

const drawer = {
  background: 'linear-gradient(180deg, #07203D 60px, #061932 100%)',
}

const calendar = {
  circleBackground: `linear-gradient(270deg, ${palette.primary.main} 8.42%, ${palette.secondary.main} 100%);`,
}

const table = {
  header: {
    color: '#FFFFFF',
  },
  status: {
    completed: {
      color: '#FFF45E',
    },
    notCompleted: {
      color: '#FFF45E',
    },
  },
}

export default {
  name: 'dark',
  favicon: 'dark-favicon.png',
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
