// React
import { useEffect, useState } from 'react';

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
        }
        getData()
    }, [])

    return (
        <>
            <h1>Savings Component</h1>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data && <div>
                <p>total: {data.total}</p>
                <p>last30days: {data.last30days}</p>
                <p>next30days: {data.next30days}</p>
            </div>}
        </>
    )
}

export default SavingsComponent;