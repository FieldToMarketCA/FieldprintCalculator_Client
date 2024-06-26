import { v4 as uuidv4 } from "uuid";

function FARM_CREATOR() {
  return {
    id: "",
    name: "",
    ownerId: "",
    province: "",
    fields: [],
    machines: [
      // {
      //   type: "SWATHER",
      //   name: "Swather 1",
      //   HP: 800,
      //   fuelUse: null,
      //   defaultAcreHour: 2,
      // },
      // {
      //   type: "TRACTOR",
      //   name: "My Little Tractor",
      //   HP: 800,
      //   fuelUse: null,
      //   defaultAcreHour: 2,
      // },
      // {
      //   type: "COMBINE",
      //   name: "Combine 1",
      //   HP: 800,
      //   fuelUse: null,
      //   defaultAcreHour: 2,
      // },
      // {
      //   type: "SPRAYER",
      //   name: "Sprayer 1",
      //   HP: 150,
      //   fuelUse: null,
      //   defaultAcreHour: 30,
      // },
    ],
    partner: "",
    addField() {
      this.fields.push(FIELD_CREATOR());
    },
  };
}

function FIELD_CREATOR() {
  return {
    id: "",
    farmId: "",
    name: "",
    fieldSize: "",
    fieldAddress: "",
    surfaceForm: "",
    slopeClass: "",
    soilType: "",
    surfaceSoilTexture: "",
    tillageRegime: "",
    previousTillageRegime: "",
    regimeChangeDate: "",
    Ecodistrict: "",
    SLCpolygon: "",
    cropYears: [
      {
        _id: {
          $oid: "66426670ba452403761a24b2",
        },
        fieldId: "6639511970e53a04a416313f",
        crop: {
          cropYear: 0,
          cropThisYear: "BARLEY",
          cropFrequency: "Continuous",
          yieldValue: 0,
          yieldUnits: "bu/ac",
          previousCrop: "BARLEY",
        },
        fieldOperations: {
          cultivations: [
            {
              machineId: "string",
              hoursUsed: 0,
            },
          ],
          fertilizerApplications: {
            preSeed: {
              machineId: "string",
              hoursUsed: 0,
              date: "string",
            },
            withSeed: {
              machineId: "string",
              hoursUsed: 0,
              date: "string",
            },
            postSeed: {
              machineId: "string",
              hoursUsed: 0,
              date: "string",
            },
          },
          fertilizerRates: {
            N: {
              preSeed: 0,
              withSeed: 0,
              postSeed: 0,
            },
            P: {
              preSeed: 0,
              withSeed: 0,
              postSeed: 0,
            },
            K: {
              preSeed: 0,
              withSeed: 0,
              postSeed: 0,
            },
            S: {
              preSeed: 0,
              withSeed: 0,
              postSeed: 0,
            },
            M: {
              preSeed: 0,
              withSeed: 0,
              postSeed: 0,
            },
          },
          pesticidesApplications: [
            {
              machineId: "string",
              hoursUsed: 0,
            },
          ],
        },
        harvest: {
          swather: {
            machineId: "string",
            hoursUsed: 0,
          },
          combine: {
            machineId: "string",
            hoursUsed: 0,
            avgSpeed: 0,
          },
          cropDryingType: "Batch-in-Bin",
          cropDryingFuel: "Natural Gas",
          moisture: {
            beforeDrying: 0,
            afterDrying: 0,
          },
        },
      },
    ], //"CROPYEAR"
  };
}

function CULTIVATION_OPERATION_CREATOR() {
  return {
    machineObj: "",
    hoursUsed: "",
  };
}

function FERTILIZER_OPERATION_CREATOR() {
  return { machineId: "", machineObj: "", hoursUsed: "", date: "" };
}

function PESTICIDE_OPERATION_CREATOR() {
  return { machineObj: "", hoursUsed: "" };
}

function FERTILIZER_RATE_CREATOR() {
  return { preSeed: "0", withSeed: "0", postSeed: "0" };
}

function CROPYEAR_CREATOR(fieldId, crop) {
  return {
    id: "",
    fieldId: fieldId,

    crop: {
      cropYear: "",
      cropThisYear: "",
      cropFrequency: "",
      yieldValue: "",
      yieldUnits: "",
      previousCrop: "",
    },

    fieldOperations: {
      cultivations: [
        CULTIVATION_OPERATION_CREATOR(),
        CULTIVATION_OPERATION_CREATOR(),
        CULTIVATION_OPERATION_CREATOR(),
        CULTIVATION_OPERATION_CREATOR(),
      ],
      fertilizerApplications: {
        preSeed: FERTILIZER_OPERATION_CREATOR(),
        withSeed: FERTILIZER_OPERATION_CREATOR(),
        postSeed: FERTILIZER_OPERATION_CREATOR(),
      },
      fertilizerRates: {
        N: FERTILIZER_RATE_CREATOR(),
        P: FERTILIZER_RATE_CREATOR(),
        K: FERTILIZER_RATE_CREATOR(),
        S: FERTILIZER_RATE_CREATOR(),
        M: FERTILIZER_RATE_CREATOR(),
      },
      pesticidesApplications: [
        PESTICIDE_OPERATION_CREATOR(),
        PESTICIDE_OPERATION_CREATOR(),
        PESTICIDE_OPERATION_CREATOR(),
        PESTICIDE_OPERATION_CREATOR(),
        PESTICIDE_OPERATION_CREATOR(),
      ],
    },

    harvest: {
      swather: { machineObj: "", hoursUsed: "" },
      combine: { machineObj: "", hoursUsed: "", avgSpeed: "" },
      cropDryingType: "",
      cropDryingFuel: "",
      moisture: {
        beforeDrying: "",
        afterDrying: "",
      },
    },
  };
}

