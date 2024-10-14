// src/components/DateRangePicker.tsx
import React from 'react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onDateChange: (start: string, end: string) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ startDate, endDate, onDateChange }) => {
  return (
    <div>
      <label htmlFor="start-date">Start Date: </label>
      <input
        id="start-date"
        type="date"
        value={startDate}
        onChange={(e) => onDateChange(e.target.value, endDate)}
        title="Select start date" // Optional, to describe the input for screen readers
      />
      <label htmlFor="end-date">End Date: </label>
      <input
        id="end-date"
        type="date"
        value={endDate}
        onChange={(e) => onDateChange(startDate, e.target.value)}
        title="Select end date" // Optional
      />
    </div>
  );
};

export default DateRangePicker;
