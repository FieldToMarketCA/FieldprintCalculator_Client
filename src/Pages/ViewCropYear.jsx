import Page from "../Components/Page";
import MainButton from "../Components/Buttons/MainButton";
import FormTextField from "../Components/FormInputElements/FormTextField";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import Divider from "@mui/material/Divider";
// import QuickFacts from "../Components/QuickFacts";
import EditStepper from "../Components/EditCropYearForms/EditStepper";

// CROP YEAR FORMS
import EditRotationForm from "../Components/EditCropYearForms/EditRotationForm";
import EditFieldOperationsForm from "../Components/EditCropYearForms/EditFieldOperationsForm";
import EditHarvestForm from "../Components/EditCropYearForms/EditHarvestForm";
import EditReviewForm from "../Components/EditCropYearForms/EditReviewForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { axiosInstance } from "../Components/axiosFetchers";
import { useAuth } from "../Components/Auth/useAuth";
import { FarmContext } from "../App";
import { FieldContext } from "../App";
import { CropYearContext } from "../App";

import { CROPYEAR_CREATOR } from "../Assets/contextFactories_V0";
import { GetSetField, GetSetFarm } from "../Components/axiosFetchers";

const steps = [
  { label: "Rotation", formComponent: EditRotationForm },
  { label: "Field Operations", formComponent: EditFieldOperationsForm },
  { label: "Harvest", formComponent: EditHarvestForm },
];

function Capitalize(str) {
  if (str === null || typeof str != "string") return "";
  if (str.length < 1) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export default function ViewCropYear({}) {
  const { user } = useAuth();
  const fieldContext = useContext(FieldContext);
  const farmContext = useContext(FarmContext);
  const cropyearContext = useContext(CropYearContext);
  let { farmId, fieldId, cropyearId } = useParams();

  document.title = "Crop Year Page - Field To Market Canada";

  useEffect(() => {
    async function getCropYear() {
      // Fetch
      await GetSetFarm(farmId, user, farmContext);
      await GetSetField(farmId, fieldId, user, fieldContext);

      const response = await axiosInstance.get(
        `${process.env.REACT_APP_API_URL}/farms/${farmId}/fields/${fieldId}/cropyears/${cropyearId}`,
        {
          headers: {
            token: "Bearer " + user.token,
            "Content-Type": "application/json",
          },
        }
      );

      cropyearContext.setter({
        _id: { $oid: response.data._id.$oid },
        fieldId: response.data.fieldId,
        crop: response.data.crop,
        fieldOperations: await mergeFieldOperationsWithFactory(
          user,
          farmContext,
          farmId,
          fieldId,
          response.data.fieldOperations
        ),
        harvest: { ...cropyearContext.state.harvest, ...response.data.harvest },
      });
    }
    getCropYear();
  }, []);

  return (
    <Page
      showQuickFacts={true}
      title={`${Capitalize(cropyearContext.state.crop.cropThisYear)} ${
        cropyearContext.state.crop.cropYear
      }`}
      headerBorderColor={"border-[#34a853]"}
      padding="p-[0px]"
    >
      <div className="h-full w-full ">
        {/* <QuickFacts sectionColor={"#34a853"} /> */}

        <EditStepper steps={steps} />
      </div>
    </Page>
  );
}

async function mergeFieldOperationsWithFactory(
  user,
  farmContext,
  farmId,
  fieldId,
  fieldOperationsData
) {
  const MachinesSet = {};

  const mergedFieldOperations = CROPYEAR_CREATOR(fieldId).fieldOperations;

  // cultivations
  if (fieldOperationsData.cultivations !== null) {
    for (var i = 0; i < fieldOperationsData.cultivations.length; i++) {
      const operation = {
        machineObj: "",
        hoursUsed: fieldOperationsData.cultivations[i].hoursUsed,
      };

      if (
        fieldOperationsData.cultivations[i].machineId in MachinesSet ===
        false
      ) {
        const response = await axiosInstance.get(
          `${process.env.REACT_APP_API_URL}/machines/${fieldOperationsData.cultivations[i].machineId}`,
          {
            headers: {
              token: "Bearer " + user.token,
              "Content-Type": "application/json",
            },
          }
        );

        MachinesSet[fieldOperationsData.cultivations[i].machineId] =
          response.data;
        operation.machineObj =
          MachinesSet[fieldOperationsData.cultivations[i].machineId];
      } else {
        operation.machineObj =
          MachinesSet[fieldOperationsData.cultivations[i].machineId];
      }

      mergedFieldOperations.cultivations[i] = operation;
    }
  }
  // fertilizerApplications
  if (fieldOperationsData.fertilizerApplications !== null) {
    let labels = ["preSeed", "withSeed", "postSeed"];

    for (const label of labels) {
      if (label in fieldOperationsData.fertilizerApplications) {
        mergedFieldOperations.fertilizerApplications[label] =
          fieldOperationsData.fertilizerApplications[label];
      }
    }
  }
  // Fertilizer Rates
  mergedFieldOperations.fertilizerRates = fieldOperationsData.fertilizerRates;

  // pesticidesApplications
  if (fieldOperationsData.pesticidesApplications !== null) {
    for (
      var i = 0;
      i < fieldOperationsData.pesticidesApplications.length;
      i++
    ) {
      mergedFieldOperations.pesticidesApplications[i] =
        fieldOperationsData.pesticidesApplications[i];
    }
  }

  return mergedFieldOperations;
}
