// React
import React, { useEffect, useState } from "react";

import "./Dashboard.scss";

// Components
import Widget from "../../components/Widget/Widget";
import Range from "../../components/Range/Range";
import CentralContent from "../../components/CentralContent/CentralContent";

import info_circle from "../../assets/icons/info_circle.svg";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

function DashboardView() {
  const [threatsData, setThreatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("today");

  const [sumInvalid, setSumInvalid] = useState(null);
  const [sumSuspicious, setSumSuspicious] = useState(null);
  const [sumLegitimate, setSumLegitimate] = useState(null);

  const [weeklyDates, setWeeklyDates] = useState(null);

  const [rangeLessVisible, setRangeLessVisible] = useState(false);
  const [rangeMoreVisible, setRangeMoreVisible] = useState(false);

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

        console.log(actualData);

        // Risk - Invalid
        const invalidArray = actualData.map(({ risk }) => risk.invalid);
        console.log("invalidArray", invalidArray);
        const totalInvalid = invalidArray.reduce((acc, day) => acc + day, 0);
        console.log("totalInvalid", totalInvalid);
        setSumInvalid(totalInvalid);
        console.log("sumInvalid: ", sumInvalid);

        // Risk - Suspicious
        const suspiciousArray = actualData.map(({ risk }) => risk.suspicious);
        console.log("suspiciousArray", suspiciousArray);
        const totalSuspicious = suspiciousArray.reduce(
          (acc, day) => acc + day,
          0
        );
        console.log("totalSuspicious", totalSuspicious);
        setSumSuspicious(totalSuspicious);
        console.log("sumSuspicious: ", sumSuspicious);

        // Risk - Legitimate
        const legitimateArray = actualData.map(({ risk }) => risk.legitimate);
        console.log("legitimateArray", legitimateArray);
        const totalLegitimate = legitimateArray.reduce(
          (acc, day) => acc + day,
          0
        );
        console.log("totalLegitimate", totalLegitimate);
        setSumLegitimate(totalLegitimate);
        console.log("sumLegitimate: ", sumLegitimate);

        // Dates
        const weeklyDays = actualData.map(({day}) => day);
        setWeeklyDates(weeklyDays);
        console.log(weeklyDates);








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

  useEffect(() => {
    range === "today" || range === "yesterday"
      ? setRangeLessVisible(true)
      : setRangeLessVisible(false);
    range === "last_7_days" || range === "last_30_days"
      ? setRangeMoreVisible(true)
      : setRangeMoreVisible(false);
  }, [range]);

  const optionsPie = {
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  const dataPie = {
    labels: ["Invalid", "Suspicious", "Legitimate"],
    datasets: [
      {
        data: [sumInvalid, sumSuspicious, sumLegitimate],
        backgroundColor: ["#F05641", "#FEB031", "#25D184"],
      },
    ],
  };

  const optionsLine = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  const dataLine = {
    // labels: ["11/02", "12/02", "13/02", "14/02", "15/02", "16/02"],
    labels: weeklyDates,
    datasets: [
      {
        label: "Invalid visits",
        fill: false,
        data: [33, 53, 85, 41, 44, 65, 19],
        borderColor: "#F05641",
        backgroundColor: "#F05641",
        tension: 0.5,
      },
    ],
  };

  return (
    <div className="dashboard">
      <Range range={range} setRange={setRange} />
      <div className="dashboard__widgets">
        <Widget title={"Invalid Traffic over time"}>
          {rangeLessVisible && (
            <div className="rangeLessVisible">
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
          {loading && <div>A moment please...</div>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          {threatsData && rangeMoreVisible && (
            <Line options={optionsLine} data={dataLine} />
          )}
        </Widget>
        <Widget title={"Traffic Veracity"}>
          <div className="dashboard__widgets--traffic-veracity">
            <aside>
              {loading && <div>A moment please...</div>}
              {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
              )}
              {threatsData && <Doughnut options={optionsPie} data={dataPie} />}
            </aside>
            <aside>
              <p>test</p>
            </aside>
          </div>
        </Widget>
      </div>
      <CentralContent title={"Other Widgets"} />
    </div>
  );
}

export default DashboardView;
