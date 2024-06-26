import Page from "../Components/Page";

import DashBoardFilterPane from "../Components/Dashboard/DashBoardFilterPane";
import DashboardTable from "../Components/Dashboard/DashboardTable";

import { useState, useEffect } from "react";
import { axiosInstance } from "../Components/axiosFetchers";
import { useAuth } from "../Components/Auth/useAuth";

export default function DashBoardPage() {
  const { user } = useAuth();
  const [filters, setFilters] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [SummaryData, setSummaryData] = useState(false);
  const [filteredData, setFilteredData] = useState(tableData);
  const [isLoading, setIsLoading] = useState(true);

  const getFieldsFromFarmId = async (farmId) => {
    const response = await axiosInstance.get(
      process.env.REACT_APP_API_URL + "/farms/" + farmId + "/fields",
      {
        headers: {
          token: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };
  const getCropYearsFromFieldId = async (farmId, fieldId) => {
    const response = await axiosInstance.get(
      process.env.REACT_APP_API_URL +
        `/farms/${farmId}/fields/${fieldId}/cropyears`,
      {
        headers: {
          token: "Bearer " + user.token,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  useEffect(() => {
    const getDashboardData = async () => {
      const TMP = [];
      const SummaryDataCopy = {
        totalAcres: 0,
        cropsSet: {},
        fieldsSet: {},
        farmsSet: {},
        yearsArray: [],
      };

      const tmpFilters = {
        farmsFilters: {},
        fieldsFilters: {},
        cropYearsFilters: {},
        cropsFilters: {},
      };

      const farmsResponse = await axiosInstance.get(
        process.env.REACT_APP_API_URL + "/farms?max=100",
        {
          headers: {
            token: "Bearer " + user.token,
            "Content-Type": "application/json",
          },
        }
      );

      for (const Farm of farmsResponse.data.data) {
        console.log(Farm._id.$oid);
        const fields = await getFieldsFromFarmId(Farm._id.$oid);

        for (const Field of fields) {
          console.log(Field._id.$oid, "   ", Field.cropYears);
          const cropyears = await getCropYearsFromFieldId(
            Farm._id.$oid,
            Field._id.$oid
          );

          for (const CropYear of cropyears) {
            tmpFilters["farmsFilters"][Farm.name] = true;
            tmpFilters["fieldsFilters"][Field.name] = true;
            tmpFilters["cropYearsFilters"][CropYear.crop.cropYear] = true;
            tmpFilters["cropsFilters"][CropYear.crop.cropThisYear] = true;

            // Capture Summary Data
            SummaryDataCopy.totalAcres += Field.fieldSize;
            SummaryDataCopy.cropsSet[CropYear.crop.cropThisYear] = true;
            SummaryDataCopy.fieldsSet[Field.name] = true;
            SummaryDataCopy.farmsSet[Farm.name] = true;
            SummaryDataCopy.yearsArray.push(CropYear.crop.cropYear);

            // Capture TABLE Data
            TMP.push({
              farmId: Farm._id.$oid,
              fieldId: Field._id.$oid,
              cropyearId: CropYear._id.$oid,
              analysisId:
                "analysisId" in CropYear ? CropYear.analysisId : false,
              farmName: Farm.name,
              fieldName: Field.name,
              fieldSize: Field.fieldSize,
              cropYear: CropYear.crop.cropYear,
              crop: CropYear.crop.cropThisYear,
            });
          }
        }
      }
      // console.log(Object.keys(SummaryDataCopy.farmsSet));
      setSummaryData([
        { label: "Acres", value: SummaryDataCopy.totalAcres },
        {
          label: "Crops",
          value: Object.keys(SummaryDataCopy.cropsSet).join(", "),
        },
        {
          label: "Total Fields",
          value: Object.keys(SummaryDataCopy.fieldsSet).length,
        },
        {
          label: "Total Farms",
          value: Object.keys(SummaryDataCopy.farmsSet).length,
        },
        {
          label: "Years",
          value:
            Math.min(...SummaryDataCopy.yearsArray) +
            " - " +
            Math.max(...SummaryDataCopy.yearsArray),
        },
      ]);
      setTableData(TMP);
      setFilters(tmpFilters);
      setIsLoading(false);
    };

    getDashboardData();
  }, []);

  document.title = "Dashboard Page - Field To Market Canada";

  return (
    <Page
      title={"Dashboard"}
      headerBorderColor={"border-[#00adee]"}
      showQuickFacts={true}
      dashboardData={SummaryData}
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
          <DashBoardFilterPane
            filters={filters}
            setFilteredData={setFilteredData}
            tableData={tableData}
          />
        </div>

        <DashboardTable tableData={filteredData} isLoading={isLoading} />
      </div>
    </Page>
  );
}
