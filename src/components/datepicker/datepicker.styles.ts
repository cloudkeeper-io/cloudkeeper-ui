/* eslint-disable max-len */
import styled, { css } from 'styled-components'
import { mix, transparentize } from 'polished'
import { Calendar } from 'react-feather'

const circle = css`
    ::before {
        position: absolute;
        top: 0;
        left: 0;
        content: ' ';
        width: 100%;
        height: 100%;
        border-radius: 22px;
        background: ${p => `linear-gradient(146.18deg, ${mix(0.7, p.theme.palette.background.paper, p.theme.palette.primary.main)} -1.97%, ${p.theme.palette.primary.main} 109.73%);`};
        z-index: -1;
    }
`

export const Wrapper = styled.div`
    .DateInput_input {
        font-size: 14px;
        background-color: transparent;
        font-family: ${p => p.theme.font}, sans-serif !important;
        color: ${p => p.theme.colors.primary} !important;
        font-weight: 500;
    }
    
    
    .DateRangePickerInput {
        border: 0;
        background-color: transparent;
    }
    
    .DateInput {
      background: transparent;
      width: 100px;
    }
    
    .DateInput_input__focused {
      border-bottom: 2px solid ${p => p.theme.colors.primary};
    }
    
    .CalendarDay {
      border: none;
    }
    
    .CalendarMonth_caption {
        padding-bottom: 40px;
    }
    
    .DayPicker_weekHeader_li {
        color: ${p => p.theme.colors.primary};
        font-weight: 500;
    }
    
    .DayPicker__withBorder {
      border-radius: 10px;
      box-shadow: 0px 10px 20px ${p => transparentize(0.16, mix(0.9, p.theme.colors.background, p.theme.palette.primary.main))}, 0px 30px 50px ${p => transparentize(0.1, mix(0.9, p.theme.colors.background, p.theme.palette.primary.main))};
    }
    
    .CalendarMonth_caption {
      color: ${p => p.theme.palette.text.primary}
    }
    
    .CalendarDay {
      color: ${p => p.theme.palette.text.primary}
    }
    
    .CalendarDay__blocked_out_of_range {
      color: ${p => p.theme.palette.text.disabled}
    }
    
    .CalendarDay__default:hover {
      border: none;
    }
    
    .DateInput_fang {
      display: none;
    }
    
    .CalendarDay__selected {
      background: ${p => transparentize(0.7, p.theme.colors.primary)} !important;
      color: #fff;
    }
    
    .CalendarDay__selected:hover {
      position: relative; 
      background: ${p => transparentize(0.7, p.theme.colors.primary)} !important;
      color: #fff;
      ${circle}
    }
    
    .CalendarDay__selected_span {
      background: ${p => transparentize(0.7, p.theme.colors.primary)} !important;
      color: #fff;
    }
    
        
    .CalendarDay__hovered_span {
      background: ${p => transparentize(0.7, p.theme.colors.primary)} !important;
      color: #fff;
    }
    
    .CalendarDay__hovered_span:hover {
      position: relative; 
      background: ${p => transparentize(0.7, p.theme.colors.primary)} !important;
      border-bottom-right-radius: 22px;
      border-top-right-radius: 22px;
      color: #fff;
      ${circle}
    }
    
    .CalendarDay__selected_end {
      position: relative; 
      border-bottom-right-radius: 22px;
      border-top-right-radius: 22px;
      ${circle}
    }
    
    .CalendarDay__selected_start {
      position: relative; 
      border-bottom-left-radius: 22px;
      border-top-left-radius: 22px;
      ${circle}
    }
    
    .CalendarDay__default {
      background: inherit;
    }

    .CalendarDay__default:hover {
      background: ${p => transparentize(0.7, p.theme.colors.primary)};
      color: #fff;
    }
    
    .DayPicker {
      background: ${p => p.theme.card.background};
      backdrop-filter: ${p => p.theme.card.backdropFilter};
      ${p => p.theme.card.additionalStyles};
    }
    
    .DateRangePicker_picker {
      background-color: transparent !important;
    }
    
    .CalendarMonth {
      background: transparent;
    }
    
    .CalendarMonthGrid {
      background: transparent;
    }
    
    .CalendarDay__blocked_out_of_range, 
    .CalendarDay__blocked_out_of_range:active, 
    .CalendarDay__blocked_out_of_range:hover {
      color: ${p => p.theme.palette.text.disabled} !important;
      background: unset !important;
    }
    
    .DayPickerNavigation_button__default, 
    .DayPickerNavigation_button__default:hover,
    .DayPickerNavigation_button__default:focus {
      border: none;
      background: none;
    }
    
    .DayPickerNavigation_svg__horizontal {
      fill: ${p => p.theme.colors.primary}
    }
    
    .DateRangePickerInput_calendarIcon {
      margin: 0 0 0 10px;
      outline: none;
      padding: 10px 0;
      @media (max-width: 900px) {
        margin: 0;
        padding: 10px 10px 10px 0;
      }
    }
`


export const CalendarIcon = styled(Calendar)`
  color: ${p => p.theme.colors.primary};
`
