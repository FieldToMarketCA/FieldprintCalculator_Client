// import "./styles.css";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

let rows = [
  [1981, 1.23, 1.34, 1.34, 1.63],
  [1986, 1.08, 1.17, 1.17, 1.52],
  [1991, 1.11, 1.18, 1.18, 1.44],
  [1996, 1.05, 1.06, 1.18, 1.11],
  [2001, 1.05, 1.0, 1.0, 1.0],
  [2006, 0.83, 0.84, 0.85, 0.74],
  [2011, 0.73, 0.73, 0.76, 0.6],
  [2016, 0.7, 0.7, 0.71, 0.59],
  [2021, 0.69, 0.69, 0.67, 0.57],
];

let LineChartData = [];

for (const row of rows) {
  let tmp = {};
  tmp["name"] = row[0];
  tmp["Land Use Efficiency"] = row[1];
  tmp["Energy Use"] = row[2];
  tmp["Climate Impact"] = row[3];
  tmp["Soil Erosion Risk"] = row[4];

  LineChartData.push(tmp);
}

export default function myLineChart() {
  return (
    <LineChart width={800} height={500} data={LineChartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Land Use Efficiency" stroke="#00B051" />
      <Line type="monotone" dataKey="Energy Use" stroke="#ED7D30" />
      <Line type="monotone" dataKey="Climate Impact" stroke="#C00001" />
      <Line type="monotone" dataKey="Soil Erosion Risk" stroke="#2E75B6" />
    </LineChart>
  );
}
