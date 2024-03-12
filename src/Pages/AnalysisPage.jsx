import React, { PureComponent } from "react";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Page from "../Components/Page";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import SwitchQuestion from "../Components/FormInputElements/SwitchQuestion";
import OutlinedButton from "../Components/Buttons/OutlinedButton";

export default function AnalysisPage({}) {
  return (
    <Page title={"New Field"} headerBorderColor={"border-[#34a853]"}>
      <div>
        <div className="w-full flex flex-col min-[1100px]:flex-row ">
          <div className="text-[#666666] mr-10 max-w-[600px]">
            <h2 className="text-[24px] text-[rgba(0,0,0,0.87)] mb-4">
              Fieldprint Spidergram
            </h2>
            <p className="mb-4">
              Fieldprint results are shown on the spidergram as relative indices
              on a scale of 1-100 that represent your metric scores. The indices
              are calculated so that smaller values indicate less resource use
              or environmental impact from your field. This illustration can be
              used to identify where the greatest opportunities for improvement
              are for your field, and over time can be used to evaluate progress
              and trade-offs between different sustainability metrics for your
              field.
            </p>

            <div
              style={{
                height: "600px",
                width: "600px",
                padding: "2rem",
              }}
            >
              <Example />
            </div>
            <p className="-mt-[200px]">
              Benchmarks represent an average based on USDA statistical data for
              the period 2008-2012 and provide context for how your scores
              relate to this known point. Benchmarks should not be interpreted
              as a specific level of sustainability, or a performance target.
              State and National benchmarks that are not shown in the table or
              on the spidergram are not available for the applicable metric.
            </p>
          </div>
          <div className="text-[#666666] max-w-[384px]  py-6 min-[1100px]:pt-0 ">
            <h2 className="text-[24px] text-[rgba(0,0,0,0.87)] mb-4">
              Select Active Year for Data
            </h2>
            <FormSelectField
              fieldLabel={"Active Year"}
              valuesArray={[{ value: 0, label: "Wheat - 2021" }]}
              helperText={"Active Crop Year Analysis"}
              modalOff={true}
            />
            <h2 className="text-[24px] text-[rgba(0,0,0,0.87)] mb-4">
              Display Benchmarks
            </h2>
            <SwitchQuestion questionText={"Province Benchmarks"} />
            <SwitchQuestion questionText={"National Benchmarks"} />
            <p className="mt-6 mb-6">
              Use the buttons indicated to plot the state and national
              benchmarks relevant for this Fieldprint.
            </p>
            <OutlinedButton
              text={"Fieldprint Report (PDF)"}
              onClick={console.log}
            />
          </div>
        </div>
        <div className="w-full py-8 text-[#666666]">
          <h2 className="text-[24px] text-[rgba(0,0,0,0.87)] mb-4">
            Fieldprint Data per Indicator
          </h2>
        </div>
      </div>
    </Page>
  );
}

// CHART
const data = [
  {
    subject: "Land Use Efficiency",
    A: 50,
    fullMark: 100,
  },
  {
    subject: "Energy Use",
    A: 98,
    fullMark: 100,
  },
  {
    subject: "GHG Emissions",
    A: 86,
    fullMark: 100,
  },
  {
    subject: "Soil Erosion Risk",
    A: 99,
    fullMark: 100,
  },
];

class Example extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-radar-chart-rjoc6";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="55%" cy="30%" outerRadius="48%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Mike"
            dataKey="A"
            stroke="#008CC3"
            fill="#00A4E5"
            fillOpacity={0.6}
            activeDot={{ r: 6 }}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
