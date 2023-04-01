import React, { FC,useEffect,memo } from "react";
import headerLogo from "../../images/logo.svg";

import NavBar from "./NavBar";

interface HeaderProps {
  loggedIn: boolean,
  userName?: string,
  onClearUserData(): void;
  onLoggedIn(arg:boolean): void;
}

const Header: FC<HeaderProps> = memo(({
  loggedIn,
  onClearUserData,
  onLoggedIn,
  userName,
}) => {

  useEffect(() => {
    console.log('рендер хедер')
  })

  return (
          <header className="header">
            <img src={headerLogo} className="header__logo" alt="Логотип шапки" />
            <div className={loggedIn ? "header__info" : "header__info_use_auth"}>
              {loggedIn && <p className="header__text">{userName}</p>}
              <NavBar
                className={"header__link"}
                loggedIn={loggedIn}
                userName={userName}
                onClearUserData={onClearUserData}
                onLoggedIn={onLoggedIn}
              />
            </div>
          </header>
          );
});

export default Header;
