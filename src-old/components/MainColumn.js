import styled from 'styled-components';

const MainColumn = styled.div`
  margin-left: ${props => (props.marginleft ? props.marginleft : '')};
  margin-right: ${props => (props.marginRight ? props.marginRight : '')};
  padding: 2rem 2rem;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '')};
`;

export default MainColumn;
