import React, { useState } from 'react';

import './LoginForm.scss';

export default function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function onUsernameChange(event) {
    setUsername(event.target.value);
  }

  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="login-form-wrapper">
      <form className="login-form" onSubmit={onSubmit({ username, password })}>
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
  );
}
