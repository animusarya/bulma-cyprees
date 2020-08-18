import React, { useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from '@apollo/client';
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
  const result = useQuery(pricingsQuery, { fetchPolicy: 'cache-and-network' });
  const [executeMutation, res] = useMutation(pricingMutation);
  const [executeMutationEdit, resEdit] = useMutation(updatePackageMutation);
  const [editClient, setEditClient] = useState({});

  return (
    <Layout>
      <Seo title="Projects Pricing" description="Setup Subscription Plans" />
      <Header />
      <Container className="columns">
        <div className="column">
          <Sidebar />
        </div>
        <div className="column is-four-fifths">
          <MainColumn>
            <Heading>Set Pricing</Heading>
            <PricingForm
              enableReinitialize
              initialValues={editClient}
              onSubmit={data => {
                if (isEmpty(editClient)) {
                  // add item
                  setTimeout(() => {
                    swal('Item created successfully!');
                    result.refetch();
                  }, 3000);
                  return executeMutation({ variables: data });
                }
                // edit item
                const editItem = editClient;
                setTimeout(() => {
                  swal('Item updated successfully!');
                  result.refetch();
                  setEditClient({});
                }, 3000);
                return executeMutationEdit({
                  variables: { id: editItem.id, input: data },
                });
              }}
            />
            {res.error && <Message type="error">{res.error.message}</Message>}
            {/* {resRemove.error && (
              <Message type="error">{resRemove.error.message}</Message>
            )} */}
            {resEdit.error && (
              <Message type="error">{resEdit.error.message}</Message>
            )}
            {res.loading || result.loading || resEdit.loading ? (
              <Loading />
            ) : null}
            {result.data && result.data.packages && (
              <React.Fragment>
                <Title marginTop="4rem">Plans</Title>
                <table className="table is-fullwidth is-hoverable">
                  <thead>
                    <tr>
                      <th>Duration</th>
                      <th>Price</th>
                      <th></th>
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
