import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UploadPicture from './components/UploadPicture';
import Home from './routes/Home';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" exact component={UploadPicture} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
