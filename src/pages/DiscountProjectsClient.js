import React from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import { Heading, Button, } from '../components/elements';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainColumn from '../components/MainColumn';
import CopyRight from '../components/CopyRight';
import Title from '../components/elements/Title';
import HorizontalInput from '../components/elements/HorizontalInput';

const Container = styled.div`

 .pound-icon {
  font-size: 0.85rem!important;
}
td.actions {
  color:  ${props => props.theme.primaryColor};
}

`;

const DiscountProjectsClient = () => {
  return (
    <Layout>
      <Seo title="Projects Clients " description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar/>
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Discount Codes</Heading>
            <Title>Create Discount Code</Title>
            <HorizontalInput label="Discount Code" placeholder="50SAVE"/>
            <HorizontalInput label="Percentage" placeholder="50%"/>
            <div className="is-pulled-right">
              <Button >
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
};

export default DiscountProjectsClient;
