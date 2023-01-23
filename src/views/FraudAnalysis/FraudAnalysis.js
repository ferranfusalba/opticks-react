// React
import { useEffect, useState } from "react";

// Styles
import "./FraudAnalysis.scss";

// Components
import CentralContent from "../../components/CentralContent/CentralContent";
import Range from "../../components/Range/Range";
import Widget from "../../components/Widget/Widget";
import TrafficValue from "../../components/TrafficValue/TrafficValue";

// Assets
import info_circle from "../../assets/icons/info_circle.svg";

// Plugins
import DoughnutInnerText from '../../plugins/DoughnutInnerText';

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
  Tooltip
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  DoughnutInnerText,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
);
ChartJS.defaults.font.family = "Roboto";

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
  // String versions
  const [sumInvalidString, setSumInvalidString] = useState(null);
  const [sumSuspiciousString, setSumSuspiciousString] = useState(null);
  const [sumLegitimateString, setSumLegitimateString] = useState(null);

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
        setSumInvalidString(totalInvalid.toLocaleString('en-GB'));

        // Risk - Suspicious
        const suspiciousArray = actualData.map(({ risk }) => risk.suspicious);
        const totalSuspicious = suspiciousArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumSuspicious(totalSuspicious);
        setSumSuspiciousString(totalSuspicious.toLocaleString('en-GB'));

        // Risk - Legitimate
        const legitimateArray = actualData.map(({ risk }) => risk.legitimate);
        const totalLegitimate = legitimateArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumLegitimate(totalLegitimate);
        setSumLegitimateString(totalLegitimate.toLocaleString('en-GB'));

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
        display: false,
      },
    },
    cutout: 40,
    centerText: {
      color: "#000",
      value: (sumInvalid + sumSuspicious + sumLegitimate).toLocaleString('en-GB'),
      fontSizeAdjust: -0.2,
      fontFamilyAdjust: 'Roboto'
    }
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
        borderWidth: 0,
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
    scales: {
      x: {
        display: false,
        reverse: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
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
        backgroundColor: "#5F8BB1",
      },
    ],
  };

  return (
    <div className="fraud-analysis">
      <Range range={range} setRange={setRange} />
      <div className="fraud-analysis__widgets">
        <Widget title={"Savings"}>
          {loading && <div>Loading...</div>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          {savingsData && (
            <main>
              <section>
                <span>Total saved</span>
                <br />
                {savingsData.total.toLocaleString('en-GB')} €
              </section>
              <section>
                <aside>
                  <span>Last 30 days</span>
                  <br />
                  {savingsData.last30days.toLocaleString('en-GB')} €
                </aside>
                <aside>
                  <span>Next 30 days projection <img src={info_circle} alt={"Info circle icon"} /></span>
                  <br />
                  {savingsData.next30days.toLocaleString('en-GB')} €
                </aside>
              </section>
            </main>
          )}
        </Widget>
        <Widget title={"Traffic Veracity"}>
          <div className="fraud-analysis__widgets--traffic-veracity">
            <aside>
              {loading && <div>Loading...</div>}
              {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
              )}
              {threatsData && <Doughnut options={optionsPie} data={dataPie} />}
            </aside>
            <aside>
              <TrafficValue
                color={"danger"}
                number={sumInvalidString}
                type={"Invalid"}
              />
              <TrafficValue
                color={"alert"}
                number={sumSuspiciousString}
                type={"Suspicious"}
              />
              <TrafficValue
                color={"success"}
                number={sumLegitimateString}
                type={"Legitimate"}
              />
            </aside>
          </div>
        </Widget>
        <Widget title={"Threat Distribution"}>
          <div className="fraud-analysis__widgets--threat-distribution">
            <aside>
              {loading && <div>Loading...</div>}
              {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
              )}
              {threatsData && <Bar options={optionsBar} data={dataBar} height={250}/>}
            </aside>
            <aside>
              <p>Bad Bots</p>
              <p>Data Tampering</p>
              <p>Non-compliant Traffic</p>
              <p>Statistical anomalies</p>
              <p>Telemetry missing</p>
            </aside>
          </div>
        </Widget>
      </div>
      <CentralContent title={"The Table"} />
    </div>
  );
}

export default FraudAnalysisView;
