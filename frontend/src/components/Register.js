import React from "react";
import SignForm from "./SignForm";

function Register({ headerStatus, handleRegister }) {
  return <SignForm title="Sign up" text="Already a member? Log in here!" headerStatus={headerStatus} handleSubmit={handleRegister}/>;
}
export default Register;
