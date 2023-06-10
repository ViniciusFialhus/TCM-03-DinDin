import HomePage from "./pages/homepage";
import BodyFormRegistred from "./components/BodyFormRegistred";
import LoggedPage from "./pages/LoggedPage/LoggedPage";
import { Route, Routes} from "react-router-dom";

function App() {

  

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={ <HomePage />}
        />
        <Route
          path="/Register"
          element={<BodyFormRegistred title={"Cadastre-se"} />}
        />
        <Route path="/LoggedPage" element={<LoggedPage />} />
      </Routes>
    </div>
  );
}

export default App;
