import { useQuery } from '@apollo/react-hooks';
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
      clientProject {
        id
        name
        slug
        logo
        heroImage
        disclaimer
        brandColor
        contactName
        contactTelephone
        contactEmail
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
