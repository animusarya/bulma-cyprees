import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import AdminHeader from '../../components/AdminHeader';
import AdminSubHeader from '../../components/AdminSubHeader';
import { Heading } from '../../components/elements';
import AnalyticChartItem from '../../components/AnalyticChartItem';
import ClientActivity from '../../components/ClientActivity';

const clientActivityQuery = gql`
  query clientActivity($projectId: ID!) {
    clientActivity(projectId: $projectId) {
      _id
      clientId {
        id
        email
        profile {
          fullName
        }
      }
      fileId {
        name
      }
      createdAt
    }
  }
`;

const clientUsageLogsQuery = gql`
  query clientUsageLogs($projectId: ID!) {
    clientUsageLogs(projectId: $projectId) {
      _id
      userName
      count
    }
  }
`;

const filesDownloadLogsQuery = gql`
  query filesDownloadLogs($projectId: ID!) {
    filesDownloadLogs(projectId: $projectId) {
      _id
      fileName
      count
    }
  }
`;

const Analytics = ({ match }) => {
  const { id: projectId } = match.params;
  const resultClientActivity = useQuery(clientActivityQuery, {
    variables: {
      projectId,
    },
    fetchPolicy: 'cache-and-network',
  });

  const clientUsageLogsActivity = useQuery(clientUsageLogsQuery, {
    variables: {
      projectId,
    },
    fetchPolicy: 'cache-and-network',
  });

  const filesDownloadLogsActivity = useQuery(filesDownloadLogsQuery, {
    variables: {
      projectId,
    },
    fetchPolicy: 'cache-and-network',
  });

  const clientActivityData =
    resultClientActivity &&
    resultClientActivity.data &&
    resultClientActivity.data.clientActivity
      ? resultClientActivity.data.clientActivity
      : [];

  const clientUsageLogsData =
    clientUsageLogsActivity &&
    clientUsageLogsActivity.data &&
    clientUsageLogsActivity.data.clientUsageLogs
      ? clientUsageLogsActivity.data.clientUsageLogs
      : [];

  const filesDownloadLogsData =
    filesDownloadLogsActivity &&
    filesDownloadLogsActivity.data &&
    filesDownloadLogsActivity.data.filesDownloadLogs
      ? filesDownloadLogsActivity.data.filesDownloadLogs
      : [];

  const projectUsersAnalytics = [['Name', 'downloaded files']];
  const projectFilesAnalytics = [['File Name', 'Most Downloaded Count']];

  // To push array of logs to variable projectUsersAnalytics
  clientUsageLogsData.map(item => {
    // eslint-disable-next-line radix
    const data = [item.userName, parseInt(item.count)];
    projectUsersAnalytics.push(data);
  });

  // To push array of logs to variable projectFilesAnalytics
  filesDownloadLogsData.map(item => {
    // eslint-disable-next-line radix
    const data = [item.fileName, parseInt(item.count)];
    projectFilesAnalytics.push(data);
  });

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
                <AnalyticChartItem
                  title="Client usage"
                  data={projectUsersAnalytics}
                />
              </div>
              <div className="column">
                <AnalyticChartItem
                  title="Most downloaded files"
                  data={projectFilesAnalytics}
                />
              </div>
            </div>
            <ClientActivity clientActivityData={clientActivityData} />
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default Analytics;
