import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import { TableSortLabel } from '@material-ui/core'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const HiddenSpan = styled.span`
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

const TableLabel = styled(Typography)`
  color: ${p => p.theme.palette.text.primary};
`

export const SortableTableHeadCell = ({ label, orderBy, order, changeOrder, propertyName }: any) => (
  <StyledTableCell>
    <TableSortLabel
      active={orderBy === propertyName}
      direction={order}
      onClick={() => changeOrder(propertyName)}
    >
      <TableLabel variant="h6" noWrap>
        {label}
      </TableLabel>
      {orderBy === propertyName && (
        <HiddenSpan>
          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
        </HiddenSpan>
      )}
    </TableSortLabel>
  </StyledTableCell>
)
