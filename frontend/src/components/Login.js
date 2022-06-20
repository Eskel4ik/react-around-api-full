import React from "react";
import SignForm from "./SignForm";

function Login({ headerStatus, handleLogin }) {
  return <SignForm title="Log in" text="Not a member yet? Sign up here!" headerStatus={headerStatus} handleSubmit={handleLogin}/>;
}
export default Login;
