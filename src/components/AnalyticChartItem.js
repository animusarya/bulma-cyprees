import React from 'react';
import { Chart } from 'react-google-charts';

import { Title } from './elements';

const pieOptions = {
  gridlines: {
    color: 'red',
  },
  slices: [
    {
      color: '#25313f',
    },
    {
      color: '#79b5db',
    },
    {
      color: '#f0ad2d',
    },
    {
      color: '#f05b5b',
    },
    {
      color: '#9cbf3b',
    },
  ],
  legend: {
    alignment: 'center',
    textStyle: {
      color: '7a7a7a',
      fontSize: 15,
    },
  },

  chartArea: {
    width: '100%',
    height: '80%',
  },
  color: '#7a7a7a',
};

const AnalyticChartItem = ({data, title}) => {
  return (
    <>
    <Title>{title}</Title>
                <Chart
                  width="100%"
                  height="300px"
                  chartType="PieChart"
                  options={pieOptions}
                  loader={<div>Loading Chart</div>}
                  data={data}
                  rootProps={{ 'data-testid': '1' }}
                />
                </>
  );
};

export default AnalyticChartItem;
