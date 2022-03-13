import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./Components/AdminPanel";
import SwipperEdit from "../src/Components/SwipperEdit";
import LMCardsEdit from "./Components/LMCardsEdit";
import MPGalleryEdit from "./Components/MPGalleryEdit";
import Menu from "./Components/Menu";
import Login from "../src/Components/Login";
import AuthContext from "./context/AuthContext";
import { NotificationContainer } from "react-notifications";
import NotFound from "./Components/NotFound";
import { useState, useEffect } from "react";
import { auth } from "../src/Components/firebase/firebase.Config";
import { onAuthStateChanged } from "firebase/auth";
import ResetPass from "./Components/ResetPass";
import Orders from "./Components/Orders";

document.body.style.backgroundColor = "rgb(78, 115, 223)";
function App() {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      user ? setIsLogged(true) : setIsLogged(false);
    });
  }, []);
  return (
    <div className="App">
      <AuthContext>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/reset-password" element={<ResetPass />} />
          <Route
            exact
            path="/"
            element={isLogged ? <AdminPanel /> : <Login />}
          />
          <Route
            exact
            path="/orders"
            element={isLogged ? <Orders /> : <Login />}
          />
          <Route
            exact
            path="/lmcards-edit"
            element={isLogged ? <LMCardsEdit /> : <NotFound />}
          />
          <Route
            exact
            path="/swipper-edit"
            element={isLogged ? <SwipperEdit /> : <NotFound />}
          />
          <Route
            exact
            path="/main-gallery-edit"
            element={isLogged ? <MPGalleryEdit /> : <NotFound />}
          />
          <Route
            exact
            path="/Menu-edit"
            element={isLogged ? <Menu /> : <NotFound />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext>
      <NotificationContainer />
    </div>
  );
}

export default App;
