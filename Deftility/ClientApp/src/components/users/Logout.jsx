import { Redirect } from "react-router";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../../redux/actions/userActions';
import { useEffect } from "react";
import { toast } from 'react-toastify';

function Logout(props) {
  useEffect(() => {
    props.logoutUser();
    toast.info('Logout successful.');
  }, [props]);

  return (
    <Redirect to="/" />
  );
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: bindActionCreators(logoutUser, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Logout);