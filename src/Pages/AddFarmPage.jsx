import Page from "../Components/Page";
import FormTextField from "../Components/FormInputElements/FormTextField";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import MainButton from "../Components/Buttons/MainButton";
import { useNavigate } from "react-router-dom";
import { CanadianProvinces } from "../Assets/DataTypes";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { FarmContext } from "../App";
import { FieldContext } from "../App";
import { useAuth } from "../Components/Auth/useAuth";

import { axiosInstance } from "../Components/axiosFetchers";

var errorFields = {
  name: false,
  province: false,
};

export default function AddFarmPage() {
  const { user } = useAuth();
  const [ErrorFound, setErrorFound] = useState(false);
  const farmContext = useContext(FarmContext);
  const fieldContext = useContext(FieldContext);

  document.title = "Add Farm Page - Field To Market Canada";

  const navigate = useNavigate();

  function handleStateChange(target, key) {
    const newValue = {};
    newValue[key] = target;
    farmContext.setter({ ...farmContext.state, ...newValue });
    errorFields[key] = false;
  }

  useEffect(() => {
    farmContext.resetState();
  }, []);

  function handleSaveAndAddFIeld() {
    if (isInputValid()) {
      axiosInstance
        .post(
          process.env.REACT_APP_API_URL + "/farms",
          {
            name: farmContext.state.name,
            province: farmContext.state.province,
            partner: farmContext.state.partner,
            ownerId: user.email,
          },
          {
            headers: {
              token: "Bearer " + user.token,
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          // farmContext.setter({
          //   ...farmContext.state,
          //   _id: { $oid: response.data.farmId },
          // });
          navigate(`/farm/${response.data.farmId}/addfield`);
        });
    }
  }

  function isInputValid() {
    errorFields.name = farmContext.state.name.trim() === "";
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
            <MainButton text={"Cancel"} onClick={() => navigate("/")} />
          </div>
        </div>
      </div>
    </Page>
  );
}
