// src/App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchData } from './dataService';
import { BookingData } from './types';
import DateRangePicker from './components/DateRangePicker';
import TimeSeriesChart from './components/TimeSeriesChart';
import ColumnChart from './components/ColumnChart';
import SparklineChart from './components/SparklineChart';
// Removed the unused import
// import { format } from 'date-fns';

const App: React.FC = () => {
  const [data, setData] = useState<BookingData[]>([]);
  const [startDate, setStartDate] = useState<string>('2022-01-01');
  const [endDate, setEndDate] = useState<string>('2022-12-31');

  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const filteredData = data.filter((d) => {
    const arrivalDate = new Date(`${d.arrival_date_year}-${d.arrival_date_month}-${d.arrival_date_day_of_month}`);
    return arrivalDate >= new Date(startDate) && arrivalDate <= new Date(endDate);
  });

  const visitorsPerDay = filteredData.map(d => ({
    date: `${d.arrival_date_year}-${d.arrival_date_month}-${d.arrival_date_day_of_month}`,
    visitors: d.adults + d.children + d.babies,
  }));

  const visitorsPerCountry = filteredData.reduce((acc, curr) => {
    acc[curr.country] = (acc[curr.country] || 0) + curr.adults + curr.children + curr.babies;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="App">
      <h1>Hotel Booking Dashboard</h1>
      <DateRangePicker startDate={startDate} endDate={endDate} onDateChange={(start, end) => { setStartDate(start); setEndDate(end); }} />

      <TimeSeriesChart data={visitorsPerDay} />
      <ColumnChart data={Object.keys(visitorsPerCountry).map(country => ({ country, visitors: visitorsPerCountry[country] }))} />
      
      <SparklineChart label="Adults" data={filteredData.map(d => d.adults)} />
      <SparklineChart label="Children" data={filteredData.map(d => d.children)} />
    </div>
  );
};

export default App;
