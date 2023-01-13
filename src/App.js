// React
import './App.css';
import { Route, Routes, Link } from "react-router-dom"

// Views
import HomeView from "./views/Home/Home"
import DashboardView from "./views/Dashboard/Dashboard"
import FraudAnalysisView from "./views/FraudAnalysis/FraudAnalysis"

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/fraud-analysis">Fraud Analysis</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/fraud-analysis" element={<FraudAnalysisView />} />
      </Routes>
    </div>
  );
}

export default App;
