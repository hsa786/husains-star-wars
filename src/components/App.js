import React, { Component } from 'react';

import UserContext from '../contexts/user-context';

import Layout from './Layout';

class App extends Component {
  state = {
    user: null,
    updateUser: ::this.updateUser
  }

  constructor(props) {
    super(props);
  }

  updateUser(user) {
    this.setState({ user })
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Layout />
      </UserContext.Provider>
    )
  }
}

export default App;