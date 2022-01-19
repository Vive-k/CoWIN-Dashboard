// Write your code here

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

import {ChartContainer, ChartTitle} from './styledComponents'

const VaccinationByGender = props => {
  const {data} = props

  return (
    <ChartContainer>
      <ChartTitle>Vaccination by gender </ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 40,
          }}
        >
          <Pie
            cx="50%"
            cy="50%"
            data={data}
            startAngle={180}
            endAngle={0}
            innerRadius="40%"
            outerRadius="70%"
            dataKey="count"
          >
            <Cell name="Male" fill="#f54394" />
            <Cell name="Female" fill="#5a8dee" />
            <Cell name="Male" fill="#2cc6c6" />
          </Pie>
          <Legend iconType="circle" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

export default VaccinationByGender
