import React, { FC } from "react";
import { SelectedCard } from "src/types";
interface ImagePopupProps {
  showImgCard: SelectedCard;
  onClose(): void;
}

const ImagePopup: FC<ImagePopupProps> = ({
  showImgCard: selectedCard,
  onClose,
}) => {
  return (
    <div
      onMouseDown={onClose}
      className={`popup popup_use_img ${
        selectedCard.isOpen ? `popup__opened` : ""
      }`}
    >
      <div className="popup__content_use_img">
        <button
          onClick={onClose}
          type="button"
          aria-label="Закрыть попап"
          className="popup__close-btn popup__close-btn-img"
        ></button>
        <img src={selectedCard.link} alt="" className="popup__img" />
        <p className="popup__desc">{selectedCard.name}</p>
      </div>
    </div>
  );
};

export default ImagePopup;
