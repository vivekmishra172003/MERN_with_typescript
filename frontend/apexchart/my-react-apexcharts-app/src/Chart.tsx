// src/Chart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

const MyChart: React.FC = () => {
  const chartOptions = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997],
    },
  };

  const chartSeries = [
    {
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70],
    },
  ];

  return (
    <div>
      <h2>Basic Bar Chart</h2>
      <Chart options={chartOptions} series={chartSeries} type="bar" width="500" />
    </div>
  );
};

export default MyChart;
