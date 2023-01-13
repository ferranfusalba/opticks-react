// React
import React, { useEffect, useState } from 'react';

function DashboardView() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Stats
    // today
    useEffect(() => {
        fetch(`https://us-central1-opticks-test.cloudfunctions.net/stats?range=today`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => {
                console.log('Stats - today', actualData);
                setData(actualData);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setData(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // yesterday
    useEffect(() => {
        fetch(`https://us-central1-opticks-test.cloudfunctions.net/stats?range=yesterday`)
            .then((response) => response.json())
            .then((actualData) => console.log('Stats - yesterday', actualData))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // last_7_days
    useEffect(() => {
        fetch(`https://us-central1-opticks-test.cloudfunctions.net/stats?range=last_7_days`)
            .then((response) => response.json())
            .then((actualData) => console.log('Stats - last_7_days', actualData))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // last_30_days
    useEffect(() => {
        fetch(`https://us-central1-opticks-test.cloudfunctions.net/stats?range=last_30_days`)
            .then((response) => response.json())
            .then((actualData) => console.log('Stats - last_30_days', actualData))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    // Savings
    useEffect(() => {
        fetch(`https://us-central1-opticks-test.cloudfunctions.net/savings`)
            .then((response) => response.json())
            .then((actualData) => console.log('Savings', actualData))
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <>
            <h1>Dashboard View</h1>
            {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
        </>
    );
}

export default DashboardView;