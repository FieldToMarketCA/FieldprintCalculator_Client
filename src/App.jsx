// import logo from "./logo.svg";
// import "./App.css";
import { useRef, useState } from "react";
import axios from "axios";

// import "dotenv/config";
const TOKEN =
  "eyJ0eXAiOiJKV1QiLCJub25jZSI6IjFOb0tUWU9FdUxBR2xmNkdTNk16TXFVbzdvb284RDBma3Y5Y0gwV1VrZ1kiLCJhbGciOiJSUzI1NiIsIng1dCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSIsImtpZCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9kM2E5N2JmMi1jZWZiLTRhNjktYWFjZi0xODVkMjBkMDI4ZWEvIiwiaWF0IjoxNzA5MTQwMzQ5LCJuYmYiOjE3MDkxNDAzNDksImV4cCI6MTcwOTIyNzA0OSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQUFpQkxaRS8xMEs0eHpSc2swUFZvUWdwTFVBOUJ6NndrMHdPTG1ZOC9LWStLM3RCQkpmeFZqYThlVlZpd3kzTXciLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6IlJleW5vc28iLCJnaXZlbl9uYW1lIjoiRmVsaXgiLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiIyNjA0OjNkMDg6OTU4Nzo0ZDAwOjNkN2Q6YTNjZDplMTAzOmQ4OTAiLCJuYW1lIjoiRmVsaXggUmV5bm9zbyIsIm9pZCI6ImRhMGMxOTg5LTI5MjAtNDk4Ny05OGZjLTQxMWE5YWM3NzdhYyIsInBsYXRmIjoiNSIsInB1aWQiOiIxMDAzMjAwMzU5RkYxRTIxIiwicmgiOiIwLkFjb0E4bnVwMF92T2FVcXF6eGhkSU5BbzZnTUFBQUFBQUFBQXdBQUFBQUFBQUFENkFFNC4iLCJzY3AiOiJEaXJlY3RvcnkuUmVhZC5BbGwgRGlyZWN0b3J5LlJlYWRXcml0ZS5BbGwgRmlsZXMuUmVhZC5BbGwgRmlsZXMuUmVhZFdyaXRlIEZpbGVzLlJlYWRXcml0ZS5BbGwgb3BlbmlkIHByb2ZpbGUgVXNlci5SZWFkIFVzZXIuUmVhZC5BbGwgVXNlci5SZWFkQmFzaWMuQWxsIFVzZXIuUmVhZFdyaXRlIFVzZXIuUmVhZFdyaXRlLkFsbCBlbWFpbCIsInN1YiI6Ikp1VUdBcjg5cFlpUUF6RU03bnVMcFB1U2htQkF1cEluenFyZEl0Q1R5MUkiLCJ0ZW5hbnRfcmVnaW9uX3Njb3BlIjoiTkEiLCJ0aWQiOiJkM2E5N2JmMi1jZWZiLTRhNjktYWFjZi0xODVkMjBkMDI4ZWEiLCJ1bmlxdWVfbmFtZSI6IkZlbGl4UmV5bm9zb0BGeFJTb2Z0d2FyZS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJGZWxpeFJleW5vc29ARnhSU29mdHdhcmUub25taWNyb3NvZnQuY29tIiwidXRpIjoieDg2VTZwVDlVMHlDVnRyemx4YWlBUSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX3NzbSI6IjEiLCJ4bXNfc3QiOnsic3ViIjoiejloWTJOelA3LUdrbWZwakszM2pFZ0pDeGZwQkZSVW84YzR3TlhRRDRMVSJ9LCJ4bXNfdGNkdCI6MTcwOTA0ODgzM30.MKNwamVrV-WPez2PnmHikBr75a33D8jTVIL53YQaq9DYNjc9op2W4k_Twe8HWkcAoHj51vnjqYDKxW3XJnZhmE92TqYqAUx6KghvEP7ihhDvjcElUWYQx-vOmcl_HRFULCbLFJSL2WmnYXc4PgzPQ8rI_ois_sm4XZgdaneznI1jFS1fuELwLzxBjQ2bls1iWfaR_k5xyeck9jsqNPouLF_96T-hCcTqDEpwC7CqLHzWGdiHOnUIMO8jxapafDOgcP5Lrvgg2xdzGLQey9oTzdWyKdCX7pehOWm6Y2hlOJ4_Oar8v2Iie5WSO_RRV4xn_GSDPFRuoUBqOR_mrT8nnQ";
function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [result, setResult] = useState("");
  const param1Ref = useRef();
  const param2Ref = useRef();

  async function runWorkbook() {
    const param1 = param1Ref.current.value;
    const param2 = param2Ref.current.value;

    if (!(param1 && param2)) return;

    await axios.patch(
      `https://graph.microsoft.com/v1.0/me/drive/root:/basicAdditionBook.xlsx:/workbook/worksheets/Sheet1/range(address='A2:B2')`,
      {
        values: [[param1, param2]],
      },
      {
        headers: {
          Authorization: "Bearer " + TOKEN,
          "Content-Type": "application/json",
        },
      }
    );

    setTimeout(async () => {
      const response = await axios.get(
        `https://graph.microsoft.com/v1.0/me/drive/root:/basicAdditionBook.xlsx:/workbook/worksheets/Sheet1/range(address='C2:C2')`,

        {
          headers: {
            Authorization: "Bearer " + TOKEN,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.data.values[0][0];

      setResult(data);
    }, 3000);
  }

  return (
    <div className="App">
      <h1>Minimal MVP</h1>
      <input ref={param1Ref} type="text" placeholder="Param 1" />
      <input ref={param2Ref} type="text" placeholder="Param 2" />

      <p>Result is: {result}</p>
      <button onClick={runWorkbook}> Calculate</button>
    </div>
  );
}

export default App;
