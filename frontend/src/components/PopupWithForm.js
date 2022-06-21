import closeButtonPath from "../images/addButton.svg";

function PopupWithForm({
  name,
  title,
  isOpen,
  buttonText,
  onClose,
  onSubmit,
  children,
  isButtonDisabled
}) {
  return (
    <section
      className={`popup popup_type_${name} ${isOpen && "popup_visible"}`}
    >
      <div className="popup__form-container">
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img
            className="popup__close-button-icon"
            src={closeButtonPath}
            alt="cross icon"
          ></img>
        </button>
        <form
          className={`popup__form popup__form-${name}`}
          action="#"
          name={name}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button className={`popup__button ${isButtonDisabled ? 'popup__button_disabled' : ''}`} type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
