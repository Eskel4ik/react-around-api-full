import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function AddPlacePopup({
  isOpen,
  onClose,
  onAddPlaceSubmit,
  buttonText,
  isButtonDisabled,
  setIsButtonDisabled,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  React.useEffect(() => {
    isValid ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
  }, [isValid, setIsButtonDisabled]);
  React.useEffect(() => {
    isOpen && resetForm();
  }, [isOpen, resetForm]);
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlaceSubmit({
      name: values.title,
      link: values.url,
    });
  }
  return (
    <PopupWithForm
      name="addCard"
      title="New place"
      isOpen={isOpen}
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
    >
      <input
        className="popup__input popup__input_value_title"
        id="title-input"
        type="text"
        name="title"
        placeholder="Title"
        minLength="2"
        maxLength="30"
        required
        value={values.title || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__error_addCard-name popup__error title-input-error ${
          !isValid ? "popup__error_active" : ""
        }`}
      >
        {errors.title}
      </span>
      <input
        className="popup__input popup__input_value_url"
        id="url-input"
        type="url"
        name="url"
        placeholder="Image URL"
        minLength="2"
        required
        value={values.url || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__error_addCard-url popup__error url-input-error ${
          !isValid ? "popup__error_active" : ""
        }`}
      >
        {errors.url}
      </span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
