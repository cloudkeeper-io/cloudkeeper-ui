/* eslint-disable camelcase */
import React, { memo } from 'react'
import TableRow from '@material-ui/core/TableRow'

import { StyledTableCell } from '../../components/sortable-table-head-cell'
import { dynamoTablesList_dynamoTablesList } from '../../graphql/queries/types/dynamoTablesList'
import { bytesToSize } from '../../utils'

export const DynamoTableRow = memo(({ table }: { table: dynamoTablesList_dynamoTablesList }) => (
  <TableRow>
    <StyledTableCell>
      {table.name}
    </StyledTableCell>
    <StyledTableCell>{table.region}</StyledTableCell>
    <StyledTableCell>{table.billingMode}</StyledTableCell>
    <StyledTableCell>{bytesToSize(table.sizeBytes!)}</StyledTableCell>
    <StyledTableCell>{table.consumedRead}</StyledTableCell>
    <StyledTableCell>{table.consumedWrite}</StyledTableCell>
  </TableRow>
))
