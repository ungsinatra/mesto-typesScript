import React, { useState, useEffect, useContext,FC,memo } from "react";
import useValidation from "../../Hooks/useValidation";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import {MoludlesMainProps} from  '../../types'



const EditProfilePopup:FC <MoludlesMainProps> = memo(({ isOpen, onClose, onUpdateUser, isLoad }) => {
  const currentUser = useContext(CurrentUserContext);

  const [values,setValues] = useState<{name:string;about:string;isFocus:boolean}>({
    name:'',
    about:'',
    isFocus:false,
  })

  const {name ,about,isFocus} = values;
  // Валидация знвечени инпутов
  const nameInput = useValidation(name, {
    isEmpty: true,
    maxLength: 30,
    minLength: 2,
  },isFocus);

  const aboutInput = useValidation(about, {
    isEmpty: true,
    maxLength: 200,
    minLength: 2,
  },isFocus);

  function handleSubmit(e:React.FormEvent<HTMLFormElement>):void {
    e.preventDefault();
    onUpdateUser && onUpdateUser(name, about);

  }

  function handleFucus(e:React.FocusEvent<HTMLInputElement>):void {
    setValues({
      ...values,
      isFocus:true,
    })

  }


  useEffect(() => {
    setValues({
      ...values,
      name:currentUser.userName,
      about:currentUser.userAbout,
    })
  }, [currentUser, isOpen]);

  function handleOnChange(evt:React.ChangeEvent<HTMLInputElement>):void {
    setValues({
      ...values,
      [evt.target.name]:evt.target.value
    })
  }

  return (
    <>
      <PopupWithForm
        name="profile"
        title={"Редактировать профиль"}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        children={
          <>
            <input
              type="text"
              name="name"
              maxLength={40}
              minLength={2}
              placeholder="Имя"
              value={name}
              onFocus={handleFucus}
              onChange={handleOnChange}
              id="profile-name"
              className="popup__input  popup__input_value_name"
              required
            />
            <span
              className={`popup__input-error popup__input-error_possition_top profile-name-error`}
            >
              {nameInput.showText()}
            </span>

            <input
              value={about}
              type="text"
              name="about"
              maxLength={200}
              minLength={2}
              onChange={handleOnChange}
              onFocus={handleFucus}
              placeholder="Работа"
              id="profile-desc"
              className="popup__input  popup__input_value_desc"
              required
            />
            <span className="popup__input-error popup__input-error_possition_bottom profile-desc-error">
              {
                aboutInput.showText()
             }
            </span>

            <button
              type="submit"
              disabled={!nameInput.isValid || !aboutInput.isValid || isLoad}
              className={`popup__btn-save ${
                !nameInput.isValid || !aboutInput.isValid
                  ? "popup__btn-inactive "
                  : ""
              }`}
            >
              {isLoad ? "Cохранение..." : "Сохранить"}
            </button>
          </>
        }
      />
    </>
  );
});

export default EditProfilePopup;
