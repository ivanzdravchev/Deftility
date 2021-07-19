import React from 'react';
import SignupForm from '../../forms/Signup/SignupForm';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../../redux/actions/userActions';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

function SignUp(props) {
  const onSubmit = (userData, setRepeatPasswordError) => (event) => {
    event.preventDefault();

    if (userData.password !== userData.repeatPassword) {
      setRepeatPasswordError(true);
      return;
    }
    setRepeatPasswordError(false);

    props.registerUser(userData).then(() => {
      props.history.push('/');
      toast.info('Registration successful.');
    }).catch(err => toast.error(err));
  }

  return (
    <>
    {props.isAuthenticated && <Redirect to="/" />}
    <SignupForm onSubmit={onSubmit} />
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
