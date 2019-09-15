import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ClientHeader from '../../components/ClientHeader';
import CopyRight from '../../components/CopyRight';
import { Heading, Message, Loading } from '../../components/elements';
import ClientSettingsForm from '../../components/ClientSettingsForm';

const meQuery = gql`
  query me {
    me {
      id
      email
      profile {
        fullName
        company
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
        company
        telephone
      }
    }
  }
`;

const Container = styled.div`
  thead {
    background: transparent;
  }
`;

const ClientSettings = () => {
  const meData = useQuery(meQuery, { fetchPolicy: 'cache-and-network' });
  const [executeMutation, res] = useMutation(settingMutation);
  const me = meData.data ? meData.data.me : {};
  // console.log('res', me);

  return (
    <Layout>
      <Seo title="User Settings" description="Page description" />
      <ClientHeader />
      <Container className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-three-fifths is-offset-one-fifth">
              <Heading>Settings</Heading>
              <div>
                <ClientSettingsForm
                  enableReinitialize
                  initialValues={me}
                  onSubmit={data =>
                    executeMutation({ variables: { input: data } })
                  }
                />
              </div>
              {res.error && <Message type="error">{res.error.message}</Message>}
              {res.loading ? <Loading /> : null}
            </div>
          </div>
          <CopyRight />
        </div>
      </Container>
    </Layout>
  );
};

export default ClientSettings;
