import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default class Chart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-bar-chart-tpz8r";

  render() {
    return (
      <ResponsiveContainer width={this.props.width} height={this.props.height}>
        <BarChart
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            name="Field Score"
            dataKey="fieldScore"
            fill="rgb(0,164,229)"
            activeBar={<Rectangle stroke="rgb(42 195 255)" strokeWidth={3} />}
          />
          <Bar
            name="Provincial Score"
            dataKey="provincialScore"
            fill="rgb(250,164,58)"
            activeBar={<Rectangle stroke="rgb(255,125,50)" strokeWidth={3} />}
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
