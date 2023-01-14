// React
import React, { useEffect, useState } from 'react';

import "./Dashboard.scss"

// Components
import Savings from '../../components/Savings/Savings';
import Range from '../../components/Range/Range';
import Widgets from '../../components/Widgets/Widgets';
import CentralContent from '../../components/CentralContent/CentralContent';

function DashboardView() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Stats
    // today
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await fetch(
    //                 `https://us-central1-opticks-test.cloudfunctions.net/stats?range=today`
    //             );
    //             if (!response.ok) {
    //                 throw new Error(
    //                     `This is an HTTP error: The status is ${response.status}`
    //                 );
    //             }
    //             let actualData = await response.json();
    //             setData(actualData);
    //             setError(null);
    //         } catch (err) {
    //             setError(err.message);
    //             setData(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     getData()
    // }, [])

    // yesterday
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await fetch(
    //                 `https://us-central1-opticks-test.cloudfunctions.net/stats?range=yesterday`
    //             );
    //             if (!response.ok) {
    //                 throw new Error(
    //                     `This is an HTTP error: The status is ${response.status}`
    //                 );
    //             }
    //             let actualData = await response.json();
    //             setData(actualData);
    //             setError(null);
    //         } catch (err) {
    //             setError(err.message);
    //             setData(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     getData()
    // }, [])

    // last_7_days
    // useEffect(() => {
    //     const getData = async () => {
    //         try {
    //             const response = await fetch(
    //                 `https://us-central1-opticks-test.cloudfunctions.net/stats?range=last_7_days`
    //             );
    //             if (!response.ok) {
    //                 throw new Error(
    //                     `This is an HTTP error: The status is ${response.status}`
    //                 );
    //             }
    //             let actualData = await response.json();
    //             setData(actualData);
    //             setError(null);
    //         } catch (err) {
    //             setError(err.message);
    //             setData(null);
    //         } finally {
    //             setLoading(false);
    //         }
    //     }
    //     getData()
    // }, [])

    // last_30_days
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(
                    `https://us-central1-opticks-test.cloudfunctions.net/stats?range=last_30_days`
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
        <div>
            <Range />
            <Widgets>
                <Savings />
            </Widgets>
            <CentralContent title={'Other Widgets'}/>
            {/* {loading && <div>A moment please...</div>}
            {error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            {data &&
                data.map(({ day, risk, threats, total }) => (
                    <div key={day}>
                        <p><b>day:</b> {day}</p>
                        <p>risk.invalid: {risk.invalid}</p>
                        <p>risk.legitimate: {risk.legitimate}</p>
                        <p>risk.suspicious: {risk.suspicious}</p>
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