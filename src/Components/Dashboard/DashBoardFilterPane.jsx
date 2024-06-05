import { Button, TextField } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";

function DropdownFilter({
  label,
  values,
  activeFilters,
  setActiveFilters,
  filterKey,
}) {
  return (
    <div className="w-full ">
      <p>{label}</p>
      <TextField
        className="w-full bg-white"
        select
        hiddenLabel
        value={activeFilters[filterKey]}
        variant="outlined"
        onChange={(e) => {
          let tmpEntry = {};
          tmpEntry[filterKey] = e.target.value;
          setActiveFilters({ ...activeFilters, ...tmpEntry });
        }}
      >
        {values.map((option, index) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
}
//  sum fieldSizes
// Keep a set of Crops and join into ", "
// keep a set with the name of the fields as well as a set with the name of the farms
// and keep an array with the years to get min and max
export default function DashBoardFilterPane({
  setFilteredData,
  filters,
  tableData,
}) {
  const [activeFilters, setActiveFilters] = useState({
    farmFilter: "",
    fieldFilter: "",
    cropYearFilter: "",
    cropFilter: "",
  });

  useEffect(() => {
    const newFilteredData = tableData.filter((row) => {
      if (
        activeFilters["farmFilter"] !== "" &&
        row.farmName !== activeFilters["farmFilter"]
      )
        return false;
      if (
        activeFilters["fieldFilter"] !== "" &&
        row.fieldName !== activeFilters["fieldFilter"]
      )
        return false;

      if (
        activeFilters["cropYearFilter"] !== "" &&
        "cropYear" in row &&
        typeof row.cropYear === "number" &&
        row.cropYear.toString() !== activeFilters["cropYearFilter"]
      )
        return false;

      if (
        activeFilters["cropFilter"] !== "" &&
        row.crop !== activeFilters["cropFilter"]
      )
        return false;

      return true;
    });
    // console.log(tableData, newFilteredData, "sup ");
    setFilteredData(newFilteredData);
  }, [tableData, activeFilters]);

  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-5 gap-4 bg-[#EEEEEE] py-2 px-[16px]">
      <DropdownFilter
        label={"Farm"}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        filterKey={"farmFilter"}
        values={filters !== null ? Object.keys(filters.farmsFilters) : []}
      />
      <DropdownFilter
        label={"Field"}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        filterKey={"fieldFilter"}
        values={filters !== null ? Object.keys(filters.fieldsFilters) : []}
      />
      <DropdownFilter
        label={"Year"}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        filterKey={"cropYearFilter"}
        values={filters !== null ? Object.keys(filters.cropYearsFilters) : []}
      />
      <DropdownFilter
        label={"Crop"}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        filterKey={"cropFilter"}
        values={filters !== null ? Object.keys(filters.cropsFilters) : []}
      />
      <div className="self-end">
        <Button
          sx={{
            color: "#666666",
            border: "solid 1px #666666",
            "&:hover": { border: "solid 1px #666666" },
          }}
          variant="outlined"
          onClick={() =>
            setActiveFilters({
              farmFilter: "",
              fieldFilter: "",
              cropYearFilter: "",
              cropFilter: "",
            })
          }
        >
          {" "}
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
