import axios from "axios";
import { FERTILIZER_OPERATION_CREATOR } from "../Assets/contextFactories_V0";
var defaultUnit = "horsepower";

function getMachineObj(machineId, FarmState) {
  if (machineId === false) {
    return { type: "", name: "", HP: "", fuelUse: "", defaultAcreHour: "" };
  }

  var result = FarmState.machines.filter((m) => m._id.$oid === machineId);

  if (result.length === 1) return result[0];
  else return { type: "", name: "", HP: "", fuelUse: "", defaultAcreHour: "" };
}

function getCultivationOperations(CropyearState, FarmState) {
  var output = [];

  let cultivationsSize = CropyearState.fieldOperations.cultivations.length;
  for (var i = 0; i < cultivationsSize; i++) {
    let machineObj = getMachineObj(
      CropyearState.fieldOperations.cultivations[i].machineId,
      FarmState
    );

    output.push([machineObj.HP, `Cult${i + 1}_Size`]);
    output.push(["horsepower", `Cult${i + 1}_Units`]);
    output.push([
      CropyearState.fieldOperations.cultivations[i].hoursUsed,
      `Cult${i + 1}_Hrs`,
    ]);
    output.push([machineObj.defaultAcreHour, `Cult${i + 1}_AcHr`]);
  }
  // Fill the difference in size with empty objects

  for (var i = 0; i < 4 - cultivationsSize; i++) {
    let machineObj = getMachineObj(false, FarmState);

    output.push(["", `Cult${cultivationsSize + i + 1}_Size`]);
    output.push(["", `Cult${cultivationsSize + i + 1}_Units`]);
    output.push(["", `Cult${cultivationsSize + i + 1}_Hrs`]);
    output.push(["", `Cult${cultivationsSize + i + 1}_AcHr`]);
  }

  return output;
}

function getFertilizerOperations(CropyearState, FarmState) {
  var machineObj;

  if (!CropyearState.fieldOperations.fertilizerApplications) {
    return [
      ["", "Seed_Size"],
      ["", "Seed_Units"],
      ["", "Seed_Hrs"],
      ["", "Seed_AcHr"],
      ["", "Seed_FertDate"],
      ["", "Seed_N"],
      ["", "Seed_P"],
      ["", "Seed_K"],
      ["", "Seed_S"],
      ["", "Seed_OtherFert"],
      ["", "PreSeed_Size"],
      ["", "PreSeed_Units"],
      ["", "PreSeed_Hrs"],
      ["", "PreSeed_AcHr"],
      ["", "PreSeed_FertDate"],
      ["", "PreSeed_N"],
      ["", "PreSeed_P"],
      ["", "PreSeed_K"],
      ["", "PreSeed_S"],
      ["", "PreSeed_OtherFert"],
      ["", "PostSeed_Size"],
      ["", "PostSeed_Units"],
      ["", "PostSeed_Hrs"],
      ["", "PostSeed_AcHr"],
      ["", "PostSeed_FertDate"],
      ["", "PostSeed_N"],
      ["", "PostSeed_P"],
      ["", "PostSeed_K"],
      ["", "PostSeed_S"],
      ["", "PostSeed_OtherFert"],
    ];
  }
  // WITH SEED
  machineObj = getMachineObj(
    CropyearState.fieldOperations.fertilizerApplications.withSeed.machineId,
    FarmState
  );
  const withSeedValues = [
    [machineObj.HP, "Seed_Size"],
    [defaultUnit, "Seed_Units"],
    [
      CropyearState.fieldOperations.fertilizerApplications.withSeed.hoursUsed,
      "Seed_Hrs",
    ],
    [machineObj.defaultAcreHour, "Seed_AcHr"],
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
  ];

  // PRE SEED
  machineObj = getMachineObj(
    CropyearState.fieldOperations.fertilizerApplications.preSeed.machineId,
    FarmState
  );
  const preSeedValues = [
    [machineObj.HP, "PreSeed_Size"],
    [defaultUnit, "PreSeed_Units"],
    [
      CropyearState.fieldOperations.fertilizerApplications.preSeed.hoursUsed,
      "PreSeed_Hrs",
    ],
    [machineObj.defaultAcreHour, "PreSeed_AcHr"],
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
  ];

  // POST SEED
  machineObj = getMachineObj(
    CropyearState.fieldOperations.fertilizerApplications.postSeed.machineId,
    FarmState
  );

  const postSeedValues = [
    [machineObj.HP, "PostSeed_Size"],
    [defaultUnit, "PostSeed_Units"],
    [
      CropyearState.fieldOperations.fertilizerApplications.postSeed.hoursUsed,
      "PostSeed_Hrs",
    ],
    [machineObj.defaultAcreHour, "PostSeed_AcHr"],
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
  ];

  return [...withSeedValues, ...preSeedValues, ...postSeedValues];
}

