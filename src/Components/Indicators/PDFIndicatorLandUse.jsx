import { useState } from "react";
import landUseIcon from "../../Assets/Icons/landUseIcon.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import BarChart from "../Charts/BarChart";

export default function PDFIndicatorLandUse({
  crop,
  year,
  fieldScore,
  provincialScore,
  isClosed = true,
}) {
  const [isCollapsed, setIsCollapsed] = useState(isClosed);

  const InvidividualResultTable = () => {
    return (
      <div className="w-full flex flex-col items-center mt-4">
        <div className="w-[246px] mb-8 md:mb-0 min-w-[246px] h-[120px]  border-[rgb(221,221,221)]  border-[1px] flex flex-col items-center">
          <div className="text-center w-full bg-[rgb(0,164,229)]">
            <p className="py-[8px] text-[18px] text-white font-medium">
              Land Use
            </p>
          </div>
          <div className="text-[16px]">{`${year} ${crop}`}</div>
          <div className="text-[24px] text-[rgb(0,164,229)] font-light ">
            {fieldScore}
          </div>
          <div className="text-[16px]">ha / tonne</div>
        </div>
        <p className="bg-[rgb(238,238,238)] mt-8 p-3 border-[3px] border-[rgb(0,164,229)]">
          Land use efficiency is a measure of the amount of land (hectares) used
          to produce a unit of crop (bushels, pounds, etc.) This is an inverse
          of yield measures, which are expressed as hectares of land per tonne
          of crop produced. Lower scores are desirable and indicate greater land
          use efficiency.
        </p>
      </div>
    );
  };

  const ProvincialComparisonTable = () => {
    return (
      <div className="w-full flex mt-8 flex-col items-center ">
        {/* TABLE */}
        <div className=" w-[300px] md:w-[400px] md:min-w-[400px] h-[126px] grid grid-cols-2 gap-0   mb-8 ">
          <div className="bg-[#FAA43A] content-center border-[1px] border-[rgb(204,204,204)] border-r-0 border-b-0">
            <p className="ml-2 text-[18px] text-white font-medium">Score</p>
          </div>
          <div className="bg-[#FAA43A] content-center  border-[1px] border-[rgb(204,204,204)] border-b-0">
            <p className="ml-2 text-[18px] text-white font-medium">Result</p>
          </div>
          <div className="border-[1px] content-center border-[rgb(204,204,204)] border-r-0 border-b-0">
            <div className="flex  items-center ml-2">
              <div className="w-[20px] h-[20px] bg-[rgb(0,164,229)] mr-2"></div>
              <p>Your Score</p>
            </div>
          </div>
          <div className="border-[1px] text-end content-center border-[rgb(204,204,204)] border-b-0">
            <p className="mr-2">{fieldScore} ha / tonne</p>
          </div>
          <div className="border-[1px] content-center border-[rgb(204,204,204)] border-r-0 ">
            <div className="flex  items-center ml-2">
              <div className="w-[20px] h-[20px] bg-[rgb(255,125,50)] mr-2"></div>
              <p className="">Province Benchmarks</p>
            </div>
          </div>
          <div className="border-[1px] text-end content-center border-[rgb(204,204,204)] ">
            <p className="mr-2">{provincialScore} ha / tonne</p>
          </div>
        </div>
        {/* SUPPORTING TEXT */}
        <p className="bg-[rgb(238,238,238)] p-3 border-[3px] border-[rgb(255,125,50)]">
          Land use efficiency is a measure of the amount of land (hectares) used
          to produce a unit of crop (bushels, pounds, etc.) This is an inverse
          of yield measures, which are expressed as hectares of land per tonne
          of crop produced. Lower scores are desirable and indicate greater land
          use efficiency.
        </p>
      </div>
    );
  };

  return (
    <div className="w-full px-4  mb-4  rounded ">
      {/* Header  */}
      <div
        className="h-[74px] w-full  flex items-center justify-between cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center">
          <img className="h-[50px] w-[50px]" src={landUseIcon} alt="sup " />
          <p className="text-[#666666] text-[18px] ml-[12px]">Land Use </p>
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
          The Land Use metric is an efficiency metric that uses a simple
          equation to account for the planted area used to produce a crop. Land
          Use is calculated as the simple inverse of user-supplied crop yield.
          Outcomes are in units of planted land area per unit of production. A
          lower number indicates greater efficiency.
        </p>
        {/* INVIDIVUAL RESULT TABLE */}
        <InvidividualResultTable />
        {/* Provincial Comparison Table */}
        <ProvincialComparisonTable />
        {/* CHART */}

        <div className="w-full mt-10 flex justify-center">
          <BarChart
            width={350}
            height={300}
            data={[
              {
                name: "Land Use",
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
