import React from "react";
import editIconPath from "../images/editButton.svg";
import addCardIconPath from "../images/addButton.svg";
import editAvatarIconPath from "../images/pencil.svg";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onDeleteClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="user">
        <div className="user__avatar-wrapper" onClick={onEditAvatarClick}>
          <img
            className="user__avatar"
            id="jacques"
            src={currentUser.avatar}
            alt="user"
          ></img>
          <img
            className="user__avatar-icon"
            src={editAvatarIconPath}
            alt="white pencil icon"
          ></img>
        </div>
        <div className="user__text-container">
          <div className="user__title-container">
            <h1 className="user__name">{currentUser.name}</h1>
            <button
              className="user__edit-button"
              type="button"
              aria-label="Edit profile"
              onClick={onEditProfileClick}
            >
              <img
                className="user__edit-button-icon"
                src={editIconPath}
                alt="white pencil icon"
              ></img>
            </button>
          </div>
          <p className="user__info">{currentUser.about}</p>
        </div>
        <button
          className="user__add-button"
          type="button"
          aria-label="Add picture"
          onClick={onAddPlaceClick}
        >
          <img src={addCardIconPath} alt="white cross"></img>
        </button>
      </section>
      <section className="gallery">
        {cards.length > 0 && cards.map((item) => (
          <Card
            key={item._id}
            cardData={item}
            onCardClick={onCardClick}
            onDeleteClick={onDeleteClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
export default Main;
