import React, { FC, memo, useContext } from "react";
import { CardType, SelectedCard } from "src/types";
import ImagePopup from "./ImagePopup";
import { api } from "src/utils/api";
import { DeleteCardPopupType } from "src/types";
import DeleteCardPoup from "./DeleteCardPoup";
import { CardContext } from "src/contexts/CardContext";


interface CardModalsProp {
  showImgPopup: {
    currentImgCard: SelectedCard;
    onClose(): void;
  };
  showDelPopup: {
    deleteCard: DeleteCardPopupType;
    isOpen: boolean;
    onClose(): void;
  };
  isLoad: boolean;
  onLoad(status: boolean): void;
}

const CardModals: FC<CardModalsProp> = memo(
  ({ showDelPopup, showImgPopup, isLoad, onLoad }) => {
    const { setCards, setCardDelete, isDellCardPopup } =
      useContext(CardContext);


    const sendResponse = async (cardId: string | null) => {
      onLoad(true);
      await api.deleteCard(cardId);
      setCards((state: CardType[]) => {
        const newState = state.filter((c) => c._id !== cardId);
        return [...newState];
      });
      setCardDelete({
        ...isDellCardPopup,
        isOpen: false,
      });
    };

    const handleCardDelete = async (card: DeleteCardPopupType) => {
      try {
        onLoad(true)
        await sendResponse(card._id);
      } catch (error) {
        alert(error);
      } finally {
        onLoad(false);
      }
    };


    return (
      <div>
        <ImagePopup
          showImgCard={showImgPopup.currentImgCard}
          onClose={showImgPopup.onClose}
        />
        <DeleteCardPoup
          deleteCard={showDelPopup.deleteCard}
          isLoad={isLoad}
          onSubmit={() => handleCardDelete(showDelPopup.deleteCard)}
          isOpen={showDelPopup.deleteCard.isOpen}
          onClose={showDelPopup.onClose}
        />
      </div>
    );
  }
);

export default CardModals;
