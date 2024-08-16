import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { BACKEND_SERVER } from '../../secret/secret';

export default function PieActiveArc() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchPieChartData();
  }, []);

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get(`${BACKEND_SERVER}/piechart`);
      console.log('response : ',response);
      
      if(response.data.success){
        const transformedData = response.data.data.map((item, index) => ({
            id: index,
            value: item.count,
            label: item._id,
          }));
    
          setData(transformedData); // Assuming response.data is an array of objects like [{ id: 0, value: 20, label: 'series A' }, ...]
      }else{
        alert(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PieChart
      series={[
        {
          data,
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      height={200}
    />
  );
}
