import styled from 'styled-components'
import { ChevronDown } from 'react-feather'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'

export const StyledChevronDown = styled(ChevronDown)`
  color: ${p => p.theme.colors.primary} !important;
`

export const HiddenSpan = styled.span`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    top: 20px;
    width: 1px;
`

export const StyledTableCell = styled(TableCell)`
  padding: 20px 14px;
`

export const TableLabel = styled(Typography)`
  color: ${p => p.theme.palette.text.primary};
`
