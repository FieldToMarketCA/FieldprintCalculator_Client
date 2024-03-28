import Page from "../Components/Page";
import MainButton from "../Components/Buttons/MainButton";
import FormTextField from "../Components/FormInputElements/FormTextField";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import Divider from "@mui/material/Divider";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router-dom";

import {
  SurfaceFormTypes,
  SlopeClassTypes,
  SoilTypes,
  SurfaceSoilTextureTypes,
  TillageRegimeTypes,
} from "../Assets/DataTypes";

import { useState } from "react";

import { FieldContext } from "../App";
import { FarmContext } from "../App";
import { SECRETS_CONTEXT } from "../App";

import { useContext } from "react";
import axios from "axios";
import MapCoordinates from "../Assets/Map/Map_Dataset";
import { getNearestCoordinate } from "../Assets/Map/getNearestCoordinates";

export default function AddFieldPage() {
  const [addressQuery, setAddressQuery] = useState("Canada");
  const navigate = useNavigate();

  const fieldContext = useContext(FieldContext);
  const farmContext = useContext(FarmContext);
  const SECRETS = useContext(SECRETS_CONTEXT);

  function handleStateChange(target, key) {
    const newValue = {};
    newValue[key] = target;
    fieldContext.setter({ ...fieldContext.state, ...newValue });
  }

  async function handleAddressChange(address) {
    setAddressQuery(address);
    //

    if (!address) return;
    try {
      const geoData = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${SECRETS.SECRETS.GOOGLE_APIKEY}`
      );
      // console.log(geoData.data);

      let lat = geoData.data.results[0].geometry.location.lat;
      let lng = geoData.data.results[0].geometry.location.lng;

      const SoilData = getNearestCoordinate(
        farmContext.state.province,
        lat,
        lng,
        MapCoordinates
      );

      const newValues = {};
      newValues["surfaceForm"] = SoilData.LF_TYPE;
      newValues["slopeClass"] = SoilData.LF_SLOPE;
      newValues["Ecodistrict"] = SoilData.Ecodistrict;
      newValues["SLCpolygon"] = SoilData.SLCpolygon;

      fieldContext.setter({ ...fieldContext.state, ...newValues });
    } catch (error) {
      console.log("An error occurred while fetching map data");
    }
  }

  return (
    <Page
      title={"New Field"}
      headerBorderColor={"border-[#34a853]"}
      padding={"p-[0px]"}
    >
      <div className="flex w-full h-full">
        {/* LEFT PANEL | INPUT AREA */}
        <div className="flex  relative flex-col justify-end h-full w-[336px] min-w-[336px] border-r border-[rgb(211,211,211)]">
          {/* FIELDS*/}
          <div
            style={{
              height: "calc(100% - 124.5px)",
            }}
            className="flex absolute flex-col  top-0 left-0 overflow-auto w-full p-4 "
          >
            <FormTextField
              fieldState={fieldContext.state.name}
              fieldLabel={"Field Name"}
              modalTitle={"Field Name"}
              onChange={(t) => handleStateChange(t, "name")}
              modalDescription={
                "Enter the name of your field. Use a name you will recognize."
              }
            />
            <FormTextField
              fieldState={fieldContext.state.fieldSize}
              fieldLabel={"Field Size [Acres]"}
              modalTitle={"Field Size"}
              onChange={(t) => handleStateChange(t, "fieldSize")}
              isNumber={true}
              modalDescription={
                "Enter the size of your field. Please use Acres as a unit of measurement, since the system will expects this unit to compute the analysis."
              }
            />
            <FormTextField
              fieldState={fieldContext.state.fieldAddress}
              onChange={(t) => handleStateChange(t, "fieldAddress")}
              fieldLabel={"Field Address"}
              modalTitle={"Field Address"}
              modalDescription={
                "Enter the address  of your field. Please use the format [Street, City, Postal Code, Province]."
              }
              onBlur={handleAddressChange}
            />
            {/* DIVIDER */}
            <Divider sx={{ marginBottom: 3 }} />
            <FormSelectField
              valuesArray={SurfaceFormTypes}
              onChange={(e) => handleStateChange(e.target.value, "surfaceForm")}
              fieldLabel={"Surface Form"}
              fieldState={fieldContext.state.surfaceForm}
              helperText={""}
              modalTitle={"Surface Form"}
              modalDescription={
                "Refers to parallel and subparallel steep-sided, and narrow ravines that have developed from fluvial erosion on landscapes with strong to steep slopes."
              }
            />
            <FormSelectField
              valuesArray={SlopeClassTypes}
              fieldLabel={"Slope Class"}
              fieldState={fieldContext.state.slopeClass}
              onChange={(e) => handleStateChange(e.target.value, "slopeClass")}
              helperText={""}
              modalTitle={"Slope Class"}
              modalDescription={
                "Slope percent (%) is the steepness of a sloping area in your field. Slope percent impacts erosion on your field. We recommend determining the percent slope using a clinometer measuring the dominant slope acrossthe field. If do not have access to a clinometer, the information in the following table maybe be useful. First select the approximate field size (acres) and/or field width/length (feet), then identify the approximate elevation change (feet) over the field and the correlating slope percent."
              }
            />
            <FormSelectField
              valuesArray={SoilTypes}
              fieldLabel={"Soil Type"}
              fieldState={fieldContext.state.soilType}
              onChange={(e) => handleStateChange(e.target.value, "soilType")}
              helperText={""}
              modalTitle={"Soil Type"}
              modalDescription={"Some helpful description."}
            />
            <FormSelectField
              valuesArray={SurfaceSoilTextureTypes}
              fieldLabel={"Surface Soil Texture"}
              fieldState={fieldContext.state.surfaceSoilTexture}
              onChange={(e) =>
                handleStateChange(e.target.value, "surfaceSoilTexture")
              }
              helperText={""}
              modalTitle={"Surface Soil Texture"}
              modalDescription={
                "Dominant surface soil texture class for the field boundary."
              }
            />
            {/* DIVIDER */}
            <Divider sx={{ marginBottom: 3 }} />
            <FormSelectField
              valuesArray={TillageRegimeTypes}
              fieldLabel={"Tillage Regime"}
              fieldState={fieldContext.state.tillageRegime}
              onChange={(e) =>
                handleStateChange(e.target.value, "tillageRegime")
              }
              helperText={""}
              modalTitle={"Tillage Regime"}
              modalDescription={"Some helpful description."}
            />
            <FormSelectField
              valuesArray={TillageRegimeTypes}
              fieldLabel={"Previous Tillage Regime"}
              fieldState={fieldContext.state.previousTillageRegime}
              onChange={(e) =>
                handleStateChange(e.target.value, "previousTillageRegime")
              }
              helperText={""}
              modalTitle={"Previous Tillage Regime"}
              modalDescription={"Some helpful description."}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                onChange={(event) => {
                  if (event && !isNaN(event.$d))
                    handleStateChange(
                      event.$d.toISOString(),
                      "regimeChangeDate"
                    );
                }}
                label="Regime Change Date"
              />
            </LocalizationProvider>
          </div>

          <div className=" p-[14px] flex flex-col justify-between w-full h-[124.5px] border-t border-[rgb(211,211,211)]">
            <MainButton
              text={"Save Field"}
              onClick={() => navigate("/cropyear")}
            />
            <MainButton
              text={"Cancel"}
              onClick={console.log}
              secondary={true}
            />
          </div>
        </div>

        {/* MAP  */}
        <div className="w-full h-full">
          <iframe
            title="Map"
            width="100%"
            height="100%"
            style={{ bborder: "none!important" }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${
              SECRETS.SECRETS.GOOGLE_APIKEY
            }&q=${addressQuery ? addressQuery : "Canada"}&maptype=satellite`}
          ></iframe>
        </div>
      </div>
    </Page>
  );
}