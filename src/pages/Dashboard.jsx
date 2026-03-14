import { useEffect, useState } from "react";
import ThreatGauge from "../components/ThreatGauge";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from "recharts";

export default function Dashboard() {
  const [risk, setRisk] = useState(null);
  const [recentThreats, setRecentThreats] = useState([]);

  const fetchData = async () => {
    try {
      const riskRes = await fetch("http://localhost:8001/risk-summary");
      const riskData = await riskRes.json();

      const threatsRes = await fetch("http://localhost:8001/recent-threats");
      const threatsData = await threatsRes.json();

      setRisk(riskData.current_threat || riskData);

      if (Array.isArray(threatsData)) {
        setRecentThreats([...threatsData].reverse());
      }
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const safeRisk = Number(risk?.overall_risk ?? 0);

  const riskPercent = safeRisk * 100;

  const riskBarColor =
    safeRisk >= 0.7
      ? "bg-red-500"
      : safeRisk >= 0.4
      ? "bg-yellow-400"
      : "bg-green-500";

  const graphData = recentThreats.map((threat, index) => {
    let riskValue = 10;

    if (threat.event_type === "failed_login") riskValue = 35;
    else if (threat.event_type === "data_access") riskValue = 75;
    else if (threat.event_type === "privilege_escalation") riskValue = 95;
    else if (threat.event_type === "download") riskValue = 60;
    else if (threat.event_type === "intrusion_attempt") riskValue = 90;
    else riskValue = 20;

    return {
      name: `T${index + 1}`,
      risk: riskValue + (index % 3) * 5,
      attacks: riskValue / 20
    };
  });

  return (
    <div className="p-6 text-white space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-lg hover:scale-105 transition flex flex-col items-center justify-center min-h-[220px]">
          {risk && (
            <ThreatGauge
              riskScore={safeRisk}
              threatLevel={risk?.threat_level || "HIGH"}
            />
          )}
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg hover:scale-105 transition flex flex-col justify-center min-h-[220px]">
          <h3 className="text-gray-400 mb-2">Risk Score</h3>
          <p className="text-2xl font-bold text-cyan-400">
            {riskPercent.toFixed(0)}%
          </p>

          <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
            <div
              className={`${riskBarColor} h-2 rounded-full transition-all duration-500`}
              style={{ width: `${riskPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg hover:scale-105 transition flex flex-col justify-center min-h-[220px]">
          <h3 className="text-gray-400 mb-2">Suspicious IP</h3>
          <p className="text-lg font-semibold text-white break-words">
            {risk?.suspicious_ip || "Loading..."}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg hover:scale-105 transition flex flex-col justify-center min-h-[220px]">
          <h3 className="text-gray-400 mb-2">Suspicious User</h3>
          <p className="text-lg font-semibold text-white">
            {risk?.suspicious_user || "Loading..."}
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg hover:scale-105 transition flex flex-col justify-center min-h-[220px]">
          <h3 className="text-gray-400 mb-2">Recent Events</h3>
          <p className="text-2xl font-bold text-cyan-400">
            {recentThreats.length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg">
          <h3 className="text-cyan-400 text-lg mb-4">Attack Trend Analysis</h3>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={graphData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Line type="monotone" dataKey="risk" stroke="#22d3ee" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg">
          <h3 className="text-cyan-400 text-lg mb-4">Threat Distribution</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={graphData}>
              <XAxis dataKey="name" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="attacks" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg">
        <h3 className="text-xl text-cyan-400 mb-4">
          Recent Threat Activity
        </h3>

        {recentThreats.length === 0 ? (
          <p className="text-gray-400">No recent threats detected.</p>
        ) : (
          <div className="space-y-2">
            {recentThreats.map((threat, index) => (
              <div
                key={index}
                className="flex justify-between bg-slate-800 p-3 rounded-lg hover:bg-slate-700 transition"
              >
                <span className="text-white">{threat.source_ip}</span>
                <span className="text-gray-400">{threat.event_type}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}