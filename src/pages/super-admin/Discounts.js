import React from 'react';
import styled from 'styled-components';
import { useMutation } from "urql";
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Button, Title, InputGroup } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const createDiscountMutation = gql`
  mutation createDiscount($name: String!, $percentage: Int!) {
    createDiscount(input: { name: $name, percentage: $percentage }) {
      id
      name
      percentage
    }
  }
`;

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem!important;
  }
  td.actions {
    color:  ${props => props.theme.primaryColor};
  }
`;

class Discounts extends React.Component {
  state = {
    name: '',
    percentage: '',
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  addCoupons = () => {
    const { coupons, name, percentage } = this.state;
    const newCoupons = coupons.concat({ name, percentage });
    this.setState({
      coupons: newCoupons,
      name: '',
      percentage: '',
    });
  };

  onSubmit = () => {
    const { name, percentage } = this.state;
    this.setState({
      name: '',
      percentage: '',
    });
    console.log(name, percentage);
  };

  render() {
    const { name, percentage } = this.state;
    return (
      <Layout>
        <Seo title="Projects Clients " description="Page description" />
        <Header />
        <Container className="columns">
          <div className="column is-one-fifth">
            <Sidebar />
          </div>
          <div className="column">
            <MainColumn>
              <Heading>Discount Codes</Heading>
              <Title>Create Discount Code</Title>
              <InputGroup isHorizontal label="Discount Code" placeholder="50SAVE" value={name} onChange={this.onChange} />
              <InputGroup isHorizontal label="Percentage" placeholder="50%" value={percentage} onChange={this.onChange} />
              <div className="is-pulled-right">
                <Button onClick={this.addCoupons}>
                  Add
              </Button>
              </div>
              <div>
                <Title margin="4rem">Discount Codes</Title>
                <table className="table is-fullwidth is-hoverable">
                  <thead>
                    <tr>
                      <th className="has-text-left">Code</th>
                      <th className="has-text-left">Password</th>
                      <th className="has-text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>50SAVE</td>
                      <td></td>
                      <td className="is-uppercase actions has-text-right">delete</td>
                    </tr>
                    <tr>
                      <td>100SAVE</td>
                      <td></td>
                      <td className="is-uppercase actions has-text-right">delete</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </MainColumn>
          </div>
        </Container>
        <CopyRight />
      </Layout>
    );
  }
}

export default Discounts;
