import axios from "axios";
import { Navigate } from "react-router-dom";

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

// axiosInstance.js
// myLogOut
const logout = () => {
  localStorage.setItem("user", null);
  // Navigate("/", { replace: true });
  window.location.href = "/";
  window.location.reload();
};

const axiosInstance = axios.create({
  // baseURL: 'https://your-api-url.com',
  // You can add other default settings here if needed
});

axiosInstance.interceptors.response.use(
  (response) => response, // If the response is successful, just return the response
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        logout(); // Call the logout function
      }
    }
    return Promise.reject(error); // Always reject the error to handle it in your components
  }
);

export {
  GetSetFarm,
  GetSetField,
  GetSetFieldWithCropYears,
  GetSetCropYear,
  GetSetAnalysis,
  axiosInstance,
};
