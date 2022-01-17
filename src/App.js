import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminPanel from "./Components/AdminPanel";
import SwipperEdit from "../src/Components/SwipperEdit";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/admin" element={<AdminPanel />} />
        <Route exact path="/swipper-edit" element={<SwipperEdit />} />
        <Route exact path="/" element={<AdminPanel />} />
      </Routes>
    </div>
  );
}

export default App;
