// React
import { useEffect, useState } from "react";

// Styles
import "./Dashboard.scss";

// Components
import CentralContent from "../../components/CentralContent/CentralContent";
import Range from "../../components/Range/Range";
import Widget from "../../components/Widget/Widget";
import TrafficValue from "../../components/TrafficValue/TrafficValue";

// Assets
import info_circle from "../../assets/icons/info_circle.svg";

// Plugins
import DoughnutInnerText from "../../plugins/DoughnutInnerText";

// Charts
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  DoughnutInnerText,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
);
ChartJS.defaults.font.family = "Roboto";

function DashboardView() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  // Section: Invalid traffic
  const [rangeLessVisible, setRangeLessVisible] = useState(false);
  const [rangeMoreVisible, setRangeMoreVisible] = useState(false);
  const [weeklyDates, setWeeklyDates] = useState(null);
  const [invalidDays, setInvalidDays] = useState(null);

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
        setInvalidDays(invalidArray);
        const totalInvalid = invalidArray.reduce((acc, day) => acc + day, 0);
        setSumInvalid(totalInvalid);
        setSumInvalidString(totalInvalid.toLocaleString("en-GB"));

        // Risk - Suspicious
        const suspiciousArray = actualData.map(({ risk }) => risk.suspicious);
        const totalSuspicious = suspiciousArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumSuspicious(totalSuspicious);
        setSumSuspiciousString(totalSuspicious.toLocaleString("en-GB"));

        // Risk - Legitimate
        const legitimateArray = actualData.map(({ risk }) => risk.legitimate);
        const totalLegitimate = legitimateArray.reduce(
          (acc, day) => acc + day,
          0
        );
        setSumLegitimate(totalLegitimate);
        setSumLegitimateString(totalLegitimate.toLocaleString("en-GB"));

        // Dates
        const weeklyDays = actualData.map(({ day }) =>
          day.slice(0, -5).replace("-", "/")
        );
        setWeeklyDates(weeklyDays);

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

  // Conditional Rendering
  useEffect(() => {
    range === "today" || range === "yesterday"
      ? setRangeLessVisible(true)
      : setRangeLessVisible(false);
    range === "last_7_days" || range === "last_30_days"
      ? setRangeMoreVisible(true)
      : setRangeMoreVisible(false);
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
      value: (sumInvalid + sumSuspicious + sumLegitimate).toLocaleString(
        "en-GB"
      ),
      fontSizeAdjust: -0.2,
      fontFamilyAdjust: "Roboto",
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

  // Line chart
  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "black",
          font: {
            size: 14,
            weight: 300,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
  };

  const dataLine = {
    labels: weeklyDates,
    datasets: [
      {
        label: "Invalid visits",
        fill: false,
        data: invalidDays,
        borderColor: "#F05641",
        backgroundColor: "#F05641",
        borderWidth: 2,
        pointStyle: false,
        tension: 0.5,
      },
    ],
  };

  return (
    <div className="dashboard">
      <Range range={range} setRange={setRange} />
      <div className="dashboard__widgets">
        <Widget title={"Invalid Traffic over time"}>
          <div className="dashboard__widgets--invalid-traffic">
            {rangeLessVisible && (
              <div className="dashboard__widgets--invalid-traffic--range-less">
                <section>
                  <aside>
                    <img src={info_circle} alt={"Info circle icon"} />
                  </aside>
                  <article>
                    <b>Select a wider range</b>
                    <br />A minimum of 2 days of data is needed in order to
                    display these metrics.
                  </article>
                </section>
              </div>
            )}
            {error && (
              <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {threatsData && rangeMoreVisible && (
              <div className="dashboard__widgets--invalid-traffic--range-more">
                <aside>Number of visits</aside>
                <Line options={optionsLine} data={dataLine} height={70} />
              </div>
            )}
          </div>
        </Widget>
        <Widget title={"Traffic Veracity"}>
          <div className="dashboard__widgets--traffic-veracity">
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
      </div>
      <CentralContent title={"Other Widgets"} />
    </div>
  );
}

export default DashboardView;
