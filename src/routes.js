import React, { Fragment } from 'react';
import { PrivateLayout, PublicLayout, NotLoggedInLayout } from '@layouts';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import {
  Login,
  Register,
  PageNotFound,
  Welcome,
  RegistrationSuccess,
  Profile,
  MapComponent,
  MisAmigosComponent,
  AyudaComponent
  
} from './containers';






const privateRoutes = [
  {
    id: 'home',
    path: '/viade_es4b/',
    component: Welcome
  },
  {
    id: 'welcome',
    path: '/viade_es4b/welcome',
    component: Welcome
  },
  {
    id: 'profile',
    path: '/viade_es4b/profile',
    component: Profile
  },
  {
    id: 'map',
    path: '/viade_es4b/map',
    component: MapComponent
  },
  {
    id: 'friends',
    path: '/viade_es4b/friends',
    component: MisAmigosComponent
  },
  {
    id: 'ayuda',
    path: '/viade_es4b/ayuda',
    component: AyudaComponent
  }
];

const Routes = () => (
  <Router>
    <Fragment>
      <Switch>
        <NotLoggedInLayout component={Login} path="/viade_es4b/login" exact />
        <NotLoggedInLayout component={Register} path="/viade_es4b/register" exact />
        <NotLoggedInLayout path="/viade_es4b/register/success" component={RegistrationSuccess} exact />
        <PublicLayout path="/viade_es4b/404" component={PageNotFound} exact />
        <Redirect from="/" to="/viade_es4b/welcome" exact />
        <PrivateLayout path="/viade_es4b/" routes={privateRoutes} />
        <Redirect from="/login" to="/viade_es4b/login" exact />
        <Redirect from= "/viade_es4b/#" to="/viade_es4b/welcome" exact/>
       
        
      </Switch>
    </Fragment>
  </Router>
);

export default Routes;
