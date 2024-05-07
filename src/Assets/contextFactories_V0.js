import { v4 as uuidv4 } from "uuid";

function FARM_CREATOR() {
  return {
    id: "",
    name: "",
    ownerId: "",
    province: "",
    fields: [],
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
    cropYears: [], //"CROPYEAR"
  };
}

function CULTIVATION_OPERATION_CREATOR() {
  return {
    machineObj: "",
    hoursUsed: "",
  };
}

function FERTILIZER_OPERATION_CREATOR() {
  return { machineObj: "", hoursUsed: "", date: "" };
}

function PESTICIDE_OPERATION_CREATOR() {
  return { machineObj: "", hoursUsed: "" };
}

function FERTILIZER_RATE_CREATOR() {
  return { preSeed: "", withSeed: "", postSeed: "" };
}

function CROPYEAR_CREATOR(fieldId, crop) {
  return {
    id: uuidv4(),
    fieldId: fieldId,

    crop: {
      cropYear: "",
      cropThisYear: "",
      cropFrequency: "",
      yield: "",
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
        seed: FERTILIZER_OPERATION_CREATOR(),
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
export { FARM_CREATOR, FIELD_CREATOR, CROPYEAR_CREATOR };
