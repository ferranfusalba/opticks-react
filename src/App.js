// React
import "./App.scss";
import { Route, Routes, Navigate } from "react-router-dom";

// Layout Components
import TopNavbar from "./components/TopNavbar/TopNavbar";
import Sidebar from "./components/Sidebar/Sidebar";

// View Components
import DashboardView from "./views/Dashboard/Dashboard";
import FraudAnalysisView from "./views/FraudAnalysis/FraudAnalysis";

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <div className="layout-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/fraud-analysis" element={<FraudAnalysisView />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
