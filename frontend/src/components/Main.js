import {useContext} from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import editAvatar from "../images/edit-avatar.svg";
import { Card } from "./Card";

function Main({
  cards,
  onCardDelete,
  onCardLike,
  onHoverAvatar,
  isHover,
  isVisible,
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardOpen,
}) {
  const currentUser = useContext(CurrentUserContext);
  function cardClickImgOpen(data) {
    onCardOpen(data);
  }

  const cardsItems = cards.map((item) => {
    return (
      <Card
        key={item._id}
        card={item}
        onCardDelete={onCardDelete}
        onCardLike={onCardLike}
        onCardClick={cardClickImgOpen}
      />
    );
  });

  return (
    <main className="content page__container">
      <section className="profile">
        <div className="profile__container">
          <div
            className="profile__change"
            onMouseOver={onHoverAvatar}
            onMouseOut={onHoverAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="Аватар"
              className={`profile__avatar ${
                (isHover && "profile__avatar_opacity") || ""
              }`}
            />
            <img
              src={editAvatar}
              alt="Изменить аватар"
              className={`profile__edit-avatar ${
                (isVisible && "profile__edit-avatar_visible") || ""
              }`}
              onClick={onEditAvatar}
            />
          </div>
          <div className="profile__into">
            <div className="profile__username-btn">
              <h1 className="profile__username">{currentUser.name}</h1>
              <button
                type="button"
                className="profile__edit-btn"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__info">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {cards.length !== 0 && <>{cardsItems}</>}
      </section>
    </main>
  );
}

export default Main;
