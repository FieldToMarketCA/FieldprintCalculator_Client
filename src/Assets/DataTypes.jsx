const CanadianProvinces = [
  {
    value: "AB",
    label: "Alberta",
  },
  {
    value: "BC",
    label: "British Columbia",
  },
  {
    value: "MB",
    label: "Manitoba",
  },
  {
    value: "NB",
    label: "New Brunswick",
  },
  {
    value: "NL",
    label: "Newfoundland and Labrador",
  },
  {
    value: "NS",
    label: "Nova Scotia",
  },
  {
    value: "NT",
    label: "Northwest Territories",
  },
  {
    value: "NU",
    label: "Nunavut",
  },
  {
    value: "ON",
    label: "Ontario",
  },
  {
    value: "PE",
    label: "Prince Edward Island",
  },
  {
    value: "QC",
    label: "Quebec",
  },
  {
    value: "SK",
    label: "Saskatchewan",
  },
  {
    value: "YT",
    label: "Yukon",
  },
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
  { value: "A", label: "A = [0 - 0.5)" },
  { value: "B", label: "B = [0.5 - 2.0)" },
  { value: "C", label: "C = [2.0 - 5.0)" },
  { value: "D", label: "D = [5.0 - 9.0)" },
  { value: "E", label: "E = [9.0 - 15.0)" },
  { value: "F", label: "F = [15.0 - 30.0)" },
];

const ObservedWindErosionTypes = [
  { value: null, label: "None" },
  { value: 0, label: "Very Slight" },
  { value: 1, label: "Slight" },
  { value: 2, label: "Moderate" },
  { value: 3, label: "Severe" },
];
const SoilTypes = [
  { value: 0, label: "Brown" },
  { value: 1, label: "Dark Brown" },
  { value: 2, label: "Black" },
];

const SurfaceSoilTextureTypes = [
  { value: 0, label: "Clay" },
  { value: 1, label: "Sand" },
  { value: 2, label: "Loam" },
  { value: 3, label: "Sandy Loam" },
  { value: 4, label: "Silty Clay" },
  { value: 5, label: "Sandy Clay Loam" },
  { value: 6, label: "Silty Clay Loam" },
  { value: 7, label: "Clay Loam" },
  { value: 8, label: "Silt Loam" },
  { value: 9, label: "Sandy Loam" },
  { value: 10, label: "Loamy Sand" },
];

const TillageRegimeTypes = [
  { value: 0, label: "Zero Till" },
  { value: 1, label: "Minimum Till" },
  { value: 3, label: "Conventional Till" },
];
export {
  CanadianProvinces,
  SurfaceFormTypes,
  SlopeClassTypes,
  ObservedWindErosionTypes,
  SoilTypes,
  SurfaceSoilTextureTypes,
  TillageRegimeTypes,
};
