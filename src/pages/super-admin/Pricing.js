import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from 'urql';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Title, Message, Loading } from '../../components/elements';
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
  mutation createPackage($name: String!, $price: Float!) {
    createPackage(input: { name: $name, price: $price }) {
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
    width: 60%;
    border-radius: 0px;
    border: 1px solid ${props => props.theme.primaryColor};
  }
`;

const Pricing = () => {
  const [res, executeMutation] = useMutation(pricingMutation);
  const [result] = useQuery({
    query: pricingsQuery,
  });
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
            <Title>Plans</Title>
            {res.error && <Message type="error">{res.error.message}</Message>}
            {res.fetching && <Loading />}
            {result.data && (
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
                  {result.data.discounts.map(item => (
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
                        delete
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

export default Pricing;
