import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import { Message, Loading } from '../../components/elements';

const meQuery = gql`
  query me {
    me {
      email
    }
  }
`;

const updateProjectClientMutation = gql`
  mutation updateProjectClient($id: ID!, $input: ProjectClientInput!) {
    updateProjectClient(input: { id: $id, input: $input }) {
      id
    }
  }
`;

const AcceptInvitation = ({ match, history }) => {
  const [loading, setLoading] = useState(true);
  const { projectId, clientEmail } = match.params;
  const resultMe = useQuery(meQuery, {
    fetchPolicy: 'cache-and-network',
  });

  const [executeMutation] = useMutation(updateProjectClientMutation);

  const me = resultMe.data ? resultMe.data.me : {};

  useEffect(async () => {
    if (me && clientEmail === me.email) {
      // is already logged in
      await executeMutation({
        variable: {
          id: projectId,
          input: {
            email: clientEmail,
            status: 'accepted',
          },
        },
      });
      setLoading(false);

      // redirect to project
      history.push(`/admin/project/${projectId}`);
    }
    if (me && clientEmail !== me.email) {
      setLoading(false);
      window.localStorage.clear();
      window.location.reload(true);
      window.location.replace(`/register/${projectId}/${clientEmail}`);
    }
    if (!me) {
      setLoading(false);
      history.push(`/register/${projectId}/${clientEmail}`);
    }
  }, [me]);

  return (
    <Layout>{loading ? <Loading /> : <Message>Redirecting...</Message>}</Layout>
  );
};

export default AcceptInvitation;
