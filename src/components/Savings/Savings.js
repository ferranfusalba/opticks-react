// React
import { useEffect, useState } from "react";

import "./Savings.scss";

function SavingsComponent() {
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
    <div className="savings">
      <h3>Savings</h3>
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
    </div>
  );
}

export default SavingsComponent;
