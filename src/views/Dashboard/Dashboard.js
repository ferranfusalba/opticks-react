// React
import React, { useEffect, useState } from "react";

import "./Dashboard.scss";

// Components
import Widget from "../../components/Widget/Widget";
import Range from "../../components/Range/Range";
import CentralContent from "../../components/CentralContent/CentralContent";

function DashboardView() {
  const [threatsData, setThreatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [range, setRange] = useState("today");

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
  // TODO: dependencies array

  return (
    <div className="dashboard">
      <Range range={range} setRange={setRange} />
      <div className="dashboard__widgets">
        <Widget title={"Invalid Traffic over time"} />
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
      </div>
      <CentralContent title={"Other Widgets"} />
      {/* {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data &&
                data.map(({ day, risk, threats, total }) => (
                    <div key={day}>
                        <p><b>day:</b> {day}</p>
                        <p>invalid: {risk.invalid}</p>
                        <p>suspicious: {risk.suspicious}</p>
                        <p>legitimate: {risk.legitimate}</p>
                        <p>threats.BadBot: {threats.BadBot}</p>
                        <p>threats.DataTampering: {threats.DataTampering}</p>
                        <p>threats.NonCompliantTraffic: {threats.NonCompliantTraffic}</p>
                        <p>threats.StatisticalOutliers: {threats.StatisticalOutliers}</p>
                        <p>threats.TelemetryMissing: {threats.TelemetryMissing}</p>
                        <h3>total: {total}</h3>
                    </div>
                ))} */}
    </div>
  );
}

export default DashboardView;
