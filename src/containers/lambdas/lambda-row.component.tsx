import React, { memo } from 'react'
import { round } from 'lodash'
import TableRow from '@material-ui/core/TableRow'

import { lambdasList_lambdasList as LambdasListItem } from '../../graphql/queries/types/lambdasList'
import { StyledTableCell } from '../../components/sortable-table-head-cell'
import { msToDuration } from '../../utils'

export const LambdaRow = memo(({ lambda }: { lambda: LambdasListItem }) => (
  <TableRow>
    <StyledTableCell>
      {lambda.name}
    </StyledTableCell>
    <StyledTableCell>{lambda.region}</StyledTableCell>
    <StyledTableCell>{lambda.invocations}</StyledTableCell>
    <StyledTableCell>{lambda.errors}</StyledTableCell>
    <StyledTableCell>{round(lambda.errorRate! * 100, 2)}%</StyledTableCell>
    <StyledTableCell>{lambda.avgExecutionTime === 0 ? 'N/A' : msToDuration(lambda.avgExecutionTime!)}</StyledTableCell>
    <StyledTableCell>${round(lambda.cost!, 5)}</StyledTableCell>
  </TableRow>
))
