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

export { GetSetFarm, GetSetField, GetSetCropYear };