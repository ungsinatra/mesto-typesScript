import React, { useContext, FC } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CardType } from "src/types";

interface CardProps {
  card: CardType;
  onClickImg(arg: CardType): void;
  onClickLike(arg: CardType): void;
  onClickDelete(arg: CardType): void;
  isLiked:boolean | undefined
}

const Card: FC<CardProps> = React.memo(
  ({ card, onClickImg, onClickLike, onClickDelete,isLiked }) => {
    const currentUser = useContext(CurrentUserContext);

    const hadleClickImage = (): void => {
      onClickImg(card);
    };

    const hadleClickLike = (): void => {
      onClickLike(card);
    };

    const handleCardDelete = (): void => {
      onClickDelete(card);
    };

    const isLikes = card.likes.some((like) => {
      return like._id === currentUser._id;
    });

    const isOwn = currentUser._id === card.owner._id;
    return (
      <>
        <li className="place__item" key={card._id}>
          {isOwn && (
            <button
              type="button"
              aria-label="Удалить"
              style={{ display: "block" }}
              className={`place__btn-del`}
              onClick={handleCardDelete}
            ></button>
          )}
          <div
            onClick={hadleClickImage}
            className="place__img"
            style={{ backgroundImage: `url(${card.link})` }}
          ></div>
          <div className="place__features">
            <h3 className="place__title">{card.name}</h3>
            <button
              type="button"
              aria-label="Нравиться"
              onClick={hadleClickLike}
              className={`place__btn-like ${
                isLikes && "place__btn-like_status_liked"
              }`}
            ></button>
            <span className="place__like-count">{card.likes.length}</span>
          </div>
        </li>
      </>
    );
  }
);

export default Card;
