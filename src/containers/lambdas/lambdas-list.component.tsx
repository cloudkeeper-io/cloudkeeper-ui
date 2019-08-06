/* eslint-disable camelcase */
import React, { useState } from 'react'
import { orderBy, filter } from 'lodash'
import styled from 'styled-components'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'

import { Typography } from '@material-ui/core'
import { SortableTableHeadCell } from '../../components/sortable-table-head-cell'
import { lambdasList_lambdasList as LambdasListItem } from '../../graphql/queries/types/lambdasList'
import { LambdaRow } from './lambda-row.component'

interface LambdasListProps {
    lambdas: LambdasListItem[]
    filterInput?: string
}

interface OrderState {
    order: 'asc' | 'desc'
    orderProperty: string
}

const NothingFoundContainer = styled.div`
  height: calc(100% - 112px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const LambdasList = ({ lambdas, filterInput }: LambdasListProps) => {
  const [{ orderProperty, order }, setSorting] = useState<OrderState>({ orderProperty: 'invocations', order: 'desc' })

  const orderedLambdas = orderBy(lambdas, orderProperty, order)
  const filteredLambdas = filterInput ?
    filter(orderedLambdas, lambda => lambda.name!.includes(filterInput!))
    : orderedLambdas

  const changeOrder = (property: string) => {
    const isDesc = orderProperty === property && order === 'desc'
    setSorting({ orderProperty: property, order: isDesc ? 'asc' : 'desc' })
  }

  return (
    <>
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
        {filteredLambdas.length > 0 && (
          <TableBody>
            {filteredLambdas.map(lambda => <LambdaRow key={lambda!.name! + lambda!.region} lambda={lambda} />)}
          </TableBody>
        )}
      </Table>
      {filteredLambdas.length === 0 && (
      <NothingFoundContainer>
        <Typography variant="h5">
            No Lambdas Found
        </Typography>
      </NothingFoundContainer>
      )}
    </>
  )
}
