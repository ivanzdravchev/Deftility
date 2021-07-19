import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

import './Signup.scss';

function SignUp(props) {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [repeatPasswordError, setRepeatPasswordError] = useState(false);

  function onUsernameChange(event) {
    setUsername(event.target.value);
  }

  function onEmailChange(event) {
    setEmail(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  function onRepeatPasswordChange(event) {
    setRepeatPassword(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();

    if (password !== repeatPassword) {
      setRepeatPasswordError(true);
      return;
    }
    setRepeatPasswordError(false);

    props.registerUser({ username, email, password }).then(() => {
      props.history.push('/');
      toast.info('Registration successful.');
    }).catch(err => toast.error(err));
  }

  return (
    <>
    {props.isAuthenticated && <Redirect to="/" />}
    <div className="signup-form-wrapper">
      <form className="signup-form" onSubmit={onSubmit}>
        <div className="signup-form-header">Get your free account</div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={onUsernameChange}
          required />

        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={onEmailChange}
          required />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={onPasswordChange}
          required />

        <input
          type="password"
          name="repeat-password"
          placeholder="Repeat password"
          onChange={onRepeatPasswordChange}
          required />
        <div className={repeatPasswordError ? "repeat-password-error" : "repeat-password-error hidden"}>Password does not match!</div>

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
    registerUser: bindActionCreators(registerUser, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
