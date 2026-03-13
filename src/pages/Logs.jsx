import { useEffect, useState } from "react";

export default function Logs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/view-logs")
      .then(res => res.json())
      .then(data => {
        console.log("Logs from backend:", data);
        setLogs(data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 text-white">

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-cyan-400 text-xl font-semibold mb-4">
          Live Logs
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-300">
            <thead className="text-xs uppercase bg-slate-800 text-gray-400">
              <tr>
                <th className="px-4 py-3">IP</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Data</th>
                <th className="px-4 py-3">Timestamp</th>
              </tr>
            </thead>

            <tbody>
              {logs.map((log, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-700 hover:bg-slate-800 transition duration-200"
                >
                  <td className="px-4 py-3 font-medium text-white">
                    {log.source_ip}
                  </td>
                  <td className="px-4 py-3 text-gray-300">
                    {log.user}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-semibold ${
                        log.status === "failed" ||
                        (log.event_type && log.event_type.includes("failed"))
                          ? "bg-red-600 text-white"
                          : "bg-green-600 text-white"
                      }`}
                    >
                      {log.event_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {log.data_transfer || 0}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {log.timestamp
                      ? new Date(log.timestamp).toLocaleString()
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {logs.length === 0 && (
            <p className="text-gray-500 mt-4">
              No logs available.
            </p>
          )}

        </div>
      </div>

    </div>
  );
}