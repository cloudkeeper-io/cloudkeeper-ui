import React, { useEffect, useState } from 'react'
import { orderBy, filter, slice } from 'lodash'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroller'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableBody from '@material-ui/core/TableBody'

import { Typography } from '@material-ui/core'
import { SortableTableHeadCell } from '../../../components/sortable-table-head-cell'
import {
  dynamoTablesList_dynamoTablesList as DynamoTablesListItem,
} from '../../../graphql/queries/types/dynamoTablesList'
import { DynamoTableRow } from './dynamo-table-row.component'

interface DynamoTablesListProps {
  tables: DynamoTablesListItem[]
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

export const DynamoTablesList = ({ tables, filterInput }: DynamoTablesListProps) => {
  const [{ orderProperty, order }, setSorting] = useState<OrderState>({ orderProperty: 'consumedRead', order: 'desc' })
  const [visibleElements, setVisibleElements] = useState(20)

  useEffect(() => {
    setVisibleElements(20)
  }, [tables, filterInput, orderProperty, order])

  const orderedTables = orderBy(tables, orderProperty, order)
  const filteredTables = filterInput ?
    filter(orderedTables, (table) => table.name!.includes(filterInput!))
    : orderedTables

  const visibleTables = slice(filteredTables, 0, visibleElements)

  const changeOrder = (property: string) => {
    const isDesc = orderProperty === property && order === 'desc'
    setSorting({ orderProperty: property, order: isDesc ? 'asc' : 'desc' })
  }

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={() => setTimeout(() => setVisibleElements(visibleElements + 20))}
      hasMore={visibleElements < filteredTables.length}
      useWindow={false}
    >
      <Table>
        <TableHead>
          <TableRow>
            <SortableTableHeadCell
              label="Table Name"
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
              label="Billing Mode"
              propertyName="billingMode"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
            <SortableTableHeadCell
              label="Data Size"
              propertyName="sizeBytes"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
            <SortableTableHeadCell
              label="Consumed Reads"
              propertyName="consumedRead"
              orderBy={orderProperty}
              order={order}
              changeOrder={changeOrder}
            />
            <SortableTableHeadCell
              label="Consumed Writes"
              propertyName="consumedWrite"
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
        {visibleTables.length > 0 && (
          <TableBody>
            {visibleTables.map((table) => <DynamoTableRow key={table!.name! + table!.region} table={table} />)}
          </TableBody>
        )}
      </Table>
      {visibleTables.length === 0 && (
        <NothingFoundContainer>
          <Typography variant="h5">
            No Tables Found
          </Typography>
        </NothingFoundContainer>
      )}
    </InfiniteScroll>
  )
}
