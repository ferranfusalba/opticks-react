// React
import { useEffect, useState } from "react";

import "./FraudAnalysis.scss";

import Widget from "../../components/Widget/Widget";
import Range from "../../components/Range/Range";
import CentralContent from "../../components/CentralContent/CentralContent";
import BarGraph from "../../components/BarGraph/BarGraph";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function FraudAnalysisView() {
  const [savingsData, setSavingsData] = useState(null);
  const [threatsData, setThreatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("today");

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

  const options = {
    indexAxis: 'y',
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
    
  const data = {
    labels: ['Bad Bots', 'Data Tampering', 'Non-compliant Traffic', 'Statistical anomalies', 'Telemetry missing'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [33, 53, 85, 41, 44, 65],
        borderColor: '#5F8BB1',
        backgroundColor: '#5F8BB1',
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
          <p>{range}</p>
          {loading && <div>A moment please...</div>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          {threatsData &&
            threatsData.map(({ day, risk, total }) => (
              <div key={day}>
                <p>
                  <b>day:</b> {day}
                </p>
                <p>invalid: {risk.invalid}</p>
                <p>suspicious: {risk.suspicious}</p>
                <p>legitimate: {risk.legitimate}</p>
                <h3>total: {total}</h3>
              </div>
            ))}
        </Widget>
        <Widget title={"Threat Distribution"}>
          {/* <BarGraph /> */}
          <Bar options={options} data={data} />
          {loading && <div>A moment please...</div>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          {threatsData &&
            threatsData.map(({ day, threats }) => (
              <div key={day}>
                <p>
                  <b>day:</b> {day}
                </p>
                <p>threats.BadBot: {threats.BadBot}</p>
                <p>threats.DataTampering: {threats.DataTampering}</p>
                <p>
                  threats.NonCompliantTraffic: {threats.NonCompliantTraffic}
                </p>
                <p>
                  threats.StatisticalOutliers: {threats.StatisticalOutliers}
                </p>
                <p>threats.TelemetryMissing: {threats.TelemetryMissing}</p>
              </div>
            ))}
        </Widget>
      </div>
      <CentralContent title={"The Table"} />
    </div>
  );
}

export default FraudAnalysisView;
