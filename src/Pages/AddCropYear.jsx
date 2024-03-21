import Page from "../Components/Page";
import MainButton from "../Components/Buttons/MainButton";
import FormTextField from "../Components/FormInputElements/FormTextField";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import Divider from "@mui/material/Divider";
import QuickFacts from "../Components/QuickFacts";
import Stepper from "../Components/Stepper";

// CROP YEAR FORMS
import RotationForm from "../Components/CropYearForms/RotationForm";
import FieldOperationsForm from "../Components/CropYearForms/FieldOperationsForm";
import HarvestForm from "../Components/CropYearForms/HarvestForm";
import ReviewForm from "../Components/CropYearForms/ReviewForm";

const steps = [
  { label: "Rotation", formComponent: RotationForm },
  { label: "Field Operations", formComponent: FieldOperationsForm },
  { label: "Harvest", formComponent: HarvestForm },
  // { label: "Review", formComponent: ReviewForm },
];

export default function AddCropYear({}) {
  return (
    <Page
      title={"New Crop Year"}
      headerBorderColor={"border-[#34a853]"}
      padding="p-[0px]"
    >
      <div className="h-full w-full ">
        <QuickFacts sectionColor={"#34a853"} />

        {/* <div className="h-full w-full">h</div> */}
        <Stepper steps={steps} />
      </div>
    </Page>
  );
}
