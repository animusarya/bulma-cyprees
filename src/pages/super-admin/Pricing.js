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
import PricingForm from '../../components/PricingForm';

const pricingsQuery = gql`
  {
    packages {
      id
      name
      price
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
  const [resRemove, executeMutationRemove] = useMutation(removePriceMutation);

  return (
    <Layout>
      <Seo title="Projects Clients" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Set Pricing</Heading>
            <PricingForm onSubmit={data => executeMutation(data)} />
            {res.error && <Message type="error">{res.error.message}</Message>}
            {resRemove.error && (
              <Message type="error">{resRemove.error.message}</Message>
            )}
            {res.fetching || result.fetching || resRemove.fetching ? (
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
                        <td>
                          <i className="fas fa-pound-sign pound-icon"></i>
                          {item.price}
                        </td>
                        <td className="is-uppercase actions has-text-right">
                          edit
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
