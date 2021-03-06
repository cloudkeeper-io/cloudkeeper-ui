/* eslint-disable max-len */
import React from 'react'
import { TableSortLabel } from '@material-ui/core'
import { StyledChevronDown, StyledTableCell, TableLabel } from './sortable-table-head-cell.styles'

interface SortableTableHeadCellProps {
    label: string
    propertyName: string
    orderBy: string
    order: 'asc' | 'desc'
    changeOrder: (properyName: string) => void
}

export const SortableTableHeadCell = ({ label, orderBy, order, changeOrder, propertyName }: SortableTableHeadCellProps) => (
  <StyledTableCell>
    <TableSortLabel
      active={orderBy === propertyName}
      direction={order}
      onClick={() => changeOrder(propertyName)}
      IconComponent={StyledChevronDown as any}
    >
      <TableLabel variant="h6" noWrap>
        {label}
      </TableLabel>
    </TableSortLabel>
  </StyledTableCell>
)
