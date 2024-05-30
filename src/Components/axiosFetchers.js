import axios from "axios";

async function GetSetFarm(farmId, user, farmContext) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/farms/${farmId}`,
    {
      headers: {
        token: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    }
  );
  const machinesResponse = await axios.get(
    `${process.env.REACT_APP_API_URL}/farms/${farmId}/machines`,
    {
      headers: {
        token: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    }
  );
  farmContext.setter({
    ...response.data.data,
    machines: machinesResponse.data,
  });
}

async function GetSetField(farmId, fieldId, user, fieldContext) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/farms/${farmId}/fields/${fieldId}`,
    {
      headers: {
        token: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    }
  );
  fieldContext.setter(response.data);
}
async function GetSetFieldWithCropYears(farmId, fieldId, user, fieldContext) {
  const fieldResponse = await axios.get(
    process.env.REACT_APP_API_URL + "/farms/" + farmId + "/fields/" + fieldId,
    {
      headers: {
        token: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    }
  );
  const cropyearsResponse = await axios.get(
    process.env.REACT_APP_API_URL +
      "/farms/" +
      farmId +
      "/fields/" +
      fieldId +
      "/cropyears",
    {
      headers: {
        token: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    }
  );
  fieldContext.setter({
    ...fieldResponse.data,
    cropYears: cropyearsResponse.data,
  });
}

async function GetSetCropYear(
  farmId,
  fieldId,
  cropyearId,
  user,
  cropYearContext
) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/farms/${farmId}/fields/${fieldId}/cropyears/${cropyearId}`,
    {
      headers: {
        token: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    }
  );
  cropYearContext.setter(response.data);
}

async function GetSetAnalysis(cropyearId, user, reportDataConext) {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/cropyears/${cropyearId}/analysis`,
    {
      headers: {
        token: "Bearer " + user.token,
        "Content-Type": "application/json",
      },
    }
  );

  reportDataConext.setter(response.data);
}

export {
  GetSetFarm,
  GetSetField,
  GetSetFieldWithCropYears,
  GetSetCropYear,
  GetSetAnalysis,
};
