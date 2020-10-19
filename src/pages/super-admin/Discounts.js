import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import swal from 'sweetalert';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import {
  Heading,
  Title,
  Button,
  Message,
  Loading,
} from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';
import DiscountForm from '../../components/DiscountForm';

const discountsQuery = gql`
  {
    discounts {
      id
      name
      code
      percentage
    }
  }
`;

const createDiscountMutation = gql`
  mutation createDiscount($name: String!, $percentage: Int!, $code: String!) {
    createDiscount(
      input: { name: $name, percentage: $percentage, code: $code }
    ) {
      id
      name
      percentage
      code
    }
  }
`;

const removeDiscountMutation = gql`
  mutation removeDiscount($id: ID!) {
    removeDiscount(id: $id) {
      success
    }
  }
`;

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem !important;
  }
  td.actions {
    color: ${(props) => props.theme.primaryColor};
  }
  input {
    border-radius: 0px;
    border: 1px solid ${(props) => props.theme.primaryColor};
  }
`;

const Discounts = () => {
  const result = useQuery(discountsQuery, { fetchPolicy: 'cache-and-network' });
  const [executeMutationAdd, resAdd] = useMutation(createDiscountMutation);
  const [executeMutationRemove, resRemove] = useMutation(
    removeDiscountMutation,
  );

  return (
    <Layout noContainer>
      <Seo title="Discount Code" description="Create Discount Codes" />
      <Header />
      <Container className="columns">
        <div className="column">
          <Sidebar />
        </div>
        <div className="column is-four-fifths">
          <MainColumn>
            <Heading>Discount Codes</Heading>
            <Title>Create Discount Code</Title>
            <DiscountForm
              onSubmit={async (data) => {
                await executeMutationAdd({ variables: data });
                result.refetch();
              }}
            />
            {resAdd.error && (
              <Message type="error">{resAdd.error.message}</Message>
            )}
            {resRemove.error && (
              <Message type="error">{resRemove.error.message}</Message>
            )}
            {result.error && (
              <Message type="error">{result.error.message}</Message>
            )}
            {resAdd.loading || resRemove.loading || result.loading ? (
              <Loading />
            ) : null}
            {result.data && result.data.discounts.length > 0 && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th className="has-text-left">Code</th>
                    <th className="has-text-left">Percentage</th>
                    <th className="has-text-right">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.discounts.map((item) => (
                    <tr key={item.id}>
                      <td>{item.code}</td>
                      <td>{item.percentage}%</td>
                      <td className="has-text-right">
                        <Button
                          secondary
                          paddingless
                          onClick={() => {
                            swal('Are you confirm to delete this item?', {
                              buttons: ['Cancel', 'Confirm'],
                            }).then(async (value) => {
                              if (value) {
                                await executeMutationRemove({
                                  variables: { id: item.id },
                                });
                                result.refetch();
                              }
                            });
                          }}
                        >
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default Discounts;
