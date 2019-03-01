import * as React from 'react'
import { XAxis, YAxis, CartesianGrid, Line, LineChart, ResponsiveContainer } from 'recharts'

import BasicLayout from '../components/basic-layout'
import Card from '../components/card.component'

const data = [
  { a: 4000, x: 1 },
  { a: 3000, x: 2 },
  { a: 2000, x: 3 },
  { a: 2780, x: 4 },
  { a: 1890, x: 5 },
  { a: 2390, x: 6 },
  { a: 3490, x: 7 },
  { a: 5345, x: 8 },
  { a: 3678, x: 9 },
  { a: 2345, x: 10 },
  { a: 4565, x: 11 },
  { x: 12 },
  { x: 13 },
  { x: 14 },
  { x: 15 },
  { x: 16 },
]

export default () => (
  <>
    <BasicLayout>
      <Card>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 40, right: 30, left: 10, bottom: 30 }}
          >
            <XAxis dataKey="x" stroke="#B9FFEC" />
            <YAxis stroke="#B9FFEC" />
            <CartesianGrid stroke="#B9FFEC" strokeOpacity={0.75} />
            <Line type="linear" dataKey="a" stroke="#FFFFFF" />
          </LineChart>

        </ResponsiveContainer>
      </Card>
    </BasicLayout>
  </>
)
