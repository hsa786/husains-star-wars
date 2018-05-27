import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, IndexRoute } from 'react-router-dom';

import UserContext from '../contexts/user-context';

import Header from './global/Header';
import Login from './login';
import Search from './search';

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // Header
    const header = (
      <UserContext.Consumer>
        {({ user }) => <Header user={user} />}
      </UserContext.Consumer>
    )

    // Login
    const login = (
      <UserContext.Consumer>
        {({ user, updateUser }) => <Login user={user} updateUser={updateUser} />}
      </UserContext.Consumer>
    )

    // Search
    const search = (
      <UserContext.Consumer>
        {({ user }) => <Search user={user} />}
      </UserContext.Consumer>
    )

    // Content
    const content = (
      <div className="container">
        <div className="content-container row align-items-center justify-content-sm-center">
          <Route exact path="/" render={() => login} />
          <Route exact path="/search" render={() => search} />
        </div>
      </div>
    )

    return (
      <BrowserRouter>
        <Fragment>
          {/* Header */}
          {header}

          {/* Content */}
          {content}
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default Layout;