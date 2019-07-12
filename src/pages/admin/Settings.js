import React from 'react';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import CopyRight from '../../components/CopyRight';
import MainColumn from '../../components/MainColumn';
import { Heading, Message, Loading } from '../../components/elements';
import AdminHeader from '../../components/AdminHeader';
import SettingsForm from '../../components/SettingsForm';

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

const Settings = () => {
  const [res, executeMutation] = useMutation(settingMutation);

  return (
    <Layout>
      <Seo title="User Settings" description="Page description" />
      <Header />
      <div className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <AdminHeader />
          <MainColumn paddingtop="1rem">
            <Heading>Setting</Heading>
            <div>
              <SettingsForm
                onSubmit={data => {
                  executeMutation(data);
                }}
              />
            </div>
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.fetching ? <Loading /> : null}
          </MainColumn>
        </div>
      </div>
      <CopyRight />
    </Layout>
  );
};

export default Settings;
