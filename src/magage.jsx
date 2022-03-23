import { Route, Routes } from "react-router-dom";
import AdminPanel from "./Components/AdminPanel";
import SwipperEdit from "../src/Components/SwipperEdit";
import LMCardsEdit from "./Components/LMCardsEdit";
import MPGalleryEdit from "./Components/MPGalleryEdit";
import Menu from "./Components/Menu";
import Login from "../src/Components/Login";
import NotFound from "./Components/NotFound";
import { useState, useEffect } from "react";
import { auth } from "../src/Components/firebase/firebase.Config";
import { onAuthStateChanged } from "firebase/auth";
import ResetPass from "./Components/ResetPass";
import Orders from "./Components/Orders";
import RegisterEmployee from "./Components/RegisterEmployee";
import { query, getDocs, collection, where } from "firebase/firestore";
import { db } from "../src/Components/firebase/firebase.Config";
import Profile from "./Profile";
import Support from "./Components/Support";
import EmpTable from "./Components/EmpTable";

function Manage() {
  const [isLogged, setIsLogged] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      user ? setIsLogged(true) : setIsLogged(false);
      const q = user
        ? query(collection(db, "AdminEmp"), where("uid", "==", user?.uid))
        : "";
      const querySnapshot = q ? await getDocs(q) : "";
      !querySnapshot.empty
        ? setIsAdmin(querySnapshot.docs[0].data().isAdmin)
        : setIsAdmin(false);
    });
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/reset-password" element={<ResetPass />} />
        <Route exact path="/profile" element={<Profile />} />

        <Route exact path="/" element={isLogged ? <AdminPanel /> : <Login />} />
        <Route
          exact
          path="/orders"
          element={isLogged ? <Orders /> : <Login />}
        />
        <Route
          exact
          path="/lmcards-edit"
          element={isLogged && isAdmin ? <LMCardsEdit /> : <NotFound />}
        />
        <Route
          exact
          path="/swipper-edit"
          element={isLogged && isAdmin ? <SwipperEdit /> : <NotFound />}
        />
        <Route
          exact
          path="/main-gallery-edit"
          element={isLogged && isAdmin ? <MPGalleryEdit /> : <NotFound />}
        />
        <Route
          exact
          path="/Menu-edit"
          element={isLogged && isAdmin ? <Menu /> : <NotFound />}
        />
        <Route
          exact
          path="/register-employee"
          element={isLogged && isAdmin ? <RegisterEmployee /> : <NotFound />}
        />
        <Route
          exact
          path="/support"
          element={isLogged && isAdmin ? <Support /> : <NotFound />}
        />
        <Route
          exact
          path="/team-table"
          element={isLogged && isAdmin ? <EmpTable /> : <NotFound />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Manage;
