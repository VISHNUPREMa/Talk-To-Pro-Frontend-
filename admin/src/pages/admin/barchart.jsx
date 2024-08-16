import React, { useEffect, useState } from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { BACKEND_SERVER } from '../../secret/secret';

export default function BarCharts() {
  const [series, setSeries] = useState([]);
  const [xAxisData, setXAxisData] = useState([]);

  useEffect(() => {
    fetchBarchartData();
  }, []);

  const fetchBarchartData = async () => {
    try {
      const response = await axios.get(`${BACKEND_SERVER}/getbarchart`);
      if (response.data.success) {
        const transformedData = transformData(response.data.data);
        console.log("transformed data : ",transformData);
        
        setSeries(transformedData.series);
        console.log("transformedData series : ",transformData.series);
        
        setXAxisData(transformedData.dates);
        console.log("transformedData.dates : ",transformedData.dates);
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const transformData = (data) => {
    // Get unique dates
    const dates = [...new Set(data.map(item => item.date))].sort();

    // Group data by profession
    const professions = [...new Set(data.map(item => item.profession))];
    const series = professions.map(profession => ({
      label: profession,
      data: dates.map(date => {
        const entry = data.find(item => item.date === date && item.profession === profession);
        return entry ? entry.count : 0;
      })
    }));

    return { series, dates };
  };

  return (
    <BarChart
      series={series}
      height={290}
      xAxis={[{ data: xAxisData, scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
}
