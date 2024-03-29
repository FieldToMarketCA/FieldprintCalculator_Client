const CanadianProvinces = [
  {
    value: "AB",
    label: "Alberta",
  },
  // {
  //   value: "BC",
  //   label: "British Columbia",
  // },
  {
    value: "MB",
    label: "Manitoba",
  },
  // {
  //   value: "NB",
  //   label: "New Brunswick",
  // },
  // {
  //   value: "NL",
  //   label: "Newfoundland and Labrador",
  // },
  // {
  //   value: "NS",
  //   label: "Nova Scotia",
  // },
  // {
  //   value: "NT",
  //   label: "Northwest Territories",
  // },
  // {
  //   value: "NU",
  //   label: "Nunavut",
  // },
  {
    value: "ON",
    label: "Ontario",
  },
  // {
  //   value: "PE",
  //   label: "Prince Edward Island",
  // },
  {
    value: "QC",
    label: "Quebec",
  },
  {
    value: "SK",
    label: "Saskatchewan",
  },
  // {
  //   value: "YT",
  //   label: "Yukon",
  // },
];

const SurfaceFormTypes = [
  {
    value: "I",
    label: "Inclined & Dissected",
  },
  {
    value: "H",
    label: "Hummocky, Knoll & Kettle",
  },
  {
    value: "L",
    label: "Level",
  },
  {
    value: "R",
    label: "Rolling",
  },
  {
    value: "U",
    label: "Undulating",
  },
];

const SlopeClassTypes = [
  { value: "A", label: "A = (0 - 0.5)" },
  { value: "B", label: "B = (0.5 - 2.0)" },
  { value: "C", label: "C = (2.0 - 5.0)" },
  { value: "D", label: "D = (5.0 - 9.0)" },
  { value: "E", label: "E = (9.0 - 15.0)" },
  { value: "F", label: "F = (15.0 - 30.0)" },
];

const ObservedWindErosionTypes = [
  { value: null, label: "None" },
  { value: "Very Slight", label: "Very Slight" },
  { value: "Slight", label: "Slight" },
  { value: "Moderate", label: "Moderate" },
  { value: "Severe", label: "Severe" },
];
const SoilTypes = [
  { value: "Brown", label: "Brown" },
  { value: "Dark Brown", label: "Dark Brown" },
  { value: "Black", label: "Black" },
];

const SurfaceSoilTextureTypes = [
  { value: "Clay", label: "Clay" },
  { value: "Sand", label: "Sand" },
  { value: "Loam", label: "Loam" },
  { value: "Sandy Loam", label: "Sandy Loam" },
  { value: "Silty Clay", label: "Silty Clay" },
  { value: "Sandy Clay Loam", label: "Sandy Clay Loam" },
  { value: "Silty Clay Loam", label: "Silty Clay Loam" },
  { value: "Clay Loam", label: "Clay Loam" },
  { value: "Silt Loam", label: "Silt Loam" },
  { value: "Sandy Loam", label: "Sandy Loam" },
  { value: "Loamy Sand", label: "Loamy Sand" },
];

const TillageRegimeTypes = [
  { value: "Zero Till", label: "Zero Till" },
  { value: "Minimum Till", label: "Minimum Till" },
  { value: "Conventional Till", label: "Conventional Till" },
];

const CropYearCropTypes = [
  { value: "Barley", label: "Barley" },
  { value: "Corn", label: "Corn" },
  { value: "Durum Wheat", label: "Durum Wheat" },
  { value: "Oats", label: "Oats" },
  { value: "Rye", label: "Rye" },
  { value: "Spring Wheat", label: "Spring Wheat" },
  { value: "Winter Wheat", label: "Winter Wheat" },
  { value: "Canola", label: "Canola" },
  { value: "Mustard", label: "Mustard" },
  { value: "Chickpeas", label: "Chickpeas" },
  { value: "Lentils", label: "Lentils" },
  { value: "Peas", label: "Peas" },
  { value: "Soybeans", label: "Soybeans" },
  { value: "Flax", label: "Flax" },
];

const CropYearCropFrequencyTypes = [
  { value: "Continuous", label: "Continuous" },
  { value: "Every 5 years", label: "Every 5 years" },
  { value: "Every 4 years", label: "Every 4 years" },
  { value: "Every 3 years", label: "Every 3 years" },
  { value: "Every 2 years", label: "Every 2 years" },
  { value: "Two out of 3 years", label: "Two out of 3 years" },
  { value: "Two out of 5 years", label: "Two out of 5 years" },
];

const CropYearCropYieldUnitTypes = [
  { value: "bu/ac", label: "bu/ac" },
  { value: "tonne/ac", label: "tonne/ac" },
  { value: "tonne/ha", label: "tonne/ha" },
];
const FertilizerTypes = [
  { value: "N", label: "Nitrogen (N)" },
  { value: "P", label: "Phosphorus (P)" },
  { value: "K", label: "Potassium (K)" },
  { value: "S", label: "Sulphur (S)" },
  { value: "M", label: "Micronutrients" },
];

const CropYearCropDryingType = [
  { value: "Batch-in-Bin", label: "Batch-in-Bin" },
  { value: "High Temperature with Air", label: "High Temperature with Air" },
  {
    value: "High Temperature without Air",
    label: "High Temperature without Air",
  },
  { value: "Low Temperature", label: "Low Temperature" },
  { value: "Natural Air", label: "Natural Air" },
];

const CropYearCropDryingFuel = [
  { value: "Natural Gas", label: "Natural Gas" },
  { value: "Propane", label: "Propane" },
];

export {
  CropYearCropDryingType,
  CropYearCropDryingFuel,
  FertilizerTypes,
  CropYearCropTypes,
  CropYearCropFrequencyTypes,
  CropYearCropYieldUnitTypes,
  CanadianProvinces,
  SurfaceFormTypes,
  SlopeClassTypes,
  ObservedWindErosionTypes,
  SoilTypes,
  SurfaceSoilTextureTypes,
  TillageRegimeTypes,
};
