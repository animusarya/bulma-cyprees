import styled from 'styled-components';

const MainColumn = styled.div`
  margin-left: ${props => (props.marginleft ? props.marginleft : '')};
  margin-right: ${props => (props.marginRight ? props.marginRight : '')};
  padding: 3rem 6rem;
  padding-top: ${props => (props.paddingtop ? props.paddingtop : '')};
`;

export default MainColumn;
