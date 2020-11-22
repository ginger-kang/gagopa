import React from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './global-styles';
import { withAuthenticator } from '@aws-amplify/ui-react';

const Hello = styled.div`
  background-color: orange;
`;

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Hello>안녕하세요</Hello>
    </React.Fragment>
  );
}

export default withAuthenticator(App);
