import { useState } from "react";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../config";

export default function ProcessFile() {
  const [fileData, setFileData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sheets, setSheets] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [formula, setFormula] = useState("sum");
  const [column, setColumn] = useState("");
  const [lookupValue, setLookupValue] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState(null);
  const [workbookRef, setWorkbookRef] = useState(null);

  // 🟦 CLEAN DATA FUNCTION
  const cleanExcelData = (sheetData) => {
    // Remove empty rows
    const rows = sheetData.filter((r) =>
      r.some((c) => c !== null && c !== "" && c !== undefined)
    );

    if (rows.length < 2) return { headers: [], rows: [] };

    // Combine first two header rows
    const header1 = rows[0];
    const header2 = rows[1];

    const finalHeaders = header1.map((h, i) => {
      if (!h || String(h).includes("EMPTY")) return header2[i] || `Column${i}`;
      if (!header2[i] || String(header2[i]).includes("EMPTY")) return h;
      return `${h} ${header2[i]}`.trim();
    });

    // Convert remaining rows to objects
    const cleanedRows = rows.slice(2).map((r) =>
      Object.fromEntries(
        finalHeaders.map((h, i) => {
          let v = r[i];

          if (v === "-" || v === "--" || v === "" || v === null) v = 0;
          if (!isNaN(v) && v !== "") v = Number(v);

          return [h, v];
        })
      )
    );

    return { headers: finalHeaders, rows: cleanedRows };
  };

  // 🟦 HANDLE FILE UPLOAD
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      setWorkbookRef(workbook);
      setSheets(workbook.SheetNames);
      setSelectedSheet(workbook.SheetNames[0]);

      loadSheet(workbook.SheetNames[0], workbook);
    };
    reader.readAsArrayBuffer(file);
  };

  // 🟦 LOAD SELECTED SHEET
  const loadSheet = (sheetName, workbook) => {
    const raw = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      header: 1,
      raw: false,
    });

    const cleaned = cleanExcelData(raw);

    setFileData(cleaned.rows);
    setColumns(cleaned.headers);
  };

  // 🟦 APPLY FORMULA
  const applyFormula = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login again");

    if (formula !== "count" && !column) return alert("Please select a column!");

    const response = await fetch(`${API_BASE_URL}/file/process`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        formula,
        column,
        lookupValue,
        fileName,
        fileData,
      }),
    });

    const data = await response.json();
    setResult(data.result);
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="w-full max-w-[95%] bg-white shadow-lg p-6 rounded-xl">
        {/* HEADER */}
        <h2 className="text-2xl font-bold mb-4">Upload & Process Excel File</h2>

        {/* FILE UPLOAD */}
        <input type="file" onChange={handleFileUpload} className="mb-4" />

        {/* SHEET SELECT */}
        {sheets.length > 1 && (
          <select
            className="border p-2 rounded mb-4 w-full"
            value={selectedSheet}
            onChange={(e) => {
              setSelectedSheet(e.target.value);
              loadSheet(e.target.value, workbookRef);
            }}
          >
            {sheets.map((s, i) => (
              <option key={i}>{s}</option>
            ))}
          </select>
        )}

        {/* FORMULA SELECT */}
        <select
          className="border p-2 rounded w-full mb-3"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
        >
          <option value="sum">SUM</option>
          <option value="average">AVERAGE</option>
          <option value="max">MAX</option>
          <option value="min">MIN</option>
          <option value="count">COUNT</option>
          <option value="countif">COUNTIF</option>
          <option value="vlookup">VLOOKUP</option>
          <option value="match">MATCH</option>
          <option value="cell">CELL VALUE</option>
        </select>

        {/* COLUMN SELECT */}
        {formula !== "count" && (
          <select
            className="border p-2 rounded w-full mb-3"
            value={column}
            onChange={(e) => setColumn(e.target.value)}
          >
            <option value="">Select Column</option>
            {columns.map((col, idx) => (
              <option key={idx} value={col}>
                {col}
              </option>
            ))}
          </select>
        )}

        {/* LOOKUP INPUTS */}
        {(formula === "vlookup" || formula === "match") && (
          <input
            type="text"
            className="border p-2 w-full mb-3"
            placeholder="Enter lookup value"
            value={lookupValue}
            onChange={(e) => setLookupValue(e.target.value)}
          />
        )}

        {formula === "countif" && (
          <input
            type="text"
            className="border p-2 w-full mb-3"
            placeholder="Condition example: >50"
            value={lookupValue}
            onChange={(e) => setLookupValue(e.target.value)}
          />
        )}

        {formula === "cell" && (
          <input
            type="number"
            className="border p-2 w-full mb-3"
            placeholder="Row number (starting from 0)"
            value={lookupValue}
            onChange={(e) => setLookupValue(e.target.value)}
          />
        )}

        {/* APPLY BUTTON */}
        <button
          className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700"
          onClick={applyFormula}
        >
          Apply Formula
        </button>

        {/* RESULT */}
        {result !== null && (
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <h3 className="font-bold text-xl mb-2">Result:</h3>
            <pre className="bg-white p-3 rounded shadow overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {/* PREVIEW TABLE */}
        {fileData.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Preview</h3>

            <div className="w-full overflow-x-auto border rounded-lg">
              <table className="min-w-max border-collapse border">
                <thead className="bg-gray-200">
                  <tr>
                    {columns.map((c, idx) => (
                      <th key={idx} className="border p-2 whitespace-nowrap">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fileData.map((row, i) => (
                    <tr key={i}>
                      {columns.map((c, j) => (
                        <td key={j} className="border p-2 whitespace-nowrap">
                          {row[c]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
