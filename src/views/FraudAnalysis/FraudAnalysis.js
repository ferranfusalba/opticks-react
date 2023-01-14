// React
import { useEffect, useState } from "react";

import "./FraudAnalysis.scss";

import Widget from "../../components/Widget/Widget";
import Range from "../../components/Range/Range";
import Widgets from "../../components/Widgets/Widgets";
import CentralContent from "../../components/CentralContent/CentralContent";

function FraudAnalysisView() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setData(actualData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="fraud-analysis">
      <Range />
      <Widgets>
        <Widget title={"Savings"}>
          {loading && <div>A moment please...</div>}
          {error && (
            <div>{`There is a problem fetching the post data - ${error}`}</div>
          )}
          {data && (
            <main>
              <section>
                <span>Total saved</span>
                <br />
                {data.total}
              </section>
              <section>
                <aside>
                  <span>Last 30 days</span>
                  <br />
                  {data.last30days}
                </aside>
                <aside>
                  <span>Next 30 days projection</span>
                  <br />
                  {data.next30days}
                </aside>
              </section>
            </main>
          )}
        </Widget>
        <Widget title={"Traffic Veracity"}></Widget>
        <Widget title={"Threat Distribution"}></Widget>
      </Widgets>
      <CentralContent title={"The Table"} />
    </div>
  );
}

export default FraudAnalysisView;
