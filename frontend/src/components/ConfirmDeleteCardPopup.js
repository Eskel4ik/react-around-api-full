import PopupWithForm from "./PopupWithForm";
import React from "react";

function ConfirmDeleteCardPopup({ isOpen, onClose, onConfirmDeleteSubmit,card, buttonText }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onConfirmDeleteSubmit(card);
  }
  return (
    <PopupWithForm
      name="delete"
      title="Are you sure?"
      isOpen={isOpen}
      buttonText={buttonText}
      onClose={onClose}
      onSubmit={handleSubmit}
      noValidate
    ></PopupWithForm>
  );
}

export default ConfirmDeleteCardPopup;
