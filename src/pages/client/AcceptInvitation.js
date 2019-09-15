import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Layout from '../../components/Layout';
import { Message, Loading } from '../../components/elements';

const meQuery = gql`
  query me {
    me {
      email
      status
      hasAccess
      notifyStatus
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

const AcceptInvitation = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const { projectId } = match.params;
  const resultMe = useQuery(meQuery, {
    fetchPolicy: 'cache-and-network',
  });

  const [executeMutation, res] = useMutation(updateProjectClientMutation);

  const me = resultMe.data ? resultMe.data.me : {};
  useEffect(() => {
    if (me) {
      executeMutation({
        variable: {
          id: projectId,
          input: {
            email: me.email,
            status: 'accepted',
            hasAccess: me.hasAccess,
            notifyStatus: me.notifyStatus,
          },
        },
      });
      if (res.data) {
        setLoading(false);
      }
    }
  });

  return (
    <Layout>{loading ? <Loading /> : <Message>Loading...</Message>}</Layout>
  );
};

export default AcceptInvitation;
