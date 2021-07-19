import React from 'react';
import LoginForm from '../../forms/Login/LoginForm';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../../redux/actions/userActions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

function Login(props) {
  const onSubmit = (userData) => (event) => {
    event.preventDefault();

    props.loginUser(userData).then(() => {
      props.history.push('/');
      toast.info('Login successful.');
    }).catch(err => toast.error(err));
  }

  return (
    <>
    {props.isAuthenticated && <Redirect to="/" />}
    <LoginForm onSubmit={onSubmit} />
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
