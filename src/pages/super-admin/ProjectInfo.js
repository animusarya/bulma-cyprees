import React from 'react';
import styled from 'styled-components';
import { useMutation } from "urql";
import gql from 'graphql-tag';
import AdminUsers from '../../components/AdminUsers';

import Layout from '../../components/Layout';
import Seo from '../../components/Seo';
import ProjectInfoForm from '../../components/ProjectInfoForm';
import {
  Heading,
  Title,
  Message
} from '../../components/elements';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import MainColumn from '../../components/MainColumn';
import CopyRight from '../../components/CopyRight';

const projectInfoMutation = gql`
  mutation createProjectInfo($customDomain: String!) {
    createProjectInfo(input: { customDomain: $customDomain }) {
      id
      customDomain
    }
  }
`;

const Container = styled.div`
  .project-info {
    margin-bottom: 3rem;
  }
  .modules {
    margin-top: 4rem;
  }
  label {
    color: ${props => props.theme.secondaryColor};
  }
`;

const ProjectInfo = () => {
  const [res, executeMutation] = useMutation(projectInfoMutation);
  return (
    <Layout>
      <Seo
        title="Information Projects Clients"
        description="Page description"
      />
      <Header />
      <Container className="columns">
        <div className="column is-one-fifth">
          <Sidebar />
        </div>
        <div className="column">
          <MainColumn>
            <Heading>Clients &gt; rob@colliers.com &gt; Project Arden</Heading>
            <Title>Project Information</Title>
            <div className="project-info">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label has-text-left has-text-weight-semibold	">
                    Default URL
                  </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        className="input is-static input-field"
                        type="email"
                        value="intellishare.online/colliers"
                        readOnly
                      />
                    </p>
                  </div>
                </div>
              </div>
              <ProjectInfoForm onSubmit={data => executeMutation(data)} />
              {res.error && <Message type="error">{res.error.message}</Message>}
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label has-text-left has-text-weight-semibold">
                    Project Size
                  </label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <p className="control">
                      <input
                        className="input is-static"
                        type="email"
                        value="5Gb"
                        readOnly
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <AdminUsers />
          </MainColumn>
        </div>
      </Container>
      <CopyRight />
    </Layout>
  );
};

export default ProjectInfo;
