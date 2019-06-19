import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import Header from '../components/Header';
import { Heading } from '../components/elements';

const Container = styled.section`
  padding: 0px 0px;
  margin: 12px 12px;
.logo {
  width: 28px;
  height: 28px;
}
 span {
  color: ${props => props.theme.primaryColor};
 }
 .subtitle {
  margin-top: 20px !important;
  margin-bottom: 19px;
 }
 .SideBar {
  background-color: ${props => props.theme.GrayColor};
}
 
.form {
  margin: 19% 4%;
}
.input {
    border-top: hidden;
    border-left: hidden;
    border-right: hidden;
    border-radius: 3px
    -webkit-box-shadow: none;
    :focus {
      border-color: #dbdbdb;
    }
  }
  table {
    width:100%;
    margin-top: 1rem;
  }
  td {
    color: ${props => props.theme.primaryColor};
  }
  .TableHead {
    background-color: ${props => props.theme.GrayColor};
  }
  .TrashIcon {
    margin-right: 12px;
    width: 13px;
  }
  .IconPlus {
    margin: 3px 6px;
  }
  .media {
    margin-top: 0px;
    padding-top: 12px;
  }
 
`;

export default () => (
  <Layout>
    <Seo title="ClientList" description="Some description here." />
    <Header />
    <Container className="section">
      <div className="container">
        <div className="columns">
          <div className="column is-one-fifth SideBar">
            <div className="media">
              <i className="IconPlus fas fa-plus-circle" />
              <p className="has-text-weight-normal has-text-grey is-size-6">
                Cleint
              </p>
            </div>
            <div className="media">
              <i className="IconPlus fas fa-folder-open" />
              <p className="has-text-weight-normal has-text-grey is-size-6">
                Discount Codes
              </p>
            </div>
          </div>
          <div className="column">
            <Heading title="Client" />
            <div>
              <table className="table is-striped">
                <tr className="TableHead">
                  <th className="is-size-7 has-text-grey has-text-weight-light">
                    Name
                  </th>
                  <th className="has-text-right is-size-7 has-text-grey has-text-weight-light">
                    Delete
                  </th>
                </tr>
                <tr>
                  <td className="is-size-7">January</td>
                  <td className="has-text-right">
                    <i className="TrashIcon fas fa-trash-alt" />
                  </td>
                </tr>
                <tr>
                  <td className="is-size-7">February</td>
                  <td className="has-text-right">
                    <i className="TrashIcon fas fa-trash-alt" />
                  </td>
                </tr>
                <tr>
                  <td className="is-size-7">February</td>
                  <td className="has-text-right">
                    <i className="TrashIcon fas fa-trash-alt" />
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  </Layout>
);
