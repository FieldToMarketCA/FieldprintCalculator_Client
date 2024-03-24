import axios from "axios";
var defaultUnit = "horsepower";
function convertContextToRow(FarmState, FieldState, CropyearState) {
  //   console.log(FarmState, FieldState, CropyearState);
  //   console.log(CropyearState.crop.yieldUnits, "watauba");
  //   return;
  const RowValues = [
    [FieldState.fieldAddress, "UniqueID"],
    [FieldState.id, "Farm_ID"],
    [FieldState.name, "Field_Name"],
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    [CropyearState.crop.cropYear, "Crop_Year"],
    [CropyearState.crop.cropThisYear, "Crop"],
    ["", "NULL"], //
    [CropyearState.crop.yield, "Yield"],
    [CropyearState.crop.yieldUnits, "Yield_Units"],
    [CropyearState.crop.previousCrop, "Prior_Crop"],
    ["addHereMachineHP", "Cult1_Size"],
    [defaultUnit, "Cult1_Units"],
    [CropyearState.fieldOperations.cultivations[0].hoursUsed, "Cult1_Hrs"],
    ["addHereAvgMachineACHR", "Cult1_AcHr"],
    ["addHereMachineHP", "Cult2_Size"],
    [defaultUnit, "Cult2_Units"],
    [CropyearState.fieldOperations.cultivations[1].hoursUsed, "Cult2_Hrs"],
    ["addHereAvgMachineACHR", "Cult2_AcHr"],
    ["addHereMachineHP", "Cult3_Size"],
    [defaultUnit, "Cult3_Units"],
    [CropyearState.fieldOperations.cultivations[2].hoursUsed, "Cult3_Hrs"],
    ["addHereAvgMachineACHR", "Cult3_AcHr"],
    ["addHereMachineHP", "Cult4_Size"],
    [defaultUnit, "Cult4_Units"],
    [CropyearState.fieldOperations.cultivations[3].hoursUsed, "Cult4_Hrs"],
    ["addHereAvgMachineACHR", "Cult4_AcHr"],
    ["addHereMachineHP", "Seed_Size"],
    [defaultUnit, "Seed_Units"],
    [
      CropyearState.fieldOperations.fertilizerApplications.seed.hoursUsed,
      "Seed_Hrs",
    ],
    ["addHereAvgMachineACHR", "Seed_AcHr"],
    [
      CropyearState.fieldOperations.fertilizerApplications.seed.date,
      "Seed_FertDate",
    ],
    [CropyearState.fieldOperations.fertilizerRates.N.withSeed, "Seed_N"],
    [CropyearState.fieldOperations.fertilizerRates.P.withSeed, "Seed_P"],
    [CropyearState.fieldOperations.fertilizerRates.K.withSeed, "Seed_K"],
    [CropyearState.fieldOperations.fertilizerRates.S.withSeed, "Seed_S"],
    [
      CropyearState.fieldOperations.fertilizerRates.M.withSeed,
      "Seed_OtherFert",
    ],
    ["addHereMachineHP", "PreSeed_Size"],
    [defaultUnit, "PreSeed_Units"],
    [
      CropyearState.fieldOperations.fertilizerApplications.preSeed.hoursUsed,
      "PreSeed_Hrs",
    ],
    ["addHereAvgMachineACHR", "PreSeed_AcHr"],
    [
      CropyearState.fieldOperations.fertilizerApplications.preSeed.date,
      "PreSeed_FertDate",
    ],
    [CropyearState.fieldOperations.fertilizerRates.N.preSeed, "PreSeed_N"],
    [CropyearState.fieldOperations.fertilizerRates.P.preSeed, "PreSeed_P"],
    [CropyearState.fieldOperations.fertilizerRates.K.preSeed, "PreSeed_K"],
    [CropyearState.fieldOperations.fertilizerRates.S.preSeed, "PreSeed_S"],
    [
      CropyearState.fieldOperations.fertilizerRates.M.preSeed,
      "PreSeed_OtherFert",
    ],
    ["addHereMachineHP", "PostSeed_Size"],
    [defaultUnit, "PostSeed_Units"],
    [
      CropyearState.fieldOperations.fertilizerApplications.postSeed.hoursUsed,
      "PostSeed_Hrs",
    ],
    ["addHereAvgMachineACHR", "PostSeed_AcHr"],
    [
      CropyearState.fieldOperations.fertilizerApplications.postSeed.date,
      "PostSeed_FertDate",
    ],
    [CropyearState.fieldOperations.fertilizerRates.N.postSeed, "PostSeed_N"],
    [CropyearState.fieldOperations.fertilizerRates.P.postSeed, "PostSeed_P"],
    [CropyearState.fieldOperations.fertilizerRates.K.postSeed, "PostSeed_K"],
    [CropyearState.fieldOperations.fertilizerRates.S.postSeed, "PostSeed_S"],
    [
      CropyearState.fieldOperations.fertilizerRates.M.postSeed,
      "PostSeed_OtherFert",
    ],
    ["addHereMachineHP", "Pest1_Size"],
    [defaultUnit, "Pest1_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[0].hoursUsed,
      "Pest1_Hrs",
    ],
    ["addHereAvgMachineACHR", "Pest1_AcHr"],
    ["addHereMachineHP", "Pest2_Size"],
    [defaultUnit, "Pest2_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[1].hoursUsed,
      "Pest2_Hrs",
    ],
    ["addHereAvgMachineACHR", "Pest2_AcHr"],
    ["addHereMachineHP", "Pest3_Size"],
    [defaultUnit, "Pest3_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[2].hoursUsed,
      "Pest3_Hrs",
    ],
    ["addHereAvgMachineACHR", "Pest3_AcHr"],
    ["addHereMachineHP", "Pest4_Size"],
    [defaultUnit, "Pest4_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[3].hoursUsed,
      "Pest4_Hrs",
    ],
    ["addHereAvgMachineACHR", "Pest4_AcHr"],
    ["addHereMachineHP", "Pest5_Size"],
    [defaultUnit, "Pest5_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[4].hoursUsed,
      "Pest5_Hrs",
    ],
    ["addHereAvgMachineACHR", "Pest5_AcHr"],
    ["addHereMachineHP", "Swath_Size"],
    [defaultUnit, "Swath_Units"],
    [CropyearState.harvest.swather.hoursUsed, "Swath_Hrs"],
    ["addHereAvgMachineACHR", "Swath_AcHr"],
    ["addHereMachineHP", "Comb_Size"],
    [defaultUnit, "Comb_Units"],
    [CropyearState.harvest.combine.hoursUsed, "Comb_Hrs"],
    ["addHereAvgMachineACHR", "Comb_AcHr"],
    [CropyearState.harvest.combine.avgSpeed, "Comb_Speed"],
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    [FieldState.fieldSize, "Field_Size"],
    [FieldState.surfaceForm, "Surface_Form"],
    [FieldState.slopeClass, "Slope"],
    ["", "NULL"], //
    [FieldState.soilType, "Soil_Type"],
    [FieldState.surfaceSoilTexture, "Soil_Texture"],
    [FieldState.tillageRegime, "Till_Previous"],
    [FieldState.prevopusTillageRegime, "Till_Current"],
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["558", "Ecodistrict"], // WE NEED TO ADD ECO DISTRICT TO FIELD FORM
    ["", "NULL"], //
    ["Huron east", "Municipality"],
    [FarmState.province, "Province"],
    ["", "Advisor"],
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "Polygon"], // WE NEED TO ADD POLYGON ID
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
  ];

  // Flatten and return RowValuesArray
  return RowValues.map((valuePair) => valuePair[0]);
}

