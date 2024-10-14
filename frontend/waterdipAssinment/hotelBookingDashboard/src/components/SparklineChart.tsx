// src/components/SparklineChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface SparklineChartProps {
  label: string;
  data: number[];
}

const SparklineChart: React.FC<SparklineChartProps> = ({ label, data }) => {
  const options = {
    chart: {
      sparkline: { enabled: true },
    },
    xaxis: { categories: data.map((_, i) => i + 1) },
  };

  const series = [{ name: label, data }];

  return (
    <div>
      <h3>{label}</h3>
      <Chart options={options} series={series} type="line" width="200" height="100" />
    </div>
  );
};

export default SparklineChart;
