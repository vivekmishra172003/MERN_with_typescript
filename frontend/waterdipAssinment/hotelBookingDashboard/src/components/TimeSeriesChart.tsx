// src/components/TimeSeriesChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface TimeSeriesChartProps {
  data: { date: string, visitors: number }[];
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ data }) => {
  const options = {
    chart: {
      id: 'time-series',
    },
    xaxis: {
      categories: data.map(d => d.date),
    },
  };

  const series = [
    {
      name: 'Visitors',
      data: data.map(d => d.visitors),
    },
  ];

  return <Chart options={options} series={series} type="line" width="500" />;
};

export default TimeSeriesChart;
