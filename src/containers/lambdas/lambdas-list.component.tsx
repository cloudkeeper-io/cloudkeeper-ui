import React from 'react'
import 'primereact/resources/primereact.min.css'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Card } from '@material-ui/core'
import styled from 'styled-components'

const StyledCard = styled(Card)`
  border-radius: 10px;
  padding: 40px;
`

export const LambdasList = ({ lambdas }: any) => {
    return (
        <StyledCard>
            <DataTable value={lambdas} responsive={true}>
                <Column field="name" header="Lambda Name" />
                <Column field="region" header="Region" />
                <Column field="stackName" header="Brand" />
                <Column field="invocations" header="Invocations" />
                <Column field="errors" header="Errors" />
                <Column field="errorRate" header="Error %" />
                <Column field="avgExecutionTime" header="Avg. execution time" />
                <Column field="cost" header="Cost" />
            </DataTable>
        </StyledCard>
    );
}
