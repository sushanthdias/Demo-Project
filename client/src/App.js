import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import CreateBook from './components/forms/CreateBook';
import EditBook from './components/forms/EditBook';
import CreateAuthor from './components/forms/CreateAuthor';
import EditAuthor from './components/forms/EditAuthor';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Users from './components/dashboard/Users';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authAction';
import setAuthToken from './utils/setAuthToken';

import './App.css';
import 'antd/dist/antd.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser);
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-book" component={CreateBook} />
              <PrivateRoute exact path="/edit-book" component={EditBook} />
              <PrivateRoute exact path="/create-author" component={CreateAuthor} />
              <PrivateRoute exact path="/edit-author" component={EditAuthor} />
              <PrivateRoute exact path="/users" component={Users} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};
export default App;