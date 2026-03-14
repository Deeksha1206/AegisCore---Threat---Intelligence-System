import { useEffect, useState } from "react";

export default function Logs() {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch("http://localhost:8001/view-logs");
      const data = await res.json();
      setLogs(data.reverse());
    } catch (err) {
      console.error("Logs fetch failed", err);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 text-white">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg">
        <h2 className="text-cyan-400 text-2xl mb-6">Live Logs</h2>

        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-400 border-b border-slate-700">
              <th className="pb-3">IP</th>
              <th className="pb-3">USER</th>
              <th className="pb-3">EVENT</th>
              <th className="pb-3">DATA</th>
              <th className="pb-3">TIMESTAMP</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log, index) => (
              <tr key={index} className="border-b border-slate-800">
                <td className="py-3">{log[1]}</td>
                <td className="py-3">{log[4]}</td>
                <td className="py-3 text-cyan-400">{log[3]}</td>
                <td className="py-3">{log[6]}</td>
                <td className="py-3">
                  {log[7]
                    ? new Date(log[7]).toLocaleTimeString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}