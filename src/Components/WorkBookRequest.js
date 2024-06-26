import { axiosInstance } from "./axiosFetchers";
var defaultUnit = "horsepower";
function convertContextToRow(FarmState, FieldState, CropyearState) {
  //   console.log(FarmState, FieldState, CropyearState);
  //   console.log(CropyearState.crop.yieldUnits, "watauba");
  //   return;
  console.log(CropyearState, "felix");
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
    [CropyearState.crop.yieldValue, "Yield"],
    [CropyearState.crop.yieldUnits, "Yield_Units"],
    [CropyearState.crop.previousCrop, "Prior_Crop"],
    [CropyearState.fieldOperations.cultivations[0].machineObj.HP, "Cult1_Size"],
    [defaultUnit, "Cult1_Units"],
    [CropyearState.fieldOperations.cultivations[0].hoursUsed, "Cult1_Hrs"],
    [
      CropyearState.fieldOperations.cultivations[0].machineObj.defaultAcreHour,
      "Cult1_AcHr",
    ],
    [CropyearState.fieldOperations.cultivations[1].machineObj.HP, "Cult2_Size"],
    [defaultUnit, "Cult2_Units"],
    [CropyearState.fieldOperations.cultivations[1].hoursUsed, "Cult2_Hrs"],
    [
      CropyearState.fieldOperations.cultivations[1].machineObj.defaultAcreHour,
      "Cult2_AcHr",
    ],
    [CropyearState.fieldOperations.cultivations[2].machineObj.HP, "Cult3_Size"],
    [defaultUnit, "Cult3_Units"],
    [CropyearState.fieldOperations.cultivations[2].hoursUsed, "Cult3_Hrs"],
    [
      CropyearState.fieldOperations.cultivations[2].machineObj.defaultAcreHour,
      "Cult3_AcHr",
    ],
    [CropyearState.fieldOperations.cultivations[3].machineObj.HP, "Cult4_Size"],
    [defaultUnit, "Cult4_Units"],
    [CropyearState.fieldOperations.cultivations[3].hoursUsed, "Cult4_Hrs"],
    [
      CropyearState.fieldOperations.cultivations[3].machineObj.defaultAcreHour,
      "Cult4_AcHr",
    ],
    [
      CropyearState.fieldOperations.fertilizerApplications.withSeed.machineObj
        .HP,
      "Seed_Size",
    ],
    [defaultUnit, "Seed_Units"],
    [
      CropyearState.fieldOperations.fertilizerApplications.withSeed.hoursUsed,
      "Seed_Hrs",
    ],
    [
      CropyearState.fieldOperations.fertilizerApplications.withSeed
        .defaultAcreHour,
      "Seed_AcHr",
    ],
    [
      CropyearState.fieldOperations.fertilizerApplications.withSeed.date,
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
    [
      CropyearState.fieldOperations.fertilizerApplications.preSeed.machineObj
        .HP,
      "PreSeed_Size",
    ],
    [defaultUnit, "PreSeed_Units"],
    [
      CropyearState.fieldOperations.fertilizerApplications.preSeed.hoursUsed,
      "PreSeed_Hrs",
    ],
    [
      CropyearState.fieldOperations.fertilizerApplications.preSeed
        .defaultAcreHour,
      "PreSeed_AcHr",
    ],
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
    [
      CropyearState.fieldOperations.fertilizerApplications.postSeed.machineObj
        .HP,
      "PostSeed_Size",
    ],
    [defaultUnit, "PostSeed_Units"],
    [
      CropyearState.fieldOperations.fertilizerApplications.postSeed.hoursUsed,
      "PostSeed_Hrs",
    ],
    [
      CropyearState.fieldOperations.fertilizerApplications.postSeed
        .defaultAcreHour,
      "PostSeed_AcHr",
    ],
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
    [
      CropyearState.fieldOperations.pesticidesApplications[0].machineObj.HP,
      "Pest1_Size",
    ],
    [defaultUnit, "Pest1_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[0].hoursUsed,
      "Pest1_Hrs",
    ],
    [
      CropyearState.fieldOperations.pesticidesApplications[0].machineObj
        .defaultAcreHour,
      "Pest1_AcHr",
    ],
    [
      CropyearState.fieldOperations.pesticidesApplications[1].machineObj.HP,
      "Pest2_Size",
    ],
    [defaultUnit, "Pest2_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[1].hoursUsed,
      "Pest2_Hrs",
    ],
    [
      CropyearState.fieldOperations.pesticidesApplications[1].machineObj
        .defaultAcreHour,
      "Pest2_AcHr",
    ],
    [
      CropyearState.fieldOperations.pesticidesApplications[2].machineObj.HP,
      "Pest3_Size",
    ],
    [defaultUnit, "Pest3_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[2].hoursUsed,
      "Pest3_Hrs",
    ],
    [
      CropyearState.fieldOperations.pesticidesApplications[2].machineObj
        .defaultAcreHour,
      "Pest3_AcHr",
    ],
    [
      CropyearState.fieldOperations.pesticidesApplications[3].machineObj.HP,
      "Pest4_Size",
    ],
    [defaultUnit, "Pest4_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[3].hoursUsed,
      "Pest4_Hrs",
    ],
    [
      CropyearState.fieldOperations.pesticidesApplications[3].machineObj
        .defaultAcreHour,
      "Pest4_AcHr",
    ],
    [
      CropyearState.fieldOperations.pesticidesApplications[4].machineObj.HP,
      "Pest5_Size",
    ],
    [defaultUnit, "Pest5_Units"],
    [
      CropyearState.fieldOperations.pesticidesApplications[4].hoursUsed,
      "Pest5_Hrs",
    ],
    [
      CropyearState.fieldOperations.pesticidesApplications[4].machineObj
        .defaultAcreHour,
      "Pest5_AcHr",
    ],
    [CropyearState.harvest.swather.machineObj.HP, "Swath_Size"],
    [defaultUnit, "Swath_Units"],
    [CropyearState.harvest.swather.hoursUsed, "Swath_Hrs"],
    [CropyearState.harvest.swather.machineObj.defaultAcreHour, "Swath_AcHr"],
    [CropyearState.harvest.combine.machineObj.HP, "Comb_Size"],
    [defaultUnit, "Comb_Units"],
    [CropyearState.harvest.combine.hoursUsed, "Comb_Hrs"],
    [CropyearState.harvest.combine.machineObj.defaultAcreHour, "Comb_AcHr"],
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
    [FieldState.previousTillageRegime, "Till_Previous"],
    [FieldState.tillageRegime, "Till_Current"],
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    ["", "NULL"], //
    [FieldState.Ecodistrict, "Ecodistrict"], // WE NEED TO ADD ECO DISTRICT TO FIELD FORM
    ["", "NULL"], //
    ["Huron east", "Municipality"],
    [FarmState.province, "Province"],
    ["", "Advisor"],
    ["", "NULL"], //
    ["", "NULL"], //
    [FieldState.SLCpolygon, "Polygon"], // WE NEED TO ADD POLYGON ID
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
  setReportData,
  TOKEN
) {
  const RowValues = convertContextToRow(
    FarmContextState,
    FieldContextState,
    CropyearContextState
  );

  const sessionResponse = await axiosInstance.post(
    `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/createSession`,
    {
      persistChanges: false,
    },
    {
      headers: {
        Authorization: "Bearer " + TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  // WRITE DOCUMENT
  await axiosInstance.patch(
    `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/worksheets/Data/range(address='A2:EJ2')`,
    {
      values: [RowValues],
    },
    {
      headers: {
        Authorization: "Bearer " + TOKEN,
        "Content-Type": "application/json",
        "Workbook-Session-Id": sessionResponse.data.id,
      },
    }
  );

  // GET RESULTS AND CLOSE SESSION
  setTimeout(async () => {
    // GET
    const response = await axiosInstance.get(
      `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/worksheets/Report Data/range(address='A1:AM2')`,
      {
        headers: {
          Authorization: "Bearer " + TOKEN,
          "Content-Type": "application/json",
          "Workbook-Session-Id": sessionResponse.data.id,
        },
      }
    );

    //  CLOSE SESSION
    axiosInstance.post(
      `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/closeSession`,
      {
        persistChanges: false,
      },
      {
        headers: {
          Authorization: "Bearer " + TOKEN,
          "Content-Type": "application/json",
          "Workbook-Session-Id": sessionResponse.data.id,
        },
      }
    );

    setReportData(response.data.values);
    console.log(response.data.values);
  }, 5000);
}

export { generateResults };
