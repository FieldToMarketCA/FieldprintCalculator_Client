import Page from "../Components/Page";
import FormTextField from "../Components/FormInputElements/FormTextField";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import MainButton from "../Components/Buttons/MainButton";
import { useNavigate } from "react-router-dom";
import { CanadianProvinces } from "../Assets/DataTypes";
import { useState } from "react";

export default function AddFarmPage() {
  const [farmName, setFarmName] = useState("");
  const navigate = useNavigate();
  function handleNameChange(target) {
    setFarmName(target);
  }
  return (
    <Page title={"New Farm"} headerBorderColor={"border-[#34a853]"}>
      {/* FARM NAME FIELD  */}
      <div className="w-full h-full">
        <FormTextField
          fieldValue={farmName}
          onChange={handleNameChange}
          fieldLabel={"Farm Name"}
          modalTitle={"Farm Name"}
          onBlur={console.log}
          modalDescription={
            "A farm or farm operation is used as a way to group fields in a way that is useful to the user.If you have multiple fields you can use farms to logically group them. Use a name that is recognizable to you."
          }
        />
        <FormTextField
          fieldValue={""}
          fieldLabel={"Partner Name"}
          modalTitle={"Partner Name"}
          onBlur={console.log}
          modalDescription={
            "Enter the name of the partner you're associated with. This will allow them to associate your data in their project while keeping your privacy. They will only have access to aggregated data of many farmers, your data will be anonymized."
          }
        />
        <FormSelectField
          valuesArray={CanadianProvinces}
          fieldLabel={"Province Name"}
          fieldValue={""}
          helperText={"Please select your province"}
          modalTitle={"Province"}
          modalDescription={
            "Please Select the province where you have the majority of your business operations."
          }
        />

        {/* CONTROLS */}
        <div className="w-full flex">
          <div>
            <MainButton
              text={"Save and Add Field"}
              onClick={() => navigate("/field")}
            />
          </div>
          <div className="ml-4">
            <MainButton text={"Cancel"} onClick={console.log} />
          </div>
        </div>
      </div>
    </Page>
  );
}
