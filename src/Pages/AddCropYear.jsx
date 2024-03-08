import Page from "../Components/Page/Page";
import MainButton from "../Components/Buttons/MainButton";
import FormTextField from "../Components/FormInputElements/FormTextField";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import Divider from "@mui/material/Divider";
import QuickFacts from "../Components/QuickFacts";

export default function AddCropYear({}) {
  return (
    <Page
      title={"New Crop Year"}
      headerBorderColor={"border-[#34a853]"}
      padding="p-[0px]"
    >
      <div className="h-full w-full">
        <QuickFacts sectionColor={"#34a853"} />

        <div className="h-full w-full">h</div>
      </div>
    </Page>
  );
}
