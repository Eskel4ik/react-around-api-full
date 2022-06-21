import React from "react";
import { Link } from "react-router-dom";

function SignForm({ title, text, headerStatus, handleSubmit }) {
  const [pathLink, setPathLink] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  React.useEffect(() => {
    headerStatus ? setPathLink('/signup') : setPathLink('/signin');
  },[headerStatus]);
  function handleSubmitForm(evt) {
    evt.preventDefault();
    handleSubmit({
      email: email,
      password: password
    })
  }
  return (
    <section className="sign">
      <form className="sign__form" action="#" onSubmit={handleSubmitForm}>
        <h2 className="sign__title">{title}</h2>
        <input
          className="sign__input sign__input_value_email"
          id="email-input"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="username"
          required
          value={email || ''}
          onChange={(evt) => {setEmail(evt.target.value)}}
        />
        <input
          className="sign__input sign__input_value_password"
          id="password-input"
          type="password"
          name="password"
          placeholder="Password"
          minLength={2}
          maxLength={12}
          autoComplete="current-password"
          required
          value={password || ''}
          onChange={(evt) => {setPassword(evt.target.value)}}
        />
        <button className="sign__button" type="submit">{title}</button>
        <Link className="sign__link" to={pathLink || ''}>{text}</Link>
      </form>
    </section>
  );
}
export default SignForm;