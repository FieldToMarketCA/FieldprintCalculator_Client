import { v4 as uuidv4 } from "uuid";

function FARM_CREATOR(name, ownerId, province, fields) {
  return {
    id: uuidv4(),
    name: name,
    ownerId: ownerId,
    province: province,
    fields: [],
    addField() {
      this.fields.append(FIELD_CREATOR());
    },
  };
}

function FIELD_CREATOR(
  farmId,
  name,
  surfaceForm,
  slopeClass,
  soilType,
  surfaceSoilTexture,
  tillageRegime,
  previousTillageRegime,
  regimeChangeDate
) {
  return {
    id: uuidv4(),
    farmId: farmId,
    name: name,
    surfaceForm: surfaceForm,
    slopeClass: slopeClass,
    soilType: soilType,
    surfaceSoilTexture: surfaceSoilTexture,
    tillageRegime: tillageRegime,
    previousTillageRegime: previousTillageRegime,
    regimeChangeDate: regimeChangeDate,
    cropYears: [], //"CROPYEAR"
  };
}

function CULTIVATION_OPERATION_CREATOR(machineId, hoursUsed) {
  return {
    machineId: machineId,
    hoursUsed: hoursUsed,
  };
}

function FERTILIZER_OPERATION_CREATOR(machineId, hoursUsed, date) {
  return { machineId: machineId, hoursUsed: hoursUsed, date: date };
}

function PESTICIDE_OPERATION_CREATOR(machineId, hoursUsed) {
  return { machineId: machineId, hoursUsed: hoursUsed };
}

function FERTILIZER_RATE_CREATOR(preSeed, withSeed, postSeed) {
  return { preSeed: preSeed, withSeed: withSeed, postSeed: postSeed };
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
      cultivations: [], // CULTIVATION_OPERATION, "..."
      fertilizerApplications: {
        preSeed: FERTILIZER_OPERATION_CREATOR(0, 0, 0),
        seed: FERTILIZER_OPERATION_CREATOR(0, 0, 0),
        postSeed: FERTILIZER_OPERATION_CREATOR(0, 0, 0),
      },
      fertilizerRates: {
        N: FERTILIZER_RATE_CREATOR(),
        P: FERTILIZER_RATE_CREATOR(),
        K: FERTILIZER_RATE_CREATOR(),
        S: FERTILIZER_RATE_CREATOR(),
        M: FERTILIZER_RATE_CREATOR(),
      },
      pesticidesApplications: [PESTICIDE_OPERATION_CREATOR(), "..."],
    },

    harvest: {
      swather: { machineId: "UUID", hoursUsed: "Float" },
      combine: { machineId: "UUID", hoursUsed: "Float", avgSpeed: "Float" },
      cropDryingType: "Enum[String]",
      cropDryingFuel: "Enum[String]",
      moisture: {
        beforeDrying: "Float",
        afterDrying: "Float",
      },
    },
  };
}
