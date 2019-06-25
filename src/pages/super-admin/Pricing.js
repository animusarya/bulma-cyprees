import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Button, Title } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem!important;
  }
  input {
    width: 60%;
    border-radius: 0px;
    border: 1px solid ${props => props.theme.primaryColor};
  }
`;

const Pricing = () => {
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
                <tr>
                  <td>Monthly</td>
                  <td><i className="fas fa-pound-sign pound-icon"></i>300</td>
                  <td className="has-text-right"><Button secondary paddingless>EDIT</Button></td>
                  <td className="has-text-right"><Button secondary paddingless>DELETE</Button></td>
                </tr>
                <tr>
                  <td>Bi-Annually</td>
                  <td><i className="fas fa-pound-sign pound-icon"></i>180</td>
                  <td className="has-text-right"><Button secondary paddingless>EDIT</Button></td>
                  <td className="has-text-right"><Button secondary paddingless>DELETE</Button></td>
                </tr>
                <tr>
                  <td>Annually</td>
                  <td><i className="fas fa-pound-sign pound-icon"></i>360</td>
                  <td className="has-text-right"><Button secondary paddingless>EDIT</Button></td>
                  <td className="has-text-right"><Button secondary paddingless>DELETE</Button></td>
                </tr>
                <tr>
                  <td><input className="input" type="text" placeholder="" /></td>
                  <td><input className="input" type="text" placeholder="" /></td>
                  <td className="has-text-right"><Button secondary paddingless>EDIT</Button></td>
                  <td className="has-text-right"><Button secondary paddingless>DELETE</Button></td>
                </tr>
              </tbody>
            </table>
            <div className="field is-grouped is-pulled-right">
              <p className="control">
                <Button>
                  Add
                </Button>
              </p>
              <p className="control">
                <Button>
                  Save
                </Button>
              </p>
            </div>
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default Pricing;
