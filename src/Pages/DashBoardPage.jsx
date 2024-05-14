import Page from "../Components/Page";
import FormTextField from "../Components/FormInputElements/FormTextField";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import MainButton from "../Components/Buttons/MainButton";

import DashBoardFilterPane from "../Components/Dashboard/DashBoardFilterPane";
import DashboardTable from "../Components/Dashboard/DashboardTable";

import { useNavigate } from "react-router-dom";
import { CanadianProvinces } from "../Assets/DataTypes";
import { useState, useEffect } from "react";

import { useContext } from "react";
// import { FarmContext } from "../App";
// import { FieldContext } from "../App";

import axios from "axios";

export default function DashBoardPage() {
  // const farmContext = useContext(FarmContext);
  // const fieldContext = useContext(FieldContext);
  const [tableData, setTableData] = useState([]);
  const navigate = useNavigate();

  const getFieldsFromFarmId = async (farmId) => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL + "/farms/" + farmId + "/fields"
    );
    return response.data;
  };
  const getCropYearsFromFieldId = async (farmId, fieldId) => {
    const response = await axios.get(
      process.env.REACT_APP_API_URL +
        `/farms/${farmId}/fields/${fieldId}/cropyears`
    );
    return response.data;
  };

  useEffect(() => {
    const getDashboardData = async () => {
      const TMP = [];

      const farmsResponse = await axios.get(
        process.env.REACT_APP_API_URL + "/farms"
      );

      for (const Farm of farmsResponse.data.data) {
        const fields = await getFieldsFromFarmId(Farm._id.$oid);

        for (const Field of fields) {
          const cropyears = await getCropYearsFromFieldId(
            Farm._id.$oid,
            Field._id.$oid
          );

          console.log(cropyears);

          for (const CropYear of cropyears) {
            TMP.push({
              id: Field._id.$oid,
              farmName: Farm.name,
              fieldName: Field.name,
              fieldSize: Field.fieldSize,
              cropYear: CropYear.crop.cropYear,
              crop: CropYear.crop.cropThisYear,
            });
          }
        }
      }

      setTableData(TMP);
    };

    getDashboardData();
  }, []);

  return (
    <Page
      title={"Dashboard"}
      headerBorderColor={"border-[#00adee]"}
      showQuickFacts={true}
    >
      {/* FARM NAME FIELD  */}

      <div className="w-full h-full text-[#666666]">
        <p className="mb-6">
          This page provides a dashboard view of your Farms and Fields. You can
          view your fields in map view () or in table view (). Click on a map
          marker (marker) or the field boundary (depending on zoom level) to see
          additional field details and link to the field dashboard.
        </p>

        <div className="w-full mb-6">
          <DashBoardFilterPane />
        </div>

        <DashboardTable tableData={tableData} />
      </div>
    </Page>
  );
}
