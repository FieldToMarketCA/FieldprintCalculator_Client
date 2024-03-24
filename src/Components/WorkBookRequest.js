import axios from "axios";

function convertContextToRow(
  FarmContextState,
  FieldContextState,
  CropyearContextState
) {
  const RowValues = [
    "12511:Home east:2021:Winter Wheat",
    "12511",
    "Home east",
    "0",
    "0",
    "0",
    "0",
    "0",
    "2021",
    "Winter Wheat",
    "every 4 years",
    "111",
    "bu/ac",
    "Soybeans",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "250",
    "horsepower",
    "5",
    "0",
    "0",
    "125",
    "0",
    "0",
    "18",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "155",
    "horsepower",
    "1",
    "0",
    "155",
    "horsepower",
    "1",
    "0",
    "155",
    "horsepower",
    "1",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "280",
    "horsepower",
    "8",
    "0",
    "1.6",
    "0",
    "0",
    "14.5",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "0",
    "80",
    "R",
    "C",
    "None",
    "Brown",
    "Clay Loam",
    "Minimum Till",
    "Minimum Till",
    "0",
    "0",
    "0",
    "0",
    "Annual >20 years",
    "0",
    "0",
    "0",
    "0",
    "558",
    "0",
    "Huron east",
    "ON",
    "",
    "4243",
    "74243",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ];
  return RowValues;
}

async function generateResults(
  FarmContextState,
  FieldContextState,
  CropyearContextState,
  setReportData
) {
  const RowValues = convertContextToRow(
    FarmContextState,
    FieldContextState,
    CropyearContextState
  );
  const sessionResponse = await axios.post(
    `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/createSession`,
    {
      persistChanges: false,
    },
    {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        "Content-Type": "application/json",
      },
    }
  );

  console.log(sessionResponse.data.id, "sessionResponseResult");

  // WRITE DOCUMENT
  await axios.patch(
    `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/worksheets/Data/range(address='A2:EJ2')`,
    {
      values: [RowValues],
    },
    {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        "Content-Type": "application/json",
        "Workbook-Session-Id": sessionResponse.data.id,
      },
    }
  );

  // GET RESULTS AND CLOSE SESSION
  setTimeout(async () => {
    // GET
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/worksheets/Report Data/range(address='A1:AM2')`,
      {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
          "Content-Type": "application/json",
          "Workbook-Session-Id": sessionResponse.data.id,
        },
      }
    );

    //  CLOSE SESSION
    axios.post(
      `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/closeSession`,
      {
        persistChanges: false,
      },
      {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
          "Content-Type": "application/json",
          "Workbook-Session-Id": sessionResponse.data.id,
        },
      }
    );

    const data = await response.data.values[0][0];
    setReportData(response.data.values);
    console.log(response.data.values);
  }, 10000);
}

export { generateResults };
