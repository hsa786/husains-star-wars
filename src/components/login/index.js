import React, { Component, createRef } from 'react';
import axios from 'axios';

import UserContext from '../../contexts/user-context';

import LoginForm from './LoginForm';
import LoginSuccess from './LoginSuccess';

import API from '../../constants/api'

class Login extends Component {
  state = {
    isLoading: false,
    isFail: false,
    isValid: true
  }

  $username = createRef()
  $password = createRef()

  constructor(props) {
    super(props)
  }

  async handleSubmit(e) {
    e.preventDefault();

    this.setState({ isLoading: true });

    // Not storing these in state for limiting unnecessary
    // state updates
    const user = this.$username.current.value;
    const pass = this.$password.current.value;

    if (!this.validate(user, pass)) return;
    const data = await this.getResults(user);

    if (this.userExists(data, user, pass)) this.login(data);
  }

  getResults(user) {
    return axios.get(`${API.PEOPLE}?search=${user}`).then(({ data }) => {
      this.setState({ isLoading: false });
      return data;
    });
  }

  validate(user, pass) {
    const isValid = !!user && !!pass;
    
    this.setState({ isValid, isLoading: isValid });
    return isValid;
  }

  userExists(data, user, pass) {
    const person = data.results[0];    
    const userExists = data.count === 1 && person.name.toLowerCase() === user.toLowerCase() && person.birth_year === pass;

    this.setState({ isFail: !userExists });
    return userExists;
  }

  login(data) {
    this.props.updateUser(data.results[0]);
  }

  render() {
    const { isFail, isValid, isLoading } = this.state;

    // Content
    const content = this.props.user ? (
      <UserContext.Consumer>
        {({ user }) => <LoginSuccess user={user} />}
      </UserContext.Consumer>
    ) : (
      <LoginForm 
        isLoading={isLoading}
        isFail={isFail}
        isValid={isValid}
        onSubmit={::this.handleSubmit}
        ref={{username: this.$username, password: this.$password}} />
    )

    return (
      <div className="col col-lg-4">
        {/* Content */}
        {content}
      </div>
    )
  }
}

export default Login;