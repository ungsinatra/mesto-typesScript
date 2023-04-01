import React, { useContext, FC, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { CardType } from "src/types";
import { MainChiladHaldersType } from "src/types";
import CardLists from "../widgets/CardLists";

interface MainPropsType {
  cards: CardType[];
  handlers: MainChiladHaldersType;
  isLoad:boolean;
  onLoad(status:boolean):void
}

const Main: FC<MainPropsType> = ({ cards, handlers,isLoad,onLoad}) => {
  const userContext = useContext(CurrentUserContext);
  useEffect(() => {
    console.log("рендер main");
  });

  return (
    <main>
      <section className="profile">
        <div className="profile__wrapper">
          <div className="profile__items">
            <div className="profile__img-items">
              <div
                className="profile__avatar-switch-ican"
                onClick={handlers.onEditAvatar}
              ></div>
              <div
                style={{ backgroundImage: `url(${userContext.userAvatar})` }}
                className="profile__avatar"
              ></div>
            </div>

            <div className="profile__info">
              <button
                className="profile__edit-btn"
                type="button"
                area-label="Изменить"
                onClick={handlers.onEditProfile}
              ></button>
              <h1 className="profile__name">{userContext.userName}</h1>
              <p className="profile__description">{userContext.userAbout}</p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Добавить"
            className="profile__add-btn"
            onClick={handlers.onAddPlace}
          ></button>
        </div>
      </section>
      <section className="place">
        <CardLists cardLists={cards } onClose={handlers.onClose} isLoad = {isLoad} onLoad = {onLoad}/>
      </section>
    </main>
  );
};

export default Main;
