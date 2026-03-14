import React from "react";
import Chart from "react-apexcharts";

export default function ThreatGauge({ riskScore, threatLevel }) {
  const percent = riskScore * 100;

  const options = {
    chart: {
      type: "radialBar",
      background: "transparent"
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%"
        },
        dataLabels: {
          name: {
            show: true,
            color: "#fff"
          },
          value: {
            color: "#fff",
            fontSize: "22px",
            formatter: function (val) {
              return val.toFixed(0) + "%";
            }
          }
        }
      }
    },
    labels: ["Threat Level"],
    colors: [
      threatLevel === "HIGH"
        ? "#ff4d4f"
        : threatLevel === "MEDIUM"
        ? "#fadb14"
        : "#52c41a"
    ]
  };

  return (
    <div className="bg-[#111827] rounded-xl p-4 shadow-lg">
      <Chart options={options} series={[percent]} type="radialBar" height={250} />
      <div className="text-center text-white mt-2 font-semibold">
        {threatLevel}
      </div>
    </div>
  );
}