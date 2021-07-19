import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import './Login.scss';

function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function onUsernameChange(event) {
    setUsername(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    
    props.loginUser({ username, password }).then(() => {
      props.history.push('/');
      toast.info('Login successful.');
    }).catch(err => toast.error(err));
  }

  return (
    <>
    {props.isAuthenticated && <Redirect to="/" />}
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-form-header">Login</div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={onUsernameChange}
          required />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onPasswordChange}
          required />

        <button type="submit">Submit</button>
      </form>
    </div>
    </>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.userReducer.token ? true : false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginUser: bindActionCreators(loginUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
