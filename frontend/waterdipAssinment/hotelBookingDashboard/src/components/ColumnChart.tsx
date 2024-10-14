// src/components/ColumnChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface ColumnChartProps {
  data: { country: string, visitors: number }[];
}

const ColumnChart: React.FC<ColumnChartProps> = ({ data }) => {
  const options = {
    chart: {
      id: 'column-chart',
    },
    xaxis: {
      categories: data.map(d => d.country),
    },
  };

  const series = [
    {
      name: 'Visitors',
      data: data.map(d => d.visitors),
    },
  ];

  return <Chart options={options} series={series} type="bar" width="500" />;
};

export default ColumnChart;
