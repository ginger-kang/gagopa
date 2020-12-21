import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UploadPicture from './routes/UploadPicture';
import City from './routes/City';
import Home from './routes/Home';
import Detail from './routes/Detail';
import SignIn from './routes/Auth/SignIn';
import SignUp from './routes/Auth/SignUp';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" exact component={UploadPicture} />
          <Route path="/city/:cityName" exact component={City} />
          <Route path="/city/:cityName/:id" exact component={Detail} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
