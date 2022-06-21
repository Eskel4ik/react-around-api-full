import React from "react";
import { Route, Switch, useLocation, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import { register, login, checkToken } from "../utils/auth";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentUserEmail, setCurrentUserEmail] = React.useState("");
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] =
    React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);
  const [cards, setCards] = React.useState([]);
  const [popupButtonText, setPopupButtonText] = React.useState("Save");
  const [deletePopupButtonText, setDeletePopupButtonText] =
    React.useState("Yes");
  const [headerStatus, setHeaderStatus] = React.useState(false);
  const [isSuccessed, setIsSuccessed] = React.useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false);
  const location = useLocation();
  const history = useHistory();
  React.useEffect(() => {
    location.pathname === "/signin"
      ? setHeaderStatus(true)
      : setHeaderStatus(false);
  }, [location.pathname]);
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  React.useEffect(() => {
    loggedIn &&
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedIn]);
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    token &&
      checkToken(token)
        .then((res) => {
          console.log(res);
          setLoggedIn(true);
          setCurrentUserEmail(res.data.email);
          history.push("/");
        })
        .catch((err) => console.log(err));
  }, [history]);
  React.useEffect(() => {
    loggedIn &&
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [loggedIn]);
  function handleRegister(data) {
    register(data)
      .then((res) => {
        console.log(res);
        if (res.status === 400) {
          setIsSuccessed(false);
        } else if (res.status === 200) {
          setIsSuccessed(true);
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        return res.data;
      })
      .catch((err) => {
        setIsSuccessed(false);
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipPopupOpen(true);
      });
  }
  function handleLogin(data) {
    login(data)
      .then((res) => {
        console.log(res.token);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          setCurrentUserEmail(data.email);
          history.push("/");
          return res;
        }
      })
      .catch((err) => console.log(err));
  }
  function handleAddPlaceSubmit(cardData) {
    setPopupButtonText("Saving...");
    api
      .sendCardData(cardData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    api
      .changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function signOut() {
    localStorage.removeItem("jwt");
    setCurrentUserEmail("");
    setLoggedIn(false);
    history.push("./signin");
  }
  function handleCardDelete(card) {
    setDeletePopupButtonText("Saving...");
    api
      .deleteCard(card)
      .then((res) => {
        setCards((state) => state.filter((item) => item._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateUser(userData) {
    setPopupButtonText("Saving...");
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(userData) {
    setPopupButtonText("Saving...");
    api
      .editProfilePhoto(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleEditAvatarClick() {
    setPopupButtonText("Save");
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setPopupButtonText("Save");
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setPopupButtonText("Save");
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteClick(data) {
    setDeletePopupButtonText("Yes");
    setIsDeletePopupOpen(true);
    setDeletedCard(data);
  }
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }
  function handleCardClick(data) {
    setSelectedCard(data);
  }

  return (
    <div className="page__content">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          loggedIn={loggedIn}
          headerStatus={headerStatus}
          currentUserEmail={currentUserEmail}
          signOut={signOut}
        />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              loggedIn={loggedIn}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onEditAvatarClick={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onDeleteClick={handleDeleteClick}
              cards={cards}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
            />
          </ProtectedRoute>
          <Route path="/signin">
            <Login headerStatus={headerStatus} handleLogin={handleLogin} />
          </Route>
          <Route path="/signup">
            <Register
              headerStatus={headerStatus}
              handleRegister={handleRegister}
            />
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipPopupOpen}
          isSuccessed={isSuccessed}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          buttonText={popupButtonText}
          onUpdateAvatar={handleUpdateAvatar}
          setIsButtonDisabled={setIsButtonDisabled}
          isButtonDisabled={isButtonDisabled}
        />
        <EditProfilePopup
          onClose={closeAllPopups}
          isOpen={isEditProfilePopupOpen}
          buttonText={popupButtonText}
          onUpdateUser={handleUpdateUser}
          setIsButtonDisabled={setIsButtonDisabled}
          isButtonDisabled={isButtonDisabled}
        />
        <AddPlacePopup
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
          buttonText={popupButtonText}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          setIsButtonDisabled={setIsButtonDisabled}
          isButtonDisabled={isButtonDisabled}
        />
        <ConfirmDeleteCardPopup
          onClose={closeAllPopups}
          isOpen={isDeletePopupOpen}
          card={deletedCard}
          buttonText={deletePopupButtonText}
          onConfirmDeleteSubmit={handleCardDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
