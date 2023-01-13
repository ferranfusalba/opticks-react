// React
import './App.scss';
import { Route, Routes } from "react-router-dom"

// Layout Components
import TopNavbar from "./components/TopNavbar/TopNavbar"
import Sidebar from "./components/Sidebar/Sidebar"
// import ContentLayout from "./components/ContentLayout/ContentLayout"

// View Components
import HomeView from "./views/Home/Home"
import DashboardView from "./views/Dashboard/Dashboard"
import FraudAnalysisView from "./views/FraudAnalysis/FraudAnalysis"

function App() {
  return (
    <div className="App">
      <TopNavbar />
      <div className="layout-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/fraud-analysis" element={<FraudAnalysisView />} />
        </Routes>
      </div>
      {/* <ContentLayout>
        <Sidebar />
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/dashboard" element={<DashboardView />} />
          <Route path="/fraud-analysis" element={<FraudAnalysisView />} />
        </Routes>
      </ContentLayout> */}
    </div>
  );
}

export default App;
