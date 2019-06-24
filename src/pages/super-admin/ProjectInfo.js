import React from 'react';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import { Heading, Button, Title, InputGroup, CheckBox } from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const Container = styled.div`
  .project-info {
    margin-bottom: 3rem;
  }
  .action {
    color:  ${props => props.theme.primaryColor};
  }
  .modules {
    margin-top: 4rem;
  }
  label {
    color:  ${props => props.theme.secondaryColor};
  }
`;

const ProjectInfo = () => {
  return (
    <Layout>
      <Seo title="Information Projects Clients" description="Page description" />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar/>
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Clients &gt; rob@colliers.com &gt; Project Arden</Heading>
            <Title>Project Information</Title>
            <div className="project-info">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label has-text-left has-text-weight-semibold	">Default URL</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className="input is-static input-field" type="email" value="intellishare.online/colliers" readOnly/>
                    </p>
                  </div>
                </div>
              </div>

              <InputGroup isHorizontal label="Custom URL" placeholder="www.colliers.co.uk/arden"/>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label has-text-left has-text-weight-semibold">Project Size</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input className="input is-static" type="email" value="5Gb" readOnly/>
                    </p>
                  </div>
                </div>
              </div>
              <div className="is-pulled-right">
                <Button>
                  Save
                </Button>
              </div>
          </div>
          <Title>Admin Users</Title>
            <table className="table is-fullwidth is-hoverable">
              <thead>
                <tr>
                  <th>Users</th>
                  <th>Password</th>
                  <th className="has-text-right">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>rob@collier.com</td>
                  <td>***********</td>
                  <td className="is-uppercase has-text-right action">delete</td>
                </tr>
                <tr>
                  <td>rob@collier.com</td>
                  <td>***********</td>
                  <td className="is-uppercase has-text-right action">delete</td>
                </tr>
                <tr>
                  <td>rob@collier.com</td>
                  <td>***********</td>
                  <td className="is-uppercase has-text-right action">delete</td>
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
            <div className="modules">
              <Title>Modules</Title>
              <CheckBox text="Events" margin="37px" />
              <CheckBox text="Bulletins" margin="18px" />
            </div>
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectInfo;
