import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from "urql";
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Title, Message, Loading } from '../../components/elements';
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
    createDiscount(input: { name: $name, percentage: $percentage, code: $code }) {
      id
      name
      percentage
      code
    }
  }
`;

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem !important;
  }
  td.actions {
    color:  ${props => props.theme.primaryColor};
  }
`;

const Discounts = () => {
  const [res, executeMutation] = useMutation(createDiscountMutation);
  const [result] = useQuery({
    query: discountsQuery,
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
            <Heading>Discount Codes</Heading>
            <Title>Create Discount Code</Title>
            <DiscountForm onSubmit={data => executeMutation(data)} />
            {res.error && <Message type="error">{res.error.message}</Message>}
            <div>
              <Title margin="4rem">Discount Codes</Title>
              {res.error && <Message type="error">{res.error.message}</Message>}
              {res.fetching && <Loading />}
              {result.data && (
                <table className="table is-fullwidth is-hoverable">
                  <thead>
                    <tr>
                      <th className="has-text-left">Code</th>
                      <th className="has-text-left">Percentage</th>
                      <th className="has-text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.data.discounts.map(item => (
                      <tr key={item.id}>
                        <td>{item.name}{item.code}</td>
                        <td>{item.percentage}%</td>
                        <td className="is-uppercase actions has-text-right">delete</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
}


export default Discounts;