function getPesticideOperations(CropyearState, FarmState) {
  var output = [];

  if (!CropyearState.fieldOperations.pesticidesApplications) {
    for (var i = 0; i < 5; i++) {
      output.push(["", `Pest${i + 1}_Size`]);
      output.push(["", `Pest${i + 1}_Units`]);
      output.push(["", `Pest${i + 1}_Hrs`]);
      output.push(["", `Pest${i + 1}_AcHr`]);
    }
    return output;
  }
  let size = CropyearState.fieldOperations.pesticidesApplications.length;

  for (var i = 0; i < size; i++) {
    let machineObj = getMachineObj(
      CropyearState.fieldOperations.pesticidesApplications[i].machineId,
      FarmState
    );

    output.push([machineObj.HP, `Pest${i + 1}_Size`]);
    output.push(["horsepower", `Pest${i + 1}_Units`]);
    output.push([
      CropyearState.fieldOperations.pesticidesApplications[i].hoursUsed,
      `Pest${i + 1}_Hrs`,
    ]);
    output.push([machineObj.defaultAcreHour, `Pest${i + 1}_AcHr`]);
  }
  // Fill the difference in size with empty objects

  for (var i = 0; i < 5 - size; i++) {
    output.push(["", `Pest${size + i + 1}_Size`]);
    output.push(["", `Pest${size + i + 1}_Units`]);
    output.push(["", `Pest${size + i + 1}_Hrs`]);
    output.push(["", `Pest${size + i + 1}_AcHr`]);
  }
  return output;
}

function getHarvestOpeations(CropyearState, FarmState) {
  const swatherObj = getMachineObj(
    CropyearState.harvest.swather.machineId,
    FarmState
  );

  const swatherValues = [
    [swatherObj.HP, "Swath_Size"],
    [defaultUnit, "Swath_Units"],
    [CropyearState.harvest.swather.hoursUsed, "Swath_Hrs"],
    [swatherObj.defaultAcreHour, "Swath_AcHr"],
  ];

  const combineObj = getMachineObj(
    CropyearState.harvest.combine.machineId,
    FarmState
  );

  const combineValues = [
    [combineObj.HP, "Comb_Size"],
    [defaultUnit, "Comb_Units"],
    [CropyearState.harvest.combine.hoursUsed, "Comb_Hrs"],
    [combineObj.defaultAcreHour, "Comb_AcHr"],
    [CropyearState.harvest.combine.avgSpeed, "Comb_Speed"],
  ];

  return [...swatherValues, ...combineValues];
}

function convertContextToRow(FarmState, FieldState, CropyearState) {
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
    ...getCultivationOperations(CropyearState, FarmState),
    ...getFertilizerOperations(CropyearState, FarmState),
    ...getPesticideOperations(CropyearState, FarmState),
    ...getHarvestOpeations(CropyearState, FarmState),
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
  console.log(RowValues);
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

  const sessionResponse = await axios.post(
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
  await axios.patch(
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
    const response = await axios.get(
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
    axios.post(
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
