import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import TableCell, { TableCellProps } from '@material-ui/core/TableCell'

const TableLabel = styled(Typography)`
  color: ${p => p.theme.palette.text.primary};
`
interface TableHeaderProps extends TableCellProps {
  label?: string
}

export default ({ label, ...rest } : TableHeaderProps) => (
  <TableCell {...rest}>
    <TableLabel variant="h6" noWrap>
      {label}
    </TableLabel>
  </TableCell>
)
