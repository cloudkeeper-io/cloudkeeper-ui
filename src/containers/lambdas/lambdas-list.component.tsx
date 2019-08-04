import React, { useState, memo } from 'react'
import { round, orderBy } from 'lodash'
import 'primereact/resources/primereact.min.css'
import { Card } from '@material-ui/core'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'
import { SortableTableHeadCell, StyledTableCell } from '../../components/sortable-table-head-cell'

const StyledCard = styled(Card)`
  border-radius: 10px;
  padding: 20px 40px;
`

interface OrderState {
  order: 'asc' | 'desc'
  orderProperty: string
}

const LambdaRow = memo(({ lambda }: any) => (
  <TableRow>
    <StyledTableCell>
      {lambda.name}
    </StyledTableCell>
    <StyledTableCell>{lambda.region}</StyledTableCell>
    <StyledTableCell>{lambda.invocations}</StyledTableCell>
    <StyledTableCell>{lambda.errors}</StyledTableCell>
    <StyledTableCell>{round(lambda.errorRate * 100, 2)}%</StyledTableCell>
    <StyledTableCell>{round(lambda.avgExecutionTime, 2)}</StyledTableCell>
    <StyledTableCell>${round(lambda.cost, 5)}</StyledTableCell>
  </TableRow>
))

export const LambdasList = ({ lambdas }: any) => {
  const [{ orderProperty, order }, setSorting] = useState<OrderState>({ orderProperty: 'invocations', order: 'desc' })

  const orderedLambdas = orderBy(lambdas, [orderProperty], [order])

  const changeOrder = (property: string) => {
    const isDesc = orderProperty === property && order === 'desc'
    setSorting({ orderProperty: property, order: isDesc ? 'asc' : 'desc' })
  }

  return (
    <StyledCard>
      <Table>
        <TableHead>
          <TableRow>
            <SortableTableHeadCell
              label="Lambda Name"
              propertyName="name"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
            <SortableTableHeadCell
              label="Region"
              propertyName="region"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
            <SortableTableHeadCell
              label="Invocations"
              propertyName="invocations"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
            <SortableTableHeadCell
              label="Errors"
              propertyName="errors"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
            <SortableTableHeadCell
              label="Error %"
              propertyName="errorRate"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
            <SortableTableHeadCell
              label="Avg. Execution Time"
              propertyName="avgExecutionTime"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
            <SortableTableHeadCell
              label="Cost"
              propertyName="cost"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
          </TableRow>
        </TableHead>
        <TableBody>
          {orderedLambdas.map((lambda: any) => <LambdaRow key={lambda.name + lambda.region} lambda={lambda} />)}
        </TableBody>
      </Table>
    </StyledCard>
  )
}
