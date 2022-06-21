import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  buttonText,
  setIsButtonDisabled,
  isButtonDisabled,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();
  React.useEffect(() => {
    isOpen && resetForm();
  }, [isOpen, resetForm]);
  React.useEffect(() => {
    isValid ? setIsButtonDisabled(false) : setIsButtonDisabled(true);
  }, [isValid, setIsButtonDisabled]);
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: values.avatar,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Change profile picture"
      isOpen={isOpen}
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={isButtonDisabled}
    >
      <input
        className="popup__input popup__input_value_url"
        id="avatar-input"
        type="url"
        name="avatar"
        placeholder="Image URL"
        required
        value={values.avatar || ""}
        onChange={handleChange}
      />
      <span
        className={`popup__error_avatar-url popup__error avatar-input-error ${
          !isValid ? "popup__error_active" : ""
        }`}
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
