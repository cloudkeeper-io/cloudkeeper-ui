import styled from 'styled-components'
import { ChevronDown } from 'react-feather'
import TableCell from '@material-ui/core/TableCell'
import Typography from '@material-ui/core/Typography'

export const StyledChevronDown = styled(ChevronDown)`
  color: ${p => p.theme.colors.primary} !important;
`

export const StyledTableCell = styled(TableCell)`
  padding: 20px 14px;
`

export const TableLabel = styled(Typography)`
  color: ${p => p.theme.palette.text.primary};
`
