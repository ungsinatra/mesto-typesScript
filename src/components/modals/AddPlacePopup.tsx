import React, { useState,useEffect,memo, FC } from "react";
import PopupWithForm from "./PopupWithForm";
import useValidation from "../../Hooks/useValidation";
import {MoludlesMainProps} from '../../types'



const AddPlacePopup:FC<MoludlesMainProps> = memo(({ onClose, isOpen, onAddPlace, isLoad }) => {
  const [cardName, setCardName] = useState<string>("");
  const [cardLink, setCardLink] = useState<string>("");
  const [isFocus, setFocus] = useState<{nameIsOpen:boolean;linkIsOpen:boolean}>({
    nameIsOpen:false,
    linkIsOpen:false
  });



  const nameInput = useValidation(
    cardName,
    { isEmpty: true, maxLength: 30, minLength: 2 },
    isFocus.nameIsOpen
  );
  const linkInput = useValidation(
    cardLink,
    {
      isEmpty: true,
      isLink: true,
      maxLength:200,
      minLength:2,
    },
    isFocus.linkIsOpen
  );
  useEffect(() => {
    setCardName('');
    setCardLink('');
    setFocus({
      nameIsOpen:false,
      linkIsOpen:false
    })
  },[isOpen])

  function handleOnChangeName(evt:React.ChangeEvent<HTMLInputElement>) {
    setCardName(evt.target.value);
  }

  function handleFocusOnNameCard(e:React.FocusEvent<HTMLInputElement>) {
    setFocus({
      ...isFocus,
      nameIsOpen:true
    });
  }

  function handleFocusOnLinkCard(e:React.FocusEvent<HTMLInputElement>) {
    setFocus({
      ...isFocus,
      linkIsOpen:true
    });
  }

  function handleOnChangeLink(evt:React.ChangeEvent<HTMLInputElement>) {
    setCardLink(evt.target.value);
  }


  function handleSubmit(evt:React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
     onAddPlace && onAddPlace(cardName,  cardLink );
  }

  return (
    <>
      <PopupWithForm
        onSubmit={handleSubmit}
        name="card"
        title="Новое место"
        isOpen={isOpen}
        onClose={onClose}
        children={
          <>
            <input
              type="text"
              name="name"
              maxLength={30}
              value={cardName}
              onChange={handleOnChangeName}
              onFocus = {handleFocusOnNameCard}
              minLength={2}
              placeholder="Навание"
              id="card-name"
              className="popup__input  popup__input_value_name"
              required
            />
            <span className="popup__input-error popup__input-error_possition_top  card-name-error">
              {nameInput.showText()}
            </span>
            <input
              type="url"
              name="link"
              onFocus={handleFocusOnLinkCard}
              value={cardLink}
              onChange={handleOnChangeLink}
              id="card-url"
              placeholder="Ссылка на картинку"
              className="popup__input  popup__input_value_link"
              required
            />
            <span className="popup__input-error popup__input-error_possition_bottom card-url-error">
              {linkInput.showText()}
            </span>
            <button type="submit" disabled = {!nameInput.isValid || !linkInput.isValid} className={`popup__btn-save popup__btn-create  ${
                !nameInput.isValid || !linkInput.isValid
                  ? "popup__btn-inactive "
                  : ""
              }`}>
              {isLoad ? "Сохранение..." : "Сохранить"}
            </button>
          </>
        }
      />
    </>
  );
});

export default AddPlacePopup;
