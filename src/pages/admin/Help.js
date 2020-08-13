import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Heading, Subtitle } from '../../components/elements';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const helpQuery = gql`
  query support {
    support {
      id
      name
      embedCode
    }
  }
`;

const Help = () => {
  const supportData = useQuery(helpQuery, {
    fetchPolicy: 'network-only',
  });
  const support = supportData.data ? supportData.data.support : [];

  return (
    <Layout noContainer>
      <Seo title="Help" description="Manage Help Content" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Help</Heading>
            <div className="columns">
              {support.map((item) => (
                <div className="column" key={item.id}>
                  <Subtitle>{item.name}</Subtitle>
                  <section
                    dangerouslySetInnerHTML={{ __html: item.embedCode }}
                  />
                </div>
              ))}
            </div>
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default Help;
