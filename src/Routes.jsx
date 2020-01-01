import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import PrivateRoute from './components/Routing/PrivateRoute'

// Views
import DataPO from './views/DataPO/DataPO'
import StokBarang from './views/StokBarang/StokBarang'
import SuratJalan from './views/SuratJalan/SuratJalan'
import Laporan from './views/Laporan/Laporan'
import Dashboard from './views/Dashboard';
import ProductList from './views/ProductList';
import Users from './views/Users/Users'
import Typography from './views/Typography';
import Icons from './views/Icons';
import Account from './views/Account';
import Settings from './views/Settings';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import UnderDevelopment from './views/UnderDevelopment';
import NotFound from './views/NotFound';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <PrivateRoute
          component={Dashboard}
          exact
          path="/dashboard"
        />
        <PrivateRoute
          component={DataPO}
          exact
          path="/data-po"
        />
        <PrivateRoute
          component={SuratJalan}
          exact
          path="/surat-jalan"
        />
        <PrivateRoute
          component={StokBarang}
          exact
          path="/stok-barang"
        />
         <PrivateRoute
          component={Laporan}
          exact
          path="/laporan"
        />
        <PrivateRoute
          component={Users}
          exact
          path="/users"
        />
        <PrivateRoute
          component={ProductList}
          exact
          path="/products"
        />
        <Route
          component={Typography}
          exact
          path="/typography"
        />
        <Route
          component={Icons}
          exact
          path="/icons"
        />
        <Route
          component={Account}
          exact
          path="/account"
        />
        <Route
          component={Settings}
          exact
          path="/settings"
        />
        <Route
          component={SignUp}
          exact
          path="/sign-up"
        />
        <Route
          component={SignIn}
          exact
          path="/sign-in"
        />
        <Route
          component={UnderDevelopment}
          exact
          path="/under-development"
        />
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
