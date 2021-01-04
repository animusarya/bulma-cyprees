import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
// import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import { Heading, Message, Loading } from '../../components/elements';
import { SettingsForm } from '../../components/forms';

const Container = styled.div`
  height: 100vh;
`;

const meQuery = gql`
  query me {
    me {
      id
      email
      profile {
        fullName
        companyName
        telephone
      }
    }
  }
`;

const settingMutation = gql`
  mutation updateMe($input: UpdateUserInput!) {
    updateMe(input: $input) {
      id
      email
      profile {
        fullName
        companyName
        telephone
      }
    }
  }
`;

const Settings = () => {
  const meData = useQuery(meQuery, { fetchPolicy: 'cache-and-network' });
  const [executeMutation, res] = useMutation(settingMutation);
  const me = meData.data ? meData.data.me : {};
  // console.log('res', me);

  return (
    <Layout noContainer>
      <Seo title="Settings" description="Update User info" />
      <Header />
      <section className="section">
        <div className="container">
          <Container className="columns">
            {/* <div className="column is-one-fifth">
          <Sidebar />
        </div> */}
            <div className="column">
              <MainColumn paddingtop="1rem">
                <Heading>Settings</Heading>
                <div>
                  <SettingsForm
                    enableReinitialize
                    initialValues={me}
                    onSubmit={async (data) => {
                      await executeMutation({ variables: { input: data } });
                      swal('Settings updated');
                    }}
                  />
                </div>
                {res.error && (
                  <Message type="error">{res.error.message}</Message>
                )}
                {res.loading ? <Loading /> : null}
              </MainColumn>
            </div>
          </Container>
        </div>
      </section>
      <CopyRight />
    </Layout>
  );
};

export default Settings;
