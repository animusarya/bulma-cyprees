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

const Width = '340px';

const Help = () => {
  const [executeQuery] = useQuery({
    query: helpQuery,
  });

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
              <div className="column">
                <Subtitle>{executeQuery.name}</Subtitle>
                <video muted controls width={Width}>
                  <source
                    src={`//www.youtube.com/embed/${executeQuery.embedCode}`}
                    type="video/mp4"
                  />
                </video>
              </div>
              {/* <div className="column">
                <Subtitle>How to upload a dataroom file</Subtitle>
                <video muted controls width={Width}>
                  <source src={video} type="video/mp4" />
                </video>
              </div> */}
            </div>
            {/* <div className="columns">
              <div className="column">
                <Subtitle>How to add a client</Subtitle>
                <video muted controls width={Width}>
                  <source src={video} type="video/mp4" />
                </video>
              </div>
              <div className="column">
                <Subtitle>How to delete a client</Subtitle>
                <video muted controls width={Width}>
                  <source src={video} type="video/mp4" />
                </video>
              </div>
            </div> */}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default Help;
