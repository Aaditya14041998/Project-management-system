import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DeptBarChart = ({data}) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        key={new Date().getTime()}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dept" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar displayName="Total" dataKey="totalProjects" fill="#005aa8" />
        <Bar displayName="Closed" dataKey="closedProjects" fill="#5aa546" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DeptBarChart;
