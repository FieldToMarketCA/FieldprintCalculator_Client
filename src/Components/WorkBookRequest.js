import axios from "axios";

async function runWorkbook() {
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
      values: [values],
    },
    {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
        "Content-Type": "application/json",
        "Workbook-Session-Id": sessionResponse.data.id,
      },
    }
  );

  setTimeout(async () => {
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/me/drive/root:/FieldprintCalculatorV.3-EXPERIMENT.xlsx:/workbook/worksheets/Report Data/range(address='A2:AM2')`,
      {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_TOKEN,
          "Content-Type": "application/json",
          "Workbook-Session-Id": sessionResponse.data.id,
        },
      }
    );

    const data = await response.data.values[0][0];
    console.log(response.data.values);
  }, 10000);
}
