import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';
import swal from 'sweetalert';
import { isEmpty } from 'lodash';

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
import PricingForm from '../../components/PricingForm';

const pricingsQuery = gql`
  {
    packages {
      id
      name
      price
      durationInMonths
    }
  }
`;

const pricingMutation = gql`
  mutation createPackage(
    $name: String!
    $durationInMonths: Int!
    $price: Float!
  ) {
    createPackage(
      input: { name: $name, durationInMonths: $durationInMonths, price: $price }
    ) {
      id
      name
      price
    }
  }
`;

const removePriceMutation = gql`
  mutation removePackage($id: ID!) {
    removePackage(id: $id) {
      success
    }
  }
`;

const updatePackageMutation = gql`
  mutation updatePackage($id: ID!, $input: PackageInput!) {
    updatePackage(id: $id, input: $input) {
      id
      name
      price
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

const Pricing = () => {
  const [res, executeMutation] = useMutation(pricingMutation);
  const [result, executeQuery] = useQuery({
    query: pricingsQuery,
  });
  const [editClient, setEditClient] = useState({});
  const [resRemove, executeMutationRemove] = useMutation(removePriceMutation);
  const [resEdit, executeMutationEdit] = useMutation(updatePackageMutation);

  return (
    <Layout>
      <Seo title="Projects Pricing" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Set Pricing</Heading>
            <PricingForm
              enableReinitialize
              initialValues={editClient}
              onSubmit={data => {
                if (isEmpty(editClient)) {
                  // add item
                  return executeMutation(data);
                }
                // edit item
                const editItem = editClient;
                setTimeout(() => {
                  swal('Item updated successfully!');
                  executeQuery({
                    requestPolicy: 'network-only',
                  });
                  setEditClient({});
                }, 3000);
                return executeMutationEdit({ id: editItem.id, input: data });
              }}
            />
            {res.error && <Message type="error">{res.error.message}</Message>}
            {resRemove.error && (
              <Message type="error">{resRemove.error.message}</Message>
            )}
            {resEdit.error && (
              <Message type="error">{resEdit.error.message}</Message>
            )}
            {res.fetching ||
            result.fetching ||
            resRemove.fetching ||
            resEdit.fetching ? (
              <Loading />
            ) : null}
            {result.data && result.data.packages && (
              <React.Fragment>
                <Title>Plans</Title>
                <table className="table is-fullwidth is-hoverable">
                  <thead>
                    <tr>
                      <th>Duration</th>
                      <th>Price</th>
                      <th className="has-text-right">Edit</th>
                      <th className="has-text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.packages.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>£{item.price}</td>
                        <td className="is-uppercase actions has-text-right">
                          <Button
                            secondary
                            paddingless
                            onClick={() => setEditClient(item)}>
                            EDIT
                          </Button>
                        </td>
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

export default Pricing;
