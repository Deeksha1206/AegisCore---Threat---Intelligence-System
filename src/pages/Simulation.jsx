import { useState } from "react";

export default function Simulation() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async (action, target) => {
    console.log("Running simulation...");

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8001/simulate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: action,
          target: target,
        }),
      });

      const data = await response.json();
      console.log("Simulation Response:", data);

      setResult(data);
    } catch (error) {
      console.error("Simulation error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 text-white space-y-6">
      <h2 className="text-2xl text-cyan-400 font-bold">
        ⚔ Attack Simulation
      </h2>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => runSimulation("block", "device_192.168.1.15")}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
        >
          Block Connection
        </button>

        <button
          onClick={() => runSimulation("isolate", "admin")}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg"
        >
          Isolate Node
        </button>
      </div>

      {/* Result Section */}
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-lg">
        <h3 className="text-cyan-400 text-lg mb-4">
          Simulation Result
        </h3>

        {loading && (
          <p className="text-gray-400">Running simulation...</p>
        )}

        {!result && !loading && (
          <p className="text-gray-400">
            Run a simulation to see risk changes.
          </p>
        )}

        {result && result.updated_threat && (
          <div className="space-y-2">
            <p>
              <span className="text-gray-400">Overall Risk:</span>{" "}
              <span className="text-green-400 font-bold">
                {result.updated_threat.overall_risk}
              </span>
            </p>

            <p>
              <span className="text-gray-400">Threat Level:</span>{" "}
              <span
                className={`font-bold ${
                  result.updated_threat.threat_level === "High"
                    ? "text-red-500"
                    : result.updated_threat.threat_level === "Medium"
                    ? "text-yellow-400"
                    : "text-green-400"
                }`}
              >
                {result.updated_threat.threat_level}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}