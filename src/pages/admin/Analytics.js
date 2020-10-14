import React from 'react';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import AdminSubHeader from '../../components/AdminSubHeader';
import {Heading, Title } from '../../components/elements';
import AnalyticChartItem from '../../components/AnalyticChartItem';
import ClientActivity from '../../components/ClientActivity';

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
                <AnalyticChartItem title="Client usage" data={[
                    ['Task', 'Hours per Day'],
                    ['David Smith', 11],
                    ['James Brown', 4],
                    ['Helen Mirren', 6.1],
                    ['Paddy Murphy', 3],
                    ['Vicky Roberts', 7],
                  ]}/>
              </div>
              <div className="column">
              <AnalyticChartItem title="Most downloaded files" data={[
                    ['Task', 'Hours per Day'],
                    ['Terms and conditions.pdf', 11],
                    ['Brochure photos.pdf', 2],
                    ['Accounts.docx', 2],
                    ['Legals.pdf', 2],
                    ['Hotel.jpg', 7],
                  ]}/>
              </div>
            </div>
            <ClientActivity />
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default Analytics;
