import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./Components/AdminPanel";
import SwipperEdit from "../src/Components/SwipperEdit";
import LMCardsEdit from "./Components/LMCardsEdit";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/admin" element={<AdminPanel />} />
        <Route exact path="/" element={<AdminPanel />} />
        <Route exact path="/lmcards-edit" element={<LMCardsEdit />} />
        <Route exact path="/swipper-edit" element={<SwipperEdit />} />
      </Routes>
    </div>
  );
}

export default App;
