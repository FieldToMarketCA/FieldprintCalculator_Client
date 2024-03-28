import { useState } from "react";
import GHG_Icon from "../../Assets/Icons/GHG_Icon.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import BarChart from "../Charts/BarChart";

export default function IndicatorGHG({
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
              Greenhouse Gas
            </p>
          </div>
          <div className="text-[16px]">{`${year} ${crop}`}</div>
          <div className="text-[24px] text-[rgb(0,164,229)] font-light ">
            {fieldScore}
          </div>
          <div className="text-[16px]">tCO2 / tonne</div>
        </div>
        <p className="bg-[rgb(238,238,238)] ml-8 p-3 border-[3px] border-[rgb(0,164,229)]">
          Greenhouse gas emissions are reported in the Fieldprint® Platform as
          pounds of carbon dioxide equivalent (CO2e) per crop unit produced
          (e.g. bushels or pounds). “CO2e” simply means the N2O and CH4
          emissions are converted to the equivalent amount of CO2, to provide a
          common unit of all emissions in one measure, which is comparable over
          time and influenced by all the actions a farmer takes. The Fieldprint®
          Platform uses standard U.S. government assumptions regarding fuel use,
          such as the 22.3 pounds of CO2e that are emitted per gallon of diesel
          combusted. Emissions also result from electricity and fuel usage as
          well as from burning crop residues. <b>Low scores are desirable </b>
          and indicate less greenhouse gas emitted per unit of crop produced.
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
            <p className="mr-2">{fieldScore} tCO2 / tonne</p>
          </div>
          <div className="border-[1px] content-center border-[rgb(204,204,204)] border-r-0 ">
            <div className="flex ml-2">
              <div className="w-[20px] h-[20px] bg-[rgb(255,125,50)] mr-2"></div>
              <p className="truncate">National Benchmarks</p>
            </div>
          </div>
          <div className="border-[1px] text-end content-center border-[rgb(204,204,204)] ">
            <p className="mr-2">{provincialScore} tCO2 / tonne</p>
          </div>
        </div>
        {/* SUPPORTING TEXT */}
        <p className="bg-[rgb(238,238,238)] p-3 border-[3px] border-[rgb(255,125,50)]">
          Greenhouse Gas score in comparison to available benchmarks. Benchmarks
          are an average of USDA statistical data for the period 2008-2012, to
          provide context for your scores. Benchmarks should not be interpreted
          as a specific level of sustainability, or a performance target. State
          and National benchmarks that are not shown in the table or on the
          spidergram are not available for the applicable metric.
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
          <img className="h-[50px] w-[50px]" src={GHG_Icon} alt="sup " />
          <p className="text-[#666666] text-[18px] ml-[12px]">Greenhouse Gas</p>
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
          The Greenhouse Gas (GHG) Emissions metric calculates the total
          emissions from four main sources – energy use, nitrous oxide emissions
          from soils, methane emissions (rice only) and emissions from residue
          burning. It is an efficiency metric calculated using a series of
          complex algorithms to determine the total GHG emissions per unit of
          crop production.
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
                name: "Greenhouse Gas",
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
