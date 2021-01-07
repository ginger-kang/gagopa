import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UploadPicture from './routes/UploadPicture';
import City from './routes/City';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Account from './routes/Account';
import ProfileEdit from './routes/ProfileEdit';
import PasswordEdit from './routes/PasswordEdit';

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/upload" exact component={UploadPicture} />
          <Route path="/city/:cityName" exact component={City} />
          <Route path="/city/:cityName/:id" exact component={Detail} />
          <Route path="/account" exact component={Account} />
          <Route path="/profile/edit" exact component={ProfileEdit} />
          <Route path="/password/edit" exact component={PasswordEdit} />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Router;
