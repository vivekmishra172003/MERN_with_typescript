// src/App.tsx
import React from 'react';
import './App.css';
import MyChart from './Chart';  // Import the chart component

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>React with Vite and ApexCharts (TypeScript)</h1>
      <MyChart />  {/* Use the chart component */}
    </div>
  );
};

export default App;
