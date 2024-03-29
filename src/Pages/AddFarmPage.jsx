import Page from "../Components/Page";
import FormTextField from "../Components/FormInputElements/FormTextField";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import MainButton from "../Components/Buttons/MainButton";
import { useNavigate } from "react-router-dom";
import { CanadianProvinces } from "../Assets/DataTypes";
import { useState } from "react";

import { useContext } from "react";
import { FarmContext } from "../App";
import { FieldContext } from "../App";

var errorFields = {
  name: false,
  partner: false,
  province: false,
};

export default function AddFarmPage() {
  const [ErrorFound, setErrorFound] = useState(false);
  const farmContext = useContext(FarmContext);
  const fieldContext = useContext(FieldContext);

  const navigate = useNavigate();

  function handleStateChange(target, key) {
    const newValue = {};
    newValue[key] = target;
    farmContext.setter({ ...farmContext.state, ...newValue });
    errorFields[key] = false;
  }

  function handleSaveAndAddFIeld() {
    if (isInputValid()) navigate("/field");
  }

  function isInputValid() {
    errorFields.name = farmContext.state.name.trim() === "";
    errorFields.partner = farmContext.state.partner.trim() === "";
    errorFields.province = farmContext.state.province.trim() === "";

    if (errorFields.name || errorFields.partner || errorFields.province) {
      setErrorFound(true);
      return false; // return false because input is invalid
    } else {
      setErrorFound(false);
      return true;
    }
  }

  return (
    <Page title={"New Farm"} headerBorderColor={"border-[#34a853]"}>
      {/* FARM NAME FIELD  */}

      <div className="w-full h-full">
        <FormTextField
          errorFound={errorFields.name}
          fieldState={farmContext.state.name}
          onChange={(t) => handleStateChange(t, "name")}
          fieldLabel={"Farm Name"}
          modalTitle={"Farm Name"}
          modalDescription={
            "A farm or farm operation is used as a way to group fields in a way that is useful to the user.If you have multiple fields you can use farms to logically group them. Use a name that is recognizable to you."
          }
        />
        <FormTextField
          errorFound={errorFields.partner}
          fieldState={farmContext.state.partner}
          fieldLabel={"Partner Name"}
          modalTitle={"Partner Name"}
          onChange={(t) => handleStateChange(t, "partner")}
          modalDescription={
            "Enter the name of the partner you're associated with. This will allow them to associate your data in their project while keeping your privacy. They will only have access to aggregated data of many farmers, your data will be anonymized."
          }
        />
        <FormSelectField
          errorFound={errorFields.province}
          valuesArray={CanadianProvinces}
          fieldLabel={"Province Name"}
          fieldState={farmContext.state.province}
          helperText={"Please select your province"}
          onChange={(e) => handleStateChange(e.target.value, "province")}
          modalTitle={"Province"}
          modalDescription={
            "Please Select the province where you have the majority of your business operations."
          }
        />

        {/* CONTROLS */}
        <div className="w-full  flex flex-col min-[550px]:flex-row">
          <div className="mb-5">
            <MainButton
              text={"Save and Add Field"}
              onClick={handleSaveAndAddFIeld}
            />
          </div>
          <div className="min-[550px]:ml-4">
            <MainButton text={"Cancel"} onClick={console.log} />
          </div>
        </div>
      </div>
    </Page>
  );
}
