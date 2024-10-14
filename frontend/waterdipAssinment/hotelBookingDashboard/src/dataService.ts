// src/dataService.ts
import Papa, { ParseResult } from 'papaparse';
import { BookingData } from './types';

export const fetchData = async (): Promise<BookingData[]> => {
    const response = await fetch('/random_hotel_bookings.csv');
  const csvText = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<BookingData>(csvText, {
      header: true,
      complete: (result: ParseResult<BookingData>) => resolve(result.data),
      error: (error: Error) => reject(error),
    });
  });
};
