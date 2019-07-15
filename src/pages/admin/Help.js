import React from 'react';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Heading, Subtitle } from '../../components/elements';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
// import video from '../../assets/images/videoplayback.mp4';

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
  const [supportData] = useQuery({
    query: helpQuery,
  });
  const support = supportData.data ? supportData.data.support : [];

  return (
    <Layout>
      <Seo title="Dashboard Admin" description="Page description" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Help</Heading>
            <div className="columns">
              {support.map(item => (
                <div className="column" key={item.id}>
                  <Subtitle>{item.name}</Subtitle>
                  {item.embedCode}
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
