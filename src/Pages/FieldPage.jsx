import Page from "../Components/Page";
import ButtonIcon from "../Components/Buttons/ButtonIcon";
import MainButton from "../Components/Buttons/MainButton";
import ManagedAcresTable from "../Components/Tables/ManagedAcresTable";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import tractorSVG from "../Assets/Icons/tractorIcon.svg";
import CropYearTable from "../Components/Tables/CropYearTable.jsx";
import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";

import { useContext, useEffect } from "react";
import { FarmContext } from "../App";
import { FieldContext } from "../App";

import axios from "axios";
import MachinesTable from "../Components/Tables/MachinesTable";

export default function FieldPage() {
  let { farmId, fieldId } = useParams();
  const fieldContext = useContext(FieldContext);
  const farmContext = useContext(FarmContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getField = async () => {
      const fieldResponse = await axios.get(
        process.env.REACT_APP_API_URL +
          "/farms/" +
          farmId +
          "/fields/" +
          fieldId
      );
      const cropyearsResponse = await axios.get(
        process.env.REACT_APP_API_URL +
          "/farms/" +
          farmId +
          "/fields/" +
          fieldId +
          "/cropyears"
      );
      // console.log(cropyearsResponse.data);
      fieldContext.setter({
        ...fieldResponse.data,
        cropYears: cropyearsResponse.data,
      });
    };
    getField();
  }, []);

  return (
    <Page
      title={fieldContext.state.name + " On " + farmContext.state.name}
      showQuickFacts={true}
    >
      <div className="w-full   h-full text-[#666666]">
        <div className="mb-6 flex mb-4 justify-end">
          <MainButton
            disabled
            text={"Edit Field"}
            onClick={() => navigate("/editfield")}
          />
        </div>

        <p className="mb-4">
          Your Fieldprint Analysis is calculated at the Crop Year level (e.g.
          2017 Corn, 2016 Soybeans). Use this page to add Crop Years and then
          click the edit icon () to enter your Fieldprint Data. When Fieldprint
          data entry is complete, you can click the analysis icon () to
          calculate and view your Fieldprint Results. Click the delete icon ()
          to delete a Crop year. Note that deleting a crop year permanently
          deletes all data associated with the crop year and removes any
          associations to Projects. Where double cropping is in use, data
          entered for a Crop Year should be based on the primary cropping
          system. Production from the secondary crop is not included in the
          Fieldprint Analysis at this time.
        </p>
        <div className="w-full flex mb-6">
          <ButtonIcon
            disabled={true}
            text={"Add New Crop Year"}
            onClick={console.log}
            grow={true}
            Icon={AddCircleOutlineIcon}
          />
        </div>

        <CropYearTable cropYears={fieldContext.state.cropYears} />
      </div>
    </Page>
  );
}
