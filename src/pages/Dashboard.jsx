import { useEffect, useState } from "react";

export default function Dashboard() {

  const [risk, setRisk] = useState(null);
  const [recentThreats, setRecentThreats] = useState([]);

  const fetchData = async () => {
    try {
      const riskRes = await fetch("http://localhost:8000/risk-summary");
      const riskData = await riskRes.json();

      const threatsRes = await fetch("http://localhost:8000/recent-threats");
      const threatsData = await threatsRes.json();

      setRisk(riskData);
      setRecentThreats(threatsData);

    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const threatColor =
    risk?.threat_level === "HIGH"
      ? "text-red-500"
      : risk?.threat_level === "MEDIUM"
      ? "text-yellow-400"
      : "text-green-400";

  const riskBarColor =
    risk?.risk_score >= 0.7
      ? "bg-red-500"
      : risk?.risk_score >= 0.4
      ? "bg-yellow-400"
      : "bg-green-500";

  return (
    <div className="p-6 text-white space-y-8">

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">

        {/* Threat Level */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-gray-400 mb-2">Threat Level</h3>
          <p className={`text-2xl font-bold ${threatColor}`}>
            {risk ? risk.threat_level : "Loading..."}
          </p>
        </div>

        {/* Risk Score */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-gray-400 mb-2">Risk Score</h3>
          <p className="text-2xl font-bold text-cyan-400">
            {risk ? risk.risk_score : "Loading..."}
          </p>

          {/* Risk Bar */}
          {risk && (
            <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
              <div
                className={`${riskBarColor} h-2 rounded-full transition-all duration-500`}
                style={{ width: `${risk.risk_score * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        {/* Suspicious IP */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-gray-400 mb-2">Suspicious IP</h3>
          <p className="text-lg font-semibold text-white">
            {risk ? risk.suspicious_ip : "Loading..."}
          </p>
        </div>

        {/* Suspicious User */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-gray-400 mb-2">Suspicious User</h3>
          <p className="text-lg font-semibold text-white">
            {risk ? risk.suspicious_user : "Loading..."}
          </p>
        </div>

        {/* Total Activity */}
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg hover:scale-105 transition">
          <h3 className="text-gray-400 mb-2">Recent Events</h3>
          <p className="text-2xl font-bold text-cyan-400">
            {recentThreats.length}
          </p>
        </div>

      </div>

      {/* Recent Threat Activity */}
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
                <span className="text-white">
                  {threat.source_ip}
                </span>
                <span className="text-gray-400">
                  {threat.event_type}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}