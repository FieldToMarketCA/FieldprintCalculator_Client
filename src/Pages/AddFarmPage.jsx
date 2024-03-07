import Page from "../Components/Page/Page";
import FormTextField from "../Components/FormInputElements/FormTextField";
import FormSelectField from "../Components/FormInputElements/FormSelectField";
import MainButton from "../Components/Buttons/MainButton";

export default function AddFarmPage() {
  return (
    <Page title={"New Farm"} headerBorderColor={"border-[#34a853]"}>
      {/* FARM NAME FIELD  */}
      <FormTextField
        fieldValue={""}
        fieldLabel={"Farm Name"}
        modalTitle={"Farm Name"}
        modalDescription={
          "A farm or farm operation is used as a way to group fields in a way that is useful to the user.If you have multiple fields you can use farms to logically group them. Use a name that is recognizable to you."
        }
      />
      <FormTextField
        fieldValue={""}
        fieldLabel={"Partner Name"}
        modalTitle={"Partner Name"}
        modalDescription={
          "Enter the name of the partner you're associated with. This will allow them to associate your data in their project while keeping your privacy. They will only have access to aggregated data of many farmers, your data will be anonymized."
        }
      />
      <FormSelectField
        valuesArray={CanadianProvinces}
        fieldLabel={"Province Name"}
        fieldValue={""}
        helperText={"Please select your province"}
        modalTitle={"Province"}
        modalDescription={
          "Please Select the province where you have the majority of your business operations."
        }
      />

      {/* CONTROLS */}
      <div className="w-full flex">
        <MainButton text={"Save and Add Field"} onClick={console.log} />
        <div className="ml-4">
          <MainButton text={"Cancel"} onClick={console.log} />
        </div>
      </div>
    </Page>
  );
}

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