async function generateResults(
  FarmContextState,
  FieldContextState,
  CropyearContextState,
  setReportData
) {
  const RowValues = convertContextToRow(
    FarmContextState,
    FieldContextState,
    CropyearContextState
  );

  const sessionResponse = await axios.post(
    `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/createSession`,
    {
      persistChanges: false,
    },
    {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  console.log(sessionResponse.data.id, "sessionResponseResult");

  // WRITE DOCUMENT
  await axios.patch(
    `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/worksheets/Data/range(address='A2:EJ2')`,
    {
      values: [RowValues],
    },
    {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        "Content-Type": "application/json",
        // "Workbook-Session-Id": sessionResponse.data.id,
      },
    }
  );

  // GET RESULTS AND CLOSE SESSION
  setTimeout(async () => {
    // GET
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/worksheets/Report Data/range(address='A1:AM2')`,
      {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
          "Content-Type": "application/json",
          //   "Workbook-Session-Id": sessionResponse.data.id,
        },
      }
    );

    //  CLOSE SESSION
    axios.post(
      `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/closeSession`,
      {
        persistChanges: false,
      },
      {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
          "Content-Type": "application/json",
          "Workbook-Session-Id": sessionResponse.data.id,
        },
      }
    );

    // const data = await response.data.values[0][0];
    setReportData(response.data.values);
    console.log(response.data.values);
  }, 10000);
}

export { generateResults };
