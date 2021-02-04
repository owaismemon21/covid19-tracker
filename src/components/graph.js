import React, { useEffect, useState } from 'react';
import { Line, Bar } from "react-chartjs-2";

import styles from "./graph.module.css";
import { getAPIURL } from "../api";

function Graph ({data:{ confirmed, recovered, deaths}, country}) {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        async function getDailyData() {
            const response = await fetch(`${getAPIURL}/daily`);
            const data = await response.json();
            const filteredData = data.map((data) => ({
                confirmed: data.confirmed.total,
                deaths: data.deaths.total,
                date: data.reportDate,
            }))
            setDailyData(filteredData);
        }
        getDailyData();
    }, [])

    const lineChart =(
        dailyData.length ? (
        <Line data={{
            labels: dailyData.map(({date}) => date),
            datasets: [{
                data: dailyData.map(({confirmed}) => confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
            }, {
                data: dailyData.map(({deaths}) => deaths),
                label: 'Deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
            }],
        }} />
        ) : null
    );

    const barChart = (
        confirmed ? (
            <Bar 
                data={{
                    
                    datasets: [
                        {
                            label: 'Infected',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)'],
                            data: [confirmed.value],
                        },
                        {
                            label: 'Active',
                            backgroundColor: ['rgba(255, 222, 0, 0.5)'],
                            data: [confirmed.value - recovered.value],
                        },
                        {
                            label: 'Recovered',
                            backgroundColor: ['rgba(0, 255, 0, 0.5)'],
                            data: [recovered.value],
                        },
                        {
                            label: 'Deaths',
                            backgroundColor: ['rgba(255, 0, 0, 0.5)'],
                            data: [deaths.value],
                        },
                    ]
                }}
                options={{
                    legend: {display: true},
                    title: {display: true, text: `Current state in ${country}`},
                }}
            />
        ) : null
    );

  return (
    <div className={styles.container}>
        {(country === "" || country === "Global") ? lineChart : barChart}
    </div>
  );
}

export default Graph