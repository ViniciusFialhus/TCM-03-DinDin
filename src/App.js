import HomePage from "./pages/homepage";
import BodyFormRegistred from "./components/BodyFormRegistred";
import LoggedPage from "./pages/LoggedPage/LoggedPage";


import { Route, Routes, Navigate } from "react-router-dom";

function verificarAutenticacao() {
  
  const token = localStorage.getItem("token");
  return !!token; 
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<BodyFormRegistred title={'Cadastre-se'} />} />
        {/* Verificação de autenticação antes de renderizar a rota LoggedPage */}
        <Route
          path="/LoggedPage"
          element={verificarAutenticacao() ? <LoggedPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
