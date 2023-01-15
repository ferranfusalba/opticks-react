// React
import React, { useEffect, useState } from "react";

import "./Dashboard.scss";

// Components
import Widget from "../../components/Widget/Widget";
import Range from "../../components/Range/Range";
import CentralContent from "../../components/CentralContent/CentralContent";

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
import faker from "faker";

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

  const [sumInvalidRisk, setSumInvalidRisk] = useState(null);
  const [sumSuspiciousRisk, setSumSuspiciousRisk] = useState(null);
  const [sumLegitimateRisk, setSumLegitimateRisk] = useState(null);
  const [sumTotalRisk, setSumTotalRisk] = useState(null);

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
        // if (range === 'last_7_days' || range === 'last_30_days') {
        //   console.log(actualData);

        //   actualData.forEach(element => {
        //     console.log(element.risk.invalid);
        //     setSumRisk(element.risk.invalid);
        //   });

        //   // actualData.map(({ risk }) => (
        //   //   console.log(risk.invalid),
        //   //   console.log(risk.suspicious),
        //   //   console.log(risk.legitimate)
        //   // ));

        //   setThreatsData(actualData);
        // } else {
        //   setThreatsData(actualData);
        // }
        setThreatsData(actualData);
        setSumInvalidRisk(actualData[0].risk.invalid);
        setSumSuspiciousRisk(actualData[0].risk.suspicious);
        setSumLegitimateRisk(actualData[0].risk.legitimate);
        setSumTotalRisk(sumInvalidRisk + sumSuspiciousRisk + sumLegitimateRisk);
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

  console.log(threatsData);
  console.log(sumTotalRisk);

  const data = {
    labels: ["Invalid", "Suspicious", "Legitimate"],
    datasets: [
      {
        data: [sumInvalidRisk, sumSuspiciousRisk, sumLegitimateRisk],
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
      // title: {
      //   display: true,
      //   text: "Chart.js Line Chart",
      // },
    },
  };

  const labelsLine = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const dataLine = {
    // labelsLine,
    labels: ["11/02", "12/02", "13/02", "14/02", "15/02", "16/02"],
    datasets: [
      {
        label: "Invalid visits",
        // data: labelsLine.map(() =>
        //   faker.datatype.number({ min: 0, max: 3000 })
        // ),
        fill: false,
        data: [33, 53, 85, 41, 44, 65, 19],
        borderColor: "#F05641",
        backgroundColor: "#F05641",
        tension: 0.5
      },
    ],
  };

  return (
    <div className="dashboard">
      <Range range={range} setRange={setRange} />
      <div className="dashboard__widgets">
        <Widget title={"Invalid Traffic over time"}>
          <Line options={optionsLine} data={dataLine} />
        </Widget>
        <Widget title={"Traffic Veracity"}>
          <p>{range}</p>
          <div className="dashboard__widgets--traffic-veracity">
            <aside>
              <Doughnut data={data} />
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
