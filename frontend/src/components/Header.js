import React from "react";
import { Link } from "react-router-dom";
import logoPath from "../images/logo.svg";

function Header({ loggedIn, headerStatus, currentUserEmail, signOut }) {
  const [isActive, setIsActive] = React.useState(false);
  return (
    <header className="header">
      <img
        className="logo"
        id="logo"
        src={logoPath}
        alt="around the us logo"
      ></img>
      {!loggedIn ? (
        <>
          {!headerStatus ? (
            <Link className="header__link" to="/signin">
              {" "}
              Log In
            </Link>
          ) : (
            <Link className="header__link" to="/signup">
              {" "}
              Sign Up
            </Link>
          )}
        </>
      ) : (
        <div
          className={`header__link-container ${
            isActive && "header__link-container_active"
          }`}
        >
          <p className="header__user-email">{currentUserEmail}</p>
          <button
            onClick={signOut}
            className="header__logout-button"
            type="button"
          >
            Log out
          </button>
        </div>
      )}
      {loggedIn && (
        <button
          className={`header__burger-button ${
            isActive && "header__burger-button_active"
          }`}
          type="button"
          onClick={() => setIsActive(!isActive)}
        ></button>
      )}
    </header>
  );
}
export default Header;
