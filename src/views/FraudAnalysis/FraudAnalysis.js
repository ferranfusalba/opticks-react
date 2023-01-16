// React
import React, { useEffect, useState } from "react";

// Styles
import "./FraudAnalysis.scss";

// Components
import CentralContent from "../../components/CentralContent/CentralContent";
import Range from "../../components/Range/Range";
import Widget from "../../components/Widget/Widget";
import TrafficValue from "../../components/TrafficValue/TrafficValue";

// Charts
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
);

function FraudAnalysisView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savingsData, setSavingsData] = useState(null);
  const [threatsData, setThreatsData] = useState(null);
  const [range, setRange] = useState("today");

  // Section: Traffic veracity
  const [sumInvalid, setSumInvalid] = useState(null);
  const [sumSuspicious, setSumSuspicious] = useState(null);
  const [sumLegitimate, setSumLegitimate] = useState(null);

  // Section: Threat distribution
  const [sumBadBots, setSumBadBots] = useState(null);
  const [sumDataTampering, setSumDataTampering] = useState(null);
  const [sumNonCompliantTraffic, setSumNonCompliantTraffic] = useState(null);
  const [sumStatisticalAnomalies, setSumStatisticalAnomalies] = useState(null);
  const [sumTelemetryMissing, setSumTelemetryMissing] = useState(null);

  // Savings
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-opticks-test.cloudfunctions.net/savings`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();
        setSavingsData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setSavingsData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  // Stats
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          `https://us-central1-opticks-test.cloudfunctions.net/stats?range=${range}`
        );
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        let actualData = await response.json();

        // Risk - Invalid
        const invalidArray = actualData.map(({ risk }) => risk.invalid);
        const totalInvalid = invalidArray.reduce((acc, day) => acc + day, 0);
        setSumInvalid(totalInvalid);

        // Risk - Suspicious
        const suspiciousArray = actualData.map(({ risk }) => risk.suspicious);
        const totalSuspicious = suspiciousArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumSuspicious(totalSuspicious);

        // Risk - Legitimate
        const legitimateArray = actualData.map(({ risk }) => risk.legitimate);
        const totalLegitimate = legitimateArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumLegitimate(totalLegitimate);

        // Threats - Bad Bots
        const badBotsArray = actualData.map(({ threats }) => threats.BadBot);
        const totalBadBots = badBotsArray.reduce((acc, day) => acc + day, 0);
        setSumBadBots(totalBadBots);

        // Threats - Data Tampering
        const dataTamperingArray = actualData.map(
          ({ threats }) => threats.DataTampering
        );
        const totalDataTampering = dataTamperingArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumDataTampering(totalDataTampering);

        // Threats - Non-compliant Traffic
        const nonCompliantTrafficArray = actualData.map(
          ({ threats }) => threats.NonCompliantTraffic
        );
        const totalNonCompliantTraffic = nonCompliantTrafficArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumNonCompliantTraffic(totalNonCompliantTraffic);

        // Threats - Statistical anomalies
        const statisticalAnomaliesArray = actualData.map(
          ({ threats }) => threats.StatisticalOutliers
        );
        const totalStatisticalAnomalies = statisticalAnomaliesArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumStatisticalAnomalies(totalStatisticalAnomalies);

        // Threats - Telemetry missing
        const telemetryMissingArray = actualData.map(
          ({ threats }) => threats.TelemetryMissing
        );
        const totalTelemetryMissing = telemetryMissingArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumTelemetryMissing(totalTelemetryMissing);

        // All data
        setThreatsData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setThreatsData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [range]);

  // Pie chart
  const optionsPie = {
    plugins: {
      legend: {
        display: false
      },
    },
  };

  const dataPie = {
    labels: ["Suspicious", "Invalid", "Legitimate"],
    datasets: [
      {
        data: [sumSuspicious, sumInvalid, sumLegitimate],
        backgroundColor: ["#FEB031", "#F05641", "#25D184"],
      },
    ],
  };

  // Bar chart
  const optionsBar = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const dataBar = {
    labels: [
      "Bad Bots",
      "Data Tampering",
      "Non-compliant Traffic",
      "Statistical anomalies",
      "Telemetry missing",
    ],
    datasets: [
      {
        data: [
          sumBadBots,
          sumDataTampering,
          sumNonCompliantTraffic,
          sumStatisticalAnomalies,
          sumTelemetryMissing,
        ],
        borderColor: "#5F8BB1",
        backgroundColor: "#5F8BB1",
      },
    ],
  };

  return (
    <div className="fraud-analysis">
      <Range range={range} setRange={setRange} />
      <div className="fraud-analysis__widgets">
        <Widget title={"Savings"}>
          {loading && <div>A moment please...</div>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          {savingsData && (
            <main>
              <section>
                <span>Total saved</span>
                <br />
                {savingsData.total}
              </section>
              <section>
                <aside>
                  <span>Last 30 days</span>
                  <br />
                  {savingsData.last30days}
                </aside>
                <aside>
                  <span>Next 30 days projection</span>
                  <br />
                  {savingsData.next30days}
                </aside>
              </section>
            </main>
          )}
        </Widget>
        <Widget title={"Traffic Veracity"}>
          <div className="fraud-analysis__widgets--traffic-veracity">
            <aside>
              {loading && <div>A moment please...</div>}
              {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
              )}
              {threatsData && <Doughnut options={optionsPie} data={dataPie} />}
            </aside>
            <aside>
              <TrafficValue
                color={"red"}
                number={sumInvalid}
                type={"Invalid"}
              />
              <TrafficValue
                color={"orange"}
                number={sumSuspicious}
                type={"Suspicious"}
              />
              <TrafficValue
                color={"green"}
                number={sumLegitimate}
                type={"Legitimate"}
              />
            </aside>
          </div>
        </Widget>
        <Widget title={"Threat Distribution"}>
          {loading && <div>A moment please...</div>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          {threatsData && <Bar options={optionsBar} data={dataBar} />}
        </Widget>
      </div>
      <CentralContent title={"The Table"} />
    </div>
  );
}

export default FraudAnalysisView;
