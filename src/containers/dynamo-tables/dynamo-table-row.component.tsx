import React, { memo } from 'react'
import { round, get } from 'lodash'
import TableRow from '@material-ui/core/TableRow'

import { StyledTableCell } from '../../components/sortable-table-head-cell'
import { dynamoTablesList_dynamoTablesList as DynamoTablesListItem } from '../../graphql/queries/types/dynamoTablesList'
import { bytesToSize } from '../../utils'

export const DynamoTableRow = memo(({ table }: { table: DynamoTablesListItem }) => (
  <TableRow>
    <StyledTableCell>
      {table.name}
    </StyledTableCell>
    <StyledTableCell>{table.region}</StyledTableCell>
    <StyledTableCell>{table.billingMode}</StyledTableCell>
    <StyledTableCell>{bytesToSize(table.sizeBytes!)}</StyledTableCell>
    <StyledTableCell>{table.consumedRead}</StyledTableCell>
    <StyledTableCell>{table.consumedWrite}</StyledTableCell>
    <StyledTableCell>${round(get(table, 'cost', 0)!, 2)}</StyledTableCell>
  </TableRow>
))
