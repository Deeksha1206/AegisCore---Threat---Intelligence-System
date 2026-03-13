import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import AttackGraphPage from "./pages/AttackGraphPage";
import Simulation from "./pages/Simulation";
import Reports from "./pages/Reports";

import Navbar from "./components/layout/Navbar";
import AIChatbot from "./components/AIChatbot";

function Layout() {
  const location = useLocation();

  // Hide Navbar + Chatbot on Login page
  const hideLayout = location.pathname === "/";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/attack-graph" element={<AttackGraphPage />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>

      {!hideLayout && <AIChatbot />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;