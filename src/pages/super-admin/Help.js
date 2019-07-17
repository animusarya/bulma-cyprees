import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import {
  Heading,
  Title,
  Message,
  Loading,
  Button,
} from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import HelpForm from '../../components/HelpForm';

const supportQuery = gql`
  {
    support {
      id
      name
      embedCode
    }
  }
`;

const createSupportMutation = gql`
  mutation createSupport($input: SupportInput!) {
    createSupport(input: $input) {
      name
      embedCode
    }
  }
`;

const removeSupportMutation = gql`
  mutation removeSupport($id: ID!) {
    removeSupport(id: $id) {
      success
    }
  }
`;

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem !important;
  }
  input {
    border-radius: 0px;
    border: 1px solid ${props => props.theme.primaryColor};
  }
`;

const HelpSuperAdmin = () => {
  const [res, executeMutation] = useMutation(createSupportMutation);
  const [result, executeQuery] = useQuery({
    query: supportQuery,
  });
  const [resRemove, executeMutationRemove] = useMutation(removeSupportMutation);

  return (
    <Layout>
      <Seo
        title="Manage Help Super Admin"
        description="Provide Videos for Help"
      />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Manage Help</Heading>
            <HelpForm
              onSubmit={data => {
                executeMutation({ input: data });
              }}
            />
            {res.error && <Message type="error">{res.error.message}</Message>}
            {resRemove.error && (
              <Message type="error">{resRemove.error.message}</Message>
            )}
            {res.fetching || result.fetching || resRemove.fetching ? (
              <Loading />
            ) : null}
            {result.data && result.data.support && (
              <React.Fragment>
                {/* <Title marginTop="4rem">Videos</Title> */}
                <table className="table is-fullwidth is-hoverable">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th className="has-text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.support.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td className="is-uppercase actions has-text-right">
                          <Button
                            secondary
                            paddingless
                            onClick={() => {
                              swal('Are you confirm to delete this item?', {
                                buttons: ['Cancel', 'Confirm'],
                              }).then(async value => {
                                if (value) {
                                  await executeMutationRemove({ id: item.id });
                                  executeQuery({
                                    requestPolicy: 'network-only',
                                  });
                                }
                              });
                            }}>
                            DELETE
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </React.Fragment>
            )}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default HelpSuperAdmin;
