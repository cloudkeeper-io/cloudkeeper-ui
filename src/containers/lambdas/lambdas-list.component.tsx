/* eslint-disable camelcase */
import React, { useState } from 'react'
import { orderBy } from 'lodash'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'

import { SortableTableHeadCell } from '../../components/sortable-table-head-cell'
import { lambdasList_lambdasList } from '../../graphql/queries/types/lambdasList'
import { LambdaRow } from './lambda-row.component'

interface LambdasListProps {
    lambdas: lambdasList_lambdasList[]
}

interface OrderState {
    order: 'asc' | 'desc'
    orderProperty: string
}

export const LambdasList = ({ lambdas }: LambdasListProps) => {
  const [{ orderProperty, order }, setSorting] = useState<OrderState>({ orderProperty: 'invocations', order: 'desc' })

  const orderedLambdas = orderBy(lambdas, [orderProperty], [order])

  const changeOrder = (property: string) => {
    const isDesc = orderProperty === property && order === 'desc'
    setSorting({ orderProperty: property, order: isDesc ? 'asc' : 'desc' })
  }

  return (
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
        {orderedLambdas.map(lambda => <LambdaRow key={lambda!.name! + lambda!.region} lambda={lambda} />)}
      </TableBody>
    </Table>
  )
}
