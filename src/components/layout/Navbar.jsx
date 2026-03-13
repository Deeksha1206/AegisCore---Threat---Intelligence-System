import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-slate-700 bg-[#020617] text-white">

      <h1 className="text-cyan-400 font-bold text-lg">
        SentinelAI
      </h1>

      <div className="flex gap-8 text-sm">

        <Link to="/dashboard" className="hover:text-cyan-400">
          Dashboard
        </Link>

        <Link to="/logs" className="hover:text-cyan-400">
          Threat Intelligence
        </Link>

        <Link to="/simulation" className="hover:text-cyan-400">
          Simulation
        </Link>

        <Link to="/reports" className="hover:text-cyan-400">
          Reports
        </Link>

        <Link to="/" className="hover:text-red-400">
          Logout
        </Link>

      </div>
    </div>
  );
}