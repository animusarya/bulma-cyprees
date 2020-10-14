import React from 'react';
import { Chart } from 'react-google-charts';

import useProjectDetails from '../../hooks/useProjectDetails';
import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import AdminSubHeader from '../../components/AdminSubHeader';
import {Heading, Title } from '../../components/elements';


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
  // tooltip: {
  //   showColorCode: true,
  // },
  color: '#7a7a7a',
};


const Analytics = () => {

  return (
    <Layout noContainer>
      <Seo title="Manage Page" description="Manage Page Type Content Here" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
          <AdminSubHeader />
          <MainColumn>
            <Heading>Analytics</Heading>
            <div className="columns">
              <div className="column">
                <Title>Client usage</Title>
                <Chart
                  width="100%"
                  height="300px"
                  chartType="PieChart"
                  options={pieOptions}
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Task', 'Hours per Day'],
                    ['David Smith', 11],
                    ['James Brown', 4],
                    ['Helen Mirren', 6.1],
                    ['Paddy Murphy', 3],
                    ['Vicky Roberts', 7],
                  ]}

                  rootProps={{ 'data-testid': '1' }}
                />
              </div>
              <div className="column">
                <Title>Most downloaded files</Title>
                <Chart
                  width="100%"
                  height="300px"
                  chartType="PieChart"
                  options={pieOptions}
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Task', 'Hours per Day'],
                    ['Terms and conditions.pdf', 11],
                    ['Brochure photos.pdf', 2],
                    ['Accounts.docx', 2],
                    ['Legals.pdf', 2],
                    ['Hotel.jpg', 7],
                  ]}

                  rootProps={{ 'data-testid': '1' }}
                />
              </div>
            </div>
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default Analytics;
