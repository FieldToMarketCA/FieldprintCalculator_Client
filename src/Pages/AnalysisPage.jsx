import React, { PureComponent, useState, useContext } from "react";

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

import IndicatorLandUse from "../Components/Indicators/IndicatorLandUse";
import IndicatorEnergyUse from "../Components/Indicators/IndicatorEnergyUse";
import IndicatorGHG from "../Components/Indicators/IndicatorGHG";
import IndicatorSoilErosion from "../Components/Indicators/IndicatorSoilErosion";

import { ReportDataContext } from "../App";

export default function AnalysisPage({}) {
  const reportDataConext = useContext(ReportDataContext);

  const [spidergramData, setSpidergramData] = useState([
    {
      subject: "Land Use Efficiency",
      A:
        reportDataConext.state[1][16] <= 200
          ? reportDataConext.state[1][16]
          : 200,
      fullMark: 200,
    },
    {
      subject: "Energy Use",
      A:
        reportDataConext.state[1][19] <= 200
          ? reportDataConext.state[1][19]
          : 200,
      fullMark: 200,
    },
    {
      subject: "GHG Emissions",
      A:
        reportDataConext.state[1][22] <= 200
          ? reportDataConext.state[1][22]
          : 200,
      fullMark: 200,
    },
    {
      subject: "Soil Erosion Risk",
      A:
        reportDataConext.state[1][25] <= 200
          ? reportDataConext.state[1][25]
          : 200,
      fullMark: 200,
    },
  ]);

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
              <SpiderChart data={spidergramData} />
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
              isDisabled={true}
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

          <IndicatorLandUse
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={reportDataConext.state[1][14]}
            provincialScore={reportDataConext.state[1][15]}
          />
          <IndicatorEnergyUse
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={reportDataConext.state[1][18]}
            provincialScore={reportDataConext.state[1][19]}
          />

          <IndicatorGHG
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={reportDataConext.state[1][20]}
            provincialScore={reportDataConext.state[1][21]}
          />

          <IndicatorSoilErosion
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={reportDataConext.state[1][23]}
            provincialScore={reportDataConext.state[1][24]}
          />
        </div>
      </div>
    </Page>
  );
}

// CHART

// const data = [
//   {
//     subject: "Land Use Efficiency",
//     A: myObj.LandUseEfficiencyIndex,
//     fullMark: 200,
//   },
//   {
//     subject: "Energy Use",
//     A: myObj.EnergyUseIndex,
//     fullMark: 200,
//   },
//   {
//     subject: "GHG Emissions",
//     A: myObj.ClimateImpactIndex,
//     fullMark: 200,
//   },
//   {
//     subject: "Soil Erosion Risk",
//     A: myObj.SoilErosionIndex,
//     fullMark: 200,
//   },
// ];

class SpiderChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-radar-chart-rjoc6";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="55%" cy="30%" outerRadius="48%" data={this.props.data}>
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

const myObj = {
  UniqueID: 0,
  Ecodistrict: "#N/A",
  Province: "#N/A",
  SoilType: "#N/A",
  SoilTexture: "#N/A",
  SurfaceForm: "#N/A",
  Slope: "#N/A",
  Year: "#N/A",
  Crop: "#N/A",
  TotalNitrogen: "#N/A",
  TotalPhosphorus: "#N/A",
  TotalPotassium: "#N/A",
  TotalSulfur: "#N/A",
  TotalOtherFertilizer: "#N/A",
  LandUseEfficiency: "#N/A",
  ProvincialLandUseEfficiency: "#N/A",
  LandUseEfficiencyIndex: "#N/A",
  EnergyUseGJ: "#N/A",
  ProvincialEnergyUse: "#N/A",
  EnergyUseIndex: "#N/A",
  GHGEmissions: "#N/A",
  ProvincialGHGEmissions: "#N/A",
  ClimateImpactIndex: "#N/A",
  SoilErosionRisk: 0,
  ProvincialSoilErosionRisk: "#N/A",
  SoilErosionIndex: "#N/A",
  ProvincialSoilLoss: "#N/A",
  ProvincialYield: "#N/A",
  ProvincialLandUse: "#N/A",
  ProvincialEnergyUseCrop: "#N/A",
  ProvincialClimateImpact: "#N/A",
  ProvincialFieldworkClimateImpact: "#N/A",
  ProvincialNonFieldworkClimateImpact: "#N/A",
  ProvincialNFertilizer: "#N/A",
  ProvincialCropResidue: "#N/A",
  ProvincialLeaching: "#N/A",
  ProvincialVolatilization: "#N/A",
  TotalGHGemissions: 0,
  Column1: "",
};
