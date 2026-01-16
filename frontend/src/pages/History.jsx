import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const response = await fetch(`${API_BASE_URL}/file/history`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setHistory(data);
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">History</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">File Name</th>
            <th className="p-2 border">Formula</th>
            <th className="p-2 border">Column</th>
            <th className="p-2 border">Result</th>
          </tr>
        </thead>
        <tbody>
          {history.map((item, idx) => (
            <tr key={idx} className="text-center">
              <td className="border p-2">{item.fileName}</td>
              <td className="border p-2">{item.formula}</td>
              <td className="border p-2">{item.column}</td>
              <td className="border p-2">
                {typeof item.result === "object"
                  ? JSON.stringify(item.result)
                  : item.result}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
