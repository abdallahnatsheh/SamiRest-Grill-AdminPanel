import "./App.css";
import AuthContext from "./context/AuthContext";
import { NotificationContainer } from "react-notifications";
import Manage from "./magage";

document.body.style.backgroundColor = "rgb(78, 115, 223)";
function App() {
  return (
    <div className="App">
      <AuthContext>
        <Manage />
      </AuthContext>
      <NotificationContainer />
    </div>
  );
}

export default App;
