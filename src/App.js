import React from 'react';
import { GlobalStyle } from './global-styles';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Router from './Router';
Amplify.configure(awsconfig);

const App = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <Router />
    </React.Fragment>
  );
};

export default App;
