import React, { useState, useEffect,FC } from "react";
import Header from "./layouts/Header";
import Main from "./layouts/Main";
import "./App.css";
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import { CardContext } from "src/contexts/CardContext";
import { UserType } from "src/types";
import { SelectedCard } from "src/types";
import { CardType } from "src/types";
import { api } from "src/utils/api";
import EditProfilePopup from "./modals/EditProfilePopup";
import { CardsSetterType } from "src/types";
import AddPlacePopup from "./modals/AddPlacePopup";

type UserData = {
  userName: string;
  _id: string;
};

const App:FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData>({
    userName: "Sardor",
    _id: "123213213",
  });
  const [currentUser, setCurrentUser] = useState<UserType>({
    _id: "",
    userAbout: "",
    userAvatar: "",
    userName: "",
  });
  const [cards, setCards] = useState<CardType[]>([]);
  const [selectedCard, setSelectedCard] = useState<SelectedCard>({
    link: "",
    name: "",
    isOpen: false,
  });
  const [isPopupModals, setPopupModals] = useState<{
    isEditAvatarPopupOpen: boolean;
    isAddPlacePopupOpen: boolean;
    isEditProfilePopupOpen: boolean;
  }>({
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    isEditProfilePopupOpen: false,
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const hadleLoggedIn = (): void => {
    setLoggedIn(!loggedIn);
  };
  const handleUserData = (): void => {
    setUserData({
      userName: "",
      _id: "",
    });
  };

  const [isDellCardPopup, setDellCardPopup] = useState<{
    _id: null | string;
    isOpen: boolean;
  }>({
    _id: null,
    isOpen: false,
  });

  const handleCardClick = (data: CardType): void => {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      ...data,
    });
  };

  const handlePopupsModels = (modelas: string, state: boolean): void => {
    setPopupModals({
      ...isPopupModals,
      [modelas]: !state,
    });
  };

  
 const CardsSetters:CardsSetterType = {
    setCards,
    setCardDelete:setDellCardPopup,
    setSelectedCard,
    selectedCard,
    isDellCardPopup
  }

  const handleCardDeleteClick = (data: CardType) => {
    console.log(data);
    setDellCardPopup((state) => {
      const newData = { ...state };
      newData.isOpen = true;
      newData._id = data._id;
      return newData;
    });
  };

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()]).then(
      ([userInfo, cardsList]) => {
        setCurrentUser({
          userAvatar: userInfo.avatar,
          userName: userInfo.name,
          userAbout: userInfo.about,
          _id: userInfo._id,
        });
        setCards([...cardsList]);
      }
    );
  }, []);

  function handleloading(status: boolean) {
    setLoading(status);
  }

  function handleUpdateUser(name: string, desc: string) {
    handleloading(true);
    const userUpdate = api
      .updateUserInfo({ name: name, about: desc })
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          userName: name,
          userAbout: desc,
        });
        setPopupModals({
          ...isPopupModals,
          isEditProfilePopupOpen: false,
        });
      });
    userUpdate.catch((err) => {
      console.log("err", err);
    });

    userUpdate.finally(() => {
      handleloading(false);
    });
  }

  const handleUpdateCardList = (name: string, link: string): void => {
    handleloading(true);
    const card = api.setCard({ name: name, link: link }).then((res) => {
      setCards((state) => {
        const newStata = [res, ...state];
        return newStata;
      });
      setPopupModals({
        ...isPopupModals,
        isAddPlacePopupOpen: false,
      });
    });
    card.catch((err) => {
      console.log("err", err);
    });
    card.finally(() => {
      handleloading(false);
    });
  };

  const closeAllPopups = (): void => {
    selectedCard.isOpen && setSelectedCard({ ...selectedCard, isOpen: false });
    isPopupModals.isAddPlacePopupOpen &&
      setPopupModals({
        ...isPopupModals,
        isAddPlacePopupOpen: false,
      });
    isPopupModals.isEditAvatarPopupOpen &&
      setPopupModals({
        ...isPopupModals,
        isEditAvatarPopupOpen: false,
      });
    isPopupModals.isEditProfilePopupOpen &&
      setPopupModals({
        ...isPopupModals,
        isEditProfilePopupOpen: false,
      });
    isDellCardPopup.isOpen &&
      setDellCardPopup({
        ...isDellCardPopup,
        isOpen: !isDellCardPopup.isOpen,
      });
  };
  // if(authSuccess){
  //   setAuthSuccess(false)
  // }
  // if(authError){
  //   setAuthError(false)
  // }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <CardContext.Provider value={CardsSetters}>
        <Header
          loggedIn={loggedIn}
          onClearUserData={handleUserData}
          userName={userData.userName}
          onLoggedIn={hadleLoggedIn}
        />
        <Main
          cards={cards}
          isLoad = {isLoading}
          onLoad={handleloading}
          handlers={{
            onEditAvatar: () =>
              handlePopupsModels(
                "isEditAvatarPopupOpen",
                isPopupModals.isEditAvatarPopupOpen
              ),
            onEditProfile: () =>
              handlePopupsModels(
                "isEditProfilePopupOpen",
                isPopupModals.isEditProfilePopupOpen
              ),
            onAddPlace: () =>
              handlePopupsModels(
                "isAddPlacePopupOpen",
                isPopupModals.isAddPlacePopupOpen
              ),
            onClose:closeAllPopups,
            onClickDelete: handleCardDeleteClick,
            onCardClick: handleCardClick,
          }}
        />
        <EditProfilePopup
          isLoad={isLoading}
          isOpen={isPopupModals.isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isLoad={isLoading}
          isOpen={isPopupModals.isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleUpdateCardList}
        />

        </CardContext.Provider>

      </CurrentUserContext.Provider>
    </div>
  );
};

export default App;
