// Write your code here

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import {ChartContainer, ChartTitle} from './styledComponents'

const VaccinationByAge = props => {
  const {data} = props

  return (
    <ChartContainer>
      <ChartTitle>Vaccination by age</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 60,
          }}
        >
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            startAngle={0}
            endAngle={360}
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="18-44" fill="#2d87bb" />
            <Cell name="45-60" fill="#a3df9f" />
            <Cell name="Above 60" fill="#64c2a6" />
          </Pie>
          <Legend iconType="circle" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default VaccinationByAge
