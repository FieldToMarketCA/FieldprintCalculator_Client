import { useState } from "react";
import soilErosionRiskIcon from "../../Assets/Icons/soilErosionRiskIcon.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import BarChart from "../Charts/BarChart";

export default function IndicatorSoilErosion({
  crop,
  year,
  fieldScore,
  provincialScore,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const InvidividualResultTable = () => {
    return (
      <div className="w-full flex mt-4">
        <div className="w-[246px] min-w-[246px] max-h-[114px] border-[rgb(221,221,221)]  border-[1px] flex flex-col items-center">
          <div className="text-center w-full bg-[rgb(0,164,229)]">
            <p className="py-[8px] text-[18px] text-white font-medium">
              Soil Erosion Risk
            </p>
          </div>
          <div className="text-[16px]">{`${year} ${crop}`}</div>
          <div className="text-[24px] text-[rgb(0,164,229)] font-light ">
            {fieldScore}
          </div>
          <div className="text-[16px]">Mg / ha / yr</div>
        </div>
        <p className="bg-[rgb(238,238,238)] ml-8 p-3 border-[3px] border-[rgb(0,164,229)]">
          The Soil Erosion Risk metric is a measure of how at risk soil is to
          erosion from tillage, water and wind, and is calculated using RUSLE2
          models and reported to the user as milligrams of soil lost per acre.
          It is an efficiency metric that uses a complex biophysical model to
          simulate crop growth, water flow across the field, and sediment
          runoff. The Soil Conservation metric is expressed as soil erosion and
          is measured as potential milligrams of soil lost (Mg) per unit of land
          area (hectare) per year. Lower numbers are desirable and indicate less
          soil lost from erosion per hectare. A Soil Erosion Fieldprint Score of
          0 would indicate that there is no potential for soil to be lost in
          that year.
        </p>
      </div>
    );
  };

  const ProvincialComparisonTable = () => {
    return (
      <div className="w-full flex mt-8 flex-col md:flex-row ">
        {/* TABLE */}
        <div className="min-w-[400px] h-[126px] max-h-[126px] grid grid-cols-2 gap-0  mr-8 mb-8 md:mb-0">
          <div className="bg-[#FAA43A] content-center border-[1px] border-[rgb(204,204,204)] border-r-0 border-b-0">
            <p className="ml-2 text-[18px] text-white font-medium">Score</p>
          </div>
          <div className="bg-[#FAA43A] content-center  border-[1px] border-[rgb(204,204,204)] border-b-0">
            <p className="ml-2 text-[18px] text-white font-medium">Result</p>
          </div>
          <div className="border-[1px] content-center border-[rgb(204,204,204)] border-r-0 border-b-0">
            <div className="flex ml-2">
              <div className="w-[20px] h-[20px] bg-[rgb(0,164,229)] mr-2"></div>
              <p>Your Score</p>
            </div>
          </div>
          <div className="border-[1px] text-end content-center border-[rgb(204,204,204)] border-b-0">
            <p className="mr-2">{fieldScore}Mg / ha / yr</p>
          </div>
          <div className="border-[1px] content-center border-[rgb(204,204,204)] border-r-0 ">
            <div className="flex ml-2">
              <div className="w-[20px] h-[20px] bg-[rgb(255,125,50)] mr-2"></div>
              <p className="truncate">Province Benchmarks</p>
            </div>
          </div>
          <div className="border-[1px] text-end content-center border-[rgb(204,204,204)] ">
            <p className="mr-2">{provincialScore}Mg / ha / yr</p>
          </div>
        </div>
        {/* SUPPORTING TEXT */}
        <p className="bg-[rgb(238,238,238)] p-3 border-[3px] border-[rgb(255,125,50)]">
          Soil Erosion Risk score in comparison to available benchmarks.
          Benchmarks are an average of provincial statistical data for the
          period 20011-2023, to provide context for your scores. Benchmarks
          should not be interpreted as a specific level of sustainability, or a
          performance target. Provincial benchmarks not shown in the graphs are
          not available for the applicable metric
        </p>
      </div>
    );
  };

  return (
    <div className="w-full px-4 mb-4 rounded border-[rgb(230,230,230)] border-[1px] shadow-md">
      {/* Header  */}
      <div
        className="h-[74px] w-full  flex items-center justify-between cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center">
          <img
            className="h-[50px] w-[50px]"
            src={soilErosionRiskIcon}
            alt="sup "
          />
          <p className="text-[#666666] text-[18px] ml-[12px]">
            Soil Erosion Risk
          </p>
        </div>
        <i>
          {isCollapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
        </i>
      </div>

      {/* BODY */}

      <div
        className={`transition-all duration-500   overflow-hidden leading-6  ${
          isCollapsed ? "h-0 p-0" : " pb-8"
        }`}
      >
        <p>
          The Soil Erosion Risk metric is a measure of how at risk soil is to
          erosion from tillage, water and wind, and is calculated using RUSLE2
          models and reported to the user as milligrams (Mg) of soil lost per
          hectare per year. It is an efficiency metric that uses a complex
          biophysical model to simulate crop growth, water flow across the
          field, and sediment runoff.
        </p>

        {/* INVIDIVUAL RESULT TABLE */}
        <InvidividualResultTable />

        {/* Provincial Comparison Table */}
        <ProvincialComparisonTable />

        {/* CHART */}

        <div className="w-full mt-8 flex justify-center">
          <BarChart
            width={398}
            height={331}
            data={[
              {
                name: "Soil Erosion Risk",
                fieldScore: fieldScore,
                provincialScore: provincialScore,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
