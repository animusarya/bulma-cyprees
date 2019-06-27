import React from "react";
import styled from "styled-components";
import { useQuery } from "urql";
import gql from "graphql-tag";

import Layout from "../../components/Layout";
import Seo from "../../components/Seo";
import { Heading, Message, Loading } from "../../components/elements";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import MainColumn from "../../components/MainColumn";
import CopyRight from "../../components/CopyRight";

const clientProjectsQuery = gql`
  {
    projects {
      id
      name
      subscriptionAmount
      subscriptionDurationInMonths
      subscriptionStartsAt
      subscriptionEndsAt
      subscriptionlastRenewedAt
    }
  }
`;

const Container = styled.div`
  .pound-icon {
    font-size: 0.85rem !important;
  }
`;

const ProjectsClient = () => {
  const [result] = useQuery({
    query: clientProjectsQuery
  });
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
            <Heading>Clients &gt; rob@colliers.com</Heading>
            {result.error && (
              <Message type="error">{result.error.message}</Message>
            )}
            {result.fetching && <Loading />}
            {result.data && (
              <table className="table is-fullwidth is-hoverable">
                <thead>
                  <tr>
                    <th>Projects</th>
                    <th>Plan</th>
                    <th>Duration</th>
                    <th>Start</th>
                    <th>Expires</th>
                    <th>Manage</th>
                    <th>Renew</th>
                    <th>Delete</th>
                    <th>Export</th>
                  </tr>
                </thead>
                <tbody>
                  {result.data.projects.map(project => (
                    <tr key={project.id}>
                      <td>
                        <strong>{project.name}</strong>
                      </td>
                      <td>
                        <i className="fas fa-pound-sign pound-icon"></i>
                        {project.subscriptionAmount}
                      </td>
                      <td>{project.subscriptionDurationInMonths}</td>
                      <td>{project.subscriptionStartsAt}</td>
                      <td>{project.subscriptionStartsAt}</td>
                      <td className="is-uppercase actions">manage</td>
                      <td className="is-uppercase actions">renew</td>
                      <td className="is-uppercase actions">delete</td>
                      <td className="is-uppercase actions">export</td>
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

export default ProjectsClient;
