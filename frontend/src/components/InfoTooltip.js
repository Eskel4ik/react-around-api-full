import closeButtonPath from "../images/addButton.svg";
import registerTrue from "../images/registerSuccess.svg";
import registerFalse from "../images/registerFail.svg";

function InfoTooltip({ isOpen, onClose, isSuccessed }) {
  return (
    <section
      className={`popup popup_type_tooltip ${isOpen && "popup_visible"}`}
    >
      <div className="popup__form-container popup__form-container_type_tooltip">
        <button className="popup__close-button popup__close-button_type_tooltip" type="button" onClick={onClose}>
          <img
            className="popup__close-button-icon"
            src={closeButtonPath}
            alt="cross icon"
          ></img>
        </button>
        <img
          className="popup__register-picture"
          src={isSuccessed ? registerTrue : registerFalse}
          alt="register status"
        ></img>
        <h2 className="popup__title popup__title_type_tooltip">
          {isSuccessed
            ? "Success! You have now been registered."
            : "Oops, something went wrong! Please try again."}
        </h2>
      </div>
    </section>
  );
}
export default InfoTooltip;
