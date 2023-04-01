import React, { memo,FC } from 'react';

interface PopupWithFormProps {
    name:string;
    title:string;
    isOpen:boolean;
    onSubmit(e:React.FormEvent<HTMLFormElement>):void;
    onClose():void;
    children:JSX.Element;
}

const PopupWithForm:FC<PopupWithFormProps> = memo(({
    name,
    title,
    children,
    isOpen,
    onClose,
    onSubmit,
  }) => {
    
    return (
      <div
        className={`popup popup_use_${name} ${isOpen ? `popup__opened` : ""}`}
        // onMouseDown = { isOpen && onClose}
      >
        <div className={`popup__content`}>
          <button
            onClick={onClose}
            type="button"
            aria-label="Закрыть попап"
            className="popup__close-btn"
          ></button>
          <h4 className="popup__title">{title}</h4>
          <form
            onSubmit={onSubmit}
            action="#"
            method="post"
            name={name}
            className="popup__form popup__form_use_profile"
            noValidate
          >
            {children}
          </form>
        </div>
      </div>
    );
  });
  
  export default PopupWithForm;
  