import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const meQuery = gql`
  query me {
    me {
      id
      email
      profile {
        fullName
        companyName
        telephone
      }
    }
  }
`;

const useMeDetails = () => {
  const resultMe = useQuery(meQuery, {
    fetchPolicy: 'cache-and-network',
  });

  const me = resultMe.data ? resultMe.data.me : {};

  return [me, resultMe];
};

export default useMeDetails;
