import { useState } from "react";
import energyUseIcon from "../../Assets/Icons/energyUseIcon.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function IndicatorEnergyuse({ indicatorName, data }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const InvidividualResultTable = () => {
    return (
      <div className="w-full flex mt-4">
        <div className="w-[246px] min-w-[246px] max-h-[114px] border-[rgb(221,221,221)]  border-[1px] flex flex-col items-center">
          <div className="text-center w-full bg-[rgb(0,164,229)]">
            <p className="py-[8px] text-[18px] text-white font-medium">
              Energy Use
            </p>
          </div>
          <div className="text-[16px]">YYYY *Crop*</div>
          <div className="text-[24px] text-[rgb(0,164,229)] font-light ">
            0.0
          </div>
          <div className="text-[16px]">measure / Unit</div>
        </div>
        <p className="bg-[rgb(238,238,238)] ml-8 p-3 border-[3px] border-[rgb(0,164,229)]">
          The Energy Use metric includes direct energy used for operating
          equipment, pumping irrigation water, grain drying and transport as
          well as embedded energy, which is required to produce crop inputs like
          seeds, fertilizers and crop protectants. Energy use is expressed as
          British thermal units (BTU) per unit of crop production (i.e., bushel,
          pound or hundred weight). It takes one BTU to raise the temperature of
          one pound of water by 1°F. One gallon of diesel produces 137,452 BTU.
          Lower numbers are desirable and indicate less energy used to produce a
          unit of crop.
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
            <p className="mr-2">{"NAN"} btu / bushel</p>
          </div>
          <div className="border-[1px] content-center border-[rgb(204,204,204)] border-r-0 ">
            <div className="flex ml-2">
              <div className="w-[20px] h-[20px] bg-[rgb(255,125,50)] mr-2"></div>
              <p className="truncate">National Benchmarks</p>
            </div>
          </div>
          <div className="border-[1px] text-end content-center border-[rgb(204,204,204)] ">
            <p className="mr-2">{"NAN"} btu / bushel</p>
          </div>
        </div>
        {/* SUPPORTING TEXT */}
        <p className="bg-[rgb(238,238,238)] p-3 border-[3px] border-[rgb(255,125,50)]">
          Energy Use score in comparison to available benchmarks. Benchmarks are
          an average of USDA statistical data for the period 2008-2012, to
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
          <img className="h-[50px] w-[50px]" src={energyUseIcon} alt="sup " />
          <p className="text-[#666666] text-[18px] ml-[12px]">Energy Use </p>
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
          The Energy Use Metric calculates all energy used in the production of
          the crop in one year from pre-planting activities through to the first
          point of sale. It is an efficiency metric, calculated using a series
          of algorithms and designed to provide feedback on the energy used per
          unit of crop production.
        </p>

        {/* INVIDIVUAL RESULT TABLE */}
        <InvidividualResultTable />

        {/* Provincial Comparison Table */}
        <ProvincialComparisonTable />

        {/* CHART */}

        <div>Chart</div>
      </div>
    </div>
  );
}
