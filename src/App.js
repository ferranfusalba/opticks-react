// React
import './App.css';
import { Route, Routes } from "react-router-dom"

// Views
import HomeView from "./components/Home/Home"
import DasboardView from "./components/Dashboard/Dashboard"
import FraudAnalysisView from "./components/FraudAnalysis/FraudAnalysis"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/dashboard" element={<DasboardView />} />
        <Route path="/fraud-analysis" element={<FraudAnalysisView />} />
      </Routes>
    </div>
  );
}

export default App;
