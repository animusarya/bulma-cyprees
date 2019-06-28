import styled from 'styled-components';

const MainColumn = styled.div`
  margin-left: ${props => (props.marginleft ? props.marginleft : '')};
  margin-right: ${props => (props.marginRight ? props.marginRight : '')};
  padding: ${props => (props.paddingless ? '0px' : '3rem')};
`;

export default MainColumn;
