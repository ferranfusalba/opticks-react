// React
import React, { useEffect, useState } from "react";

import "./Dashboard.scss";

// Components
import Widget from "../../components/Widget/Widget";
import Range from "../../components/Range/Range";
import CentralContent from "../../components/CentralContent/CentralContent";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

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

  return (
    <div className="dashboard">
      <Range range={range} setRange={setRange} />
      <div className="dashboard__widgets">
        <Widget title={"Invalid Traffic over time"} />
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
