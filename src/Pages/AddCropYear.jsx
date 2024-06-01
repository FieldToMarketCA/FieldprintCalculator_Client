import Page from "../Components/Page";
import Stepper from "../Components/Stepper";

// CROP YEAR FORMS
import RotationForm from "../Components/CropYearForms/RotationForm";
import FieldOperationsForm from "../Components/CropYearForms/FieldOperationsForm";
import HarvestForm from "../Components/CropYearForms/HarvestForm";
import ReviewForm from "../Components/CropYearForms/ReviewForm";
import { useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useAuth } from "../Components/Auth/useAuth";
import { GetSetFarm, GetSetField } from "../Components/axiosFetchers";
import { FarmContext, FieldContext } from "../App";

const steps = [
  { label: "Rotation", formComponent: RotationForm },
  { label: "Field Operations", formComponent: FieldOperationsForm },
  { label: "Harvest", formComponent: HarvestForm },
];

export default function AddCropYear({}) {
  const farmContext = useContext(FarmContext);
  const fieldContext = useContext(FieldContext);
  const { farmId, fieldId } = useParams();
  const { user } = useAuth();

  document.title = "Add Crop Year Page - Field To Market Canada";

  useEffect(() => {
    GetSetFarm(farmId, user, farmContext);
    GetSetField(farmId, fieldId, user, fieldContext);
  }, [farmId, fieldId]);
  return (
    <Page
      showQuickFacts={true}
      title={"New Crop Year"}
      headerBorderColor={"border-[#34a853]"}
      padding="p-[0px]"
    >
      <div className="h-full w-full ">
        {/* <QuickFacts sectionColor={"#34a853"} /> */}

        <Stepper steps={steps} />
      </div>
    </Page>
  );
}
