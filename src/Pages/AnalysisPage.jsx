import React, { PureComponent, useState, useContext, useEffect } from "react";
import { Margin, usePDF, Options } from "react-to-pdf";

import HelpModal from "../Components/HelpModal";

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

import PDFIndicatorLandUse from "../Components/Indicators/PDFIndicatorLandUse";
import PDFIndicatorEnergyUse from "../Components/Indicators/PDFIndicatorEnergyUse";
import PDFIndicatorGHG from "../Components/Indicators/PDFIndicatorGHG";
import PDFIndicatorSoilErosion from "../Components/Indicators/PDFIndicatorSoilErosion";

import { useAuth } from "../Components/Auth/useAuth";

import {
  FarmContext,
  FieldContext,
  CropYearContext,
  ReportDataContext,
} from "../App";

export default function AnalysisPage({}) {
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });
  const options = {
    overrides: {
      canvas: {
        onclone: (document) => {
          document.getElementById("elementId").classList.toggle("visible");
        },
      },
    },
  };
  const [analysisError, setAnalysisErrorOpen] = useState(false);

  const handleClose = () => {
    window.location.reload();
  };

  var reportDataConext = useContext(ReportDataContext);

  const farmContext = useContext(FarmContext);
  const fieldContext = useContext(FieldContext);
  const cropYearContext = useContext(CropYearContext);

  if (!reportDataConext.state) {
    reportDataConext = defaultFarmData;
  }

  function handleNaNs() {
    if (reportDataConext.state[1].find((cell) => cell === "#N/A")) {
      setAnalysisErrorOpen(true);
    }
  }

  useEffect(() => {
    handleNaNs();
  }, []);
  const [spidergramData, setSpidergramData] = useState([
    {
      subject: "Land Use Efficiency",
      A:
        Number.parseFloat(reportDataConext.state[1][16]).toFixed(2) <= 200
          ? Number.parseFloat(reportDataConext.state[1][16]).toFixed(2)
          : 200,
      fullMark: 200,
    },
    {
      subject: "Energy Use",
      A:
        Number.parseFloat(reportDataConext.state[1][19]).toFixed(2) <= 200
          ? Number.parseFloat(reportDataConext.state[1][19]).toFixed(2)
          : 200,
      fullMark: 200,
    },
    {
      subject: "GHG Emissions",
      A:
        Number.parseFloat(reportDataConext.state[1][22]).toFixed(2) <= 200
          ? Number.parseFloat(reportDataConext.state[1][22]).toFixed(2)
          : 200,
      fullMark: 200,
    },
    {
      subject: "Soil Erosion Risk",
      A:
        Number.parseFloat(reportDataConext.state[1][25]).toFixed(2) <= 200
          ? Number.parseFloat(reportDataConext.state[1][25]).toFixed(2)
          : 200,
      fullMark: 200,
    },
  ]);

  const PDF_ANALYSIS = () => {
    return (
      <div
        ref={targetRef}
        className="w-[800px] absolute h-[6500px] left-[5500px]"
      >
        <div className="w-full max-w-[950px] pl-8 flex flex-col min-[1100px]:flex-row ">
          <div className="text-[#666666] mr-10">
            <h2 className="text-[24px] text-[rgba(0,0,0,0.87)] mb-4">
              Fieldprint Report
            </h2>
            <p className="mb-4">
              Fieldprint results are shown on the spidergram as relative indices
              on a scale of 1-200 that represent your metric scores as compared
              to the provincial metrics. The indices are calculated so that
              smaller values indicate less resource use or environmental impact
              from your field when compared to the provincial averages. This
              illustration can be used to identify where the greatest
              opportunities for improvement are for your field, and over time
              can be used to evaluate progress and trade-offs between different
              sustainability metrics for your field.
            </p>

            <div className="flex w-full justify-center">
              <div className=" w-[600px] h-[600px]">
                <SpiderChart data={spidergramData} />
              </div>
            </div>
            <p className="-mt-[200px]">
              Benchmarks represent an average based on provincial statistical
              data for the period 2011 - 2023 and provide context for how your
              scores relate to this known point. Benchmarks should not be
              interpreted as a specific level of sustainability, or a
              performance target. Provincial benchmarks not shown in the graphs
              are not available for the applicable metric
            </p>
          </div>
        </div>
        <div className="w-full mt-[400px] px-2 py-8 text-[#666666]">
          <PDFIndicatorLandUse
            isClosed={false}
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={Number.parseFloat(
              reportDataConext.state[1][14]
            ).toFixed(2)}
            provincialScore={Number.parseFloat(
              reportDataConext.state[1][15]
            ).toFixed(2)}
          />
          <PDFIndicatorEnergyUse
            isClosed={false}
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={Number.parseFloat(
              reportDataConext.state[1][17]
            ).toFixed(2)}
            provincialScore={Number.parseFloat(
              reportDataConext.state[1][18]
            ).toFixed(2)}
          />

          <PDFIndicatorGHG
            isClosed={false}
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={Number.parseFloat(
              reportDataConext.state[1][20]
            ).toFixed(2)}
            provincialScore={Number.parseFloat(
              reportDataConext.state[1][21]
            ).toFixed(2)}
          />

          <PDFIndicatorSoilErosion
            isClosed={false}
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={Number.parseFloat(
              reportDataConext.state[1][23]
            ).toFixed(2)}
            provincialScore={Number.parseFloat(
              reportDataConext.state[1][24]
            ).toFixed(2)}
          />
        </div>
      </div>
    );
  };

  const LiveAnalysis = () => {
    return (
      <div className="w-full h-full">
        <div className="w-full max-w-[950px]  flex flex-col min-[1100px]:flex-row ">
          <div className="text-[#666666] mr-10">
            <h2 className="text-[24px] text-[rgba(0,0,0,0.87)] mb-4">
              Fieldprint Spidergram
            </h2>
            <p className="mb-4">
              Fieldprint results are shown on the spidergram as relative indices
              on a scale of 1-200 that represent your metric scores as compared
              to the provincial metrics. The indices are calculated so that
              smaller values indicate less resource use or environmental impact
              from your field when compared to the provincial averages. This
              illustration can be used to identify where the greatest
              opportunities for improvement are for your field, and over time
              can be used to evaluate progress and trade-offs between different
              sustainability metrics for your field.
            </p>

            <div className="flex w-full justify-center">
              <div className="w-[600px] h-[600px]">
                <SpiderChart data={spidergramData} />
              </div>
            </div>
            <p className="-mt-[200px] mb-6">
              Benchmarks represent an average based on provincial statistical
              data for the period 2011 - 2023 and provide context for how your
              scores relate to this known point. Benchmarks should not be
              interpreted as a specific level of sustainability, or a
              performance target. Provincial benchmarks not shown in the graphs
              are not available for the applicable metric
            </p>
            <OutlinedButton text={"Fieldprint Report (PDF)"} onClick={toPDF} />
          </div>
          {/* <div className="text-[#666666] max-w-[384px]  py-6 min-[1100px]:pt-0 ">
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
              Use the buttons indicated to plot the provincial benchmarks
              relevant for this Fieldprint.
            </p>
            <OutlinedButton
              text={"Fieldprint Report (PDF)"}
              onClick={console.log}
            />
          </div> */}
        </div>
        <div className="w-full py-8 text-[#666666]">
          <h2 className="text-[24px] text-[rgba(0,0,0,0.87)] mb-4">
            Fieldprint Data per Indicator
          </h2>

          <IndicatorLandUse
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={Number.parseFloat(
              reportDataConext.state[1][14]
            ).toFixed(2)}
            provincialScore={Number.parseFloat(
              reportDataConext.state[1][15]
            ).toFixed(2)}
          />
          <IndicatorEnergyUse
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={Number.parseFloat(
              reportDataConext.state[1][17]
            ).toFixed(2)}
            provincialScore={Number.parseFloat(
              reportDataConext.state[1][18]
            ).toFixed(2)}
          />

          <IndicatorGHG
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={Number.parseFloat(
              reportDataConext.state[1][20]
            ).toFixed(2)}
            provincialScore={Number.parseFloat(
              reportDataConext.state[1][21]
            ).toFixed(2)}
          />

          <IndicatorSoilErosion
            crop={reportDataConext.state[1][8]}
            year={reportDataConext.state[1][7]}
            fieldScore={Number.parseFloat(
              reportDataConext.state[1][23]
            ).toFixed(2)}
            provincialScore={Number.parseFloat(
              reportDataConext.state[1][24]
            ).toFixed(2)}
          />
        </div>
      </div>
    );
  };

  return (
    <Page
      showQuickFacts={true}
      title={`${fieldContext.state.name || "field"} on ${
        farmContext.state.name || "Demo Farm"
      }`}
      headerBorderColor={"border-[#34a853]"}
    >
      <div className="h-full w-full ">
        <LiveAnalysis />
        <div className="relative overflow-hidden h-[0.5px] w-full">
          <PDF_ANALYSIS />
        </div>
      </div>
      <HelpModal
        title={"Error"}
        description={"We ran into problems while processing your analyis."}
        open={analysisError}
        handleClose={handleClose}
      />
    </Page>
  );
}

class SpiderChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/simple-radar-chart-rjoc6";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="40%" cy="30%" outerRadius="48%" data={this.props.data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis />
          <Radar
            name="Field Score"
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

const defaultFarmData = {
  state: [
    [
      "Unique ID",
      "Ecodistrict",
      "Province",
      "Soil Type",
      "Soil Texture",
      "Surface Form",
      "Slope",
      "Year",
      "Crop",
      "Total Nitrogen (kg/ha)",
      "Total Phosphorus (kg/ha)",
      "Total Potassium (kg/ha)",
      "Total Sulfur (kg/ha)",
      "Total Other Fertilizer (kg/ha)",
      "Land Use Efficiency (ha/tonne)",
      "Provincial Land Use Efficiency (ha/tonne)",
      "Land Use Efficiency Index",
      "Energy Use GJ/tonne",
      "Provincial Energy Use (GJ/tonne)",
      "Energy Use Index",
      "GHG Emissions (tCO2/tonne)",
      "Provincial GHG Emissions (tCO2/tonne)",
      "Climate Impact Index",
      "Soil Erosion Risk Mg/ha/yr",
      "Provincial Soil Erosion Risk Mg/ha/yr",
      "Soil Erosion Index",
      "Provincial Soil Loss",
      "Provincial Yield (t/ha)",
      "Provincial Land Use",
      "Provincial Energy Use GJ/tonne crop",
      "Provincial Climate Impact",
      "Provincial Fieldwork Climate Impact (tCO2E/tcrop)",
      "Provincial NonFieldwork Climate Impact (tCO2E/tcrop)",
      "Provincial N-Fertilizer (tCO2e/tcrop)",
      "Provincial Crop Residue (tCO2e/tcrop)",
      "Provincial Leaching (tCO2e/tcrop)",
      "Provincial Volatilization (tCO2e/tcrop)",
      "Total GHG emissions (tCO2e/tcrop)",
      "Column1",
    ],
    [
      "12511:Home east:2021:Winter Wheat",
      558,
      "ON",
      "Brown",
      "Clay Loam",
      "R",
      "C",
      2021,
      "Winter Wheat",
      140.106394524308,
      0,
      0,
      20.1753208115003,
      0,
      0.135033185080399,
      0.163612565445026,
      82.5322827211401,
      2.31784784075219,
      2.38977850294503,
      96.9900699121618,
      1.07131442883849,
      0.409483497873037,
      261.625788194928,
      325.96,
      16.34995549,
      1993.64457107767,
      16.34995549,
      6.112,
      0.163612565445026,
      2.38977850294503,
      0.409483497873037,
      0.0273082383835079,
      0.109084426537958,
      0.158620269960733,
      0.0626546243455497,
      0.0331967200589005,
      0.0115183540575916,
      0.402382633344241,
      "",
    ],
  ],
};
