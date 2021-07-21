import React, { useState } from 'react';

import './SignupForm.scss';

export default function SignupForm({ onSubmit }) {
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

  return (
    <div className="signup-form-wrapper">
      <form className="signup-form" onSubmit={onSubmit({ username, email, password, repeatPassword }, setRepeatPasswordError)}>
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
        <div className={repeatPasswordError ? "input-error" : "input-error hidden"}>Password does not match!</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