// const EmptyReportData = [
//   [
//     "Unique ID",
//     "Ecodistrict",
//     "Province",
//     "Soil Type",
//     "Soil Texture",
//     "Surface Form",
//     "Slope",
//     "Year",
//     "Crop",
//     "Total Nitrogen (kg/ha)",
//     "Total Phosphorus (kg/ha)",
//     "Total Potassium (kg/ha)",
//     "Total Sulfur (kg/ha)",
//     "Total Other Fertilizer (kg/ha)",
//     "Land Use Efficiency (ha/tonne)",
//     "Provincial Land Use Efficiency (ha/tonne)",
//     "Land Use Efficiency Index",
//     "Energy Use GJ/tonne",
//     "Provincial Energy Use (GJ/tonne)",
//     "Energy Use Index",
//     "GHG Emissions (tCO2/tonne)",
//     "Provincial GHG Emissions (tCO2/tonne)",
//     "Climate Impact Index",
//     "Soil Erosion Risk Mg/ha/yr",
//     "Provincial Soil Erosion Risk Mg/ha/yr",
//     "Soil Erosion Index",
//     "Provincial Soil Loss",
//     "Provincial Yield (t/ha)",
//     "Provincial Land Use",
//     "Provincial Energy Use GJ/tonne crop",
//     "Provincial Climate Impact",
//     "Provincial Fieldwork Climate Impact (tCO2E/tcrop)",
//     "Provincial NonFieldwork Climate Impact (tCO2E/tcrop)",
//     "Provincial N-Fertilizer (tCO2e/tcrop)",
//     "Provincial Crop Residue (tCO2e/tcrop)",
//     "Provincial Leaching (tCO2e/tcrop)",
//     "Provincial Volatilization (tCO2e/tcrop)",
//     "Total GHG emissions (tCO2e/tcrop)",
//     "Column1",
//   ],
//   [
//     "",
//     0,
//     "",
//     "",
//     "",
//     "",
//     "",
//     0,
//     "",
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     0,
//     "",
//   ],
// ];
const EmptyReportData = [
  [
    "Unique ID",
    "Ecodistrict",
    "Province",
    "Soil Type",
    "Soil Texture",
    "Surface Form",
    "Slope",
    "Year",
    "Crop",
    "Total Nitrogen (kg/ha)",
    "Total Phosphorus (kg/ha)",
    "Total Potassium (kg/ha)",
    "Total Sulfur (kg/ha)",
    "Total Other Fertilizer (kg/ha)",
    "Land Use Efficiency (ha/tonne)",
    "Provincial Land Use Efficiency (ha/tonne)",
    "Land Use Efficiency Index",
    "Energy Use GJ/tonne",
    "Provincial Energy Use (GJ/tonne)",
    "Energy Use Index",
    "GHG Emissions (tCO2/tonne)",
    "Provincial GHG Emissions (tCO2/tonne)",
    "Climate Impact Index",
    "Soil Erosion Risk Mg/ha/yr",
    "Provincial Soil Erosion Risk Mg/ha/yr",
    "Soil Erosion Index",
    "Provincial Soil Loss",
    "Provincial Yield (t/ha)",
    "Provincial Land Use",
    "Provincial Energy Use GJ/tonne crop",
    "Provincial Climate Impact",
    "Provincial Fieldwork Climate Impact (tCO2E/tcrop)",
    "Provincial NonFieldwork Climate Impact (tCO2E/tcrop)",
    "Provincial N-Fertilizer (tCO2e/tcrop)",
    "Provincial Crop Residue (tCO2e/tcrop)",
    "Provincial Leaching (tCO2e/tcrop)",
    "Provincial Volatilization (tCO2e/tcrop)",
    "Total GHG emissions (tCO2e/tcrop)",
    "Column1",
  ],
  [
    "",
    0,
    "",
    "",
    "",
    "",
    "",
    0,
    "",
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    "",
  ],
];

export {
  FARM_CREATOR,
  FIELD_CREATOR,
  CROPYEAR_CREATOR,
  FERTILIZER_OPERATION_CREATOR,
  EmptyReportData,
};
