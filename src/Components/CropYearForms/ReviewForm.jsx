import { Divider } from "@mui/material";
import MainButton from "../Buttons/MainButton";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { FarmContext, FieldContext, CropYearContext } from "../../App";

export default function ReviewForm() {
  const navigate = useNavigate();

  const farmContext = useContext(FarmContext);
  const fieldContext = useContext(FieldContext);
  const cropYearContext = useContext(CropYearContext);

  function handleGenerateAnalysis() {
    // console.log("farmContext: ", farmContext.state);
    // console.log("fieldContext: ", fieldContext.state);
    // console.log("cropYearContext: ", cropYearContext.state);
    navigate("/analysis");
  }
  return (
    <div className="w-full  text-[rgb(102,102,102)] h-full">
      <div>
        <h3 className="text-[30px]">Review and Calculate</h3>
        <Divider sx={{ marginBottom: 3 }} />

        <div>
          <p className="font-bold">1. Confirm Data Status</p>
          <p className="max-w-[700px]">
            By default, crop year data status is marked as provisional. When
            your data is complete and finalized for the year, and you have
            reviewed the data for accuracy, mark the data as finalized. This is
            important as only finalized data is included in Project and Field to
            Market Program analysis and reporting.
          </p>
          <div className="pl-[40px] pb-[24px] mt-4">
            <p className="text-[18px]">Current Data Status: Final</p>
            <MainButton
              disabled={true}
              text={"Click To Make Your Data Provisional"}
              onClick={console.log}
            />
          </div>
        </div>
        <div>
          <p className="font-bold">2. Calculate Fieldprint Analysis</p>
          <p className="max-w-[700px]">
            Now that your data is complete, you can generate your Fieldprint
            Analysi-s. You can return at any time to edit the crop year data or
            change the data status.
          </p>
          <div className="pl-[40px] pb-[24px] mt-4">
            <MainButton
              text={"Generate Your Fieldprint Analysis"}
              onClick={handleGenerateAnalysis}
            />
          </div>
        </div>
      </div>

      <div className="pb-16">
        <h4 className="text-[rgb(102,102,102)] font-extralight text-[36px]">
          Help
        </h4>
        <Divider sx={{ marginBottom: 3 }} />
        <div className="mb-6">
          <p className="font-bold">When should I finalize my data?</p>
          <p className="max-w-[500px]">
            Data should be marked as finalized when the data entered for a crop
            year is final for year and it has been validated or reviewed for
            accuracy. The goal is to improve data quality.
          </p>
        </div>
        <div className="mb-6">
          <p className="font-bold">What happens when I finalize my data?</p>
          <p className="max-w-[500px]">
            Data that is finalized will be included in Field to Market program
            and Project analysis and reporting. Data marked provision is not
            included.
          </p>
        </div>
        <div>
          <p className="font-bold">
            Can I revert my data back to provisional status?
          </p>
          <p className="max-w-[500px]">
            You can set data back to provisional if needed. For example, if you
            realize data inputs need to be changed but the data is not yet
            available, mark the data provisional. Once completed, you can set
            the data back to finalized.
          </p>
        </div>
      </div>
    </div>
  );
}
