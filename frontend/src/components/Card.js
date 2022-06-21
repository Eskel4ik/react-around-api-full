import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
function Card({ cardData, onCardClick, onDeleteClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = cardData.owner._id === currentUser._id;
  const isLiked = cardData.likes.some(user => user._id === currentUser._id);
  const cardLikeButtonClassName = (`gallery__like-button ${isLiked ? 'gallery__like-button_active' : ''}`);
  const cardDisplayStyle =  (isOwn ? {display:'block'} : {display:'none'});
  function handleImageCLick() {
    onCardClick(cardData);
  }
  function handleDeleteClick() {
    onDeleteClick(cardData);
  }
  function handleLikeClick() {
    onCardLike(cardData);
  }
  return (
    <div className="gallery__card">
      <button
        className="gallery__delete-button"
        type="button"
        aria-label="Delete card"
        onClick={handleDeleteClick}
        style={cardDisplayStyle}
      ></button>
      <img
        className="gallery__picture"
        src={cardData.link}
        alt={cardData.name}
        onClick={handleImageCLick}
      ></img>
      <div className="gallery__text-container">
        <p className="gallery__text">{cardData.name}</p>
        <div className="gallery__like-wrapper">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Like!"
            onClick={handleLikeClick}
          ></button>
          <span className="gallery__like-counter">{cardData.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
