import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import DataPO from './views/DataPO/DataPO'
import StokBarang from './views/StokBarang/StokBarang'
import SuratJalan from './views/SuratJalan/SuratJalan'
import Laporan from './views/Laporan/Laporan'
import Dashboard from './views/Dashboard';
import ProductList from './views/ProductList';
import UserList from './views/UserList';
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
        <Route
          component={Dashboard}
          exact
          path="/dashboard"
        />
        <Route
          component={DataPO}
          exact
          path="/data-po"
        />
        <Route
          component={SuratJalan}
          exact
          path="/surat-jalan"
        />
        <Route
          component={StokBarang}
          exact
          path="/stok-barang"
        />
         <Route
          component={Laporan}
          exact
          path="/laporan"
        />
        <Route
          component={UserList}
          exact
          path="/users"
        />
        <Route
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
