import React, { useState, useEffect } from 'react';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import { Message, Loading } from '../../components/elements';

const meQuery = gql`
  query me {
    me {
      id
      email
    }
  }
`;

const AcceptInvitation = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const { projectId } = match.params;
  const [resultMe] = useQuery({
    query: meQuery,
  });

  useEffect(() => {
    console.log(resultMe, projectId);
  }, []);

  return (
    <Layout>{loading ? <Loading /> : <Message>hvbchjadcvhj</Message>}</Layout>
  );
};

export default AcceptInvitation;
