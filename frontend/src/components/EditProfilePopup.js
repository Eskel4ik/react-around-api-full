import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({
  isOpen,
  onClose,
  onUpdateUser,
  buttonText,
  setIsButtonDisabled,
  isButtonDisabled,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: values.name,
      about: values.about,
    });
  }
  React.useEffect(() => {
    isOpen && setValues({ name: currentUser.name, about: currentUser.about });
  }, [isOpen, setValues, currentUser]);
  React.useEffect(() => {
    isValid ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
  }, [isValid, setIsButtonDisabled]);

  return (
    <PopupWithForm
      name="profile"
      title="Edit profile"
      isOpen={isOpen}
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
    >
      <input
        className="popup__input popup__input_value_name"
        id="name-input"
        type="text"
        name="name"
        placeholder="Your name"
        minLength="2"
        maxLength="40"
        required
        onChange={handleChange}
        value={values.name || ""}
      />
      <span
        className={`popup__error name-input-error ${
          !isValid ? "popup__error_active" : ""
        }`}
      >
        {errors.name}
      </span>
      <input
        className="popup__input popup__input_value_about"
        id="about-input"
        type="text"
        name="about"
        placeholder="About me"
        minLength="2"
        maxLength="200"
        required
        value={values.about || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__error_profile-about popup__error about-input-error ${
          !isValid ? "popup__error_active" : ""
        }`}
      >
        {errors.about}
      </span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
