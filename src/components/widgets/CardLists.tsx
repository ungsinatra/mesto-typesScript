import React, { FC, memo, useContext } from "react";
import { UserType, CardType } from "../../types";
import Card from "./Card";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import { api } from "src/utils/api";
import { CardContext } from "src/contexts/CardContext";
import { SelectedCard } from "../../types";
import { CardsSetterType } from "../../types";
import CardModals from "../modals/CardModals";

type CardDelProps = { _id: string | null; isOpen: boolean };

interface CardListsProps {
  cardLists: CardType[];
  onClose(): void;
  isLoad: boolean;
  onLoad(status:boolean):void,
}

const CardLists: FC<CardListsProps> = memo(({ cardLists, onClose, isLoad,onLoad }) => {
  const currentUser = useContext(CurrentUserContext);

  const {
    setCards,
    setCardDelete,
    setSelectedCard,
    isDellCardPopup,
    selectedCard,
  }: CardsSetterType = useContext(CardContext);
  let isLike:boolean | undefined;
  const isLiked = (card: CardType): boolean => {
    const res: boolean = card.likes.some(
      (like) => like._id === currentUser._id
    );
    return res;
  };
  
  const addCardLike = async (card: CardType, currentUser: UserType) => {
    const newCard: CardType = await api.likeCard({
      _idCard: card._id,
      userData: currentUser,
    });
    console.log(newCard);

    setCards((state: CardType[]) => updateCardInState(card, newCard, state));
  };

  const updateCardInState = (
    card: CardType,
    newCard: CardType,
    state: CardType[]
  ): CardType[] => {
    const newState: CardType[] = state.map((c) =>
      c._id === newCard._id ? newCard : c
    );
    return [...newState];
  };

  const removeCardLike = async (card: CardType, currentUser: UserType) => {
    const newCard: CardType = await api.removeLike({
      _idCard: card._id,
      userData: currentUser,
    });
    console.log(newCard);
    setCards((state: CardType[]) => updateCardInState(card, newCard, state));
  };

  function handleCardLike(card: CardType) {
    isLike = isLiked(card)
    if (!isLike) {
      addCardLike(card, currentUser);
    } else {
      removeCardLike(card, currentUser);
    }
  }

  const handlerCardClickDelete = (data: CardType) => {
    setCardDelete(
      (state: { isOpen: boolean; _id: null | string }): CardDelProps => {
        return {
          ...state,
          isOpen: true,
          _id: data._id,
        };
      }
    );
  };
  const handleCardClickImg = (data: CardType): void => {
    setSelectedCard((state: SelectedCard): SelectedCard => {
      return {
        ...state,
        isOpen: true,
        ...data,
      };
    });
  };

  return (
    <>
      <ul className="place__container">
        {cardLists.map((card, index) => (
          <Card
            card={card}
            key={card._id}
            onClickLike={handleCardLike}
            onClickImg={handleCardClickImg}
            onClickDelete={handlerCardClickDelete}
            isLiked = {isLike}
          />
        ))}
      </ul>
      <CardModals
        showDelPopup={{
          deleteCard: isDellCardPopup,
          isOpen: isDellCardPopup.isOpen,
          onClose,
        }}
        isLoad={isLoad}
        showImgPopup={{ currentImgCard: selectedCard, onClose }}
        onLoad={onLoad}
      />
    </>
  );
});

export default CardLists;
