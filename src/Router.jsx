import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UploadPicture from './components/UploadPicture';
import City from './routes/City';
import Home from './routes/Home';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" exact component={UploadPicture} />
          <Route path="/city/:cityName" exact component={City} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
