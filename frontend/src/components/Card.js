import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardDeleteButtonClassName = `elements__trash-btn ${
    isOwn ? "elements__trash-btn_visible" : "elements__trash-btn_hidden"
  }`;

  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <div className="elements__place">
      <img
        className="elements__photo"
        alt={card.name}
        src={card.link}
        onClick={handleClick}
      />
      <div className="elements__name-like">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__info-like">
          <button
            type="button"
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
          ></button>
          <p className="elements__like-value">{card.likes.length}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={handleDeleteClick}
        className={cardDeleteButtonClassName}
      ></button>
    </div>
  );
}
