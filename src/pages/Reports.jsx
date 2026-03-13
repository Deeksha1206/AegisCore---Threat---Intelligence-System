import { useState } from "react";

export default function Reports() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReport = async () => {
    setLoading(true);
    setError(null);
    setReport(null);

    try {
      const response = await fetch("http://localhost:8000/generate-report");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate report");
      }

      console.log("Report Data:", data);
      setReport(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }

    setLoading(false);
  };

  const downloadReport = () => {
    if (!report) return;

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "sentinelai-report.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 text-white space-y-6">
      <h2 className="text-2xl text-cyan-400 font-bold">
        📊 Incident Reports
      </h2>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={fetchReport}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg transition"
        >
          Generate Report
        </button>

        <button
          onClick={downloadReport}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
        >
          Download Report
        </button>
      </div>

      {/* Report Section */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg min-h-[300px]">
        {loading && (
          <p className="text-gray-400 animate-pulse">
            Generating report...
          </p>
        )}

        {error && (
          <p className="text-red-500">
            ❌ {error}
          </p>
        )}

        {!report && !loading && !error && (
          <p className="text-gray-400">
            Click "Generate Report" to view incident analysis.
          </p>
        )}

        {report && (
          <pre className="text-white text-sm overflow-auto whitespace-pre-wrap">
            {JSON.stringify(report, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}