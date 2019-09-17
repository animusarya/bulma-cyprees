import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const meQuery = gql`
  query me {
    me {
      id
      email
      profile {
        fullName
        company
        telephone
      }
      clientProject {
        id
        name
        slug
        logo
        heroImage
        disclaimer
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
