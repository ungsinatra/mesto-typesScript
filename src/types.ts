export interface UserType {
  userAvatar: string;
  userName: string;
  userAbout: string;
  _id: string;
}

export type SelectedCard = {
  link: string;
  name: string;
  isOpen: boolean;
};

export interface CardType {
  name: string;
  link: string;
  owner: UserType;
  likes: UserType[];
  _id: string;
}
export type DeleteCardPopupType = {
    _id:string | null,
    isOpen:boolean
}

export interface MoludlesMainProps {
  isOpen: boolean;
  isLoad: boolean;
  onClose(): void;
  onAddPlace?(name: string, link: string): void;
  onUpdateUser?(name: string, about: string): void;
  onSubmit?(card: DeleteCardPopupType): void;
  isLoading?:boolean
}
export interface MainChiladHaldersType {
  onEditAvatar: () => void;
  onEditProfile: () => void;
  onAddPlace: () => void;
  onClickDelete: (arg: CardType) => void;
  onCardClick: (arg: CardType) => void;
  onClose():void;
}

export type SetCardsType = React.Dispatch<React.SetStateAction<CardType[]>>;
export type SetCardDelete = React.Dispatch<
  React.SetStateAction<{
    _id: null | string;
    isOpen: boolean;
  }>
>;

export   type CardsSetterType = {
  setCards: SetCardsType;
  setCardDelete: SetCardDelete;
  setSelectedCard: React.Dispatch<React.SetStateAction<SelectedCard>>;
  selectedCard: SelectedCard;
  isDellCardPopup: DeleteCardPopupType;
};

